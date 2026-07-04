
# 📌 PHÂN TÍCH 5 LỖI SAI CHÍ MẠNG - CSDL HỆ THỐNG KIOSK TƯ VẤN HƯỚNG NGHIỆP

> [!info] BỐI CẢNH
> Dựa trên yêu cầu dự án **"Career Guidance Kiosk System"** và các kiến thức chuẩn về Hệ quản trị MS SQL Server + Thiết kế CSDL (DBI202)

---

## 1️⃣ LỖI NGHIỆP VỤ: ĐI SAI HƯỚNG DỰ ÁN

### ❌ Lỗi ở đâu
- Nhóm sử dụng cụm từ **"Hệ thống Xét tuyển tự động"**
- Gán cờ `IsAdmitted` (Đậu/Trượt) cho học sinh dựa trên điểm số
- Ví dụ: `TotalScore >= 8 THEN IsAdmitted = 1`

### 🧠 Lý do lỗi
- Đề tài số 5 của các bạn là **Kiosk Tư vấn Hướng nghiệp tại sự kiện Open Day**
- Một chiếc máy Kiosk cho học sinh cấp 3 đứng bấm 10 phút chỉ có chức năng tạo ra các **điểm số gợi ý (recommendation scores)** dựa trên câu trả lời để phân tích độ phù hợp
- Nó hoàn toàn **không có chức năng hay thẩm quyền** quyết định "xét tuyển đậu đại học"
- Việc làm này sai lệch hoàn toàn ngữ cảnh thực tế

### ✅ Cách sửa
- **Xóa bỏ** hoàn toàn cột `IsAdmitted` và tư duy "Đậu/Trượt"
- Thay vào đó, sử dụng khái niệm **Độ phù hợp/tương thích (`MatchScore`)**
- Tính theo thang phần trăm (0 - 100%) để đưa ra Top các ngành học gợi ý cho học sinh

---

## 2️⃣ LỖI THUẬT TOÁN: SAI CÔNG THỨC TÍNH ĐIỂM

### ❌ Lỗi ở đâu
- Trong Data Flow, Lập trình viên đang dùng lệnh:
```sql
SUM(PercentRight)/100 AS TotalScore
```

### 🧠 Lý do lỗi
- Nếu dùng hàm tổng (`SUM`), thang điểm sẽ bị lệch hoàn toàn
- **Ví dụ minh họa:**
	- Ngành Kỹ thuật Phần mềm có 5 câu hỏi liên quan, học sinh trả lời đúng hết 5 câu → Tổng là 500%
	- Ngành Đồ họa có 15 câu, đúng hết → Tổng là 1500%
- Ngành nào được cấu hình nhiều câu hỏi hơn sẽ mặc định có điểm cao hơn một cách vô lý

### ✅ Cách sửa
- Bắt buộc phải thay hàm `SUM` bằng hàm trung bình **`AVG(CompatibilityScore)`**
- Hàm AVG sẽ luôn đảm bảo điểm độ phù hợp (MatchScore) nằm chuẩn ở thang 0% - 100%
- Bất chấp chuyên ngành đó có bao nhiêu câu hỏi

---

## 3️⃣ LỖI KỸ THUẬT CSDL: XUNG ĐỘT CÚ PHÁP SQL

### ❌ Lỗi ở đâu
- Kịch bản Backend sử dụng hàm `GETDATE()` đi kèm với lệnh `ON DUPLICATE KEY UPDATE` (hoặc `UPSERT`)

### 🧠 Lý do lỗi
- Môn học yêu cầu sử dụng hệ quản trị **MS SQL Server**
- Hàm `GETDATE()` đúng là của MS SQL Server ✅
- **NHƯNG** cú pháp `ON DUPLICATE KEY UPDATE` lại là "đặc sản" của hệ quản trị MySQL ❌
- Nếu mang đoạn code này chạy trên SQL Server, chương trình sẽ báo lỗi cú pháp (Syntax Error) ngay lập tức

### ✅ Cách sửa
- Để giải quyết bài toán "nếu có đáp án rồi thì Cập nhật, nếu chưa có thì Thêm mới"
- Trong MS SQL Server bạn phải dùng câu lệnh điều kiện:

```sql
IF EXISTS (SELECT 1 FROM Table WHERE Condition)
    UPDATE ...
ELSE
    INSERT ...
```

> [!tip] Gợi ý
> Nhóm có thể dễ dàng viết cái này vào một **Stored Procedure** cho Lab 5

---

## 4️⃣ LỖI SẬP HỆ THỐNG: KHÓA CHÍNH BỊ TRÙNG (VI PHẠM BCNF)

### ❌ Lỗi ở đâu
- Bảng `STUDENT_RESPONSE` (Lịch sử trả lời) đang được thiết kế Khóa chính (Primary Key) là:
```sql
PRIMARY KEY (SessionID, QuestionID)
```

### 🧠 Lý do lỗi
- Thiết kế này sẽ làm sập hệ thống nếu bài khảo sát có câu hỏi dạng **chọn nhiều đáp án (Checkbox)**
- **Ví dụ thực tế:**
	- _Câu 5 hỏi "Sở thích của bạn?", học sinh chọn cả A và B_
	- Khi Backend đẩy hai đáp án A và B xuống Database cho cùng một `QuestionID = 5` trong cùng một `Session`
	- SQL Server sẽ báo lỗi **Primary Key Violation** (Trùng khóa chính)
	- Vì một cặp `(SessionID, QuestionID)` chỉ được xuất hiện 1 lần duy nhất
- Hơn nữa, việc lưu `QuestionID` khi đã có `OptionID` là **vi phạm dạng chuẩn BCNF**

### ✅ Cách sửa
- Đổi khóa chính của bảng `STUDENT_RESPONSE` thành:
```sql
PRIMARY KEY (SessionID, OptionID)
```
- Vì mỗi `OptionID` (ví dụ: Option 23 là đáp án A của câu 5) là duy nhất
- Thiết kế này vừa cho phép học sinh chọn nhiều đáp án cùng lúc, vừa không bị trùng khóa, lại đạt chuẩn BCNF tuyệt đối

---

## 5️⃣ LỖI THIẾT KẾ: ĐIỂM SỐ BỊ GẮN CỨNG (THIẾU LINH HOẠT)

### ❌ Lỗi ở đâu
- Cột `PercentRight` (Điểm số) đang được đặt cứng bên trong bảng `ANSWER_OPTION`

### 🧠 Lý do lỗi
- Trong hướng nghiệp, một câu trả lời không thể mang một số điểm cố định cho tất cả các ngành
- **Ví dụ thực tế:**
	- Đáp án _"Tôi thích làm việc với con số"_ sẽ mang lại 100% điểm phù hợp cho ngành Tài chính
	- Nhưng chỉ mang lại 10% điểm cho ngành Thiết kế Đồ họa
- Việc gắn chết 1 mức điểm vào bảng đáp án khiến hệ thống không thể phân loại ngành học

### ✅ Cách sửa
1. **Xóa** cột điểm khỏi bảng `ANSWER_OPTION`
2. **Tạo** một bảng ma trận trung gian:

```sql
CREATE TABLE PROGRAM_MATCHING_RULE (
    OptionID INT,
    ProgramID INT,
    CompatibilityScore DECIMAL(5,2),  -- Trọng số điểm
    PRIMARY KEY (OptionID, ProgramID),
    FOREIGN KEY (OptionID) REFERENCES ANSWER_OPTION(OptionID),
    FOREIGN KEY (ProgramID) REFERENCES PROGRAM(ProgramID)
);
```

3. Tư vấn viên sẽ tự do cấu hình:
	- Option A nối với Ngành B → được 100 điểm
	- Option A nối với Ngành C → được 10 điểm

---

## 🌟 TỔNG KẾT TỔNG THỂ

> [!summary] NHẬN XÉT CHUNG
> Nhóm bạn đã có tư duy logic rất tốt:
> - ✅ Nghĩ đến việc lưu `OptionID` thay vì Text
> - ✅ Nghĩ đến việc chống rác dữ liệu bằng Audit Trail
>
> **Tuy nhiên**, vì chưa nắm rõ bản chất nghiệp vụ Hướng nghiệp (nghĩ nhầm sang hệ thống Thi Đại Học) nên các bảng và công thức toán học bị kéo đi sai hướng.

---

## 🎯 BỨC TRANH HỆ THỐNG SAU KHI SỬA

![[TÀI LIỆU RÀ SOÁT VÀ CHỈNH SỬA BÁO CÁO LAB 4-20260704215535439.png]]

---

