

# <span style="color: #e67e22;">Master Database Blueprint & Physical Design Specification</span>

---

## <span style="color: #2980b9;">1. TỔNG QUAN DỰ ÁN (PROJECT SUMMARY & CONTEXT)</span>

- <span style="color: #16a085; font-weight: bold;">Mục đích cốt lõi:</span> Hỗ trợ học sinh trung học phổ thông khám phá các chương trình học thuật và đưa ra quyết định nghề nghiệp sáng suốt tại các sự kiện Open Day.
- <span style="color: #16a085; font-weight: bold;">Phạm vi:</span> Một hệ thống Kiosk tương tác với cơ sở dữ liệu tập trung, chịu trách nhiệm quản lý thông tin đầu vào của học sinh (Visitor), dữ liệu chương trình học (Academic Program), và tự động tạo ra các kết quả gợi ý ngành học. Hệ thống phải đảm bảo xử lý dữ liệu hiệu quả, phản hồi theo thời gian thực (real-time) với khối lượng người dùng lớn, đồng thời hỗ trợ dữ liệu lịch sử cho các chuyên viên tư vấn (Counselor).

---

## <span style="color: #2980b9;">2. MÔ HÌNH KHÁI NIỆM & LOGIC (CONCEPTUAL & LOGICAL MODEL)</span>

Dưới đây là các mối quan hệ và bản số (cardinalities) giữa 10 thực thể cuối cùng:

- <span style="color: #8e44ad; font-weight: bold;">Visitor (1) - (N) KioskSession:</span> Một học sinh có thể thực hiện nhiều phiên tư vấn độc lập.
- <span style="color: #8e44ad; font-weight: bold;">Kiosk (1) - (N) KioskSession:</span> Mỗi trạm Kiosk phục vụ nhiều phiên tương tác.
- <span style="color: #8e44ad; font-weight: bold;">Questionnaire (1) - (N) Question:</span> Một bộ câu hỏi chứa nhiều câu hỏi chi tiết.
- <span style="color: #8e44ad; font-weight: bold;">Questionnaire (1) - (N) KioskSession:</span> Một bộ câu hỏi cấu hình được tái sử dụng cho nhiều phiên tư vấn.
- <span style="color: #8e44ad; font-weight: bold;">Counselor (1) - (N) ConsultationLog:</span> Mỗi chuyên viên có thể thực hiện nhiều lượt tư vấn (follow-up) sau khi có kết quả gợi ý.
- <span style="color: #8e44ad; font-weight: bold;">AcademicProgram (1) - (N) Recommendation:</span> Mỗi ngành học (Academic Program) có thể được gợi ý trong nhiều phiên khác nhau.

### <span style="color: #d35400;">Giải quyết các mối quan hệ nhiều-nhiều (M:N)</span>

Để triệt tiêu các mối quan hệ M:N, chúng ta sử dụng các <span style="font-weight: bold;">Thực thể kết hợp (Associative Entities)</span> như sau:

1. <span style="color: #c0392b; font-weight: bold;">`StudentResponse`:</span> Chuyển đổi quan hệ (M:N) giữa `KioskSession` và `Question`. Trong mỗi phiên (Session), người dùng trả lời nhiều câu hỏi, và mỗi câu hỏi được trả lời trong nhiều phiên khác nhau.
2. <span style="color: #c0392b; font-weight: bold;">`Recommendation`:</span> Chuyển đổi quan hệ (M:N) giữa `KioskSession` và `AcademicProgram`. Một phiên sinh ra điểm gợi ý cho nhiều ngành học, và một ngành học xuất hiện trên nhiều phiên gợi ý.
3. <span style="color: #c0392b; font-weight: bold;">`ConsultationLog`:</span> Chuyển đổi quan hệ (M:N) giữa `KioskSession` và `Counselor`, dùng để ghi chú lại quá trình chuyên viên tư vấn trao đổi với học sinh về kết quả của phiên đó.

---

## <span style="color: #2980b9;">3. LƯỢC ĐỒ CHUẨN HÓA CUỐI CÙNG (FINAL NORMALIZED SCHEMA - BCNF)</span>

Đảm bảo mọi thuộc tính không khóa đều phụ thuộc hoàn toàn vào khóa chính theo nguyên tắc BCNF.

1. <span style="color: #27ae60; font-weight: bold;">Visitor</span> (<u>VisitorID</u>, FullName, Email, Phone, HighSchool)
2. <span style="color: #27ae60; font-weight: bold;">Kiosk</span> (<u>KioskID</u>, Location, Status)
3. <span style="color: #27ae60; font-weight: bold;">Counselor</span> (<u>CounselorID</u>, FullName, Email, Department)
4. <span style="color: #27ae60; font-weight: bold;">AcademicProgram</span> (<u>ProgramID</u>, ProgramName, Description, CareerPaths)
5. <span style="color: #27ae60; font-weight: bold;">Questionnaire</span> (<u>QuestionnaireID</u>, Title, Description, CreatedDate)
6. <span style="color: #27ae60; font-weight: bold;">Question</span> (<u>QuestionID</u>, QuestionnaireID, Content, QuestionType)
7. <span style="color: #27ae60; font-weight: bold;">KioskSession</span> (<u>SessionID</u>, VisitorID, KioskID, QuestionnaireID, StartTime, EndTime)
8. <span style="color: #27ae60; font-weight: bold;">StudentResponse</span> (<u>SessionID</u>, <u>QuestionID</u>, AnswerValue)
9. <span style="color: #27ae60; font-weight: bold;">Recommendation</span> (<u>RecommendationID</u>, SessionID, ProgramID, MatchScore, GeneratedDate)
10. <span style="color: #27ae60; font-weight: bold;">ConsultationLog</span> (<u>LogID</u>, SessionID, CounselorID, Notes, ConsultationDate)

---

## <span style="color: #2980b9;">4. MÔ HÌNH VẬT LÝ & TỪ ĐIỂN DỮ LIỆU (PHYSICAL MODEL)</span>

Dựa theo hệ thống kiểu dữ liệu của MS SQL Server. Các thuộc tính định danh (ID) sử dụng kiểu `INT` kèm thuộc tính `IDENTITY(1,1)` để tự động tăng.

### <span style="color: #16a085;">4.1. Bảng: Visitor</span>

| Tên cột                                        | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu |
| :--------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------ |
| <span style="color: #d35400;">VisitorID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                     |
| FullName                                       | <span style="color: #8e44ad;">NVARCHAR(100)</span> |                                         | NOT NULL      |                     |
| Email                                          | <span style="color: #8e44ad;">VARCHAR(100)</span>  |                                         | NULL          |                     |
| Phone                                          | <span style="color: #8e44ad;">VARCHAR(15)</span>   |                                         | NULL          |                     |
| HighSchool                                     | <span style="color: #8e44ad;">NVARCHAR(100)</span> |                                         | NULL          |                     |

### <span style="color: #16a085;">4.2. Bảng: Kiosk</span>

| Tên cột                                      | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu |
| :------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------ |
| <span style="color: #d35400;">KioskID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                     |
| Location                                     | <span style="color: #8e44ad;">NVARCHAR(255)</span> |                                         | NOT NULL      |                     |
| Status                                       | <span style="color: #8e44ad;">VARCHAR(20)</span>   |                                         | NOT NULL      |                     |

### <span style="color: #16a085;">4.3. Bảng: Counselor</span>

| Tên cột                                          | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu |
| :----------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------ |
| <span style="color: #d35400;">CounselorID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                     |
| FullName                                         | <span style="color: #8e44ad;">NVARCHAR(100)</span> |                                         | NOT NULL      |                     |
| Email                                            | <span style="color: #8e44ad;">VARCHAR(100)</span>  |                                         | NOT NULL      |                     |
| Department                                       | <span style="color: #8e44ad;">NVARCHAR(100)</span> |                                         | NULL          |                     |

### <span style="color: #16a085;">4.4. Bảng: AcademicProgram</span>

| Tên cột                                        | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu |
| :--------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------ |
| <span style="color: #d35400;">ProgramID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                     |
| ProgramName                                    | <span style="color: #8e44ad;">NVARCHAR(150)</span> |                                         | NOT NULL      |                     |
| Description                                    | <span style="color: #8e44ad;">NVARCHAR(MAX)</span> |                                         | NULL          |                     |
| CareerPaths                                    | <span style="color: #8e44ad;">NVARCHAR(MAX)</span> |                                         | NULL          |                     |

### <span style="color: #16a085;">4.5. Bảng: Questionnaire</span>

| Tên cột                                              | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu |
| :--------------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------ |
| <span style="color: #d35400;">QuestionnaireID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                     |
| Title                                                | <span style="color: #8e44ad;">NVARCHAR(200)</span> |                                         | NOT NULL      |                     |
| Description                                          | <span style="color: #8e44ad;">NVARCHAR(500)</span> |                                         | NULL          |                     |
| CreatedDate                                          | <span style="color: #8e44ad;">DATETIME</span>      |                                         | NOT NULL      |                     |

### <span style="color: #16a085;">4.6. Bảng: Question</span>

| Tên cột                                         | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu                                                 |
| :---------------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :------------------------------------------------------------------ |
| <span style="color: #d35400;">QuestionID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                                                                     |
| QuestionnaireID                                 | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">Questionnaire(QuestionnaireID)</span> |
| Content                                         | <span style="color: #8e44ad;">NVARCHAR(500)</span> |                                         | NOT NULL      |                                                                     |
| QuestionType                                    | <span style="color: #8e44ad;">VARCHAR(50)</span>   |                                         | NOT NULL      |                                                                     |

### <span style="color: #16a085;">4.7. Bảng: KioskSession</span>

| Tên cột                                        | Kiểu dữ liệu SQL                              | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu                                                 |
| :--------------------------------------------- | :-------------------------------------------- | :-------------------------------------- | :------------ | :------------------------------------------------------------------ |
| <span style="color: #d35400;">SessionID</span> | <span style="color: #8e44ad;">INT</span>      | <span style="color: #c0392b;">PK</span> | NOT NULL      |                                                                     |
| VisitorID                                      | <span style="color: #8e44ad;">INT</span>      | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">Visitor(VisitorID)</span>             |
| KioskID                                        | <span style="color: #8e44ad;">INT</span>      | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">Kiosk(KioskID)</span>                 |
| QuestionnaireID                                | <span style="color: #8e44ad;">INT</span>      | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">Questionnaire(QuestionnaireID)</span> |
| StartTime                                      | <span style="color: #8e44ad;">DATETIME</span> |                                         | NOT NULL      |                                                                     |
| EndTime                                        | <span style="color: #8e44ad;">DATETIME</span> |                                         | NULL          |                                                                     |

### <span style="color: #16a085;">4.8. Bảng: StudentResponse</span> *(Bảng kết hợp)*

| Tên cột                                         | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                              | Cho phép rỗng | Bảng/Cột tham chiếu                                          |
| :---------------------------------------------- | :------------------------------------------------- | :------------------------------------------ | :------------ | :----------------------------------------------------------- |
| <span style="color: #d35400;">SessionID</span>  | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK, FK</span> | NOT NULL      | <span style="color: #27ae60;">KioskSession(SessionID)</span> |
| <span style="color: #d35400;">QuestionID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK, FK</span> | NOT NULL      | <span style="color: #27ae60;">Question(QuestionID)</span>    |
| AnswerValue                                     | <span style="color: #8e44ad;">NVARCHAR(MAX)</span> |                                             | NOT NULL      |                                                              |

### <span style="color: #16a085;">4.9. Bảng: Recommendation</span> *(Bảng kết hợp)*

| Tên cột                                               | Kiểu dữ liệu SQL                                  | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu                                             |
| :---------------------------------------------------- | :------------------------------------------------ | :-------------------------------------- | :------------ | :-------------------------------------------------------------- |
| <span style="color: #d35400;">RecommendationID</span> | <span style="color: #8e44ad;">INT</span>          | <span style="color: #c0392b;">PK</span> | NOT NULL      |                                                                 |
| SessionID                                             | <span style="color: #8e44ad;">INT</span>          | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">KioskSession(SessionID)</span>    |
| ProgramID                                             | <span style="color: #8e44ad;">INT</span>          | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">AcademicProgram(ProgramID)</span> |
| MatchScore                                            | <span style="color: #8e44ad;">DECIMAL(5,2)</span> |                                         | NOT NULL      |                                                                 |
| GeneratedDate                                         | <span style="color: #8e44ad;">DATETIME</span>     |                                         | NOT NULL      |                                                                 |

### <span style="color: #16a085;">4.10. Bảng: ConsultationLog</span> *(Bảng kết hợp)*

| Tên cột                                    | Kiểu dữ liệu SQL                                   | Ràng buộc Khóa                          | Cho phép rỗng | Bảng/Cột tham chiếu                                          |
| :----------------------------------------- | :------------------------------------------------- | :-------------------------------------- | :------------ | :----------------------------------------------------------- |
| <span style="color: #d35400;">LogID</span> | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">PK</span> | NOT NULL      |                                                              |
| SessionID                                  | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">KioskSession(SessionID)</span> |
| CounselorID                                | <span style="color: #8e44ad;">INT</span>           | <span style="color: #c0392b;">FK</span> | NOT NULL      | <span style="color: #27ae60;">Counselor(CounselorID)</span>  |
| Notes                                      | <span style="color: #8e44ad;">NVARCHAR(MAX)</span> |                                         | NULL          |                                                              |
| ConsultationDate                           | <span style="color: #8e44ad;">DATETIME</span>      |                                         | NOT NULL      |                                                              |

---

## <span style="color: #2980b9;">5. RÀNG BUỘC TOÀN VẸN & QUY TẮC NGHIỆP VỤ (SPECIFY CONSTRAINTS)</span>

Các quy tắc này phải được tích hợp vào các kịch bản DDL khi tạo bảng:

### <span style="color: #d35400;">Các Ràng buộc CHECK Logic (Logic Checks)</span>

- Tại `KioskSession`: Thêm `CONSTRAINT CHK_SessionTime CHECK (EndTime >= StartTime)` để đảm bảo tính hợp lệ của thời gian một phiên.
- Tại `Recommendation`: Thêm `CONSTRAINT CHK_MatchScore CHECK (MatchScore >= 0 AND MatchScore <= 100)` vì điểm độ chuẩn xác gợi ý phải theo thang điểm phần trăm.
- Tại `Kiosk`: Thêm `CONSTRAINT CHK_KioskStatus CHECK (Status IN ('Active', 'Maintenance', 'Offline'))` để giới hạn các trạng thái nghiệp vụ.

### <span style="color: #d35400;">Giá trị Mặc định (DEFAULT Values)</span>

- Cột `CreatedDate` trong `Questionnaire` thiết lập `DEFAULT GETDATE()`.
- Cột `GeneratedDate` trong `Recommendation` thiết lập `DEFAULT GETDATE()`.
- Cột `ConsultationDate` trong `ConsultationLog` thiết lập `DEFAULT GETDATE()`.

### <span style="color: #d35400;">Ràng buộc UNIQUE (Duy nhất)</span>

- Tại `Visitor`: Thêm `CONSTRAINT UQ_VisitorEmail UNIQUE(Email)` và `CONSTRAINT UQ_VisitorPhone UNIQUE(Phone)`.
- Tại `Counselor`: Thêm `CONSTRAINT UQ_CounselorEmail UNIQUE(Email)`.

---

