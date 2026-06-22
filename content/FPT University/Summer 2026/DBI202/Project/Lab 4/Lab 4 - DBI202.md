
# Thông báo quan trọng về Audit Log và Lab 4

## 1. Audit Log

- **Nộp file Audit Log** → Hôm kiểm tra sẽ gọi ngẫu nhiên một số bạn để check var.
- **Lưu ý:** File Audit Log là **file cá nhân**.
- **Deadline nộp file Audit Log** (từ giai đoạn 1 đến 3):
  - 🗓 **Chủ nhật – 21/06/2026**

---

## 2. Lab 4 – Thiết kế ERD

- Trong quá trình thiết kế ERD cho lab 4, **không biết thì hỏi Giảng viên**.
- **Thời gian hỏi Giảng viên:**
  - 📅 **Thứ Sáu (19/06)**  
  - 📅 **Thứ Ba (23/06)**  
- ⚠️ Sau 2 ngày này, sẽ **không còn cơ hội hỏi trợ giúp** nữa.

---

## 3. Deadline Lab 4

- 🗓 **Thứ Tư – 24/06/2026**

---

## 4. Lab cuối cùng & Presentation

- Lab cuối cùng sẽ rơi vào **TUẦN 9** và **PRESENTATION luôn**.
- Lịch Present:
  - 🍀 **Nếu hên:** Sau tuần nghỉ hè mới làm.
  - 😓 **Còn xui:** Phải làm xong trước hè (tuần 9).

---


---


---

# Lab 4: Relational Database Design Process

## Objective

The objective of this lab is to guide students through the structured process of relational database design. Students will practice translating real-world requirements into a conceptual model, refining it into a logical model, and implementing it as a physical database schema. Additionally, students will specify the constraints that ensure data integrity within the designed schema.

---

## Tasks

Each group is required to:

1. **Create the Conceptual Model (ERD)**
   - Develop an **Entity–Relationship Diagram (ERD)** based on the given or chosen domain.
   - Clearly identify entities, attributes, and relationships.
   - Indicate cardinalities (`1:1`, `1:N`, `M:N`).

2. **Develop the Logical Model**
   - Convert the ERD into a **relational schema (Logical Diagram)**.
   - Define **primary keys** and **foreign keys**.
   - Resolve `M:N` relationships through appropriate decomposition.

3. **Design the Physical Model**
   - Map the logical schema to a **Physical Diagram**.
   - Include table definitions with **attributes** and **data types**.

4. **Specify Constraints**
   - Provide a detailed description of **column-level** and **table-level constraints**, including:
     - `NOT NULL`
     - `UNIQUE`
     - `PRIMARY KEY`
     - `FOREIGN KEY` (with referenced table and column)
     - `CHECK` constraints (e.g., value ranges, formats)
     - `DEFAULT` values (if any)

5. **Document Results**
   - Summarize the database design process followed by the group.
   - Reflect on how constraints improve data integrity and reliability.

---

## Submission Format

- **File type:** Microsoft Word (`.doc` / `.docx`) or PDF (`.pdf`)
- **Report structure:**
  1. Cover page (Lab number, course name, group members, date).
  2. Entity–Relationship Diagram (ERD).
  3. Logical Diagram with relational schema.
  4. Physical Diagram with detailed table design.
  5. List and description of constraints.
  6. Conclusion and reflection.

---

---

---

Chào bạn, dựa trên Báo cáo Lab 2 và tài liệu thiết kế cơ sở dữ liệu của dự án "Hệ thống Kiosk Tư vấn Hướng nghiệp" mà nhóm bạn đã thực hiện, tôi sẽ hướng dẫn bạn cách vẽ Mô hình Thực thể - Mối quan hệ (ERD) từng bước một.

Ở Lab 2, nhóm bạn đã xuất sắc xác định được 10 thực thể cùng các Khóa chính (Primary Keys). Bây giờ, chúng ta sẽ đưa chúng lên sơ đồ (ERD).

### Bước 1: Nắm vững Ký hiệu vẽ ERD (Notations)

Theo lý thuyết của Mô hình Cơ sở dữ liệu mức cao (High-Level Database Model), bạn cần sử dụng các ký hiệu chuẩn sau:

- **Thực thể (Entity):** Vẽ bằng **Hình chữ nhật** chứa tên thực thể (danh từ).
- **Thuộc tính (Attribute):** Vẽ bằng **Hình Oval** nối với thực thể bằng một đoạn thẳng.
- **Khóa chính (Key Attribute):** Vẽ bằng Hình Oval và **gạch chân** tên thuộc tính đó.
- **Mối quan hệ (Relationship):** Vẽ bằng **Hình thoi** chứa động từ (ví dụ: "Thực hiện", "Gợi ý") nằm giữa các thực thể.

### Bước 2: Vẽ 10 Thực thể và các Thuộc tính cốt lõi

Đầu tiên, bạn vẽ 10 hình chữ nhật cho 10 thực thể dưới đây. Từ mỗi hình chữ nhật, kéo các hình oval để ghi thuộc tính. **Đừng quên gạch chân các Khóa chính**:

1. **Visitor**: Khóa là visitorID. Các oval khác: fullName, phoneNumber.
2. **AcademicProgram**: Khóa là programID. Các oval khác: majorName.
3. **Kiosk**: Khóa là kioskID. Các oval khác: kioskLocation.
4. **KioskSession**: Khóa là sessionID. Các oval khác: startTime, endTime.
5. **Questionnaire**: Khóa là questionnaireID. Các oval khác: title, description.
6. **Question**: Khóa là questionID. Các oval khác: questionContent, category.
7. **Counselor**: Khóa là counselorID. Các oval khác: fullName, specialty.
8. **StudentResponse**: Khóa là responseID. Các oval khác: answerValue.
9. **Recommendation**: Khóa là recommendationID. Các oval khác: matchScore.
10. **ConsultationLog**: Khóa là logID. Các oval khác: consultationNotes, studentFeedback.

### Bước 3: Nối các Mối quan hệ (Relationships) và Bản số (Cardinalities)

Sau khi có các thực thể, bạn dùng hình thoi để nối chúng lại với nhau và ghi bản số (1 hoặc N) ở hai đầu đường nối. Dựa vào quy tắc nghiệp vụ của hệ thống Kiosk, sơ đồ của bạn sẽ được nối như sau:

**Nhóm quan hệ 1-N (Một - Nhiều) cơ bản:**

- **Visitor (1) — < Hình thoi: Thực hiện > — (N) KioskSession**: Một học sinh có thể thực hiện nhiều phiên tư vấn.
- **Kiosk (1) — < Hình thoi: Phục vụ > — (N) KioskSession**: Mỗi Kiosk phục vụ nhiều phiên tương tác.
- **Questionnaire (1) — < Hình thoi: Bao gồm > — (N) Question**: Một bộ câu hỏi chứa nhiều câu hỏi chi tiết.
- **Questionnaire (1) — < Hình thoi: Áp dụng > — (N) KioskSession**: Một bộ câu hỏi được sử dụng cho nhiều phiên tư vấn.

**Nhóm Thực thể kết hợp (Associative Entities):** Bởi vì ở Lab 2 và 3, nhóm bạn đã định nghĩa `StudentResponse`, `Recommendation`, và `ConsultationLog` thành các thực thể riêng có ID độc lập (thay vì chỉ là quan hệ M:N thuần túy), nên trên ERD bạn sẽ nối chúng bằng các hình thoi quan hệ 1-N đổ về các thực thể này:

- **KioskSession (1) — < Hình thoi: Sinh ra > — (N) StudentResponse**
- **Question (1) — < Hình thoi: Nhận > — (N) StudentResponse** _(Hai đường này giải quyết quan hệ M:N giữa Session và Question)_.
- **KioskSession (1) — < Hình thoi: Có > — (N) Recommendation**
- **AcademicProgram (1) — < Hình thoi: Nằm trong > — (N) Recommendation** _(Hai đường này giải quyết quan hệ M:N giữa Session và Ngành học)_.
- **KioskSession (1) — < Hình thoi: Ghi nhận > — (N) ConsultationLog**
- **Counselor (1) — < Hình thoi: Phụ trách > — (N) ConsultationLog** _(Hai đường này giải quyết quan hệ M:N giữa Session và Chuyên viên tư vấn)_.

### Bước 4: Lời khuyên thiết kế (Design Principles) để lấy điểm tối đa

Khi vẽ sơ đồ này (bạn có thể dùng phần mềm như Draw.io, MS Visio, hoặc Lucidchart), hãy nhớ các nguyên tắc thiết kế cơ sở dữ liệu:

- **Tính trung thực (Faithfulness):** Đảm bảo ERD phản ánh đúng thực tế của sự kiện Open Day. Ví dụ, một phiên KioskSession bắt buộc phải có một Kiosk và một Visitor.
- **Tránh dư thừa (Avoiding Redundancy):** Trong ERD mức khái niệm (Conceptual), **bạn không cần (và không nên) vẽ các Khóa ngoại (Foreign Keys) dưới dạng thuộc tính (oval)**. Ví dụ, trong thực thể `KioskSession`, bạn không cần vẽ oval `visitorID` hay `kioskID`, vì sự liên kết đó đã được thể hiện bằng đường nối (Relationship) đến bảng Visitor và Kiosk rồi. Việc xuất hiện Khóa ngoại là việc của Lược đồ Logic (Logical Diagram) ở bước sau.

