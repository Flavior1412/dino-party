const SPREADSHEET_ID = '1-LUdwB7CyW8aHWZGeGRDvNqFZjUpN322H2S3FikCtP0';
const SHEET_NAME = 'vodka5years';
const RSVP_TABLE = {
  column: 1,
  headers: ['Mã đăng ký', 'Tên người tham dự', 'Số người', 'nội dung', 'Thời gian cập nhật'],
};
const WISH_TABLE = {
  column: 7,
  headers: ['Mã lời chúc', 'Tên người gửi', 'Nội dung lời chúc', 'Thời gian cập nhật'],
};

function doPost(e) {
  // Nút Run không truyền HTTP event. Để cấp quyền, chạy authorizeAccess.
  if (!e || !e.postData || !e.postData.contents) {
    return jsonResponse({ ok: false, code: 'MISSING_POST_DATA' });
  }
  const lock = LockService.getScriptLock();
  try {
    const data = JSON.parse(e.postData.contents);
    const name = String(data.name || '').trim();
    const isWish = data.type === 'wish';
    const count = isWish ? '' : Number(data.count);
    const id = String(data.id || '');
    const message = String(data.message || '').trim();
    if (
      !name ||
      name.length > 60 ||
      message.length > 300 ||
      (isWish && !message) ||
      (!isWish && (!Number.isInteger(count) || count < 1 || count > 6)) ||
      !/^[a-zA-Z0-9-]{10,80}$/.test(id)
    ) {
      throw new Error('INVALID_DATA');
    }
    lock.waitLock(10000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const config = isWish ? WISH_TABLE : RSVP_TABLE;
    const sheet = getTargetSheet(spreadsheet);
    prepareTable(sheet, config);
    // Tên người dùng luôn được ghi dạng văn bản, không thực thi công thức.
    const safeName = /^[=+\-@]/.test(name) ? "'" + name : name;
    const safeMessage = /^[=+\-@]/.test(message) ? "'" + message : message;
    const row = isWish
      ? [id, safeName, safeMessage, new Date()]
      : [id, safeName, count, safeMessage, new Date()];
    const lastRow = getTableLastRow(sheet, config);
    const match =
      lastRow > 1
        ? sheet
            .getRange(
              2,
              config.column + config.headers.indexOf(isWish ? 'Mã lời chúc' : 'Mã đăng ký'),
              lastRow - 1,
              1,
            )
            .createTextFinder(id)
            .matchEntireCell(true)
            .findNext()
        : null;
    const targetRow = match ? match.getRow() : lastRow + 1;
    if (targetRow > sheet.getMaxRows()) {
      sheet.insertRowsAfter(sheet.getMaxRows(), targetRow - sheet.getMaxRows());
    }
    sheet.getRange(targetRow, config.column, 1, row.length).setValues([row]);
    SpreadsheetApp.flush();
    return jsonResponse({ ok: true, id: id });
  } catch (error) {
    console.error(error);
    const knownErrors = ['INVALID_DATA', 'SHEET_NOT_FOUND', 'HEADERS_MISMATCH'];
    return jsonResponse({
      ok: false,
      code: knownErrors.includes(error.message) ? error.message : 'SHEET_WRITE_FAILED',
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Cả hai bảng luôn nằm trong cùng tab vodka5years.
function getTargetSheet(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  if (sheet.getMaxColumns() < 10) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), 10 - sheet.getMaxColumns());
  }
  return sheet;
}

function prepareTable(sheet, config) {
  const range = sheet.getRange(1, config.column, 1, config.headers.length);
  const headers = range.getValues()[0];
  if (headers.every((value) => value === '')) {
    // Không đặt tiêu đề lên vùng đang có dữ liệu nhưng chưa có hàng tiêu đề.
    if (getTableLastRow(sheet, config) > 1) throw new Error('HEADERS_MISMATCH');
    range.setValues([config.headers]);
    return;
  }
  if (
    config.column === 1 &&
    headers.slice(0, 4).every((value, index) => value === config.headers[index]) &&
    headers[4] === ''
  ) {
    sheet.getRange(1, 5).setValue(config.headers[4]);
    headers[4] = config.headers[4];
  }
  if (headers.some((value, index) => value !== config.headers[index])) {
    throw new Error('HEADERS_MISMATCH');
  }
}

// Tìm dòng cuối riêng từng bảng, không phụ thuộc độ dài bảng bên cạnh.
function getTableLastRow(sheet, config) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return 1;
  const rows = sheet.getRange(2, config.column, lastRow - 1, config.headers.length).getValues();
  for (let index = rows.length - 1; index >= 0; index--) {
    if (rows[index].some((value) => value !== '')) return index + 2;
  }
  return 1;
}

// Chạy để cấp quyền và kiểm tra truy cập; không ghi đăng ký thử.
function authorizeAccess() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  console.log('Đã truy cập file: ' + spreadsheet.getName());
}

// Chạy một lần để chuẩn bị hai bảng A:E và G:J trong cùng tab.
function setupSheets() {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = getTargetSheet(spreadsheet);
    [RSVP_TABLE, WISH_TABLE].forEach((config) => prepareTable(sheet, config));
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

// Đọc cấu trúc hai bảng, không ghi dữ liệu.
function inspectSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('SHEET_NOT_FOUND');
  [RSVP_TABLE, WISH_TABLE].forEach((config) => {
    console.log(
      JSON.stringify({
        sheet: SHEET_NAME,
        startColumn: config.column,
        headers: sheet.getRange(1, config.column, 1, config.headers.length).getValues()[0],
      }),
    );
  });
}

// Chỉ công khai tên và nội dung lời chúc, không đọc bảng đăng ký A:E.
function doGet(e) {
  if (!e || !e.parameter || e.parameter.action !== 'wishes') {
    return jsonResponse({ ok: false, code: 'INVALID_ACTION' });
  }
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet || sheet.getLastRow() < 2) return jsonResponse({ ok: true, wishes: [] });
    const headers = sheet
      .getRange(1, WISH_TABLE.column, 1, WISH_TABLE.headers.length)
      .getValues()[0];
    if (headers.some((value, index) => value !== WISH_TABLE.headers[index])) {
      return jsonResponse({ ok: false, code: 'HEADERS_MISMATCH' });
    }
    const rows = sheet.getRange(2, WISH_TABLE.column, sheet.getLastRow() - 1, 3).getValues();
    const wishes = rows
      .filter((row) => String(row[1]).trim() && String(row[2]).trim())
      .reverse()
      .slice(0, 50)
      .map((row) => ({ name: String(row[1]), text: String(row[2]) }));
    return jsonResponse({ ok: true, wishes: wishes });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, code: 'WISH_READ_FAILED' });
  }
}
