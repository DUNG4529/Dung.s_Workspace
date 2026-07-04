

#### PHẦN 1: CÁC LỖ HỔNG VỀ NGHIỆP VỤ (BUSINESS LOGIC)

**1. Sai lệch hoàn toàn định hướng dự án (Fatal Error)**

- **Lỗ hổng:** Tài liệu đang gọi hệ thống là _"Hệ thống Thi đánh giá năng lực & Xét tuyển tự động"_, đồng thời có cột `IsAdmitted` (Đậu/Trượt Đại học).
- **Giải thích cho nhóm:** Đề bài dự án số 5 của chúng ta là "Career Guidance Kiosk System... at FPT University Open Day" (Hệ thống Kiosk Tư vấn Hướng nghiệp). Một chiếc Kiosk cho học sinh cấp 3 đứng bấm trong 10 phút ở sự kiện Open Day chỉ có thể đưa ra **Gợi ý ngành học (Recommendation)** dựa trên sở thích, chứ không có thẩm quyền ra quyết định tuyển sinh (Đậu/Rớt). Nếu giữ nguyên, giảng viên sẽ đánh trượt vì sai phạm vi (scope).
- **Cách sửa:**
    - Đổi tên toàn bộ thành: _"Hệ thống Kiosk Khảo sát và Gợi ý Ngành học"_.
    - Xóa bỏ cột `IsAdmitted`. Chỉ giữ lại cột `MatchScore` (Độ phù hợp, tính theo thang 0-100%).

**2. Gắn cứng Khóa ngoại `ProgramID` vào bảng `QUESTION`**

- **Lỗ hổng:** Nhóm đang để `ProgramID` làm Foreign Key (FK) trong bảng `QUESTION` hoặc thiết lập quan hệ `N:1` giữa `ANSWER_OPTION` và `ACADEMIC_PROGRAM`.
- **Giải thích cho nhóm:** Thiết kế này nghĩa là 1 câu hỏi/1 đáp án chỉ được dùng để xét điểm cho đúng 1 chuyên ngành duy nhất. Trong thực tế, một đáp án (ví dụ: "Thích Toán") có thể cộng điểm cho rất nhiều ngành khác nhau (CNTT, Tài chính, Kỹ thuật). Thiết kế N:1 làm hệ thống bị "cứng", không thể mở rộng.
- **Cách sửa:** Xóa FK `ProgramID` khỏi `QUESTION`. Quan hệ giữa Lựa chọn đáp án và Ngành học phải là **Nhiều-Nhiều (M:N)**. Hệ thống cần một bảng/thực thể kết hợp trung gian (Ví dụ: `PROGRAM_MATCHING_RULE`) để lưu trữ ma trận điểm: 1 Đáp án nối với nhiều Ngành học, mỗi nối kết có một `CompatibilityScore` (Trọng số điểm).

#### PHẦN 2: CÁC LỖ HỔNG VỀ THIẾT KẾ ERD & CHUẨN HÓA (DATABASE THEORY)

**3. Nhầm lẫn trầm trọng giữa ERD và BCNF**

- **Lỗ hổng:** Trong báo cáo ghi _"Sơ đồ ERD được thiết kế theo chuẩn BCNF"_.
- **Giải thích cho nhóm:** Sai kiến thức nền tảng DBI202. Sơ đồ ERD (Entity-Relationship Diagram) là mô hình thiết kế khái niệm (Conceptual Design), chỉ dùng để xác định thực thể và quan hệ. Dạng chuẩn BCNF (Boyce-Codd Normal Form) chỉ được áp dụng để chuẩn hóa Lược đồ quan hệ (Relational Schema / Lược đồ Logic) thông qua quá trình phân rã bảng (Decomposition) dựa trên các Phụ thuộc hàm (Functional Dependencies).
- **Cách sửa:** Sửa văn phong thành: _"Lược đồ quan hệ của hệ thống được chuẩn hóa đạt dạng chuẩn BCNF"_. Khi giảng viên hỏi tại sao đạt BCNF, phải trả lời: _"Vì mọi phụ thuộc hàm không tầm thường đều có vế trái là một siêu khóa (superkey)"_.

**4. Giải thích sai về Dị thường (Anomalies) ở bảng Lịch sử trả lời**

- **Lỗ hổng:** Giải thích _"Chỉ lưu OptionID thay vì Text để thiết kế đạt chuẩn BCNF"_.
- **Giải thích cho nhóm:** Việc thay chuỗi Text bằng ID không tạo ra BCNF. Việc này nhằm mục đích loại bỏ **Dị thường cập nhật (Update Anomaly)** và sai sót khi người dùng nhập liệu. BCNF được tạo ra nhờ việc tách các phụ thuộc hàm vi phạm ra thành các bảng riêng.
- **Cách sửa:** Thuyết trình lại là: _"Việc lưu OptionID thay cho Text giúp triệt tiêu Dị thường cập nhật (Update Anomaly) và đảm bảo tính nhất quán dữ liệu"_.

**5. Sự "dị dạng" của thực thể STUDENT_RESPONSE trên ERD**

- **Lỗ hổng:** Trên ERD, nhóm vẽ thực thể số 7 là `STUDENT_RESPONSE` có các thuộc tính `TotalScore, Rank`, và cho thực thể này đi `Recommends` (Gợi ý) ngành học.
- **Giải thích cho nhóm:** `TotalScore` (Điểm tổng/Độ phù hợp) và `Rank` là kết quả đánh giá của **cả một phiên tương tác (Session)**, chứ không phải của một **câu trả lời đơn lẻ (Response)**. Việc cho 1 câu trả lời đơn lẻ đi "gợi ý ngành học" là sai logic luồng dữ liệu.
- **Cách sửa:**
    - Chuyển các thuộc tính `MatchScore`, `Rank` ra khỏi `STUDENT_RESPONSE`.
    - Mối quan hệ `Recommends` phải nối giữa `KIOSK_SESSION` (Phiên làm việc) và `ACADEMIC_PROGRAM` (Ngành học).

#### PHẦN 3: CÁC LỖ HỔNG VỀ THUẬT TOÁN & KỸ THUẬT SQL

**6. Xung đột hệ quản trị cơ sở dữ liệu (Syntax Error)**

- **Lỗ hổng:** Trong Data Flow, kịch bản dùng hàm `GETDATE()` nhưng lại đi kèm với cú pháp `ON DUPLICATE KEY UPDATE / UPSERT`.
- **Giải thích cho nhóm:** `GETDATE()` là hàm lấy thời gian hệ thống của MS SQL Server. Nhưng `ON DUPLICATE KEY UPDATE` lại là cú pháp đặc sản của hệ quản trị MySQL. Nếu mang đoạn code này chạy trên SQL Server (hệ quản trị môn học yêu cầu), hệ thống sẽ báo lỗi cú pháp (Syntax Error) ngay lập tức.
- **Cách sửa:** Đổi lại thuật toán cập nhật đáp án theo chuẩn SQL Server: Dùng lệnh `MERGE` hoặc cấu trúc `IF EXISTS ... UPDATE ... ELSE INSERT ...`. _(Nhắn dev sửa lại đoạn lệnh lưu vết thành: Nếu tồn tại SessionID và QuestionID đó rồi thì UPDATE OptionID mới, ngược lại thì INSERT)._

**7. Lỗi sai Toán học khi tính điểm gợi ý bằng hàm SUM**

- **Lỗ hổng:** Kịch bản 2 tính điểm bằng công thức: `SUM(PercentRight)/100 AS TotalScore`.
- **Giải thích cho nhóm:** Nếu dùng hàm `SUM` (Tổng), thuật toán sẽ bị sập logic. Ví dụ: Ngành CNTT cấu hình 5 câu hỏi liên quan, học sinh trả lời đúng hết -> `SUM` = 500. Ngành Thiết kế có 15 câu, học sinh đúng hết -> `SUM` = 1500. Thang điểm bị lệch hoàn toàn, ngành nào có nhiều câu hỏi gắn vào hơn sẽ luôn có điểm cao hơn một cách vô lý.
- **Cách sửa:** Phải sử dụng hàm trung bình **`AVG(CompatibilityScore)`** (có thể nhóm theo ProgramID bằng `GROUP BY`). Hàm `AVG` đảm bảo điểm độ phù hợp luôn nằm chuẩn ở thang 0% - 100%, bất chấp số lượng câu hỏi.

**8. Lỗi sập hệ thống khi chọn nhiều đáp án (Checkbox)**

- **Lỗ hổng:** Nếu `STUDENT_RESPONSE` thiết kế Khóa chính (PK) là `(SessionID, QuestionID)`.
- **Giải thích cho nhóm:** Nếu form khảo sát có câu hỏi dạng Checkbox (Ví dụ: Câu 5: Bạn có kỹ năng nào? Chọn A và B). Khi dev đẩy cả A và B xuống database cùng lúc cho `QuestionID = 5`, hệ thống sẽ văng lỗi **Primary Key Violation** (Trùng khóa chính) vì một cặp `(SessionID, QuestionID)` chỉ được tồn tại 1 lần.
- **Cách sửa:**
    - Đổi khóa chính của bảng `STUDENT_RESPONSE` thành `(SessionID, OptionID)`.
    - Vì 1 `OptionID` là duy nhất và đã thuộc về 1 `QuestionID` nằm ở bảng `ANSWER_OPTION`, nên việc lưu `(SessionID, OptionID)` vừa hỗ trợ chọn nhiều đáp án, vừa thỏa mãn chuẩn BCNF (không bị dư thừa `QuestionID`).

---
