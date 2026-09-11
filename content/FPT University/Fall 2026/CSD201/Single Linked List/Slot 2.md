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
# Minh Họa Mã Nguồn Java
Dưới đây là mã nguồn minh họa chi tiết về **Danh sách liên kết đơn (Singly Linked List)** bằng ngôn ngữ **Java**, bao gồm cả phương thức triển khai chuẩn theo lập trình hướng đối tượng (Generics) và mô hình tối ưu bằng **Header Node (Nút giả)** và **Freelist (Danh sách rảnh)**.

---

### 1. Mã nguồn Java chuẩn (Standard Singly Linked List)

Lớp `SinglyLinkedList<E>` dưới đây sử dụng **Java Generics `<E>`** để hỗ trợ mọi kiểu dữ liệu đối tượng. Cấu trúc bao gồm các nút chứa trường dữ liệu `element` và con trỏ `next`, cùng các con trỏ quản lý `head`, `tail` và biến đếm kích thước `size`.

```java
/**
 * Triển khai Danh sách liên kết đơn (Singly Linked List) trong Java
 * @param <E> Kiểu dữ liệu tổng quát của phần tử
 */
public class SinglyLinkedList<E> {

    // ------------------- Lớp nội Node -------------------
    private static class Node<E> {
        private E element;    // Trường dữ liệu
        private Node<E> next; // Con trỏ trỏ tới nút tiếp theo

        public Node(E element, Node<E> next) {
            this.element = element;
            this.next = next;
        }

        public E getElement() { return element; }
        public Node<E> getNext() { return next; }
        public void setNext(Node<E> next) { this.next = next; }
    }

    // ------------------- Thuộc tính của Danh sách -------------------
    private Node<E> head; // Con trỏ trỏ đến nút đầu tiên
    private Node<E> tail; // Con trỏ trỏ đến nút cuối cùng
    private int size;     // Số lượng phần tử hiện tại

    // Khởi tạo danh sách rỗng
    public SinglyLinkedList() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }

    // Lấy giá trị nút đầu (không xóa)
    public E first() {
        if (isEmpty()) return null;
        return head.getElement();
    }

    // Lấy giá trị nút cuối (không xóa)
    public E last() {
        if (isEmpty()) return null;
        return tail.getElement();
    }

    // ------------------- Các Thao tác Cơ bản -------------------

    /**
     * 1. Thêm phần tử vào đầu danh sách - Độ phức tạp O(1)
     */
    public void addFirst(E e) {
        head = new Node<>(e, head); // Nút mới trỏ tới head cũ
        if (size == 0) {
            tail = head; // Nếu danh sách rỗng, tail cũng trỏ tới nút mới
        }
        size++;
    }

    /**
     * 2. Thêm phần tử vào cuối danh sách - Độ phức tạp O(1) nhờ con trỏ tail
     */
    public void addLast(E e) {
        Node<E> newest = new Node<>(e, null);
        if (isEmpty()) {
            head = newest;
        } else {
            tail.setNext(newest); // Nối nút cuối cũ sang nút mới
        }
        tail = newest; // Cập nhật tail là nút mới
        size++;
    }

    /**
     * 3. Chèn phần tử vào vị trí index bất kỳ - Độ phức tạp O(n)
     */
    public void insert(int index, E e) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Chỉ số nằm ngoài phạm vi: " + index);
        }
        if (index == 0) {
            addFirst(e);
            return;
        }
        if (index == size) {
            addLast(e);
            return;
        }

        // Duyệt tìm nút đứng ngay trước vị trí cần chèn (index - 1)
        Node<E> curr = head;
        for (int i = 0; i < index - 1; i++) {
            curr = curr.getNext();
        }

        // Tạo nút mới trỏ tới curr.next, sau đó gán curr.next trỏ tới nút mới
        Node<E> newest = new Node<>(e, curr.getNext());
        curr.setNext(newest);
        size++;
    }

    /**
     * 4. Xóa phần tử đầu tiên - Độ phức tạp O(1)
     */
    public E removeFirst() {
        if (isEmpty()) return null;
        E answer = head.getElement();
        head = head.getNext(); // Bỏ qua nút đầu cũ
        size--;
        if (size == 0) {
            tail = null; // Nếu hết phần tử, đưa tail về null
        }
        return answer;
    }

    /**
     * 5. Xóa phần tử theo giá trị - Độ phức tạp O(n)
     */
    public boolean remove(E e) {
        if (isEmpty()) return false;

        // Trường hợp xóa ở đầu
        if (head.getElement().equals(e)) {
            removeFirst();
            return true;
        }

        Node<E> curr = head;
        // Tìm nút đứng ngay trước nút chứa giá trị e
        while (curr.getNext() != null && !curr.getNext().getElement().equals(e)) {
            curr = curr.getNext();
        }

        // Nếu tìm thấy nút cần xóa
        if (curr.getNext() != null) {
            if (curr.getNext() == tail) {
                tail = curr; // Cập nhật tail nếu xóa nút cuối
            }
            curr.setNext(curr.getNext().getNext()); // Ngắt liên kết nút bị xóa
            size--;
            return true;
        }
        return false;
    }

    /**
     * 6. Tìm chỉ số vị trí của phần tử - Độ phức tạp O(n)
     */
    public int indexOf(E e) {
        Node<E> curr = head;
        int index = 0;
        while (curr != null) {
            if (curr.getElement().equals(e)) {
                return index;
            }
            curr = curr.getNext();
            index++;
        }
        return -1; // Không tìm thấy
    }

    /**
     * In toàn bộ danh sách ra màn hình
     */
    public void printList() {
        Node<E> curr = head;
        System.out.print("HEAD -> ");
        while (curr != null) {
            System.out.print("[" + curr.getElement() + "] -> ");
            curr = curr.getNext();
        }
        System.out.println("NULL");
    }
}
```

---

### 2. Kỹ thuật Tối ưu: Nút giả (Header Node) & Freelist (Theo giáo trình C.A. Shaffer)

Trong các giáo trình cấu trúc dữ liệu như của **Clifford A. Shaffer** (_Virginia Tech_), danh sách liên kết đơn thường tích hợp hai kỹ thuật quan trọng:

1. **Header Node (Nút giả ở đầu):** Nút đầu tiên `head` mang giá trị dữ liệu `null`. Nút này giúp loại bỏ toàn bộ các câu lệnh điều kiện xử lý trường hợp danh sách rỗng hoặc thao tác chèn/xóa ở nút đầu.
2. **Freelist (Quản lý bộ nhớ tái sử dụng):** Khai báo biến con trỏ tĩnh `freelist` lưu trữ danh sách các nút đã bị xóa. Khi chèn phần tử mới, hệ thống lấy nút từ `freelist` thay vì gọi toán tử `new` giúp giảm chi phí cấp phát bộ nhớ.

#### Minh họa lớp Nút `Link<E>` tích hợp Freelist:

```java
class Link<E> {
    private E element;
    private Link<E> next;

    // Freelist tĩnh dùng chung cho tất cả các đối tượng Link
    private static Link freelist = null;

    public Link(E it, Link<E> nextval) {
        this.element = it;
        this.next = nextval;
    }

    public Link<E> next() { return next; }
    public Link<E> setNext(Link<E> nextval) { return this.next = nextval; }
    public E element() { return element; }
    public E setElement(E it) { return this.element = it; }

    // Lấy nút từ Freelist thay vì gọi toán tử "new"
    public static <E> Link<E> get(E it, Link<E> nextval) {
        if (freelist == null) return new Link<E>(it, nextval); // Nếu Freelist rỗng thì new
        Link<E> temp = freelist;
        freelist = freelist.next();
        temp.setElement(it);
        temp.setNext(nextval);
        return temp;
    }

    // Hoàn trả nút về Freelist khi thực hiện thao tác xóa
    public void release() {
        this.element = null;
        this.next = freelist;
        freelist = this;
    }
}
```

---

### 3. Chương trình Thực thi Kiểm thử (`MainDemo.java`)

Dưới đây là hàm `main` thực thi trực tiếp các thao tác trên danh sách liên kết vừa cài đặt:

```java
public class MainDemo {
    public static void main(String[] args) {
        SinglyLinkedList<Integer> list = new SinglyLinkedList<>();

        System.out.println("=== 1. Thêm các phần tử ===");
        list.addFirst(20);  // Danh sách:
        list.addFirst(10);  // Danh sách:
        list.addLast(30);   // Danh sách:
        list.addLast(40);   // Danh sách:
        list.printList();   // Output: HEAD -> -> -> -> -> NULL

        System.out.println("\n=== 2. Chèn vào vị trí chỉ định (Index = 2) ===");
        list.insert(2, 25); // Chèn giá trị 25 vào chỉ số 2
        list.printList();   // Output: HEAD -> -> -> -> -> -> NULL

        System.out.println("\n=== 3. Tìm kiếm phần tử ===");
        System.out.println("Vị trí của giá trị 25: " + list.indexOf(25)); // Kết quả: 2
        System.out.println("Vị trí của giá trị 99: " + list.indexOf(99)); // Kết quả: -1

        System.out.println("\n=== 4. Xóa phần tử ===");
        System.out.println("Đã xóa nút đầu: " + list.removeFirst()); // Xóa 10
        list.printList();   // Output: HEAD -> -> -> -> -> NULL

        list.remove(25);    // Xóa giá trị 25
        System.out.println("Sau khi xóa giá trị 25:");
        list.printList();   // Output: HEAD -> -> -> -> NULL

        System.out.println("\nSố lượng phần tử hiện tại: " + list.size()); // Kết quả: 3
    }
}
```

---

### 4. Giải thích Phân tích Mã nguồn

- **Thao tác Thêm / Xóa ở hai đầu (O(1)):** Việc duy trì đồng thời hai con trỏ `head` và `tail` giúp cho phép chèn ở cuối (`addLast`) hoặc chèn/xóa ở đầu (`addFirst`, `removeFirst`) diễn ra với độ phức tạp hằng số \(O(1)\).
- **Thao tác Chèn / Xóa ở giữa (O(n)):** Để chèn/xóa tại một chỉ số hoặc giá trị bất kỳ, mã nguồn cần duyệt danh sách để tìm nút đứng ngay trước vị trí cần tác động (`curr`), sau đó thay đổi liên kết con trỏ (`curr.setNext(...)`), tốn thời gian \(O(n)\).
- **Thu gom rác trong Java (Garbage Collection):** Trong câu lệnh `curr.setNext(curr.getNext().getNext())`, nút bị ngắt khỏi chuỗi liên kết sẽ không còn bất kỳ biến nào tham chiếu tới. Bộ thu gom rác tự động của Java sẽ phát hiện và thu hồi vùng nhớ Heap của nút này.

💡 Bạn có muốn tôi hỗ trợ viết mã nguồn chuyển đổi danh sách này thành **Danh sách liên kết đôi (Doubly Linked List)** hay cài đặt một **Ngăn xếp (Stack) / Hàng đợi (Queue)** dựa trên cấu trúc danh sách liên kết đơn này không?