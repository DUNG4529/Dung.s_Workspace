Dưới đây là tổng hợp chi tiết toàn bộ các lỗ hổng (loopholes) trong nội dung đặc tả dự án mà nhóm bạn đã soạn, được phân loại theo 3 nhóm chính: Nghiệp vụ, Kiến thức Thiết kế CSDL, và Kỹ thuật Lập trình.

### 1. Nhóm Lỗ hổng về Nghiệp vụ & Phạm vi dự án

- **Lỗ hổng 1: Đi chệch hướng hoàn toàn phạm vi dự án cốt lõi.**
    - **Vấn đề:** Nhóm bạn tự phong hệ thống là "Hệ thống Thi đánh giá năng lực & Xét tuyển tự động" và sử dụng biến/cột `IsAdmitted` (Đậu/Trượt Đại học).
    - **Thực tế:** Theo tài liệu hướng dẫn đồ án, đề tài số 5 của nhóm bạn là "Career Guidance Kiosk System for High School Students at FPT University Open Day" (Hệ thống Kiosk Tư vấn Hướng nghiệp). Hệ thống Kiosk tại Open Day chỉ phục vụ mục đích phân tích thông tin đầu vào của học sinh và gợi ý ngành học phù hợp (Recommendation) thông qua điểm số tương thích (`MatchScore`), không thể cấp quyền Đậu/Trượt đại học.
- **Lỗ hổng 2: Thiết kế bảng `QUESTION` thiếu linh hoạt.**
    - **Vấn đề:** Bạn gán Khóa ngoại `ProgramID` cứng vào bảng `QUESTION`.
    - **Thực tế:** Việc này giới hạn một câu hỏi chỉ có thể dùng để đánh giá điểm cho đúng 1 chuyên ngành duy nhất. Trong thực tế hướng nghiệp, một câu hỏi (ví dụ: "Bạn có thích tính toán không?") có thể giúp định hướng và cộng điểm cho rất nhiều ngành khác nhau. Thiết kế chuẩn ở Lab 3 và Lab 4 của nhóm hoàn toàn không có `ProgramID` trong bảng `Question`.

### 2. Nhóm Lỗ hổng về Kiến thức Thiết kế Cơ sở dữ liệu (BCNF)

- **Lỗ hổng 3: Sai kiến thức lý thuyết cơ bản về ERD và BCNF.**
    - **Vấn đề:** Báo cáo ghi _"Sơ đồ ERD được thiết kế theo chuẩn BCNF..."_
    - **Thực tế:** Sơ đồ ERD (Entity-Relationship Diagram) thuộc về giai đoạn thiết kế mô hình khái niệm. Trong khi đó, các Dạng chuẩn (Normal Forms) như BCNF lại chỉ được áp dụng để đánh giá và chuẩn hóa cho lược đồ quan hệ (Relational Schema / Logical Model). Một quan hệ đạt BCNF khi và chỉ khi mọi phụ thuộc hàm không tầm thường đều có vế trái là một siêu khóa (superkey).
- **Lỗ hổng 4: Giải thích sai nguyên nhân đạt chuẩn BCNF.**
    - **Vấn đề:** Báo cáo ghi _"Việc chỉ lưu OptionID thay vì Text giúp hệ thống thiết kế chuẩn BCNF"_.
    - **Thực tế:** Việc phân rã bảng (decomposition) dựa trên các phụ thuộc hàm vi phạm mới tạo ra dạng chuẩn BCNF. Việc bạn đổi Text thành ID thực chất là để chống dư thừa dữ liệu và triệt tiêu Dị thường cập nhật (Update Anomaly) do lỗi đánh máy nhập liệu.
- **Lỗ hổng 5: Nguy cơ bị bắt bẻ Phụ thuộc hàm ngầm ở bảng `STUDENT_RESPONSE`.**
    - **Vấn đề:** Bảng này lưu đồng thời `SessionID`, `QuestionID`, và `OptionID`. Giảng viên rất dễ bắt bẻ lỗ hổng logic: Nếu 1 `OptionID` đã thuộc về 1 `QuestionID` cố định (`OptionID -> QuestionID`), việc lưu cả `QuestionID` liệu có gây dư thừa?
    - **Khắc phục:** Bạn bắt buộc phải giải thích được rằng `(SessionID, QuestionID)` là Khóa chính kết hợp (Composite PK). Vai trò của nó là để Ràng buộc 1 phiên chỉ được trả lời 1 lần cho 1 câu hỏi. `OptionID` đơn thuần là giá trị lựa chọn gắn vào khóa đó.

### 3. Nhóm Lỗ hổng về Kỹ thuật SQL & Thuật toán

- **Lỗ hổng 6: Lỗi sai hệ quản trị cơ sở dữ liệu (Syntax Error).**
    - **Vấn đề:** Bạn dùng cấu trúc `GETDATE()` (của hệ quản trị MS SQL Server) đi kèm với lệnh `ON DUPLICATE KEY UPDATE / UPSERT` (của hệ quản trị MySQL / PostgreSQL).
    - **Thực tế:** Trong MS SQL Server, cú pháp `ON DUPLICATE KEY UPDATE` là không hợp lệ và sẽ báo lỗi cú pháp. Để xử lý logic "đã có thì Update, chưa có thì Insert", lập trình viên SQL Server bắt buộc phải dùng lệnh `MERGE` hoặc kết hợp `IF EXISTS ... UPDATE ... ELSE INSERT`.
- **Lỗ hổng 7: Lỗ hổng toán học trong thuật toán sinh điểm gợi ý.**
    - **Vấn đề:** Bạn dùng công thức `SUM(ao.PercentRight)/100 AS TotalScore` để tính điểm.
    - **Thực tế:** Việc dùng hàm `SUM` (Tổng) sẽ dẫn đến việc thang điểm bị lệch cực kỳ nghiêm trọng. Ngành nào có nhiều câu hỏi hơn thì sẽ vô lý nhận được điểm cao hơn (Ví dụ: Ngành A có 5 câu = max 500%; Ngành B có 15 câu = max 1500%). Để đo Độ tương thích (% Match Score), bắt buộc phải dùng hàm Trung bình `AVG(ao.PercentRight)`.
- **Lỗ hổng 8: Bất nhất Tên bảng (Naming Convention).**
    - **Vấn đề:** Trong đặc tả của Lab 3 và Lab 4, các bảng được chốt tên là `KioskSession`, `ConsultationLog` (viết liền kiểu CamelCase). Tuy nhiên, trong phần thuyết trình bạn lại đổi thành `KIOSK_SESSION`, `CONSULTATION_LOG` (viết hoa toàn bộ có gạch dưới). Điều này tạo ra sự thiếu chuyên nghiệp và bất đồng bộ khi kiểm tra chéo các tài liệu báo cáo.