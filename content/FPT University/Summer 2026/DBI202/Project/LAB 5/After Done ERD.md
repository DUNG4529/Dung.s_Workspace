### PHẦN 1: BƯỚC TIẾP THEO SAU KHI XONG ERD (LÀM LAB 4)

Theo yêu cầu của tài liệu Lab 4, trước khi đụng đến code của Lab 5, nhóm bạn bắt buộc phải hoàn thành các bước chuyển đổi sau:

1. **Logical Design (Chuyển ERD sang Lược đồ quan hệ):**
    
    - Bạn chuyển 9 thực thể (Hình chữ nhật) thành 9 bảng dữ liệu.
    - Xử lý các mối quan hệ M:N có thuộc tính (các Hình thoi như `Answers`, `Program_Weighting`, `Recommends`) thành các bảng kết hợp (Associative Entities/Tables). Xác định rõ Khóa chính (Primary Key) và Khóa ngoại (Foreign Key) cho từng bảng.
2. **Physical Design & Specify Constraints (Cài đặt vật lý và Ràng buộc):**
    
    - Viết script lệnh DDL (`CREATE TABLE`) trên MS SQL Server để tạo bảng.
    - Định nghĩa kiểu dữ liệu chuẩn xác cho từng cột.
    - Cài đặt các ràng buộc dữ liệu (Constraints) như: `NOT NULL`, `UNIQUE` (ví dụ cho Email, Số điện thoại của STUDENT), `PRIMARY KEY`, `FOREIGN KEY`, `DEFAULT` (cho thời gian tạo log), và đặc biệt là `CHECK` (ví dụ: `MatchScore` phải từ 0-100).

---

### PHẦN 2: WORKFLOW THỰC HIỆN LAB 5 (LẬP TRÌNH T-SQL)

Lab 5 yêu cầu khối lượng code SQL rất lớn và đa dạng: Queries, Functions, Procedures, Triggers, Views, Indexes. Để nhóm không bị rối và các Dev không code "giẫm chân lên nhau", các bạn hãy làm theo Workflow 6 bước sau đây:

**Bước 1: Khởi tạo Database và Nhập Dummy Data (Dữ liệu giả)**

- Chạy toàn bộ script `CREATE TABLE` của Lab 4.
- **Việc cấp bách:** Nhóm phải dùng lệnh `INSERT INTO` để tạo sẵn một lượng dữ liệu mẫu hợp lý (khoảng 5-10 dòng mỗi bảng). Nếu không có dữ liệu, các bạn không thể test được các câu Queries hay Procedures ở các bước sau có chạy đúng logic hay không.

**Bước 2: Giải quyết KPI về Truy vấn (Queries - Nhóm Dev 1)** Trong lúc một phần nhóm làm code logic, hãy giao cho 1-2 bạn xử lý toàn bộ yêu cầu về truy vấn:

- **Basic Queries:** 5 câu dùng `SELECT`, `WHERE`, `ORDER BY`, `COUNT/SUM/AVG` cho từng bảng. (VD: Đếm số lượng học sinh tham gia, sắp xếp điểm tương thích).
- **Intermediate Queries:** 10 câu sử dụng `INNER/LEFT JOIN`, `GROUP BY`, `HAVING` và `Subqueries`. (VD: Hiển thị tên học sinh và ngành học được gợi ý).
- **Advanced Queries:** 5 câu dùng Nested subqueries, `EXISTS`, `IN`, `ANY/ALL` và các phép toán tập hợp `UNION`, `INTERSECT`.

**Bước 3: Tạo Views và Indexes (Nhóm Dev 2)** Thực hiện yêu cầu tạo ít nhất 2 Views và 2 Indexes:

- **Views:** Tạo các khung nhìn (View) để đơn giản hóa các câu truy vấn JOIN phức tạp.
    - _Gợi ý:_ `CREATE VIEW v_RecommendationResult AS...` (Gộp tên Học sinh, Tên ngành học, Điểm phù hợp để Counselor dễ xem).
- **Indexes:** Tối ưu hóa tốc độ truy vấn.
    - _Gợi ý:_ Tạo 1 Single Index (VD: `CREATE INDEX idx_StudentPhone ON Student(Phone)`) và 1 Composite Index (VD: `CREATE INDEX idx_StudentResponse ON StudentResponse(SessionID, OptionID)`).

**Bước 4: Tạo Functions (Hàm do người dùng định nghĩa)** Viết ít nhất 4 Functions (Scalar hoặc Table-valued).

- _Gợi ý 1:_ Hàm tính điểm tương thích `fn_CalculateMatchScore(SessionID, ProgramID)`.
- _Gợi ý 2:_ Hàm đếm số lượt tư vấn của một Counselor trong ngày.
- _Gợi ý 3:_ Hàm lấy top 1 ngành học có điểm cao nhất của một Session.
- _Gợi ý 4:_ Hàm định dạng lại tên học sinh (In hoa chữ cái đầu).

**Bước 5: Tạo Stored Procedures (Thủ tục lưu trữ)** Viết ít nhất 4 Procedures xử lý nhiều thao tác. Như tôi đã hướng dẫn trước đó, chúng ta đã có sẵn sườn cho 2 cái:

- _Procedure 1:_ `sp_SaveStudentResponse` (Xử lý Insert/Update thao tác chọn đáp án của học sinh).
- _Procedure 2:_ `sp_GenerateRecommendation` (Chạy thuật toán tính điểm và Insert top 3 ngành vào bảng Recommendation).
- _Procedure 3:_ `sp_StartNewSession` (Khởi tạo phiên Kiosk mới).
- _Procedure 4:_ `sp_LogCounseling` (Ghi nhận thông tin tư vấn của Counselor).

**Bước 6: Tạo Triggers (Bẫy lỗi và Tự động hóa)** Viết ít nhất 4 Triggers để bảo vệ tính toàn vẹn dữ liệu (Business Rules).

- _Trigger 1:_ Chặn nhập điểm cấu hình `CompatibilityScore` ở bảng `PROGRAM_MATCHING_RULE` nếu nằm ngoài khoảng 0-100.
- _Trigger 2:_ Chặn việc `DELETE` một ngành học (`AcademicProgram`) nếu ngành đó đã từng được gợi ý cho học sinh (Bảo vệ dữ liệu lịch sử).
- _Trigger 3:_ Đảm bảo `EndTime` của KioskSession không được nhỏ hơn `StartTime`.
- _Trigger 4:_ Ngăn chặn thao tác tạo Session mới nếu trạng thái của Kiosk đang là 'Maintenance' (Bảo trì) hoặc 'Offline'.

**Đóng gói Báo cáo (Document Results):** Cuối cùng, chụp ảnh màn hình (screenshot) lúc thực thi thành công từng đoạn code SQL kèm theo lời giải thích ngắn gọn để đưa vào file báo cáo Word nộp cho giảng viên.

