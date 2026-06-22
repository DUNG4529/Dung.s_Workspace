Chi tiết vào **Bước 2: Phát triển Mô hình Logic (Logical Model)** của Lab 4, đây là giai đoạn bạn chuyển đổi sơ đồ khái niệm (ERD) từ Bước 1 thành một Lược đồ quan hệ (Relational Schema) thực sự, định nghĩa rõ các bảng, Khóa chính (PK) và Khóa ngoại (FK).

Tin vui là nhờ việc bạn đã thực hiện chuẩn hóa (Normalization) đạt chuẩn 3NF và BCNF ở Lab 3, cấu trúc của Lược đồ Logic gần như đã hoàn thiện. Ở bước này, bạn sẽ áp dụng các quy tắc ánh xạ (Mapping Rules) từ lý thuyết để ráp chúng thành một Lược đồ Logic trực quan.

Dưới đây là chi tiết các công việc bạn cần làm, áp dụng sát sườn vào dự án **Hệ thống Kiosk Tư vấn Hướng nghiệp**:

### Quy tắc 1: Ánh xạ các Thực thể mạnh (Strong Entities)

- **Lý thuyết:** Một thực thể trở thành một quan hệ (bảng), các thuộc tính của thực thể thành cột, và khóa của thực thể trở thành Khóa chính (Primary Key - PK) của bảng.
- **Áp dụng:** Nhóm bạn vẽ ra các bảng độc lập không chứa khóa ngoại (FK) bao gồm:
    - `Visitor` với PK là `VisitorID`.
    - `Kiosk` với PK là `KioskID`.
    - `Counselor` với PK là `CounselorID`.
    - `AcademicProgram` với PK là `ProgramID`.
    - `Questionnaire` với PK là `QuestionnaireID`.

### Quy tắc 2: Ánh xạ các mối quan hệ Một-Nhiều (1:N)

- **Lý thuyết:** Đối với quan hệ 1:N, bạn lấy Khóa chính của bảng ở phía "Một" (1) đưa vào bảng ở phía "Nhiều" (N) để làm Khóa ngoại (Foreign Key - FK).
- **Áp dụng:**
    - Bảng `Question` (bên Nhiều) sẽ nhận `QuestionnaireID` làm FK trỏ về bảng `Questionnaire`.
    - Bảng `KioskSession` là trung tâm của hệ thống (bên Nhiều), nó sẽ nhận một loạt Khóa ngoại bao gồm: `VisitorID` (trỏ về Visitor), `KioskID` (trỏ về Kiosk), và `QuestionnaireID` (trỏ về Questionnaire).

### Quy tắc 3: Giải quyết triệt để quan hệ Nhiều-Nhiều (M:N)

- **Lý thuyết:** Chuyển đổi quan hệ M:N bằng cách tạo ra một bảng mới (Thực thể kết hợp). Khóa chính của bảng này thường là sự kết hợp của hai Khóa chính từ hai bảng tham gia, đồng thời bảng này cũng chứa các thuộc tính riêng của mối quan hệ đó.
- **Áp dụng:** Bước này nhóm bạn chỉ cần lấy đúng 3 bảng mà các bạn đã phân rã (decompose) thành công ở Lab 3:
    1. **Bảng `StudentResponse`:** Giải quyết quan hệ M:N giữa `KioskSession` và `Question`. Nó chứa 2 FK là `SessionID` và `QuestionID`, đồng thời mang thuộc tính riêng là `AnswerValue`.
    2. **Bảng `Recommendation`:** Giải quyết quan hệ M:N giữa `KioskSession` và `AcademicProgram`. Nó chứa FK `SessionID` và `ProgramID`, mang thuộc tính riêng cực kỳ quan trọng là `MatchScore` (Điểm phù hợp).
    3. **Bảng `ConsultationLog`:** Giải quyết quan hệ M:N giữa `KioskSession` và `Counselor`. Nó chứa FK `SessionID` và `CounselorID`, mang thuộc tính riêng là `Notes` và `ConsultationDate`.

### Hướng dẫn cách trình bày Mô hình Logic vào báo cáo Lab 4

Khác với Bước 1 (ERD) dùng các hình thoi, hình elip, ở Bước 2 Lược đồ Logic (Logical Diagram), bạn cần sử dụng các ký hiệu biểu diễn bảng cơ sở dữ liệu chuyên nghiệp (thường gọi là **Crow's Foot Notation** hoặc sơ đồ **Relational Schema**).

Bạn cần dùng phần mềm vẽ (như draw.io, ERDPlus, Lucidchart hoặc Visual Paradigm) và tuân thủ các điểm sau:

1. **Cấu trúc bảng:** Vẽ 10 hình chữ nhật đại diện cho 10 bảng. Mỗi hình chữ nhật chia làm 2 phần: Tên bảng ở trên, danh sách các cột ở dưới.
2. **Đánh dấu Khóa:** Ký hiệu rõ chữ **PK** (Primary Key) cạnh các khóa chính và chữ **FK** (Foreign Key) cạnh các khóa ngoại.
3. **Vẽ đường liên kết (Mũi tên Khóa ngoại):** Đây là phần quan trọng nhất của Mô hình Logic. Kéo các đường thẳng (có thể kèm mũi tên) đi từ Khóa ngoại (FK) của bảng này trỏ chính xác vào Khóa chính (PK) của bảng mà nó tham chiếu. _Ví dụ:_ Kéo một mũi tên từ cột `ProgramID` (FK) trong bảng `Recommendation` trỏ về cột `ProgramID` (PK) trong bảng `AcademicProgram`.

**Mẹo để ăn điểm:** Trong báo cáo, dưới sơ đồ Logic, hãy viết một đoạn giải thích ngắn rằng: _"Lược đồ Logic này được xây dựng dựa trên nguyên tắc kế thừa 100% các quan hệ đã đạt chuẩn BCNF từ Lab 3, đảm bảo thiết kế loại bỏ hoàn toàn các dị thường dữ liệu (anomalies) về cập nhật, thêm, xóa."_ Giảng viên chấm bài sẽ đánh giá rất cao sự liên kết chặt chẽ giữa Lab 3 và Lab 4 của nhóm bạn.