Chào em! Thầy rất vui vì em đã nắm vững các khái niệm về "Tổng thể" (Population), "Mẫu" (Sample) và "Ước lượng điểm" (Point Estimation). Hôm nay, chúng ta sẽ bước sang một trong những bài học quan trọng và "kỳ diệu" nhất của toàn bộ môn Xác suất Thống kê: **7-2 Sampling Distributions and the Central Limit Theorem** (Phân phối lấy mẫu và Định lý Giới hạn Trung tâm).

Hầu hết mọi suy diễn thống kê mà em học ở các chương sau đều bắt nguồn từ bài học này. Chúng ta bắt đầu nhé!

---

### 1. Giải thích khái niệm bằng ngôn ngữ đơn giản

Hãy nhớ lại ví dụ đo chiều cao sinh viên FPT. Em lấy ngẫu nhiên một mẫu 100 bạn và tính được trung bình mẫu là $\overline{x} = 170\text{ cm}$. Bây giờ, nếu em lấy một mẫu 100 bạn _khác_, em có thể tính ra $\overline{x} = 171\text{ cm}$. Lấy mẫu thứ ba, $\overline{x} = 169.5\text{ cm}$. Như em thấy, bản thân **trung bình mẫu ($\overline{X}$)** cũng nhảy nhót thay đổi theo từng lần lấy mẫu. Sự biến thiên của các giá trị trung bình mẫu này tạo ra một "bức tranh phân phối" của riêng nó. Bức tranh đó gọi là **Phân phối lấy mẫu (Sampling Distribution)**.

Còn **Định lý Giới hạn Trung tâm (Central Limit Theorem - CLT)** là một "phép thuật" của toán học. Nó nói rằng: Bất kể chiều cao của tổng thể sinh viên có phân phối lộn xộn, méo mó thế nào đi nữa, thì khi em vẽ biểu đồ cho _các giá trị trung bình mẫu_, biểu đồ đó sẽ luôn luôn có hình quả chuông đối xứng tuyệt đẹp (Phân phối chuẩn - Normal Distribution), miễn là kích thước mẫu của em đủ lớn!

### 2. Định nghĩa học thuật chính xác

- **Phân phối lấy mẫu (Sampling Distribution):** Phân phối xác suất của một thống kê (statistic) được gọi là phân phối lấy mẫu. Phân phối này phụ thuộc vào phân phối của tổng thể, kích thước mẫu, và phương pháp chọn mẫu.
- **Định lý Giới hạn Trung tâm (Central Limit Theorem - CLT):** Nếu $X_1, X_2, ..., X_n$ là một mẫu ngẫu nhiên kích thước $n$ được lấy từ một tổng thể (hữu hạn hoặc vô hạn) có trung bình $\mu$ và phương sai hữu hạn $\sigma^2$, và nếu $\overline{X}$ là trung bình mẫu, thì giới hạn dạng phân phối của biến số: $$Z = \frac{\overline{X} - \mu}{\sigma/\sqrt{n}}$$ khi $n \rightarrow \infty$, sẽ là phân phối chuẩn tắc (Standard Normal Distribution),.

### 3. Giải thích trực giác đằng sau công thức

Khi ta tính trung bình mẫu $\overline{X} = \frac{X_1 + X_2 + ... + X_n}{n}$, kỳ vọng của nó vẫn bằng đúng trung bình tổng thể: $\mu_{\overline{X}} = \mu$. Tuy nhiên, phương sai của trung bình mẫu lại bị thu hẹp đi $n$ lần: $\sigma_{\overline{X}}^2 = \frac{\sigma^2}{n}$.

**Trực giác:** Tại sao phương sai lại chia cho $n$? Khi em lấy trung bình của nhiều người, những người cực kỳ cao và những người cực kỳ thấp có xu hướng bù trừ cho nhau. Càng lấy mẫu đông ($n$ lớn), sự bù trừ này càng mạnh, làm cho giá trị trung bình $\overline{X}$ rất ổn định và ít dao động hơn nhiều so với việc chỉ quan sát một cá nhân đơn lẻ. Do đó, đường cong phân phối của $\overline{X}$ sẽ hẹp hơn và tập trung cao độ quanh $\mu$.

### 4. Giải thích ý nghĩa từng ký hiệu

- $n$: Kích thước mẫu (Sample size). Khi $n \ge 30$, CLT hầu như luôn luôn được áp dụng.
- $\mu$: Trung bình của tổng thể ban đầu.
- $\sigma^2$: Phương sai của tổng thể ban đầu.
- $\overline{X}$: Trung bình mẫu (là một biến ngẫu nhiên).
- $\mu_{\overline{X}}$: Trung bình của các trung bình mẫu.
- $\sigma_{\overline{X}}$: Độ lệch chuẩn của trung bình mẫu, còn được gọi là **Sai số chuẩn (Standard Error)** của trung bình. Bằng $\frac{\sigma}{\sqrt{n}}$.

### 5. Minh họa bằng ví dụ thực tế

**Trong Kỹ thuật Phần mềm:** Giả sử thời gian phản hồi (response time) của một API có phân phối rất lệch (skewed) vì thỉnh thoảng có những truy vấn mất rất nhiều thời gian do lỗi mạng. Dù dữ liệu gốc không tuân theo phân phối chuẩn, nhưng nếu hệ thống giám sát của em cứ mỗi phút gom 50 lượt truy cập lại để tính "Thời gian phản hồi trung bình mỗi phút" ($\overline{X}$), biểu đồ của các con số trung bình này sẽ tự động tuân theo phân phối chuẩn nhờ vào CLT. Điều này giúp các kỹ sư dễ dàng thiết lập các ngưỡng cảnh báo (alert thresholds) dựa trên phân phối chuẩn.

### 6. Giải ví dụ từng bước

#### Ví dụ 1: Áp dụng trên 1 mẫu (Single Sample)

_Trích từ giáo trình: Một công ty điện tử sản xuất điện trở có điện trở trung bình $\mu = 100\text{ ohms}$ và độ lệch chuẩn $\sigma = 10\text{ ohms}$. Phân phối của điện trở là phân phối chuẩn. Tính xác suất để một mẫu ngẫu nhiên gồm $n = 25$ điện trở có điện trở trung bình nhỏ hơn 95 ohms_.

- **Bước 1: Xác định tham số.** $\mu = 100$, $\sigma = 10$, $n = 25$. Yêu cầu tính $P(\overline{X} < 95)$.
- **Bước 2: Phân tích phân phối của $\overline{X}$.** Trung bình: $\mu_{\overline{X}} = \mu = 100$. Độ lệch chuẩn (Sai số chuẩn): $\sigma_{\overline{X}} = \frac{\sigma}{\sqrt{n}} = \frac{10}{\sqrt{25}} = \frac{10}{5} = 2$.
- **Bước 3: Chuẩn hóa về $Z$.** $$Z = \frac{\overline{X} - \mu_{\overline{X}}}{\sigma_{\overline{X}}} = \frac{95 - 100}{2} = -2.5$$.
- **Bước 4: Tính xác suất.** $$P(\overline{X} < 95) = P(Z < -2.5)$$ Tra bảng phân phối chuẩn tắc (Table III), ta được $P(Z < -2.5) = 0.0062$.

#### Ví dụ 2: Sự khác biệt giữa 2 trung bình mẫu (Difference in Sample Means)

_Lý thuyết:_ Nếu có 2 tổng thể độc lập với trung bình $\mu_1, \mu_2$ và phương sai $\sigma_1^2, \sigma_2^2$, thì phân phối lấy mẫu của hiệu hai trung bình mẫu $(\overline{X}_1 - \overline{X}_2)$ sẽ là phân phối chuẩn (nếu tổng thể chuẩn) hoặc xấp xỉ chuẩn (nếu $n_1, n_2 > 30$) với trung bình là $\mu_1 - \mu_2$ và phương sai là $\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}$,,.

_Đề bài:_ Tuổi thọ của một linh kiện động cơ máy bay có trung bình 5000 giờ, độ lệch chuẩn 40 giờ. Một quy trình mới giúp tăng trung bình lên 5050 giờ, độ lệch chuẩn giảm còn 30 giờ. Lấy mẫu $n_1 = 16$ (quy trình cũ) và $n_2 = 25$ (quy trình mới). Tính xác suất để hiệu hai trung bình mẫu $\overline{X}_2 - \overline{X}_1$ lớn hơn hoặc bằng 25 giờ.

- **Bước 1:** Xác định tham số. Cũ (1): $\mu_1 = 5000$, $\sigma_1 = 40$, $n_1 = 16$. Mới (2): $\mu_2 = 5050$, $\sigma_2 = 30$, $n_2 = 25$.
- **Bước 2:** Tìm phân phối của biến mới $Y = \overline{X}_2 - \overline{X}_1$. Trung bình: $\mu_Y = \mu_2 - \mu_1 = 5050 - 5000 = 50$ giờ. Phương sai: $\sigma_Y^2 = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2} = \frac{40^2}{16} + \frac{30^2}{25} = \frac{1600}{16} + \frac{900}{25} = 100 + 36 = 136$. Độ lệch chuẩn: $\sigma_Y = \sqrt{136} \approx 11.66$.
- **Bước 3:** Chuẩn hóa về $Z$ để tính $P(Y \ge 25)$. $$Z = \frac{25 - 50}{\sqrt{136}} = \frac{-25}{11.66} \approx -2.14$$.
- **Bước 4:** Tính xác suất. $$P(Y \ge 25) = P(Z \ge -2.14) = 1 - P(Z < -2.14)$$ Tra bảng, $P(Z < -2.14) = 0.0162$. Suy ra xác suất cần tìm là $1 - 0.0162 = 0.9838$.

### 7. Các lỗi sai phổ biến

- **Quên chia $\sqrt{n}$:** Khi đề bài yêu cầu tính xác suất của một _mẫu_ gồm nhiều phần tử, sinh viên thường quên mất dùng công thức $\sigma_{\overline{X}} = \frac{\sigma}{\sqrt{n}}$ mà bê nguyên $\sigma$ của tổng thể vào tính $Z$. Hãy nhớ: Nếu đề hỏi 1 quan sát ($X$) -> Dùng $\sigma$. Nếu đề hỏi trung bình của 1 mẫu ($\overline{X}$) -> Bắt buộc dùng $\sigma/\sqrt{n}$.
- **Áp dụng định lý Giới hạn trung tâm bừa bãi:** CLT chỉ đúng khi $n$ đủ lớn (thường là $n \ge 30$). Nếu tổng thể cực kỳ méo mó mà $n = 5$ rồi em giả định nó là phân phối chuẩn, kết quả sẽ sai lệch nghiêm trọng. Trừ phi đề bài cho sẵn _tổng thể tuân theo phân phối chuẩn_ (thì $n$ bao nhiêu cũng được).

### 8. So sánh với các khái niệm dễ nhầm lẫn

- **Population Distribution (Phân phối tổng thể) vs. Sampling Distribution (Phân phối lấy mẫu):**
    - _Phân phối tổng thể:_ Mô tả sự phân tán của các cá nhân độc lập ($X$). Phương sai là $\sigma^2$.
    - _Phân phối lấy mẫu:_ Mô tả sự phân tán của các kết quả trung bình ($\overline{X}$) sau nhiều lần lấy mẫu. Phương sai nhỏ hơn rất nhiều: $\sigma^2/n$. Khi $n$ càng lớn, biểu đồ càng mỏng lại và vút cao lên quanh vị trí trung tâm $\mu$.

---

### TÓM TẮT KIẾN THỨC QUAN TRỌNG

- Phân phối lấy mẫu giải thích cách các "giá trị thống kê" (như $\overline{X}$) dao động từ mẫu này sang mẫu khác.
- **Central Limit Theorem (CLT)** đảm bảo rằng phân phối của $\overline{X}$ sẽ xấp xỉ phân phối chuẩn khi kích thước mẫu $n$ đủ lớn ($n \ge 30$), bất chấp hình dạng của tổng thể gốc,.
- Sai số chuẩn của trung bình là $\sigma/\sqrt{n}$, cho thấy mẫu càng lớn, trung bình mẫu càng ít dao động.

### CÁC CÔNG THỨC CẦN NHỚ

1. Trung bình của $\overline{X}$: $\mu_{\overline{X}} = \mu$
2. Phương sai của $\overline{X}$: $\sigma_{\overline{X}}^2 = \frac{\sigma^2}{n}$
3. Biến $Z$ cho một mẫu: $Z = \frac{\overline{X} - \mu}{\sigma/\sqrt{n}}$
4. Trung bình của hiệu 2 mẫu: $\mu_{\overline{X}_1 - \overline{X}_2} = \mu_1 - \mu_2$
5. Phương sai của hiệu 2 mẫu: $\sigma_{\overline{X}_1 - \overline{X}_2}^2 = \frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}$
6. Biến $Z$ cho hiệu 2 mẫu: $Z = \frac{(\overline{X}_1 - \overline{X}_2) - (\mu_1 - \mu_2)}{\sqrt{\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}}}$

---

### CÂU HỎI LÝ THUYẾT (Tự kiểm tra)

1. Sự khác biệt giữa độ lệch chuẩn của tổng thể ($\sigma$) và sai số chuẩn của trung bình mẫu ($\sigma_{\overline{X}}$) là gì?
2. Định lý Giới hạn Trung tâm phát biểu điều gì về hình dạng của phân phối lấy mẫu?
3. Khi nào thì chúng ta có thể áp dụng Định lý Giới hạn Trung tâm một cách an toàn theo nguyên tắc chung (rule of thumb)?
4. Điều gì xảy ra với phương sai của trung bình mẫu ($\sigma_{\overline{X}}^2$) khi kích thước mẫu $n$ tăng dần tới vô cực?
5. Tại sao phương sai của hiệu hai trung bình mẫu ($\sigma_{\overline{X}_1 - \overline{X}_2}^2$) lại là phép CỘNG ($\frac{\sigma_1^2}{n_1} + \frac{\sigma_2^2}{n_2}$) chứ không phải phép TRỪ?

### BÀI TẬP THỰC HÀNH

**Mức độ Cơ bản:** **Bài 1:** Chiều cao của một tổng thể sinh viên có trung bình $\mu = 165\text{ cm}$ và phương sai $\sigma^2 = 100\text{ cm}^2$. Nếu lấy một mẫu ngẫu nhiên $n = 25$ sinh viên. Hãy tính kỳ vọng $\mu_{\overline{X}}$ và sai số chuẩn $\sigma_{\overline{X}}$ của trung bình mẫu. **Bài 2:** Mức tiêu thụ nhiên liệu của một loại động cơ (đơn vị: lít) tuân theo phân phối chuẩn với trung bình $\mu = 45$ và độ lệch chuẩn $\sigma = 5$. Lấy ngẫu nhiên $n=16$ động cơ. Tính xác suất để trung bình mẫu $\overline{X}$ nhỏ hơn 42.5.

**Mức độ Trung bình:** **Bài 3:** Tuổi thọ của một loại pin không tuân theo phân phối chuẩn, nhưng có trung bình $\mu = 40$ giờ và độ lệch chuẩn $\sigma = 6$ giờ. Một mẫu gồm 36 bóng đèn được kiểm tra. Tính xác suất để tuổi thọ trung bình của mẫu nằm trong khoảng từ 38 đến 42 giờ. **Bài 4:** Động cơ loại A có sức kéo trung bình $\mu_A = 150\text{ kg}$, độ lệch chuẩn $\sigma_A = 10\text{ kg}$. Động cơ loại B có sức kéo trung bình $\mu_B = 145\text{ kg}$, độ lệch chuẩn $\sigma_B = 8\text{ kg}$. Lấy ngẫu nhiên $n_A = 25$ động cơ loại A và $n_B = 16$ động cơ loại B. Hai quần thể đều phân phối chuẩn. Tính xác suất để trung bình sức kéo của mẫu động cơ A lớn hơn trung bình sức kéo mẫu động cơ B ít nhất $8\text{ kg}$ (Tức là $P(\overline{X}_A - \overline{X}_B > 8)$).

**Mức độ Nâng cao:** **Bài 5:** Một nhà sản xuất muốn ước lượng trọng lượng trung bình của một lô linh kiện. Trọng lượng tổng thể có độ lệch chuẩn $\sigma = 12\text{ g}$. Nhà sản xuất muốn lấy một mẫu kích thước $n$ sao cho xác suất để trung bình mẫu $\overline{X}$ sai lệch so với trung bình tổng thể $\mu$ không quá $3\text{ g}$ (tức là $P(|\overline{X} - \mu| \le 3)$) phải lớn hơn hoặc bằng $0.95$. Hỏi kích thước mẫu $n$ tối thiểu phải là bao nhiêu?

---

### ĐÁP ÁN VÀ LỜI GIẢI CHI TIẾT

**Đáp án Câu hỏi lý thuyết:**

1. $\sigma$ đo lường sự phân tán của từng cá thể độc lập trong tổng thể. Sai số chuẩn $\sigma_{\overline{X}}$ đo lường sự biến thiên của _giá trị trung bình_ giữa các lần lấy mẫu khác nhau.
2. Hình dạng phân phối của trung bình mẫu sẽ xấp xỉ phân phối chuẩn khi kích thước mẫu tiến tới vô cùng, bất kể phân phối gốc là gì.
3. Nguyên tắc chung là khi $n \ge 30$, trừ khi phân phối gốc cực kỳ méo mó.
4. Phương sai $\sigma_{\overline{X}}^2 = \sigma^2/n$. Khi $n \rightarrow \infty$, phương sai tiến về 0. Trung bình mẫu sẽ bằng chính xác trung bình tổng thể.
5. Theo tính chất toán học của các biến ngẫu nhiên độc lập (Chương 5), phương sai của một tổng hay một hiệu các biến độc lập đều bằng _tổng_ các phương sai của chúng. Lấy hiệu hai mẫu không làm giảm đi rủi ro biến thiên mà cộng dồn rủi ro đó lại.

**Lời giải Bài tập thực hành:**

**Bài 1:**

- $\mu_{\overline{X}} = \mu = 165\text{ cm}$.
- $\sigma_{\overline{X}} = \frac{\sigma}{\sqrt{n}} = \frac{\sqrt{100}}{\sqrt{25}} = \frac{10}{5} = 2\text{ cm}$.

**Bài 2:**

- Dữ liệu: $\mu = 45$, $\sigma = 5$, $n = 16$.
- Tính sai số chuẩn: $\sigma_{\overline{X}} = \frac{5}{\sqrt{16}} = 1.25$.
- Chuẩn hóa: $Z = \frac{42.5 - 45}{1.25} = \frac{-2.5}{1.25} = -2.0$.
- Tính xác suất: $P(\overline{X} < 42.5) = P(Z < -2.0) = 0.0228$.

**Bài 3:**

- Dữ liệu: $\mu = 40$, $\sigma = 6$, $n = 36$. Tuy phân phối không chuẩn nhưng vì $n = 36 \ge 30$, ta áp dụng Định lý Giới hạn Trung tâm (CLT), phân phối của $\overline{X}$ xấp xỉ chuẩn.
- Sai số chuẩn: $\sigma_{\overline{X}} = \frac{6}{\sqrt{36}} = 1$.
- Tính $P(38 < \overline{X} < 42)$. Chuẩn hóa $X$: $Z_1 = \frac{38 - 40}{1} = -2$. $Z_2 = \frac{42 - 40}{1} = 2$.
- $P(-2 < Z < 2) = \Phi(2) - \Phi(-2) = 0.9772 - 0.0228 = 0.9544$.

**Bài 4:**

- $\mu_{\overline{X}_A - \overline{X}_B} = \mu_A - \mu_B = 150 - 145 = 5$.
- $\sigma_{\overline{X}_A - \overline{X}_B}^2 = \frac{\sigma_A^2}{n_A} + \frac{\sigma_B^2}{n_B} = \frac{10^2}{25} + \frac{8^2}{16} = \frac{100}{25} + \frac{64}{16} = 4 + 4 = 8$.
- Độ lệch chuẩn của hiệu: $\sqrt{8} \approx 2.828$.
- Cần tính $P(\overline{X}_A - \overline{X}_B > 8)$.
- Chuẩn hóa: $Z = \frac{8 - 5}{\sqrt{8}} = \frac{3}{2.828} \approx 1.06$.
- Xác suất: $P(Z > 1.06) = 1 - \Phi(1.06) = 1 - 0.8554 = 0.1446$.

**Bài 5:**

- Đề yêu cầu $P(-3 \le \overline{X} - \mu \le 3) \ge 0.95$.
- Chia các vế cho sai số chuẩn $\sigma/\sqrt{n}$: $P\left(\frac{-3}{12/\sqrt{n}} \le Z \le \frac{3}{12/\sqrt{n}}\right) \ge 0.95$.
- Trong phân phối chuẩn, để diện tích ở giữa chiếm 95%, giá trị $Z$ phải nằm trong khoảng $[-1.96, 1.96]$.
- Do đó, ta ép phần tử giới hạn phải bằng $1.96$: $\frac{3}{12/\sqrt{n}} \ge 1.96$ $\Rightarrow \frac{\sqrt{n}}{4} \ge 1.96$ $\Rightarrow \sqrt{n} \ge 1.96 \times 4 = 7.84$ $\Rightarrow n \ge 7.84^2 \approx 61.46$.
- Vậy cần lấy mẫu tối thiểu $n = 62$ linh kiện.

