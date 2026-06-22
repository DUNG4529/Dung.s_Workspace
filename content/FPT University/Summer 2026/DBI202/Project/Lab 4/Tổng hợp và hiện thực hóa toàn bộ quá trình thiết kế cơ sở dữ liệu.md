
> [!info] **Chào bạn**  
> Lab 4 của môn DBI202 là bước tổng hợp và hiện thực hóa toàn bộ quá trình thiết kế cơ sở dữ liệu. Mục tiêu của Lab 4 là dịch các yêu cầu thực tế thành **mô hình khái niệm (ERD)**, tinh chỉnh thành **mô hình logic** và cuối cùng là triển khai thành **lược đồ vật lý (Physical schema)** với các ràng buộc chặt chẽ.

Dưới đây là hướng dẫn chi tiết quy trình làm việc của Lab 4, được xây dựng dựa trên sự kế thừa trực tiếp từ các kết quả mà nhóm bạn đã làm trong `Lab 1`, `Lab 2` và `Lab 3` đối với dự án **"Hệ thống Kiosk Tư vấn Hướng nghiệp"**.

---

## 🔄 Quy trình 4 bước của Lab 4  
*(Dựa trên nền tảng Lab 1, 2, 3)*

---

### 🧱 Bước 1: Xây dựng Mô hình Khái niệm (Conceptual Model - ERD)

> [!example] **Yêu cầu của Lab 4**  
> Vẽ **Sơ đồ Thực thể - Mối quan hệ (ERD)**, xác định rõ các **thực thể**, **thuộc tính**, các **mối quan hệ** và **bản số** (cardinalities như `1:1`, `1:N`, `M:N`).

> [!success] **Kế thừa từ Lab 2**  
> Ở Lab 2, bạn đã xác định được các thực thể (như `Visitor`, `Kiosk`, `Questionnaire`, `Counselor`, v.v.), các thuộc tính của chúng và các khóa (`Candidate Keys`, `Primary Keys`).  
> Bạn dùng chính danh sách này để vẽ ERD.  
>  
> ✅ **Lưu ý:** Hãy chắc chắn thể hiện rõ mối quan hệ giữa chúng  
> *(Ví dụ: Một `Visitor` có thể có nhiều `KioskSession` → quan hệ `1:N`)*.

---

### 🧩 Bước 2: Phát triển Mô hình Logic (Logical Model)

> [!example] **Yêu cầu của Lab 4**  
> - Chuyển đổi ERD thành **lược đồ quan hệ (Logical Diagram)**  
> - Định nghĩa rõ **Khóa chính (PK)**, **Khóa ngoại (FK)**  
> - Giải quyết các quan hệ **Nhiều-Nhiều (M:N)** thông qua phép phân rã

> [!success] **Kế thừa từ Lab 3**  
> Đây là bước bạn *"nhàn"* nhất nếu đã làm tốt Lab 3.  
>  
> - Trong Lab 3, bạn đã thực hiện **chuẩn hóa (Normalization)** lên dạng chuẩn `3NF` và `BCNF` để loại bỏ các dị thường dữ liệu (Anomalies).  
> - Các bảng trung gian giải quyết quan hệ `M:N` đã được bạn tạo ra ở Lab 3 (như `StudentResponse`, `Recommendation`, `ConsultationLog`).

> [!info] **Công việc hiện tại**  
> Bạn chỉ cần:
> 1. Lấy danh sách **10 bảng** đã chuẩn hóa cuối cùng của Lab 3  
> 2. Vẽ chúng ra thành sơ đồ logic  
> 3. Chỉ rõ mũi tên nối từ **Khóa ngoại (FK)** trỏ về **Khóa chính (PK)** của bảng tham chiếu  
>  
> *Ví dụ:* `visitorID` trong `KioskSession` → trỏ về `visitorID` trong `Visitor`

---

### ⚙️ Bước 3: Thiết kế Mô hình Vật lý (Physical Model)

> [!example] **Yêu cầu của Lab 4**  
> Ánh xạ mô hình logic thành **lược đồ vật lý**, chỉ định rõ **kiểu dữ liệu (data types)** cho từng thuộc tính.

> [!success] **Kế thừa từ Lab 1 & Logic**  
> Dựa trên mô hình dữ liệu quan hệ (Relational Model) đã tìm hiểu ở Lab 1, bạn sẽ ánh xạ nó lên Hệ quản trị CSDL cụ thể (ở đây là **MS SQL Server**).

> [!info] **Công việc hiện tại**  
> Lập một **"Từ điển dữ liệu" (Data Dictionary)** cho 10 bảng.  
>  
> **Ví dụ kiểu dữ liệu:**
> - Các cột ID (`visitorID`, `kioskID`) → `INT` (có thể kèm `IDENTITY(1,1)` để tự tăng)  
> - Các cột tên (`fullName`, `majorName`) → `NVARCHAR(100)`  
> - Các cột thời gian (`StartTime`, `EndTime`) → `DATETIME`

---

### 🔒 Bước 4: Đặc tả các Ràng buộc (Specify Constraints)

> [!example] **Yêu cầu của Lab 4**  
> Mô tả chi tiết các ràng buộc ở **mức cột** và **mức bảng** để bảo vệ tính toàn vẹn dữ liệu, bao gồm:  
> - `NOT NULL`  
> - `UNIQUE`  
> - `PRIMARY KEY`  
> - `FOREIGN KEY`  
> - `CHECK`  
> - `DEFAULT`

---

#### 🔹 Ứng dụng vào Dự án Kiosk

Dựa vào các quy tắc nghiệp vụ (Business Rules) của hệ thống, bạn cần áp dụng các ràng buộc sau vào **Mô hình Vật lý**:

| Loại ràng buộc | Mô tả & Ví dụ |
|----------------|---------------|
| **NOT NULL** | Áp dụng cho các trường bắt buộc như `FullName` của Visitor, `Content` của Question |
| **UNIQUE** | Áp dụng cho các thông tin không được trùng lặp, ví dụ `Email` và `Phone` của `Visitor`<br> `CONSTRAINT UQ_VisitorEmail UNIQUE(Email)` |
| **CHECK constraints** | ⚠️ Rất quan trọng để chặn dữ liệu rác:<br><br>• Điểm gợi ý ngành học phải từ 0 đến 100:<br> `CHECK (MatchScore >= 0 AND MatchScore <= 100)`<br><br>• Thời gian kết thúc phiên phải sau thời gian bắt đầu:<br> `CHECK (EndTime >= StartTime)`<br><br>• Trạng thái của Kiosk:<br> `CHECK (Status IN ('Active', 'Maintenance', 'Offline'))` |
| **DEFAULT values** | Tự động điền dữ liệu:<br><br>• Thời gian tạo câu hỏi hoặc tạo báo cáo tư vấn gán mặc định là giờ hiện tại hệ thống:<br> `DEFAULT GETDATE()` |

---

## 📋 Tóm tắt Cấu trúc Báo cáo Lab 4 cần nộp

Để đạt điểm tối đa theo đúng yêu cầu, file Word/PDF của nhóm bạn cần tuân thủ cấu trúc sau:

| Phần | Nội dung |
|------|----------|
| 1. **Trang bìa** | Tên lab, môn học, thành viên, ngày tháng |
| 2. **Mục tiêu (Objective)** | Nêu rõ mục đích của Lab |
| 3. **Sơ đồ ERD (Conceptual Model)** | Dùng dữ liệu Lab 2 để vẽ |
| 4. **Sơ đồ Lược đồ Logic (Logical Diagram)** | Lấy kết quả 10 bảng đã chuẩn hóa 3NF/BCNF từ Lab 3 |
| 5. **Lược đồ Vật lý (Physical Diagram)** | Bảng chi tiết các cột, kiểu dữ liệu SQL Server |
| 6. **Danh sách và mô tả các ràng buộc (Constraints)** | PK, FK, CHECK, DEFAULT, UNIQUE |
| 7. **Kết luận và Suy ngẫm (Conclusion and Reflection)** | Tóm tắt quá trình thiết kế và nhấn mạnh cách các ràng buộc giúp hệ thống Kiosk đáng tin cậy hơn |

---

> [!tip] **💡 Mẹo nhỏ**  
> Việc kết hợp những rào chắn bảo mật như ràng buộc `CHECK` ở tầng Database (bước 4) sẽ là minh chứng tuyệt vời cho sự hiểu biết sâu sắc của nhóm về thiết kế CSDL, giúp hệ thống Kiosk chịu tải tốt và không bị lỗi dữ liệu trong những ngày diễn ra Open Day đông đúc.

---

> [!success] **🎯 Chúc nhóm bạn hoàn thành Lab 4 thật tốt!**