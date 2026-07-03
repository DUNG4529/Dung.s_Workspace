# 1.1 Development of the Confidence Interval and Its Basic Properties

**1. Bản chất/ý nghĩa thực tế:**  
Khi chúng ta dùng trung bình mẫu $\bar{x}$ để ước lượng trung bình tổng thể $\color{#d33682}{\mu}$, giá trị này hiếm khi chính xác tuyệt đối. **Confidence Interval** (Khoảng tin cậy) cung cấp một khoảng các giá trị hợp lý cho $\color{#d33682}{\mu}$ cùng với một mức độ tin cậy nhất định (thường là 90%, 95%, 99%).  
Ý nghĩa của **Confidence Level** $1-\alpha$ (ví dụ: 95%): Không phải là *"có 95% xác suất $\color{#d33682}{\mu}$ rơi vào khoảng cụ thể này"*. Theo quan điểm tần suất (frequentist), điều này có nghĩa là nếu chúng ta lặp lại thí nghiệm này vô số lần, lấy các mẫu khác nhau và tính các khoảng tin cậy tương ứng, thì 95% trong số các khoảng đó sẽ chứa giá trị thực (nhưng chưa biết) của $\color{#d33682}{\mu}$.

**2. Công thức bằng LaTeX:**  
Khoảng tin cậy $100(1-\alpha)\%$ cho $\color{#d33682}{\mu}$ là:
$$
\bbox[#f0f8ff, 5px, border: 2px solid #268bd2]{
\bar{x} - z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}} \le \color{#d33682}{\mu} \le \bar{x} + z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}
}
$$

**3. Điều kiện áp dụng:**  
- Dữ liệu tuân theo **Normal Distribution** (hoặc $\color{#b58900}{n}$ đủ lớn).  
- **Variance Known** ($\color{#859900}{\sigma^2}$ đã biết).

**4. Các bước tính toán:**  
- **Bước 1:** Từ mẫu, chọn đại lượng **Pivotal Quantity** $\color{#268bd2}{Z} = \frac{\bar{X} - \color{#d33682}{\mu}}{\color{#859900}{\sigma}/\sqrt{\color{#b58900}{n}}}$. Vì $\bar{X}$ tuân theo phân phối chuẩn với trung bình $\color{#d33682}{\mu}$ và phương sai $\color{#859900}{\sigma}^2/\color{#b58900}{n}$, nên biến $\color{#268bd2}{Z}$ khi được chuẩn hóa sẽ tuân theo **Standard Normal Distribution** $N(0,1)$.  
- **Bước 2:** Với $\alpha$ cho trước, ta có xác suất:  
  $$
  P(-z_{\alpha/2} \le \color{#268bd2}{Z} \le z_{\alpha/2}) = 1 - \alpha
  $$  
- **Bước 3:** Thay $\color{#268bd2}{Z}$ vào và giải bất phương trình để cô lập $\color{#d33682}{\mu}$:  
  $$
  P\left(-z_{\alpha/2} \le \frac{\bar{X} - \color{#d33682}{\mu}}{\color{#859900}{\sigma}/\sqrt{\color{#b58900}{n}}} \le z_{\alpha/2}\right) = 1 - \alpha
  $$  
  $$
  P\left(\bar{X} - z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}} \le \color{#d33682}{\mu} \le \bar{X} + z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}\right) = 1 - \alpha
  $$.

**5. So sánh:**  
Khác với Point Estimate (chỉ cho 1 giá trị duy nhất $\bar{x}$ và không cung cấp thông tin về sai số), **Confidence Interval** cho ta một khoảng giới hạn bằng **Margin of Error**.

**6. Sai lầm thường gặp:**  
Diễn đạt sai ý nghĩa của **Confidence Level**. Khi nói *"Khoảng [A, B] chứa $\color{#d33682}{\mu}$ với xác suất 95%"* là sai, vì $\color{#d33682}{\mu}$ là hằng số (không ngẫu nhiên) và khoảng [A, B] đã cố định. Câu đúng là: *"Chúng ta có độ tin cậy 95% rằng khoảng [A, B] chứa $\color{#d33682}{\mu}$"*.

- **Ví dụ:** $\color{#b58900}{n}=25$, $\bar{x}=10.5$, $\color{#859900}{\sigma}=2$, $\alpha=0.05$.  
  Ta có **Critical Value** $z_{0.025} = 1.96$.  
  **Margin of Error** = $1.96 \times \frac{2}{\sqrt{25}} = 1.96 \times 0.4 = 0.784$.  
  Khoảng tin cậy 95%: $10.5 \pm 0.784 \rightarrow [9.716, 11.284]$.

---

# 1.2 Choice of Sample Size

**1. Bản chất/ý nghĩa thực tế:**  
Trong kỹ thuật, ta thường muốn thiết kế một thí nghiệm sao cho sai số ước lượng không vượt quá một ngưỡng cho trước (gọi là **Margin of Error**, $\color{#dc322f}{E}$). Việc này cho phép chúng ta tối ưu hóa chi phí bằng cách tính toán chính xác **Sample Size** ($\color{#b58900}{n}$) cần thiết trước khi thu thập dữ liệu.

**2. Công thức bằng LaTeX:**  
Dựa vào $\color{#dc322f}{E} = z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}$, ta giải ra $\color{#b58900}{n}$:
$$
\bbox[#fff5e6, 5px, border: 2px solid #b58900]{
\color{#b58900}{n} = \left(\frac{z_{\alpha/2} \color{#859900}{\sigma}}{\color{#dc322f}{E}}\right)^2
}
$$

**3. Điều kiện áp dụng:**  
- Áp dụng khi lên kế hoạch thí nghiệm.  
- Cần biết trước (hoặc có ước lượng tốt về) $\color{#859900}{\sigma}$. Nếu $\color{#859900}{\sigma}$ chưa biết, thực tế ta sẽ dùng dữ liệu từ các nghiên cứu trước đó, hoặc chạy một *"pilot sample"* (mẫu thử) để lấy giá trị $\color{#859900}{s}$ ước lượng cho $\color{#859900}{\sigma}$.  
- Nếu tính ra $\color{#b58900}{n}$ là số thập phân, **luôn luôn làm tròn lên** số nguyên tiếp theo để đảm bảo độ tin cậy.

**4. Các bước tính toán:**  
Xác định $\color{#dc322f}{E}$, tìm $z_{\alpha/2}$ dựa vào **Confidence Level**, ước lượng $\color{#859900}{\sigma}$, thay vào công thức và làm tròn lên.

**5. Mối quan hệ giữa các biến:**  
- $\color{#b58900}{n}$ và $\color{#dc322f}{E}$: Tỉ lệ nghịch. Muốn sai số giảm (chính xác hơn), cần $\color{#b58900}{n}$ lớn hơn.  
- $\color{#b58900}{n}$ và **Confidence Level**: Tỉ lệ thuận. Muốn độ tin cậy cao hơn ($z_{\alpha/2}$ lớn hơn), cần $\color{#b58900}{n}$ lớn hơn.  
- $\color{#b58900}{n}$ và $\color{#859900}{\sigma}$: Tỉ lệ thuận. Dữ liệu càng phân tán ($\color{#859900}{\sigma}$ lớn), càng cần nhiều mẫu để ước lượng chính xác.

**6. Sai lầm thường gặp:**  
Làm tròn toán học thông thường (ví dụ 24.3 làm tròn xuống 24). Trong thống kê, $\color{#b58900}{n}=24$ sẽ không đủ mức tin cậy yêu cầu, phải làm tròn lên 25. Hoặc đôi khi quên bình phương toàn bộ biểu thức mà chỉ bình phương mẫu số.

- **Ví dụ:** Muốn $\color{#dc322f}{E} \le 2$ cm, $\color{#859900}{\sigma} = 5$ cm, **Confidence Level** 95% ($z_{0.025} = 1.96$).  
  $\color{#b58900}{n} = \left(\frac{1.96 \times 5}{2}\right)^2 = (4.9)^2 = 24.01$.  
  Làm tròn lên, ta cần lấy **Sample Size** $\color{#b58900}{n} = 25$.

---

# 1.3 One-Sided Confidence Bounds

**1. Bản chất/ý nghĩa thực tế:**  
Có những bài toán kỹ thuật ta chỉ quan tâm đến một chiều. Ví dụ: Sức chịu tải của một thanh kim loại phải *ít nhất* là bao nhiêu (Lower Bound), hoặc mức phát thải khí độc của một động cơ *tối đa* là bao nhiêu (Upper Bound). Lúc này ta dùng **One-Sided Confidence Bounds**.

**2. Công thức bằng LaTeX:**  
- **Upper Bound:**  
  $$
  \bbox[#fdf0f0, 5px, border: 2px solid #dc322f]{
  \color{#d33682}{\mu} \le \bar{x} + z_{\alpha}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}
  }
  $$  
- **Lower Bound:**  
  $$
  \bbox[#f0fdf0, 5px, border: 2px solid #859900]{
  \bar{x} - z_{\alpha}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}} \le \color{#d33682}{\mu}
  }
  $$

**3. Điều kiện áp dụng:**  
- Bài toán chỉ quan tâm đến giới hạn trên hoặc giới hạn dưới.  
- **Variance Known**.

**4. Các bước tính toán / Giải thích $z_\alpha$:**  
Thay vì chia rủi ro $\alpha$ ra 2 đuôi (mỗi đuôi $\alpha/2$), ta dồn toàn bộ rủi ro $\alpha$ về một đuôi duy nhất. Do đó, ta dùng **Critical Value** $z_\alpha$ thay vì $z_{\alpha/2}$. Điều này giúp ta có một cận *"chặt chẽ"* hơn (gần với $\bar{x}$ hơn) ở phía ta quan tâm, vì $z_\alpha < z_{\alpha/2}$.

**5. So sánh với hai phía:**  
Nếu dùng **Confidence Interval** hai phía, cận dưới sẽ thấp hơn và cận trên sẽ cao hơn. Nếu ta chỉ cần một cận, **One-Sided Confidence Bounds** ưu việt hơn vì nó cho ta một điểm chặn tốt hơn với cùng một **Confidence Level**.

**6. Sai lầm thường gặp:**  
Theo thói quen, sinh viên dùng $z_{\alpha/2}$ cho bài toán một phía, dẫn đến cận tìm được bị *"rộng"* một cách không cần thiết.

- **Ví dụ:** Tìm Upper bound với $\alpha=0.05$, $\bar{x}=98$, $\color{#859900}{\sigma}=3$, $\color{#b58900}{n}=30$.  
  Với $\alpha=0.05$, một phía ta có $z_{0.05} = 1.645$ (so với 1.96 nếu là hai phía).  
  Upper Bound = $98 + 1.645 \times \frac{3}{\sqrt{30}} = 98 + 1.645 \times 0.5477 \approx 98.901$.  
  Vậy $\color{#d33682}{\mu} \le 98.901$ với 95% độ tin cậy.

---

# 1.4 General Method to Derive a Confidence Interval

**1. Bản chất/ý nghĩa thực tế:**  
Đây là phương pháp tổng quát (meta-method) là *"kim chỉ nam"* cho mọi chương sau (kiểm định $\color{#d33682}{\mu}$ khi $\color{#859900}{\sigma}$ chưa biết, kiểm định phương sai, tỷ lệ...). Nó hướng dẫn chúng ta cách xây dựng khoảng tin cậy từ số không.

**2. Công thức bằng LaTeX:**  
Xuất phát từ hàm $\color{#268bd2}{g(X_1, \dots, X_n; \theta)}$:
$$
P(C_L \le \color{#268bd2}{g(X_1, \dots, X_n; \theta)} \le C_U) = 1 - \alpha
$$  
Biến đổi đại số để đưa về:
$$
\bbox[#f5f0ff, 5px, border: 2px solid #6c71c4]{
P(L(X_1, \dots, X_n) \le \color{#d33682}{\theta} \le U(X_1, \dots, X_n)) = 1 - \alpha
}
$$

**3. Điều kiện áp dụng / Yêu cầu của Pivotal Quantity:**  
Hàm $\color{#268bd2}{g}$ (gọi là **Pivotal Quantity**) phải thỏa mãn 2 điều kiện:  
1. Phụ thuộc vào dữ liệu mẫu ($X_i$) và tham số cần ước lượng ($\color{#d33682}{\theta}$).  
2. Phân phối xác suất của $\color{#268bd2}{g}$ **KHÔNG** được phụ thuộc vào $\color{#d33682}{\theta}$ hay bất kỳ tham số chưa biết nào khác.

**4. Các bước tính toán (áp dụng cho 8-1.1 để minh họa):**  
- **Chọn hàm:** $\color{#d33682}{\theta} = \color{#d33682}{\mu}$. Ta chọn $\color{#268bd2}{g} = \color{#268bd2}{Z} = \frac{\bar{X} - \color{#d33682}{\mu}}{\color{#859900}{\sigma}/\sqrt{\color{#b58900}{n}}}$. Hàm này chứa dữ liệu ($\bar{X}$) và tham số ($\color{#d33682}{\mu}$).  
- **Tìm phân phối:** $\color{#268bd2}{Z}$ tuân theo **Standard Normal Distribution** $N(0,1)$, hoàn toàn độc lập với $\color{#d33682}{\mu}$ và $\color{#859900}{\sigma}$ (đã biết).  
- **Tìm percentile:** $C_L = -z_{\alpha/2}$ và $C_U = z_{\alpha/2}$.  
- **Biến đổi bất đẳng thức:** Cô lập $\color{#d33682}{\mu}$ ở giữa để thu được $L = \bar{X} - z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}$ và $U = \bar{X} + z_{\alpha/2}\frac{\color{#859900}{\sigma}}{\sqrt{\color{#b58900}{n}}}$.

**5. So sánh:**  
Khác với việc *"học thuộc công thức"*, hiểu phương pháp này giúp bạn có thể tự xây dựng **Confidence Interval** cho phân phối mũ (Exponential), phân phối Poisson,....

**6. Sai lầm thường gặp:**  
Sinh viên chọn đại một hàm $\color{#268bd2}{g}$ mà phân phối của nó vẫn còn dính tham số chưa biết, khiến cho bước tìm $C_L$ và $C_U$ từ bảng thống kê trở nên bất khả thi.

- **Ví dụ:** Đã được chứng minh ngay trong phần biến đổi hàm $\color{#268bd2}{Z}$ ở trên.

---

# 1.5 Large-Sample Confidence Interval for μ

**1. Bản chất/ý nghĩa thực tế:**  
Trong thực tế, *"Variance Known"* là chuyện hiếm. Thông thường ta không biết $\color{#859900}{\sigma}$. Tuy nhiên, nếu ta lấy số lượng mẫu đủ lớn, ta có thể dùng độ lệch chuẩn của mẫu ($\color{#859900}{s}$) để thay thế cho $\color{#859900}{\sigma}$ mà không làm sai lệch quá nhiều kết quả.

**2. Công thức bằng LaTeX:**  
**Large-Sample Confidence Interval**:
$$
\bbox[#f0f8ff, 5px, border: 2px solid #268bd2]{
\bar{x} - z_{\alpha/2}\frac{\color{#859900}{s}}{\sqrt{\color{#b58900}{n}}} \le \color{#d33682}{\mu} \le \bar{x} + z_{\alpha/2}\frac{\color{#859900}{s}}{\sqrt{\color{#b58900}{n}}}
}
$$

**3. Điều kiện áp dụng:**  
- **Sample Size** lớn ($\color{#b58900}{n} \ge 30$, nhưng an toàn nhất là $\color{#b58900}{n} \ge 40$). Ngưỡng $\color{#b58900}{n}=30$ chỉ là quy tắc ngón tay cái (rule of thumb).  
- Nhờ có **Central Limit Theorem**, tổng thể (population) ban đầu dù không chuẩn (non-normal) thì phân phối của $\bar{X}$ vẫn sẽ xấp xỉ chuẩn.

**4. Các bước tính toán:**  
- Tính $\bar{x}$ và độ lệch chuẩn mẫu $\color{#859900}{s}$ từ dữ liệu.  
- Đảm bảo $\color{#b58900}{n}$ đủ lớn.  
- Tra bảng $z_{\alpha/2}$. Tính toán tương tự mục 8-1.1 nhưng thế $\color{#859900}{\sigma}$ bằng $\color{#859900}{s}$.

**5. So sánh:**  
Đây là xấp xỉ của công thức 8-1.1. Lưu ý: nếu $\color{#b58900}{n}$ nhỏ và tổng thể không phân phối chuẩn, ta **KHÔNG ĐƯỢC** dùng công thức này. Nếu $\color{#b58900}{n}$ nhỏ mà tổng thể phân phối chuẩn, ta phải dùng phân phối Student-$\color{#b58900}{t}$ với số bậc tự do (**Degrees of Freedom**) (Sẽ học ở bài sau).

**6. Sai lầm thường gặp:**  
Lạm dụng công thức có $z$ này cho các mẫu rất nhỏ ($\color{#b58900}{n} < 30$), dẫn đến khoảng tin cậy tính ra bị hẹp hơn thực tế, đánh giá sai (underestimate) rủi ro.

- **Ví dụ:** $\color{#b58900}{n}=40$, $\bar{x}=120$, $\color{#859900}{s}=15$, tìm khoảng 95%.  
  Ta có $z_{0.025} = 1.96$.  
  **Margin of Error** = $1.96 \times \frac{15}{\sqrt{40}} \approx 1.96 \times 2.3717 \approx 4.648$.  
  Khoảng tin cậy: $120 \pm 4.648 \rightarrow [115.352, 124.648]$.

---

### TÓM TẮT 3 ĐIỂM QUAN TRỌNG NHẤT

1. **Về lý thuyết:** Nền tảng của **Confidence Interval** mẫu lớn (Large-Sample) nằm ở **Central Limit Theorem**, cho phép $\bar{X}$ xấp xỉ **Normal Distribution** bất chấp phân phối gốc, và **Pivotal Quantity** cung cấp bộ khung toán học vững chắc để nội suy tham số $\color{#d33682}{\mu}$.
2. **Về áp dụng thực tế:** Xác định trước **Margin of Error** $\color{#dc322f}{E}$ để tính ngược **Sample Size** $\color{#b58900}{n}$ trước khi thí nghiệm là kỹ năng sống còn của kỹ sư để tiết kiệm tiền bạc và thời gian. Ngoài ra, hãy linh hoạt dùng **One-Sided Confidence Bounds** nếu bài toán chỉ yêu cầu kiểm soát 1 ngưỡng (ví dụ độ bền tối thiểu).
3. **Về lỗi dễ mắc:** Nhầm lẫn căn bản nhất là xem **Confidence Level** 95% là *"Xác suất 95% tham số $\color{#d33682}{\mu}$ nằm trong khoảng cố định vừa tính"*. Hãy nhớ, $\color{#d33682}{\mu}$ là hằng số, khoảng tính ra là ngẫu nhiên; 95% là độ tin cậy của quy trình lấy mẫu và tính toán lặp đi lặp lại.






Tôi đang học môn Statistics (Thống kê) ở trình độ đại học. Hãy đóng vai một giảng viên thống kê giàu kinh nghiệm và giải thích chi tiết mục 8-1 trong Chapter 8: Statistical Intervals for a Single Sample theo phong cách dạy học từng bước từ cơ bản đến nâng cao.

Yêu cầu bắt buộc cho mỗi mục con (8-1.1 đến 8-1.5):

1. Giải thích bằng ngôn ngữ đơn giản, dễ hiểu cho người mới học.
2. Trình bày định nghĩa học thuật chính xác.
3. Giải thích trực giác (intuition) đằng sau công thức.
4. Cho ví dụ thực tế trong đời sống, kỹ thuật, Data Science hoặc Machine Learning nếu phù hợp.
5. Trình bày đầy đủ các công thức toán học bằng LaTeX.
6. Giải thích ý nghĩa của từng ký hiệu xuất hiện trong công thức.
7. Chứng minh hoặc diễn giải nguồn gốc công thức khi cần thiết.
8. Giải ví dụ từng bước, không bỏ qua bất kỳ bước trung gian nào.
9. Chỉ ra lỗi sai phổ biến mà sinh viên thường mắc phải.
10. So sánh với các khái niệm liên quan để tránh nhầm lẫn.

Quy tắc ngôn ngữ: Giữ nguyên mọi thuật ngữ chuyên môn bằng tiếng Anh (ví dụ: Confidence Interval, Normal Distribution, Variance Known, Standard Normal Distribution, Pivotal Quantity, Sample Size, Margin of Error, Confidence Level, One-Sided Confidence Bounds, Central Limit Theorem, Critical Value, Large-Sample Confidence Interval).

Sau mỗi phần, hãy:
- Tóm tắt kiến thức quan trọng.
- Liệt kê các công thức cần nhớ.
- Đưa ra mẹo nhận biết dạng bài.

8-1 Confidence Interval on the Mean of a Normal Distribution, Variance Known

8-1.1 Development of the Confidence Interval and Its Basic Properties

Giải thích chi tiết:
- Confidence Interval là gì? Tại sao cần khoảng thay vì ước lượng điểm?
- Pivotal Quantity Z = (Xbar - mu)/(sigma/sqrt(n)). Giải thích:
  - Tại sao Z tuân theo Standard Normal Distribution?
  - Tại sao gọi là Pivotal Quantity? Vai trò của nó là gì?
- Quá trình xây dựng khoảng:
  - Bắt đầu từ P(-z_{alpha/2} <= Z <= z_{alpha/2}) = 1 - alpha
  - Biến đổi bất đẳng thức từng bước để thu được:
    xbar - z_{alpha/2}*sigma/sqrt(n) <= mu <= xbar + z_{alpha/2}*sigma/sqrt(n)
- Ý nghĩa của Confidence Level (1-alpha)*100%: giải thích cách hiểu đúng (không phải xác suất mu nằm trong khoảng).
- Các tính chất cơ bản: độ dài khoảng, sai số biên (Margin of Error), mối quan hệ với cỡ mẫu.

Ví dụ: Cho n=25, xbar=10.5, sigma=2. Xây dựng khoảng tin cậy 95% cho mu. Giải từng bước.

8-1.2 Choice of Sample Size

Giải thích chi tiết:
- Công thức n = (z_{alpha/2} * sigma / E)^2:
  - E là Margin of Error (sai số biên)
  - Giải thích từng thành phần.
- Mối quan hệ:
  - n tỉ lệ nghịch với bình phương E.
  - n tỉ lệ thuận với bình phương z_{alpha/2} (tức Confidence Level).
  - n tỉ lệ thuận với bình phương sigma (độ biến thiên tổng thể).
- Khi sigma chưa biết: dùng ước lượng từ pilot study hoặc nghiên cứu trước.
- Cách làm tròn n (luôn làm tròn lên).

Ví dụ: Muốn ước lượng chiều cao trung bình với sai số không quá 2 cm, độ tin cậy 95%, biết sigma=5 cm. Tính n.

8-1.3 One-Sided Confidence Bounds

Giải thích chi tiết:
- Khi nào cần One-Sided thay vì Two-Sided?
- Upper Confidence Bound: mu <= xbar + z_alpha * sigma/sqrt(n)
  - Ý nghĩa: giới hạn trên của mu.
  - Ví dụ thực tế: áp suất tối đa, nhiệt độ tối đa, chi phí tối đa.
- Lower Confidence Bound: mu >= xbar - z_alpha * sigma/sqrt(n)
  - Ý nghĩa: giới hạn dưới của mu.
  - Ví dụ thực tế: tuổi thọ tối thiểu, độ bền tối thiểu, hiệu suất tối thiểu.
- Tại sao dùng z_alpha thay vì z_{alpha/2}? (do xác suất dồn về một phía).
- So sánh khoảng một phía vs hai phía.

Ví dụ: Nhà sản xuất muốn đảm bảo nhiệt độ trung bình động cơ không vượt quá 100°C. Với alpha=0.05, xbar=98, sigma=3, n=30, tìm Upper Bound.

8-1.4 General Method to Derive a Confidence Interval

Giải thích chi tiết:
- Đây là phương pháp tổng quát để xây dựng bất kỳ Confidence Interval nào.
- 4 bước:
  1. Chọn một Pivotal Quantity: hàm của tham số và mẫu, có phân phối xác định và không phụ thuộc tham số chưa biết.
  2. Tìm phân phối của Pivotal Quantity đó.
  3. Dùng phân phối để tìm a, b sao cho P(a <= Pivotal Quantity <= b) = 1 - alpha.
  4. Biến đổi bất đẳng thức để tách tham số ra giữa.
- Nhấn mạnh: đây là kim chỉ nam cho tất cả các loại Confidence Interval sau này (t-interval, Chi-square interval, proportion interval, v.v.).
- Áp dụng lại phương pháp này cho trường hợp 8-1.1 để sinh viên thấy sự nhất quán.

8-1.5 Large-Sample Confidence Interval for mu

Giải thích chi tiết:
- Khi sample size đủ lớn (thường n >= 30), ta không cần giả định tổng thể chuẩn.
- Áp dụng Central Limit Theorem (CLT): Xbar ~ N(mu, sigma^2/n) một cách xấp xỉ.
- Công thức: xbar ± z_{alpha/2} * sigma/sqrt(n).
- Trong thực tế, sigma thường không biết, ta thay bằng sample standard deviation s:
  xbar ± z_{alpha/2} * s/sqrt(n).
- Lưu ý quan trọng:
  - Đây là xấp xỉ, không phải chính xác.
  - Không dùng khi n nhỏ và tổng thể không chuẩn (lúc đó dùng Bootstrap hoặc phương pháp phi tham số).
  - n >= 30 chỉ là quy tắc ngón tay cái; nên kiểm tra bằng Q-Q plot hoặc histogram.
- Phân biệt với trường hợp Variance Known (8-1.1) và Variance Unknown (sẽ học ở 8-2).

Ví dụ: Khảo sát 40 công nhân, xbar=120 sản phẩm/giờ, s=15. Tìm khoảng tin cậy 95% cho năng suất trung bình. Biết dữ liệu hơi lệch nhưng chấp nhận được.

Yêu cầu tổng kết cuối phần 8-1

Sau khi giải thích cả 5 mục trên, hãy tổng kết:

1. Mindmap: Sơ đồ tư duy tóm tắt toàn bộ nội dung 8-1 (mối quan hệ giữa các mục).
2. Các công thức quan trọng nhất: Liệt kê tất cả công thức cần nhớ (khoảng tin cậy, cỡ mẫu, một phía, v.v.).
3. Các dạng bài tập thường gặp:
   - Tính khoảng tin cậy khi biết sigma.
   - Tính cỡ mẫu cần thiết.
   - Xây dựng one-sided bound.
   - Áp dụng Large-Sample khi chưa biết sigma.
4. Chiến lược giải bài tập nhanh: Các bước nhận dạng và giải nhanh từng dạng.
5. Những lỗi sinh viên thường mắc phải: Tổng hợp các sai lầm phổ biến đã đề cập ở từng mục.
6. Bài tập tự luyện:
   - 3 bài tập cơ bản.
   - 3 bài tập trung bình.
   - 2 bài tập nâng cao.
   - Có đáp án và lời giải chi tiết cho tất cả.