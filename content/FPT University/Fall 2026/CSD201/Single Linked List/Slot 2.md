# Tổng quan về Single Linked List
**Danh sách liên kết đơn (Singly Linked List hay One-Way List)** là một cấu trúc dữ liệu tuyến tính cơ bản và quan trọng, được xây dựng dựa trên cơ chế cấp phát bộ nhớ động. Khác với mảng lưu trữ các phần tử trên các ô nhớ liên tục cố định, danh sách liên kết cho phép quản lý tập hợp dữ liệu co giãn linh hoạt trong quá trình thực thi.

---

### 1. Khái niệm và Cấu trúc Nút (Node)

Danh sách liên kết đơn bao gồm một chuỗi các đối tượng độc lập gọi là các **nút (node)**. Mỗi nút được cấu tạo gồm hai trường thành phần:

- **Trường dữ liệu (`element` / `data`):** Lưu trữ giá trị thực tế của phần tử (như số nguyên, ký tự, hoặc các đối tượng dữ liệu phức tạp).
- **Trường con trỏ (`next`):** Lưu trữ địa chỉ bộ nhớ trỏ trực tiếp đến nút tiếp theo trong danh sách.

Do mỗi nút chỉ chứa duy nhất một con trỏ chỉ theo một chiều tiến, danh sách chỉ có thể được duyệt theo một hướng duy nhất từ đầu đến cuối. Nút cuối cùng trong danh sách có trường con trỏ `next` mang giá trị rỗng (`null`) để đánh dấu điểm kết thúc của cấu trúc.

---

### 2. Các Con trỏ Quản lý và Kỹ thuật Thiết kế Tối ưu

Để quản lý và thực hiện các thao tác trên danh sách liên kết đơn, hệ thống thường sử dụng các con trỏ và biến điều khiển sau:

- **Con trỏ `head`:** Trỏ đến nút đầu tiên của danh sách, phục vụ như điểm xuất phát cho mọi thao tác duyệt.
- **Con trỏ `tail`:** Trỏ trực tiếp đến nút cuối cùng của danh sách, giúp thao tác thêm phần tử vào cuối (`append`) đạt độ phức tạp hằng số \(O(1)\).
- **Biến đếm độ dài (`cnt` / `length`):** Do không thể tính trực tiếp số phần tử qua công thức địa chỉ, độ dài danh sách được lưu trữ tường minh và cập nhật mỗi khi chèn hoặc xóa phần tử.

#### Các kỹ thuật thiết kế quan trọng:

1. **Sử dụng Nút giả / Nút đầu (Header Node):** Danh sách thường được bổ sung một nút **Header** ở đầu (có giá trị dữ liệu bị bỏ qua). Nút Header giúp loại bỏ hoàn toàn các trường hợp xử lý đặc biệt (special cases) khi danh sách rỗng hoặc khi thao tác tại hai đầu danh sách, giúp mã nguồn gọn nhẹ và hạn chế lỗi lập trình.
2. **Con trỏ vị trí hiện tại (`curr`) trỏ vào nút đứng trước:** Do danh sách liên kết đơn không có con trỏ ngược để truy vết về nút phía trước, việc thiết kế con trỏ `curr` trỏ vào nút **ngay trước** vị trí logic cần thao tác sẽ giúp phép chèn nút mới hoặc ngắt kết nối nút bị xóa diễn ra trực tiếp và dễ dàng.

---

### 3. Các Thao tác Cơ bản và Độ phức tạp Thời gian

|Thao tác|Cơ chế thực hiện|Độ phức tạp thời gian|
|:--|:--|:--|
|**Chèn phần tử (`insert`)**|Tạo nút mới, đặt con trỏ `next` của nút mới trỏ tới nút đứng sau `curr`, rồi cập nhật `curr.next` trỏ tới nút mới.|**\(O(1)\)** (khi con trỏ đã ở đúng vị trí)|
|**Xóa phần tử (`remove`)**|Thay đổi con trỏ `next` của nút đứng trước nhảy qua nút cần xóa để trỏ thẳng tới nút phía sau (`curr.next = curr.next.next`).|**\(O(1)\)** (khi con trỏ đã ở đúng vị trí)|
|**Thêm vào cuối (`append`)**|Gán con trỏ `next` của `tail` tới nút mới và di chuyển con trỏ `tail` sang nút mới.|**\(O(1)\)**|
|**Truy xuất / Tìm kiếm (`find` / `moveToPos`)**|Phải bắt đầu từ `head` và di chuyển tuần tự qua từng nút cho đến vị trí hoặc giá trị cần tìm.|**\(O(n)\)**|
|**Di chuyển lùi (`prev`)**|Do không có liên kết ngược, hệ thống buộc phải duyệt tuần tự từ `head` để tìm lại nút đứng trước `curr`.|**\(O(n)\)**|

---

### 4. Tối ưu Quản lý Bộ nhớ với Danh sách Rảnh (Freelist)

Thao tác cấp phát bộ nhớ động (`new`) và giải phóng bộ nhớ liên tục có thể gây tốn chi phí hệ thống. Danh sách liên kết đơn có thể được tối ưu bằng một **Freelist** (danh sách rảnh) hoạt động theo cơ chế ngăn xếp (Stack):

- Khi một nút bị xóa, thay vì hủy hoàn toàn, nút đó được trả về đầu Freelist.
- Khi cần chèn nút mới, hệ thống ưu tiên lấy ngay nút khả dụng từ Freelist thay vì gọi phép toán `new` của hệ thống.
- Phép lấy và hoàn trả nút trên Freelist diễn ra với tốc độ **\(O(1)\)**.

---

### 5. So sánh giữa Danh sách Liên kết Đơn và Mảng (Array)

|Tiêu chí|Mảng (Array)|Danh sách liên kết đơn (Singly Linked List)|
|:--|:--|:--|
|**Cấp phát bộ nhớ**|Tĩnh, chiếm các ô nhớ liên tục.|Động, các nút nằm rải rác trong bộ nhớ.|
|**Kích thước**|Cố định khi khai báo; dễ lãng phí bộ nhớ hoặc tràn mảng.|Co giãn linh hoạt theo nhu cầu dữ liệu thực tế.|
|**Truy xuất ngẫu nhiên**|Rất nhanh **\(O(1)\)** nhờ tính toán chỉ số trực tiếp.|Chậm **\(O(n)\)**, bắt buộc phải duyệt tuần tự từ đầu.|
|**Chèn / Xóa phần tử**|Chậm **\(O(n)\)** do phải dịch chuyển hàng loạt phần tử.|Rất nhanh **\(O(1)\)** tại vị trí chỉ định mà không cần dịch chuyển dữ liệu.|
|**Chi phí bộ nhớ phụ (Overhead)**|Không tốn bộ nhớ lưu con trỏ.|Tốn thêm vùng nhớ cho trường con trỏ `next` tại mỗi nút.|

---

💡 Bạn có muốn tôi dựng mã nguồn minh họa cài đặt Danh sách liên kết đơn bằng C/C++ hoặc Java, hay muốn so sánh nó chi tiết hơn với Danh sách liên kết đôi (Doubly Linked List)?