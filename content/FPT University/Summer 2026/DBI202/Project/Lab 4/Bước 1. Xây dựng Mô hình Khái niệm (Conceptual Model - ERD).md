Để hoàn thành Bước 1 của Lab 4 (Xây dựng Mô hình Khái niệm - Conceptual Model) với tốc độ nhanh nhất mà vẫn thể hiện được sự áp dụng sắc bén lý thuyết về **Mô hình Cơ sở dữ liệu mức cao (High-Level Database Model)** từ Chương 4, bạn cần kết hợp các nguyên tắc thiết kế lý thuyết vào bộ dữ liệu thực tế đã có ở Lab 2.

Dưới đây là những lưu ý và các bước bắt đầu chi tiết dành cho bạn:

### 1. Những lưu ý khi ứng dụng lý thuyết High-Level Database Model vào thành quả Lab 2

Lý thuyết Mô hình CSDL mức cao (đặc biệt là Mô hình Entity-Relationship - E/R) tập trung vào việc mô tả cấu trúc dữ liệu ở mức khái niệm (Conceptual Design) trước khi chuyển đổi sang các bảng vật lý. Khi dùng dữ liệu Lab 2, bạn cần lưu ý các nguyên tắc thiết kế (Design Principles) cốt lõi sau:

- **Tính trung thực (Faithfulness) & Lựa chọn đúng mối quan hệ:** Bản thiết kế E/R phải phản ánh đúng nghiệp vụ thực tế của hệ thống Kiosk Tư vấn. Ở Lab 2, bạn đã có 10 thực thể. Khi vẽ mối quan hệ (Relationship), hãy đảm bảo nó tuân thủ đúng quy tắc nghiệp vụ. _Ví dụ:_ Một `Visitor` có thể tương tác với `KioskSession` nhiều lần, đây bắt buộc phải là quan hệ Một-Nhiều (1:N), không thể là 1:1.
- **Tránh dư thừa (Avoiding Redundancy) & Tính đơn giản (Simplicity):** Hãy cẩn thận không nói một điều hai lần (saying everything once only). _Ví dụ:_ Không cần tạo một mối quan hệ trực tiếp giữa `Visitor` và `Kiosk` nếu như hệ thống đã có thể truy xuất thông tin này thông qua sự kết nối bắc cầu của `KioskSession`.
- **Các thuộc tính trên Mối quan hệ (Attributes on Relationships):** Lý thuyết E/R cho phép mối quan hệ sở hữu thuộc tính riêng. Đối với dự án của bạn, `MatchScore` (Điểm phù hợp) không thuộc về sinh viên cũng không thuộc về ngành học, mà nó là thuộc tính của mối quan hệ giữa sinh viên (thông qua KioskSession) và ngành học (AcademicProgram). Đây là tiền đề để sinh ra thực thể kết hợp `Recommendation`.
- **Xác định Thực thể yếu (Weak Entities) hoặc Cấu trúc phân cấp (Subclasses/ISA):** Lý thuyết yêu cầu bạn rà soát xem có thực thể nào phụ thuộc định danh vào thực thể khác không. Mặc dù ở Lab 2, tất cả 10 thực thể của nhóm bạn đều đã được gán một Primary Key độc lập (ví dụ `questionID`, `sessionID`), bạn vẫn nên giải thích trong báo cáo lý do nhóm sử dụng Surrogate Key (Khóa tự tăng) để biến chúng thành thực thể mạnh (Strong Entity) nhằm dễ dàng quản lý.

### 2. Các bước tiến hành để đảm bảo tiến độ và áp dụng đúng lý thuyết

Để không mất thời gian loay hoay, hãy thực hiện theo đúng 4 bước bám sát quy trình thiết kế E/R Diagram (ERD):

**Việc 1: Chuẩn hóa ký hiệu (Notation) cho 10 Thực thể và Thuộc tính** Theo lý thuyết UML và E/R Model, hãy sử dụng công cụ vẽ (draw.io, Visio) và áp dụng đúng các ký hiệu tiêu chuẩn:

- **Hình chữ nhật (Rectangle):** Vẽ 10 thực thể từ Lab 2 gồm `Visitor`, `Kiosk`, `Counselor`, `AcademicProgram`, `Questionnaire`, `Question`, `KioskSession`, `StudentResponse`, `Recommendation`, `ConsultationLog`.
- **Hình elip (Oval):** Thêm các thuộc tính cho từng thực thể.
- **Gạch dưới (Underline):** Gạch dưới tất cả các thuộc tính Khóa chính (Primary Key) mà bạn đã chốt ở Lab 2 (như `visitorID`, `kioskID`, v.v.) để tuân thủ quy tắc Key Attribute.

**Việc 2: Định hình các Mối quan hệ (Relationships) bằng Hình thoi** Kết nối các thực thể bằng **Hình thoi (Diamond)** để thể hiện các hành động/sự kiện. Áp dụng lý thuyết về Ràng buộc Bản số (Degree/Multiplicity Constraints):

- Kéo các đường nối có **Mũi tên (Arrow)** hướng về phía "Một" (1) và đường không có mũi tên hướng về phía "Nhiều" (N) (hoặc ghi rõ 1, N, M trên nhánh nối).
- _Áp dụng vào Kiosk:_ Kéo quan hệ 1:N giữa `Visitor` (1) và `KioskSession` (N); `Questionnaire` (1) và `Question` (N); `Questionnaire` (1) và `KioskSession` (N).

**Việc 3: Thể hiện các Thực thể kết hợp (Associative Entities)** Ở Lab 2 và Lab 3, nhóm đã phân rã thành công các quan hệ Nhiều-Nhiều (M:N) thành 3 bảng trung gian: `StudentResponse`, `Recommendation`, và `ConsultationLog`.

- Trong High-Level Model, bạn có thể vẽ chúng dưới dạng một mối quan hệ (Hình thoi) nối giữa các thực thể chính, và gắn trực tiếp các thuộc tính (Attributes on Relationships) như `MatchScore`, `AnswerValue`, `Notes` vào hình thoi đó.
- Sau đó, ghi chú trong báo cáo rằng khi chuyển sang Logical Design, các hình thoi mang thuộc tính này được chuyển đổi thành các "Thực thể kết hợp".

**Việc 4: Viết mô tả bảo vệ thiết kế (Đảm bảo điểm cao)** Đưa vào báo cáo một đoạn ngắn chứng minh việc bạn đã ứng dụng **"Design Principles"**: _"Nhóm đã áp dụng nguyên tắc Faithfulness và Avoiding Redundancy của High-Level Database Model. Thay vì gộp chung thông tin trường học, trạm Kiosk và ca tương tác gây dư thừa dữ liệu, nhóm đã tách rõ các thực thể Visitor, Kiosk, KioskSession và thiết lập quan hệ 1:N chặt chẽ"_.

Bằng cách đi đúng từ nguyên tắc ký hiệu (Notation) -> Bản số (Multiplicity) -> Xử lý quan hệ M:N, bạn sẽ hoàn thành ERD cực kỳ khoa học, vừa tận dụng triệt để dữ liệu Lab 2, vừa chứng minh được bạn rất vững lý thuyết Mô hình mức cao (Chương 4).