Chào em! Thầy rất vui vì em đã sẵn sàng đi tiếp. Ở phần 7-3, chúng ta đã học cách **đánh giá** xem một bộ ước lượng (estimator) là "tốt" hay "xấu" (thông qua Bias, Variance, MSE).

Tuy nhiên, một câu hỏi rất tự nhiên được đặt ra là: **"Làm thế nào để TẠO RA các công thức ước lượng đó ngay từ đầu?"** Khi em đối mặt với một phân phối xác suất hoàn toàn mới trong thực tế, em không thể chỉ ngồi "đoán" công thức.

Bài học hôm nay, **7-4 Methods of Point Estimation**, sẽ cung cấp cho em 3 "vũ khí" toán học mạnh mẽ nhất để tự xây dựng các bộ ước lượng: Phương pháp Moment, Phương pháp Hợp lý cực đại (MLE), và Phương pháp Bayes. Chúng ta bắt đầu nhé!

---

### 1. Giải thích khái niệm bằng ngôn ngữ đơn giản

- **7-4.1 Method of Moments (Phương pháp Moment - MoM):** Hãy tưởng tượng em đang nặn một bức tượng đất sét sao cho giống với cái bóng của một người thật. "Moment" giống như các đặc trưng cơ bản (chiều cao, cân nặng...). Phương pháp này nói rằng: _"Hãy điều chỉnh các tham số của tổng thể sao cho các đặc trưng (moment) của tổng thể BẰNG ĐÚNG với các đặc trưng của mẫu mà ta thu thập được"_.
- **7-4.2 Method of Maximum Likelihood (Phương pháp Hợp lý cực đại - MLE):** Giả sử em bước vào phòng và thấy một chiếc bánh bị ăn vụng. Trong nhà có một con chó và một con chuột. Xác suất chó ăn vụng là cao, xác suất chuột ăn là thấp. Dựa vào "dữ liệu" (kết quả đã xảy ra), em kết luận thủ phạm là con chó vì nó làm cho dữ liệu trở nên "hợp lý nhất". MLE chính là việc tìm ra bộ tham số $\theta$ sao cho xác suất sinh ra tập dữ liệu mẫu em đang có tay là **CAO NHẤT**,.
- **7-4.3 Bayesian Estimation (Ước lượng Bayes):** Nếu MLE chỉ hoàn toàn tin vào dữ liệu mẫu, thì Bayes cho phép em kết hợp "kinh nghiệm quá khứ" (Prior) với "dữ liệu hiện tại" (Likelihood) để đưa ra "niềm tin mới" (Posterior),.

### 2. Định nghĩa học thuật chính xác & 5. Công thức liên quan

- **Phương pháp Moment (MoM):** Moment quần thể bậc $k$ là $E(X^k)$. Moment mẫu bậc $k$ là $\frac{1}{n}\sum_{i=1}^n X_i^k$. Để tìm $m$ tham số chưa biết, ta thiết lập hệ phương trình bằng cách cho $m$ moment quần thể bằng $m$ moment mẫu tương ứng, rồi giải hệ phương trình đó,.
- **Hàm hợp lý (Likelihood Function - $L(\theta)$):** Cho $X$ là biến ngẫu nhiên có hàm phân phối $f(x;\theta)$. Với một mẫu ngẫu nhiên $x_1, x_2, ..., x_n$, hàm hợp lý là tích các xác suất (hoặc mật độ) của từng quan sát: $$L(\theta) = f(x_1;\theta) \cdot f(x_2;\theta) \cdots f(x_n;\theta) = \prod_{i=1}^n f(x_i;\theta)$$
- **Phương pháp MLE:** Bộ ước lượng MLE $\hat{\Theta}$ là giá trị làm cực đại hàm $L(\theta)$. Trong thực hành, ta thường lấy ln của hàm hợp lý (gọi là log-likelihood) để chuyển phép nhân thành phép cộng, rồi lấy đạo hàm bậc 1 theo $\theta$ và cho bằng 0: $$\frac{d \ln L(\theta)}{d\theta} = 0$$,
- **Định lý Bayes cho ước lượng:** $$f(\theta|x_1, x_2, ..., x_n) = \frac{f(x_1, x_2, ..., x_n | \theta) \cdot f(\theta)}{f(x_1, x_2, ..., x_n)}$$ Trong đó, $f(\theta)$ là phân phối tiên nghiệm (Prior), $f(\theta|x)$ là phân phối hậu nghiệm (Posterior). Ước lượng Bayes thường được lấy là **trung bình** của phân phối hậu nghiệm,.

### 3. Giải thích trực giác đằng sau công thức

- **Tại sao lại dùng Logarit tự nhiên ($\ln$) trong MLE?** Vì đạo hàm của một tích cực kỳ phức tạp (phải dùng quy tắc chuỗi liên tục). Lấy $\ln$ sẽ biến $\prod$ (tích) thành $\sum$ (tổng). Hơn nữa, hàm $\ln(x)$ là hàm đồng biến, nên giá trị $\theta$ làm cực đại $\ln L(\theta)$ cũng chính là giá trị làm cực đại $L(\theta)$.
- **Tính chất bất biến (Invariance Property) của MLE:** Nếu $\hat{\theta}$ là MLE của $\theta$, thì MLE của một hàm $h(\theta)$ chính là $h(\hat{\theta})$. Trực giác: Nếu ước lượng tốt nhất cho bán kính hình tròn là $r = 5$, thì ước lượng tốt nhất cho diện tích sẽ là $\pi \cdot 5^2$.

### 4. Ý nghĩa từng ký hiệu

- $E(X^k)$: Kỳ vọng bậc $k$ (Moment quần thể).
- $L(\theta)$: Hàm Likelihood (Hợp lý). Phụ thuộc vào $\theta$ khi dữ liệu $x_i$ đã biết.
- $\prod$: Ký hiệu phép nhân liên tiếp.
- $f(\theta)$: Phân phối Prior (niềm tin chủ quan của kỹ sư trước khi có dữ liệu).
- $f(\theta|x)$: Phân phối Posterior (niềm tin sau khi đã cập nhật dữ liệu).

### 5. Minh họa bằng ví dụ thực tế (Software Engineering)

**Xây dựng bộ lọc Spam (Bayesian Estimation):** Kỹ sư phần mềm trước khi phân tích nội dung email, đã có một "niềm tin" (Prior probability) rằng 20% lượng email vào hệ thống là Spam ($f(\theta)$). Khi email chứa từ "Khuyến mãi", hệ thống tính toán xác suất từ này xuất hiện trong Spam và Non-Spam (Likelihood). Cuối cùng, hệ thống cập nhật lại xác suất email đó là Spam (Posterior).

### 6. Giải ví dụ từng bước

**Ví dụ 1: Phương pháp Moment (MoM) cho phân phối Mũ (Exponential)** Thời gian hỏng của 8 server (đơn vị: nghìn giờ) tuân theo phân phối mũ với tham số $\lambda$. Dữ liệu thu được: $x_1=11.96, x_2=5.03, x_3=67.40, x_4=16.07, x_5=31.50, x_6=7.73, x_7=11.10, x_8=22.38$. Hãy tìm ước lượng MoM cho $\lambda$.

- **Bước 1:** Xác định số tham số cần tìm. Có 1 tham số là $\lambda$, nên ta chỉ cần 1 phương trình moment bậc 1.
- **Bước 2:** Tính moment quần thể bậc 1. Với phân phối mũ, $E(X) = 1/\lambda$.
- **Bước 3:** Tính moment mẫu bậc 1. Chính là trung bình mẫu $\overline{x}$. Ta tính được $\overline{x} = \frac{11.96 + ... + 22.38}{8} = 21.65$.
- **Bước 4:** Cho Moment quần thể = Moment mẫu: $$1/\lambda = \overline{x}$$ $$\Rightarrow \hat{\lambda} = 1/\overline{x} = 1 / 21.65 = 0.0462$$

**Ví dụ 2: Phương pháp Hợp lý cực đại (MLE) cho phân phối Bernoulli**, Kiểm tra $n$ sản phẩm phần mềm, $x_i = 1$ nếu có lỗi, $x_i = 0$ nếu không có lỗi. Xác suất lỗi là $p$. Tìm MLE cho $p$.

- **Bước 1:** Viết hàm xác suất cho 1 quan sát: $f(x_i; p) = p^{x_i}(1-p)^{1-x_i}$.
- **Bước 2:** Viết hàm Likelihood cho $n$ quan sát: $$L(p) = \prod_{i=1}^n p^{x_i}(1-p)^{1-x_i} = p^{\sum x_i}(1-p)^{n-\sum x_i}$$
- **Bước 3:** Lấy Log-likelihood: $$\ln L(p) = (\sum x_i)\ln(p) + (n-\sum x_i)\ln(1-p)$$
- **Bước 4:** Lấy đạo hàm theo $p$ và cho bằng 0: $$\frac{d \ln L(p)}{dp} = \frac{\sum x_i}{p} - \frac{n-\sum x_i}{1-p} = 0$$
- **Bước 5:** Giải phương trình tìm $\hat{p}$: $$\frac{\sum x_i}{p} = \frac{n-\sum x_i}{1-p}$$ $$(1-p)\sum x_i = p(n-\sum x_i)$$ $$\sum x_i - p\sum x_i = pn - p\sum x_i$$ $$pn = \sum x_i \Rightarrow \hat{p} = \frac{\sum x_i}{n} = \overline{X}$$

### 7. Các lỗi sai phổ biến của sinh viên

- **Quên quy tắc dây chuyền (Chain rule) khi lấy đạo hàm MLE:** Đặc biệt khi tính MLE cho phân phối Normal, đạo hàm của $e^{-f(x)}$ sinh viên rất hay tính sai dấu âm.
- **Mù quáng lấy đạo hàm cho mọi bài MLE:** Đối với phân phối Uniform (Đồng đều) $U(0, a)$, hàm Likelihood là $1/a^n$. Nếu em lấy đạo hàm sẽ ra $-n/a^{n+1} = 0$ (vô nghiệm). Phải dùng logic: Để $1/a^n$ lớn nhất thì $a$ phải nhỏ nhất. Mà $a$ phải lớn hơn mọi quan sát $x_i$, nên MLE là $\hat{a} = \max(X_i)$.
- **Nhầm lẫn Phương sai Mẫu của MoM và MLE:** Sinh viên hay quên rằng bộ ước lượng phương sai $\hat{\sigma}^2$ tìm bằng MoM và MLE đều có mẫu số là $n$ (bị chệch - biased). Chỉ có phương sai mẫu $S^2$ (chia cho $n-1$) mới là không chệch.

### 8. So sánh với các khái niệm dễ nhầm lẫn

- **MLE vs. MoM:** MLE thường cho ra bộ ước lượng tốt hơn (phương sai nhỏ nhất, cực kỳ hiệu quả - efficient). Tuy nhiên, toán học của MLE có thể rất phức tạp (như phân phối Gamma phải giải bằng máy tính). MoM dễ tính toán hơn rất nhiều nhưng đôi khi lại cho ra bộ ước lượng không tốt bằng.
- **Classical Statistics (MoM, MLE) vs. Bayesian:** Classical coi tham số $\theta$ là một hằng số bị giấu kín (Fixed constant). Bayesian coi $\theta$ là một **biến ngẫu nhiên** có phân phối xác suất riêng.

---

### TÓM TẮT KIẾN THỨC VÀ CÔNG THỨC CẦN NHỚ

1. **MoM:** Cho $E(X) = \overline{X}$, $E(X^2) = \frac{\sum X_i^2}{n}$,... để giải tìm tham số.
2. **MLE:** Các bước chuẩn: Tìm $L(\theta)$ $\rightarrow$ Tìm $\ln L(\theta)$ $\rightarrow$ Lấy đạo hàm $\frac{d}{d\theta} = 0$ $\rightarrow$ Tìm $\hat{\theta}$.
3. **Invariance Property của MLE:** Nếu $\hat{\theta}$ là MLE của $\theta$, thì $h(\hat{\theta})$ là MLE của $h(\theta)$.
4. **Bayes:** Phân phối hậu nghiệm tỷ lệ thuận với: Likelihood $\times$ Prior.

---

### CÂU HỎI LÝ THUYẾT (Tự kiểm tra)

1. Sự khác biệt triết lý cốt lõi giữa ước lượng MLE và ước lượng Bayes là gì?
2. Tại sao người ta lại sử dụng hàm log-likelihood thay vì tối đa hóa trực tiếp hàm likelihood?
3. Tính chất bất biến (invariance property) của bộ ước lượng MLE là gì?
4. Nếu phương pháp Moment (MoM) tìm ra ước lượng phương sai là $\sum(x_i - \overline{x})^2/n$, ước lượng này có chệch không? Tại sao?
5. Gặp trường hợp nào thì em không thể dùng đạo hàm để tìm cực đại cho hàm Likelihood?

---

### BÀI TẬP THỰC HÀNH

**Mức độ Cơ bản:** 
	**Bài 1:** Thời gian chờ $X$ là một biến ngẫu nhiên phân phối mũ với $E(X) = 1/\lambda$. Từ mẫu $n=4$ có các giá trị ${2, 4, 6, 8}$, hãy tìm ước lượng Moment (MoM) cho $\lambda$.
	**Bài 2:** Xét hàm mật độ xác suất $f(x;\theta) = \theta x^{\theta-1}$ với $0 \le x \le 1$ và $\theta > 0$. Viết hàm Likelihood $L(\theta)$ cho một mẫu $n$ quan sát $x_1, x_2, ..., x_n$. 
	**Bài 3:** Từ bài 2, hãy viết hàm log-likelihood $\ln L(\theta)$. 
	**Bài 4:** Nếu $\hat{\sigma}^2$ là MLE của phương sai, theo tính chất bất biến, MLE của độ lệch chuẩn $\sigma$ là gì? 
	**Bài 5:** Phân phối hậu nghiệm (Posterior) trong Bayes được cấu thành từ hai yếu tố nào?

**Mức độ Trung bình:** 
	**Bài 6:** (Tiếp nối Bài 2 & 3). Lấy đạo hàm hàm log-likelihood và tìm ước lượng MLE cho $\theta$. 
	**Bài 7:** Cho $X \sim N(\mu, \sigma^2)$ với $\sigma^2$ đã biết. Hãy tìm ước lượng MLE cho $\mu$,. 
	**Bài 8:** (Tìm ước lượng MoM). Cho $X$ có phân phối chuẩn $N(\mu, \sigma^2)$. Hãy dùng phương pháp Moment để thiết lập hệ phương trình tìm $\mu$ và $\sigma^2$. 
	**Bài 9:** Giải hệ phương trình ở Bài 8 để chốt lại công thức $\hat{\mu}_{MoM}$ và $\hat{\sigma}^2_{MoM}$. 
	**Bài 10:** Cho bài toán tung đồng xu có xác suất ngửa là $p$. Tung $n$ lần được $x$ lần ngửa. Tính MLE của hàm số $h(p) = p(1-p)$ (đây chính là phương sai của phân phối Bernoulli).

**Mức độ Nâng cao:** 
	**Bài 11:** Phân phối Rayleigh có hàm mật độ $f(x) = \frac{x}{\theta}e^{-x^2/2\theta}$ với $x>0$. Tìm ước lượng MLE cho $\theta$. 
	**Bài 12:** (Tiếp Bài 11). Biết rằng với phân phối Rayleigh, $E(X^2) = 2\theta$. Hãy tìm ước lượng MoM cho $\theta$. 
	**Bài 13:** Phân phối Uniform (đồng đều) liên tục trên khoảng $[0, a]$. Hàm mật độ $f(x) = 1/a$. Viết hàm Likelihood. Hãy giải thích bằng lời tại sao đạo hàm không thể dùng để tìm MLE của $a$, và đề xuất bộ ước lượng MLE đúng. 
	**Bài 14:** Cho hàm mật độ $f(x) = c(1+\theta x)$ với $-1 \le x \le 1$. Đầu tiên hãy tính hằng số $c$. Sau đó tính $E(X)$. Cuối cùng tìm ước lượng MoM cho $\theta$,. 
	**Bài 15:** Giả sử thời gian hỏng của 1 server tuân theo phân phối mũ $\lambda$. Tiên nghiệm (Prior) của $\lambda$ là một phân phối Gamma với tham số $r$ và $\alpha$. Không cần tính toán chi tiết, hãy trình bày luồng tư duy để tìm Bayes Estimator cho $\lambda$.

---

### ĐÁP ÁN VÀ LỜI GIẢI CHI TIẾT

**A. Trả lời Câu hỏi Lý thuyết**

1. MLE coi tham số là một hằng số cố định, ước lượng hoàn toàn dựa trên mẫu. Bayes coi tham số là biến ngẫu nhiên, ước lượng dựa trên cả mẫu và niềm tin chủ quan từ trước (Prior).
2. Lấy logarit giúp biến phép nhân $\prod$ các xác suất thành phép cộng $\sum$, giúp việc lấy đạo hàm dễ dàng hơn rất nhiều mà không làm thay đổi vị trí đạt cực đại.
3. Nếu $\hat{\theta}$ là MLE của $\theta$, thì hàm $h(\hat{\theta})$ cũng chính là MLE của hàm $h(\theta)$.
4. Có chệch (Biased). Vì chia cho $n$, kỳ vọng của nó sẽ là $\frac{n-1}{n}\sigma^2$, nhỏ hơn thực tế một chút.
5. Khi hàm Likelihood có đạo hàm luôn khác 0 hoặc không tồn tại đạo hàm tại điểm cực đại (ví dụ phân phối Uniform $U(0,a)$ có hàm Likelihood liên tục giảm theo $a$).

**B. Bài tập Cơ bản** 
	**Bài 1:** $\overline{x} = (2+4+6+8)/4 = 5$. Phương trình MoM: $1/\lambda = \overline{x} \Rightarrow \hat{\lambda} = 1/5 = 0.2$. 
	**Bài 2:** $L(\theta) = \prod_{i=1}^n \theta x_i^{\theta-1} = \theta^n \prod_{i=1}^n x_i^{\theta-1}$. 
	**Bài 3:** $\ln L(\theta) = n \ln(\theta) + (\theta-1)\sum_{i=1}^n \ln(x_i)$. 
	**Bài 4:** Dựa vào tính bất biến, MLE của $\sigma$ là $\hat{\sigma} = \sqrt{\hat{\sigma}^2}$. 
	**Bài 5:** Phân phối xác suất Tiên nghiệm (Prior) và Hàm hợp lý của dữ liệu mẫu (Likelihood).

**C. Bài tập Trung bình** 
**Bài 6:** Đạo hàm $\ln L(\theta)$ theo $\theta$: $\frac{d}{d\theta} [n \ln(\theta) + (\theta-1)\sum \ln(x_i)] = \frac{n}{\theta} + \sum \ln(x_i) = 0$ $\Rightarrow \hat{\theta} = \frac{-n}{\sum \ln(X_i)}$. 
**Bài 7:** $\ln L(\mu) = -\frac{n}{2}\ln(2\pi\sigma^2) - \frac{1}{2\sigma^2}\sum(x_i-\mu)^2$. Đạo hàm theo $\mu$: $\frac{1}{\sigma^2}\sum(x_i-\mu) = 0 \Rightarrow \sum x_i - n\mu = 0 \Rightarrow \hat{\mu} = \overline{X}$. 
**Bài 8:** $E(X) = \mu$, $E(X^2) = \mu^2 + \sigma^2$. Hệ pt: $\mu = \overline{X}$ (1) và $\mu^2 + \sigma^2 = \frac{1}{n}\sum X_i^2$ (2). 
**Bài 9:** Thế (1) vào (2): $\sigma^2 = \frac{1}{n}\sum X_i^2 - \overline{X}^2$. Bằng đại số, ta rút gọn được $\hat{\sigma}^2_{MoM} = \frac{\sum(X_i - \overline{X})^2}{n}$. 
**Bài 10:** MLE của $p$ là $\hat{p} = \overline{X}$ (như ví dụ phần lý thuyết). Dựa vào tính bất biến, MLE của $p(1-p)$ chính là $\hat{p}(1-\hat{p}) = \overline{X}(1-\overline{X})$.

**D. Bài tập Nâng cao** 
**Bài 11:** $L(\theta) = \prod \frac{x_i}{\theta}e^{-x_i^2/2\theta} = \frac{\prod x_i}{\theta^n} e^{-\sum x_i^2 / 2\theta}$. $\ln L(\theta) = \ln(\prod x_i) - n\ln(\theta) - \frac{\sum x_i^2}{2\theta}$. Đạo hàm theo $\theta$: $-\frac{n}{\theta} + \frac{\sum x_i^2}{2\theta^2} = 0 \Rightarrow \frac{n}{\theta} = \frac{\sum x_i^2}{2\theta^2} \Rightarrow n\theta = \frac{\sum x_i^2}{2} \Rightarrow \hat{\theta}_{MLE} = \frac{\sum X_i^2}{2n}$. 
**Bài 12:** Cho $E(X^2) = \text{Moment mẫu bậc 2}$. $2\theta = \frac{1}{n}\sum X_i^2 \Rightarrow \hat{\theta}_{MoM} = \frac{\sum X_i^2}{2n}$. (Trùng hợp MLE = MoM). 
**Bài 13:** $L(a) = \frac{1}{a^n}$ với điều kiện $a \ge x_i$ cho mọi $i$. Đạo hàm $\frac{d}{da}(a^{-n}) = -na^{-n-1} < 0$. Hàm này luôn nghịch biến (càng tăng $a$ thì Likelihood càng giảm). Vậy để Likelihood đạt Max, $a$ phải đạt Min. Mà $a$ bị chặn dưới bởi giá trị lớn nhất trong mẫu. Vậy $\hat{a}_{MLE} = \max(X_1, ..., X_n)$. 
**Bài 14:** Tính c: $\int_{-1}^1 c(1+\theta x)dx = 1 \Rightarrow c[x + \frac{\theta x^2}{2}]_{-1}^1 = 1 \Rightarrow c[(1 + \theta/2) - (-1 + \theta/2)] = c(2) = 1 \Rightarrow c = 1/2$. Tính $E(X)$: $\int_{-1}^1 x \frac{1}{2}(1+\theta x)dx = \frac{1}{2} \int_{-1}^1 (x + \theta x^2)dx = \frac{1}{2} [\frac{x^2}{2} + \frac{\theta x^3}{3}]_{-1}^1 = \frac{1}{2} [\frac{\theta}{3} - (-\frac{\theta}{3})] = \frac{\theta}{3}$. MoM: Cho $E(X) = \overline{X} \Rightarrow \frac{\theta}{3} = \overline{X} \Rightarrow \hat{\theta}_{MoM} = 3\overline{X}$. 
**Bài 15:**

1. Lấy Prior Distribution là hàm mật độ của Gamma phân phối cho $\lambda$.
2. Xây dựng Likelihood Function $L(\lambda)$ cho mẫu tuân theo phân phối mũ.
3. Nhân Prior với Likelihood để tìm phân phối Posterior theo định lý Bayes.
4. Ước lượng Bayes chính là Kỳ vọng (Mean) của phân phối Posterior vừa tìm được.

Em hãy kiểm tra kỹ các bước lấy đạo hàm (đặc biệt bài phân phối Rayleigh và bài $U(0,a)$ nhé). Đây là các kỹ thuật xuất hiện rất nhiều trong thi. Nếu em đã hiểu tường tận **7-4 Methods of Point Estimation**, hãy báo thầy để chúng ta sang **Chapter 8 - Statistical Intervals** (Khoảng tin cậy) - đây sẽ là kiến thức dùng cho Assignment trực tiếp đấy!