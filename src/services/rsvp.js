export async function submitRsvp(data) {
  const endpoint = import.meta.env.VITE_RSVP_ENDPOINT?.trim();
  if (!endpoint) {
    throw new Error('Chưa cấu hình URL nhận đăng ký. Vui lòng liên hệ gia đình bé.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    // text/plain tránh preflight; cần đọc phản hồi để xác nhận đã ghi vào Sheet.
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data),
      signal: controller.signal,
      credentials: 'omit',
      redirect: 'follow',
    });
    if (!response.ok) throw new Error('Máy chủ chưa nhận được đăng ký. Vui lòng thử lại.');
    const body = await response.text();
    let result;
    try {
      result = JSON.parse(body);
    } catch {
      throw new Error(
        'Apps Script không trả JSON. Kiểm tra URL /exec và quyền Web App: Execute as Me, Anyone.',
      );
    }
    if (!result || typeof result !== 'object') {
      throw new Error(
        'Phản hồi Apps Script không hợp lệ. Hãy cập nhật deployment lên phiên bản mới.',
      );
    }
    const errors = {
      INVALID_DATA: 'Thông tin đăng ký không hợp lệ. Kiểm tra tên, số người và lời nhắn.',
      SHEET_NOT_FOUND: 'Không tìm thấy tab vodka5years trong Google Sheet.',
      HEADERS_MISMATCH:
        'Tiêu đề cột chưa khớp. Kiểm tra tab vodka5years: đăng ký A1:E1, lời chúc G1:J1.',
      SHEET_WRITE_FAILED: 'Apps Script không ghi được Sheet. Kiểm tra quyền và mục Executions.',
    };
    if (result.ok !== true && errors[result.code]) throw new Error(errors[result.code]);
    if (result.ok !== true || result.id !== data.id) {
      throw new Error('Chưa ghi được đăng ký vào danh sách. Vui lòng thử lại.');
    }
    return result;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(
        'Đã chờ quá 45 giây. Kiểm tra Sheet trước khi gửi lại; yêu cầu có thể đã được ghi.',
      );
    }
    if (error instanceof TypeError) {
      throw new Error(
        'Không đọc được phản hồi từ Apps Script (mạng hoặc CORS). Kiểm tra kết nối và quyền Anyone của Web App. Yêu cầu có thể đã được ghi; hãy kiểm tra Sheet trước khi gửi lại.',
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
