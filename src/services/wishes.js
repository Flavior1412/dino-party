export async function getWishes({ signal } = {}) {
  const endpoint = import.meta.env.VITE_RSVP_ENDPOINT?.trim();
  if (!endpoint) throw new Error('Chưa cấu hình địa chỉ tải lời chúc.');
  const url = new URL(endpoint);
  url.searchParams.set('action', 'wishes');
  const controller = new AbortController();
  const cancel = () => controller.abort();
  if (signal?.aborted) cancel();
  signal?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(cancel, 45000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      credentials: 'omit',
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Chưa tải được lời chúc. Vui lòng thử lại.');
    const result = await response.json();
    if (!result || result.ok !== true || !Array.isArray(result.wishes)) {
      throw new Error('Chưa đọc được lời chúc. Hãy cập nhật Apps Script với hàm doGet mới.');
    }
    return result.wishes.filter(
      (wish) => wish && typeof wish.name === 'string' && typeof wish.text === 'string',
    );
  } catch (error) {
    if (signal?.aborted) throw error;
    if (error.name === 'AbortError') throw new Error('Tải lời chúc quá lâu. Bạn thử lại nhé.');
    if (error instanceof TypeError || error instanceof SyntaxError) {
      throw new Error('Chưa tải được lời chúc. Kiểm tra mạng và phiên bản triển khai Apps Script.');
    }
    throw error;
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', cancel);
  }
}
