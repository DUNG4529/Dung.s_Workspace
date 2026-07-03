# Giai đoạn 2: Thiết kế kiến trúc & Vẽ UML (Abstraction)

> **Mục tiêu:** Trong Computational Thinking, đây là bước **Trừu tượng hóa (Abstraction)** – bạn bỏ qua những chi tiết code rườm rà để định hình cấu trúc cốt lõi của phần mềm.

Dựa trên tiêu chuẩn của môn **LAB211**, để chương trình dễ bảo trì và mở rộng, bạn **KHÔNG ĐƯỢC** viết mọi thứ vào một file `Main`. Thay vào đó, bạn phải áp dụng nguyên tắc thiết kế **"Low Coupling - High Cohesion"** (Ít phụ thuộc - Tính gắn kết cao) thông qua mô hình kiến trúc **n-Layers** hoặc **MVC (Model-View-Controller)**.

Dưới đây là chi tiết phân rã các **Lớp (Classes)** và cách bạn sẽ vẽ **UML** cho dự án **Employee Payroll Management System**.

---

## 1. Phân rã kiến trúc thành các Layers (Mức)

Bạn sẽ chia project thành **4 package** (khối) chính như sau:

### 🔧 A. Neutral (Tools) Layer - Lớp công cụ dùng chung

Lớp này chứa các công cụ độc lập, có thể mang đi tái sử dụng (reusable) ở bất kỳ đâu trong chương trình.

- **`<<interface>> Acceptable`**  
  Định nghĩa các hằng số chuỗi Regular Expression (Regex) để kiểm tra các ràng buộc (Constraints) như:  
  `EMPLOYEE_ID_VALID`, `ROLE_VALID`, `STATUS_VALID`,...  
  Giao diện này cũng chứa một hàm tĩnh:  
  ```java
  public static boolean isValid(String data, String pattern)
  ```  
  dùng để kiểm tra xem dữ liệu người dùng nhập có khớp với mẫu Regex hay không.

- **`Class Inputter`**  
  - Khai báo thuộc tính `Scanner`.  
  - Cung cấp các hàm như `getString()`, `getInt()`, `getDouble()`.  
  - **Đặc biệt:** thiết kế một hàm `inputAndLoop(String mess, String pattern)` để vòng lặp tự động yêu cầu nhập lại nếu dữ liệu không khớp với Regex từ interface `Acceptable`.  
  - Điều này giúp **giảm thiểu sự dư thừa mã lệnh** ở các chức năng Add và Update.

---

### 📦 B. Models Layer - Lớp đối tượng dữ liệu

Lớp này chứa các cấu trúc dữ liệu thô (chỉ chứa dữ liệu và các hành vi nội tại).

- **`Class Employee`**  
  - Triển khai interface `Serializable` (nếu bạn định lưu dạng Object file).  
  - Chứa các thuộc tính `private`:  
    - `id` (String)  
    - `name` (String)  
    - `role` (String)  
    - `baseSalary` (double)  
    - `workingDays` (int)  
    - `bonus` (double)  
    - `status` (String)  
  - Bao gồm:
    - Default Constructor  
    - Constructor đầy đủ tham số  
    - Các hàm Getters/Setters để bảo vệ dữ liệu (Encapsulation)  
    - Hàm `toString()` để format chuỗi xuất ra màn hình

---

### ⚙️ C. Business Layer - Lớp xử lý nghiệp vụ

Lớp này gọi Models Layer ra để xử lý các logic phức tạp, thao tác trên một **TẬP HỢP** các đối tượng.

- **`Class EmployeeManager`**  
  - Đây là trung tâm logic của chương trình.  
  - Bạn có thể sử dụng quan hệ **"has-A"** (khai báo một `List<Employee>` hoặc `Map<String, Employee>` bên trong class) hoặc **"is-A"** (lớp này kế thừa trực tiếp từ `ArrayList<Employee>`).  
  - Chứa các phương thức cốt lõi theo đề bài:
    - `loadFromFile()`  
    - `addEmployee()`  
    - `updateEmployee()`  
    - `removeEmployee()`  
    - `searchEmployee()`  
    - `calculatePayroll()`  
    - `displayAll()`  
    - `saveToFile()`

---

### 🖥️ D. Control/View Layer - Lớp điều khiển & Giao diện

Lớp này tiếp nhận tương tác từ người dùng và điều phối các lệnh.

- **`Class Main`**  
  - Chứa hàm `public static void main(String[] args)`.  
  - Có nhiệm vụ hiển thị danh sách Menu từ 1 đến 9, nhận lựa chọn của người dùng qua `Inputter`, sau đó gọi các hàm tương ứng từ class `EmployeeManager` để thực thi.

---

## 2. Hướng dẫn vẽ UML Class Diagram

Khi mở phần mềm vẽ UML (như draw.io hoặc StarUML), bạn sẽ tạo các khối (boxes) dựa trên cấu trúc trên:

| Khối | Nội dung thể hiện |
|------|-------------------|
| **Hộp Interface `Acceptable`** | Viết các thuộc tính là các hằng số (chữ in hoa) kiểu `String <<final>>` và hàm `isValid` kiểu `<<static>>`. |
| **Hộp Class `Inputter`** | Liệt kê thuộc tính `ndl: Scanner` mang dấu `-` (private) và các hàm nhập liệu mang dấu `+` (public). Có một đường kẻ nét đứt (Dependency) nối từ `Inputter` tới `Acceptable` vì Inputter sử dụng hàm của Acceptable. |
| **Hộp Class `Employee`** | Liệt kê 7 thuộc tính với dấu `-` và các hàm Getter/Setter với dấu `+`. |
| **Hộp Class `EmployeeManager`** | Kẻ một đường mũi tên hình thoi (Aggregation) chỉ về phía `Employee`, thể hiện quan hệ 1 Manager chứa nhiều Employee. Liệt kê các chức năng CRUD vào khối này. |
| **Hộp Class `Main`** | Nằm trên cùng, nối mũi tên hướng xuống `EmployeeManager` và `Inputter`. |
Chúc mừng bé đã gặt hái được thành quả nì :>