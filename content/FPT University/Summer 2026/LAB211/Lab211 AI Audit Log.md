Để viết đủ 16 Core Prompts cho môn LAB211 đạt điểm tối đa (chiếm 30% tổng điểm dự án), bạn không thể copy-paste ngẫu nhiên các đoạn chat với AI. Một **Core Prompt (Câu lệnh cốt lõi)** là câu lệnh mà nếu thiếu nó, dự án của bạn sẽ **khác về bản chất** (thay đổi kiến trúc, thiết kế, cách tiếp cận), chứ không chỉ đơn thuần là sửa lỗi cú pháp (syntax).

Dưới đây là hướng dẫn chi tiết từng bước, cấu trúc phân bổ và cách viết chuẩn học thuật cho 16 Core Prompts của bạn:

### 1. Phân bổ 16 Core Prompts theo 4 thành phần của Computational Thinking (CT)

Quy định bắt buộc là mỗi thành phần của Tư duy máy tính (Decomposition, Pattern Recognition, Abstraction, Algorithms) phải có **ít nhất 1 Core Prompt tương ứng**. Để viết đủ 16 prompt, bạn nên chia đều:

- **4 Prompts cho Decomposition (Phân rã):** Tập trung vào việc hỏi AI cách chia nhỏ bài toán lớn, chia thư mục n-Layers (Models, Business, Tools, Control) hoặc cách tách các chức năng lớn thành các hàm nhỏ (high cohesion, low coupling).
- **4 Prompts cho Pattern Recognition (Nhận diện mẫu):** Tập trung vào việc nhờ AI nhận diện quy luật dữ liệu (như Regular Expression cho ID, số điện thoại) hoặc nhận diện luồng thao tác chung (CRUD operations lặp lại ở nhiều menu).
- **4 Prompts cho Abstraction (Trừu tượng hóa):** Các câu lệnh quyết định thiết kế mô hình OOP. Ví dụ: "Nên dùng Interface hay Abstract Class cho Validation?", "Thiết kế quan hệ giữa Club và Player như thế nào?".
- **4 Prompts cho Algorithms (Thuật toán):** Đặt câu hỏi về cách giải quyết logic phức tạp. Ví dụ: thuật toán sắp xếp nhiều điều kiện, thuật toán tìm kiếm chuỗi con (partial match), thuật toán tính toán thống kê.

**Lưu ý quan trọng:** Trong 16 prompts này, bạn bắt buộc phải cố tình (hoặc vô tình) tạo ra và phát hiện **ít nhất 2 trường hợp AI bị ảo giác (Hallucination)** (ví dụ: AI bịa ra class không tồn tại, hoặc đưa ra thuật toán sai logic).

### 2. Lựa chọn 3 loại Core Prompt bắt buộc

Mỗi prompt bạn ghi vào file Excel phải thuộc 1 trong 3 loại sau:

1. **Decision-Making (Ra quyết định):** Dùng để so sánh và chọn kiến trúc/giải pháp (VD: _"Compare MVC vs Layered Architecture for this project"_).
2. **Problem-Solving (Giải quyết vấn đề):** Dùng để tìm nguyên nhân sâu xa của một lỗi logic hoặc tối ưu hóa (VD: _"Why is my search algorithm too slow with 10,000 records?"_).
3. **Verification (Xác minh thông tin):** Dùng để kiểm chứng tài liệu, API hoặc code AI đưa ra, từ đó phát hiện Hallucination (VD: _"Is this Java method valid in JDK 8?"_).

_(Tuyệt đối không ghi các Auxiliary Prompts dạng "Sửa lỗi cú pháp dòng 42" hay "Viết hàm getter/setter" vì chúng không làm thay đổi bản chất dự án)_.

### 3. Cấu trúc chuẩn 7 phần của một Entry trong AI Audit Log

Khi điền vào file template Excel (`AI_AuditLog_FullName_StudentID_Workshop##.xlsx`), mỗi prompt của bạn phải có đủ 7 trường thông tin sau:

1. **Entry #:** Số thứ tự (001 đến 016).
2. **Prompt Type:** Decision / Problem-Solving / Verification.
3. **Stage/Component:** Ghi rõ thuộc bước nào (Decomposition / Pattern Recognition / Abstraction / Algorithms).
4. **Problem/Context:** 1-2 câu tóm tắt vấn đề đang gặp.
5. **Prompt to AI:** Copy nguyên văn câu hỏi bạn hỏi AI.
6. **AI Response (Summary):** Tóm tắt cách AI trả lời trong 2-4 câu.
7. **Human Delta & Reflection (Phần quyết định điểm số):** Đây là nơi bạn chứng minh giá trị con người. Bắt buộc phải trả lời rành mạch 4 câu hỏi:
    - **Critical Thinking:** AI khuyên đúng hay sai? Có phát hiện ảo giác (hallucination) không?
    - **Contextualization:** Ràng buộc thực tế của đề bài LAB211 mà AI không biết là gì?
    - **Creative Synthesis:** Bạn đã thay đổi, sửa code của AI hay tối ưu nó như thế nào?
    - **Decision Ownership:** Quyết định cuối cùng của bạn là gì và tại sao?

---

### 4. Mẫu ví dụ chuẩn "Excellent" cho AI Audit Log

**Ví dụ 1: Điểm tối đa cho Pattern Recognition (Validation)**

- **Entry #:** 001
- **Prompt Type:** Problem-Solving
- **Stage/Component:** Pattern Recognition
- **Problem/Context:** Cần thiết lập điều kiện kiểm tra mã Câu lạc bộ (Club ID) bắt buộc theo định dạng CL-xxxx.
- **Prompt to AI:** _"How to validate a Java string exactly with format CL-0001 using regex?"_
- **AI Response:** AI đề xuất sử dụng regex `^CL-\d{4}$` và dùng hàm `matches()`.
- **Human Delta & Reflection:**
    - _Critical Thinking:_ Regex của AI đúng về mặt lý thuyết, nhưng AI mắc lỗi **Oversimplification (Đơn giản hóa quá mức)** khi quên mất rằng trong ngôn ngữ Java, ký tự backslash `\` là ký tự escape.
    - _Contextualization:_ Trong project Java, chuỗi regex phải được khai báo dạng String an toàn.
    - _Creative Synthesis:_ Tôi tự điều chỉnh lại biểu thức bằng cách thêm double backslash: `^CL-\\d{4}$` và đưa nó vào interface `Acceptable` dưới dạng hằng số `public static final String` để tái sử dụng nhiều lần theo chuẩn OOP.
    - _Decision Ownership:_ Tôi sử dụng regex đã chỉnh sửa vì nó tuân thủ cú pháp Java và thiết kế Interface giúp mã nguồn Low Coupling. Học được cách escape character hoạt động trong Java.

**Ví dụ 2: Điểm tối đa cho Algorithms & Phát hiện Hallucination**

- **Entry #:** 005
- **Prompt Type:** Decision-Making
- **Stage/Component:** Algorithms
- **Problem/Context:** Cần tìm kiếm Cầu thủ theo tên (chức năng Search by partial name).
- **Prompt to AI:** _"How to search for a player by name efficiently in Java? Give me the fastest algorithm."_
- **AI Response:** AI khuyên tôi sử dụng Binary Search với độ phức tạp $O(log n)$ và cung cấp đoạn code Binary Search có sẵn.
- **Human Delta & Reflection:**
    - _Critical Thinking:_ Tôi phát hiện AI mắc lỗi **Context Misunderstanding (Hiểu sai bối cảnh)**. Binary Search lý thuyết là nhanh nhất, nhưng nó bắt buộc mảng phải được sắp xếp (sort) trước, và đặc biệt nó chỉ dùng cho tìm kiếm chính xác tuyệt đối (exact match).
    - _Contextualization:_ Yêu cầu của LAB211 là tìm kiếm chuỗi con (partial match) không phân biệt hoa thường (ví dụ: gõ "Mess" phải ra "Messi"). Binary Search hoàn toàn vô dụng trong trường hợp này.
    - _Creative Synthesis:_ Thay vì dùng code của AI, tôi tự viết thuật toán Linear Search kết hợp với hàm `toLowerCase().contains()` của class String để quét danh sách.
    - _Decision Ownership:_ Tôi bác bỏ thuật toán Binary Search của AI. Dùng Linear Search duyệt mảng tuy chậm hơn về lý thuyết ($O(n)$) nhưng là cách duy nhất đáp ứng đúng nghiệp vụ "partial match" của khách hàng.

### 5. Checklist kiểm tra lại trước khi nộp

Sau khi viết xong 16 prompts, hãy rà soát lại bằng checklist 24/5 của phòng đào tạo:

1. [ ] Đã đủ tối thiểu 16 entries chưa?
2. [ ] Mỗi bước (Decomposition, Pattern, Abstraction, Algorithm) có ít nhất 1 prompt chưa?
3. [ ] Đã chỉ ra được ít nhất 2 lỗi sai/ảo giác (Hallucination) của AI chưa?
4. [ ] Nếu xóa câu lệnh này đi, project có thay đổi cấu trúc không? (Nếu dự án không thay đổi gì $\rightarrow$ xóa prompt này đi).
5. [ ] Có hình ảnh minh chứng (screenshot, code snippet) đi kèm cho các quyết định trong Excel không?

Nếu bạn chuẩn bị Audit Log theo sát các nguyên tắc này, giảng viên khi vấn đáp (Oral Vivas) sẽ thấy rõ khả năng làm chủ mã nguồn, tư duy phản biện xuất sắc của bạn, và bạn sẽ dễ dàng giành trọn 30% điểm Rubric của phần AI Reflection.