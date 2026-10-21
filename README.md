# Thiệp sinh nhật khủng long

Giao diện React, mobile-first, nội dung tiếng Việt.

## Chạy

```sh
npm install
npm run dev
```

Dựng bản tĩnh: `npm run build`.

## Thay nội dung

Sửa đối tượng `party` ở đầu `src/main.jsx`: tên bé, ngày hiển thị, giờ, địa điểm, địa chỉ. Điền `dateISO` theo ISO 8601 có múi giờ (ví dụ `2026-12-20T16:00:00+07:00`) để bật đếm ngược. Điền `mapQuery` là địa chỉ thật để mở Google Maps.

Xác nhận và lời chúc được lưu trong localStorage, riêng từng trình duyệt. Chưa có dịch vụ gửi đăng ký về chủ tiệc hoặc chia sẻ lời chúc giữa khách. Giao diện thông báo rõ giới hạn này.

Các minh họa là SVG trong React. Animation tôn trọng `prefers-reduced-motion`. Font Google có font dự phòng nếu ngoại tuyến.
