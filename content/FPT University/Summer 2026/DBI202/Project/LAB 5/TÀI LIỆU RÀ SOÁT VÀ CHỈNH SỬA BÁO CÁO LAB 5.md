

Dựa trên yêu cầu đề tài số 5 và kiến thức chuẩn về MS SQL Server cùng thiết kế CSDL (DBI202), dưới đây là tổng hợp các sai phạm nghiêm trọng cùng hướng khắc phục chi tiết.

---

## 1. Lỗi nghiệp vụ – đi sai hướng dự án

### Lỗi ở đâu

Nhóm sử dụng cụm từ "Hệ thống Xét tuyển tự động" và gán cờ `IsAdmitted` (đậu/trượt) cho học sinh dựa trên điểm số, ví dụ: `TotalScore >= 8 THEN IsAdmitted = 1`.

### Lý do

Đề tài số 5 là **Kiosk Tư vấn Hướng nghiệp tại sự kiện Open Day**. Máy Kiosk dành cho học sinh cấp 3, chỉ có chức năng tạo ra các điểm số gợi ý (recommendation scores) dựa trên câu trả lời để phân tích độ phù hợp. Hệ thống không có chức năng hay thẩm quyền quyết định "xét tuyển đậu đại học". Việc làm này sai lệch hoàn toàn ngữ cảnh thực tế.

### Cách sửa

- Xóa bỏ cột `IsAdmitted` và tư duy "đậu/trượt".
- Thay vào đó, sử dụng khái niệm **Độ phù hợp / tương thích** (`MatchScore`), tính theo thang phần trăm (0–100%) để đưa ra top các ngành học gợi ý cho học sinh.

---

## 2. Lỗi thuật toán – sai công thức tính điểm

### Lỗi ở đâu

Trong luồng xử lý dữ liệu, lập trình viên dùng lệnh `SUM(PercentRight)/100 AS TotalScore` để tính điểm cho từng ngành.

### Lý do

Nếu dùng hàm tổng (`SUM`), thang điểm sẽ bị lệch hoàn toàn. Ví dụ:

- Ngành Kỹ thuật Phần mềm có 5 câu hỏi liên quan, học sinh trả lời đúng hết → tổng là 500%.
- Ngành Đồ họa có 15 câu, đúng hết → tổng là 1500%.

Ngành nào có nhiều câu hỏi hơn sẽ mặc định có điểm cao hơn một cách vô lý.

### Cách sửa

Bắt buộc phải thay hàm `SUM` bằng hàm trung bình **`AVG(CompatibilityScore)`**. Hàm `AVG` luôn đảm bảo điểm độ phù hợp (`MatchScore`) nằm trong thang 0–100%, bất chấp số lượng câu hỏi của từng chuyên ngành.

---

## 3. Lỗi kỹ thuật CSDL – xung đột cú pháp SQL

### Lỗi ở đâu

Kịch bản backend sử dụng hàm `GETDATE()` đi kèm với lệnh `ON DUPLICATE KEY UPDATE` (hoặc `UPSERT`).

### Lý do

Môn học yêu cầu sử dụng hệ quản trị **MS SQL Server**. Hàm `GETDATE()` là đúng, nhưng cú pháp `ON DUPLICATE KEY UPDATE` là đặc trưng của MySQL. Nếu mang đoạn code này chạy trên SQL Server, chương trình sẽ báo lỗi cú pháp (Syntax Error) ngay lập tức.

### Cách sửa

Để giải quyết bài toán "nếu có đáp án rồi thì cập nhật, chưa có thì thêm mới", trong MS SQL Server phải dùng câu lệnh điều kiện:

```sql
IF EXISTS (...)
    UPDATE ...
ELSE
    INSERT ...
```

Nhóm có thể viết câu lệnh này vào một Stored Procedure (phù hợp cho Lab 5).

---

## 4. Lỗi sập hệ thống – khóa chính bị trùng (vi phạm BCNF)

### Lỗi ở đâu

Bảng `STUDENT_RESPONSE` (lịch sử trả lời) được thiết kế với khóa chính (Primary Key) là `(SessionID, QuestionID)`.

### Lý do

Thiết kế này sẽ làm sập hệ thống nếu bài khảo sát có câu hỏi dạng **chọn nhiều đáp án (checkbox)**. Ví dụ:

- Câu 5: "Sở thích của bạn?" – học sinh chọn cả A và B.
- Khi backend đẩy hai đáp án A và B xuống database cho cùng `QuestionID = 5` trong cùng một `Session`, SQL Server sẽ báo lỗi **Primary Key Violation** vì một cặp `(SessionID, QuestionID)` chỉ được xuất hiện một lần duy nhất.

Hơn nữa, việc lưu `QuestionID` trong bảng này khi đã có `OptionID` là vi phạm dạng chuẩn BCNF.

### Cách sửa

Đổi khóa chính của bảng `STUDENT_RESPONSE` thành **`(SessionID, OptionID)`**. Vì mỗi `OptionID` (ví dụ: Option 23 là đáp án A của câu 5) là duy nhất, thiết kế này:

- Cho phép học sinh chọn nhiều đáp án cùng lúc.
- Không gây trùng khóa.
- Đạt chuẩn BCNF tuyệt đối.

---

## 5. Lỗi thiết kế – điểm số bị gắn cứng (thiếu linh hoạt)

### Lỗi ở đâu

Cột `PercentRight` (điểm số) được đặt cứng bên trong bảng `ANSWER_OPTION`.

### Lý do

Trong hướng nghiệp, một câu trả lời không thể mang một số điểm cố định cho tất cả các ngành. Ví dụ:

- Đáp án "Tôi thích làm việc với con số" sẽ mang lại 100% điểm phù hợp cho ngành Tài chính, nhưng chỉ 10% điểm cho ngành Thiết kế Đồ họa.

Việc gắn chết một mức điểm vào bảng đáp án khiến hệ thống không thể phân loại ngành học.

### Cách sửa

- Xóa cột điểm khỏi bảng `ANSWER_OPTION`.
- Tạo một bảng ma trận trung gian tên là `PROGRAM_MATCHING_RULE` với khóa chính là `(OptionID, ProgramID)` và một cột `CompatibilityScore` (trọng số điểm).
- Tư vấn viên có thể tự do cấu hình: Option A nối với Ngành B thì được 100 điểm, Option A nối với Ngành C thì được 10 điểm.

---

## Tổng kết tổng thể

Nhóm đã có tư duy logic tốt (nghĩ đến việc lưu `OptionID` thay vì text, nghĩ đến việc chống rác dữ liệu bằng Audit Trail). Tuy nhiên, vì chưa nắm rõ bản chất nghiệp vụ hướng nghiệp (nhầm sang hệ thống thi đại học) nên các bảng và công thức toán học bị kéo đi sai hướng.

**Bức tranh hệ thống sau khi sửa:**

1. Học sinh đến Kiosk, bấm chọn đáp án → lưu `(SessionID, OptionID)` vào bảng `StudentResponse`.
2. Hệ thống chạy thuật toán: lấy các `OptionID` đó dò vào bảng ma trận `Program_Matching_Rule` để lấy điểm từng ngành → dùng hàm `AVG()` tính phần trăm tương thích.
3. Xuất ra top 3 ngành có `% MatchScore` cao nhất, lưu vào bảng `Recommendation` → chuyên viên dùng kết quả đó để tư vấn (Counseling).

![[TÀI LIỆU RÀ SOÁT VÀ CHỈNH SỬA BÁO CÁO LAB 4-20260704215535439.png]]