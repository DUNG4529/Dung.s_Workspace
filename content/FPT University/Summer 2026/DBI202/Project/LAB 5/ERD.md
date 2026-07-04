
# Những Lỗ Hổng

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


# Phương hướng Giải Quyết

### 1. Nhóm giải pháp về Nghiệp vụ & Phạm vi dự án

**Khắc phục Lỗ hổng 1: Sai lệch phạm vi (Từ "Xét tuyển" về đúng "Tư vấn hướng nghiệp")**

- **Vấn đề:** Theo yêu cầu dự án số 5, đây là "Hệ thống Kiosk Tư vấn Hướng nghiệp" (Career Guidance Kiosk System) với mục tiêu đưa ra "recommendation scores" (điểm số gợi ý). Việc dùng từ "Xét tuyển tự động" hay cờ `IsAdmitted` là sai lệch hoàn toàn thực tế.
- **Hướng giải quyết:**
    - Tìm và thay thế toàn bộ cụm từ _"Hệ thống Thi đánh giá năng lực & Xét tuyển tự động"_ thành _"Hệ thống Kiosk Khảo sát và Gợi ý Ngành học"_.
    - Bỏ cột `IsAdmitted` (Đậu/Trượt) ra khỏi dữ liệu. Đổi tên cột `TotalScore` thành `MatchScore` (Độ phù hợp tính theo %). Bảng lưu kết quả phải tên là `Recommendation` thay vì `RECOMMENDATION_RESULT`.

**Khắc phục Lỗ hổng 2: Khóa ngoại cứng `ProgramID` trong bảng `QUESTION`**

- **Vấn đề:** Để `ProgramID` vào bảng `QUESTION` khiến một câu hỏi chỉ phục vụ được cho 1 chuyên ngành duy nhất, triệt tiêu tính linh hoạt của hệ thống hướng nghiệp.
- **Hướng giải quyết:** Hãy tuân thủ bản thiết kế đã chốt ở Lab 4. Trong bảng `Question` chỉ chứa các cột `(QuestionID, QuestionnaireID, Content, QuestionType)`. Việc thuật toán chấm điểm sẽ khớp câu hỏi với ngành học nào nên được xử lý thông qua thuộc tính `Category` của câu hỏi thay vì gán chết `ProgramID`.

---

### 2. Nhóm giải pháp về Lý thuyết Cơ sở dữ liệu (Database Theory)

**Khắc phục Lỗ hổng 3 & 4: Giải thích sai về BCNF và Dị thường**

- **Vấn đề:** Bạn nói "ERD thiết kế theo chuẩn BCNF" và "Dùng OptionID giúp thiết kế chuẩn BCNF". Giảng viên sẽ trừ điểm nặng vì ERD là mô hình khái niệm không áp dụng chuẩn hóa (normalization); BCNF chỉ áp dụng cho Lược đồ logic (Relational Schema) dựa trên các phụ thuộc hàm (Functional Dependencies).
- **Hướng giải quyết:**
    - Sửa câu thuyết trình thành: _"Lược đồ quan hệ của hệ thống đã được chuẩn hóa đạt dạng chuẩn BCNF (Boyce-Codd Normal Form) thông qua quá trình phân rã (decomposition)"_. Theo định nghĩa, lược đồ đạt BCNF vì mọi phụ thuộc hàm không tầm thường đều có vế trái là một siêu khóa (superkey).
    - Đối với bảng `ANSWER_OPTION`: Khi thuyết trình, hãy nói _"Việc lưu khóa ngoại OptionID thay vì lưu chuỗi text (AnswerValue) giúp triệt tiêu Dị thường cập nhật (Update Anomaly)_ _và tránh sai sót dữ liệu do nhập liệu thủ công"_.

**Khắc phục Lỗ hổng 5: Nguy cơ bị vặn hỏi về Phụ thuộc hàm ngầm ở `STUDENT_RESPONSE`**

- **Vấn đề:** Bảng `StudentResponse` lưu `(SessionID, QuestionID, OptionID)`. Giảng viên sẽ bẫy bạn: "Nếu OptionID đã tự động xác định được QuestionID, thì việc lưu cả QuestionID có vi phạm BCNF không?"
- **Hướng giải quyết:** Hãy dặn kỹ các bạn dev và người thuyết trình trả lời như sau: _"Thưa thầy/cô, OptionID trong hệ thống của chúng em KHÔNG phải là một ID tự tăng toàn cục (Global Identity). Nó chỉ là các giá trị cục bộ (Local ID) như 1, 2, 3, 4 (tương ứng A, B, C, D) cho từng câu hỏi. Do đó OptionID KHÔNG thể tự xác định được QuestionID. Khóa chính kết hợp bắt buộc phải là (SessionID, QuestionID) để ràng buộc mỗi phiên, mỗi câu hỏi chỉ được chọn 1 đáp án"_. Câu trả lời này sẽ "chặn đứng" hoàn toàn sự bắt bẻ của giảng viên.

---

### 3. Nhóm giải pháp về Kỹ thuật Lập trình và SQL

**Khắc phục Lỗ hổng 6: Lỗi cú pháp SQL khác hệ quản trị**

- **Vấn đề:** Không thể dùng lệnh `ON DUPLICATE KEY UPDATE` chung với hàm `GETDATE()`. Hàm `GETDATE()` thuộc về SQL Server, còn `ON DUPLICATE KEY UPDATE` là của MySQL.
- **Hướng giải quyết:** Sửa lại kịch bản code Backend bằng cú pháp chuẩn của MS SQL Server (như tài liệu hướng dẫn học phần MD14_Quan-tri-SQL-Server):
    
    ```
    IF EXISTS (SELECT 1 FROM StudentResponse WHERE SessionID = @currentSession AND QuestionID = @qID)
        UPDATE StudentResponse SET OptionID = @optID WHERE SessionID = @currentSession AND QuestionID = @qID;
    ELSE
        INSERT INTO StudentResponse (SessionID, QuestionID, OptionID) VALUES (@currentSession, @qID, @optID);
    ```
    

**Khắc phục Lỗ hổng 7: Lỗi Toán học khi dùng `SUM`**

- **Vấn đề:** Thuật toán dùng `SUM(PercentRight) / 100` để tính điểm là sai logic do các chuyên ngành khác nhau sẽ có tổng số câu hỏi khác nhau.
- **Hướng giải quyết:** SQL hỗ trợ sẵn rất nhiều hàm gộp (Aggregation Operators) như SUM, AVG, COUNT, MIN, MAX. Để đo độ phù hợp tính theo phần trăm (MatchScore) đồng đều cho mọi chuyên ngành, lập trình viên bắt buộc phải sửa từ `SUM` sang hàm tính trung bình `AVG(PercentRight)`.
    - _Câu lệnh sửa lại:_ 
	    - `SELECT q.ProgramID, AVG(ao.PercentRight) AS MatchScore ... GROUP BY q.ProgramID`.

