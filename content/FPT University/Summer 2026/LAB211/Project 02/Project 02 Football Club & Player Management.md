---
title: Football Club & Player Management
course: LAB211
semester: Summer 2026
university: FPT University

project_code: J1.L.P0036
project_type: Java Console Application

status: In Progress
priority: High

tags:
  - LAB211
  - Java
  - OOP
  - Collection
  - FileIO
  - CRUD
  - FootballClub

created: 2026-06-08
updated: 2026-06-08

related:
  - "[[Computational Thinking]]"
  - "[[LAB211]]"
  - "[[Requirements]]"
  - "[[Use Cases]]"
  - "[[Class Diagram]]"
  - "[[Implementation]]"

---



# I – Phân tích và Thiết kế Hệ thống

## 1. Phân tích dữ liệu

Sau khi đọc kỹ và tìm hiểu về ngữ cảnh của bài toán cùng với các yêu cầu có liên quan, lựa chọn và phân loại đối tượng (danh từ) cùng các hành vi (động từ) có thể có của đối tượng trong chương trình cần thực hiện, ta có:

### a. Danh từ
- Club
- Player
- Menu
- File

### b. Động từ

- **Input**: Lấy dữ liệu từ bàn phím và kiểm tra ràng buộc
- **Add**: Thêm câu lạc bộ hoặc cầu thủ mới vào management map
- **Search**: Tìm câu lạc bộ theo ID hoặc cầu thủ theo tên (có thể là một phần)
- **Update**: Cập nhật thông tin câu lạc bộ hoặc cầu thủ sử dụng ID làm khóa
- **ShowAll / List**: Hiển thị tất cả dữ liệu, sắp xếp bằng cách chuyển sang danh sách tạm thời, hoặc lọc theo ngân sách/vị trí
- **Remove**: Xóa cầu thủ khỏi map bằng ID khóa
- **Read / Load**: Đọc dữ liệu từ các tệp `clubs.txt` và `players.txt` khi khởi động hoặc theo yêu cầu
- **Save**: Lưu dữ liệu club và player hiện tại vào tệp văn bản
- **Quit**: Thoát chương trình và lưu thay đổi (nếu có)

---

## 2. Lựa chọn và chi tiết hóa

### a. Danh từ

Trong số các danh từ đã xác định, ta phân tích chi tiết cấu trúc như sau:

#### i. File (clubs.txt, players.txt)

Là môi trường lưu trữ dữ liệu tập tin văn bản của chương trình. Mục tiêu này được xử lý thông qua các thư viện I/O có sẵn của Java, nên không thiết kế thành một thực thể nghiệp vụ độc lập trong Class Diagram mà gom các thao tác này vào class thực hiện business logic để nạp và lưu dữ liệu.

#### ii. Menu

Đối tượng phục vụ cho mục đích hiển thị các chức năng điều khiển ứng dụng và cho phép người dùng tương tác lựa chọn. Đối tượng này mang tính optional, có thể loại bỏ khỏi Class Diagram khi thiết kế và triển khai trực tiếp luồng điều khiển trong phương thức Main.

#### iii. Club

Là đối tượng thực thể chính phục vụ cho việc quản lý thông tin của các câu lạc bộ bóng đá, bao gồm các thuộc tính:
- Club ID
- Club Name
- Sponsor Brand
- Budget

#### iv. Player

Là đối tượng thực thể chính phục vụ cho việc quản lý thông tin của các cầu thủ tham gia giải đấu, bao gồm các thuộc tính:
- Player ID
- Club ID
- Player Name
- Position
- Shirt Number

### b. Động từ

Dựa trên đặc điểm tương tác với dữ liệu, ta phân chia thành 2 nhóm chính:

#### i. Động từ tác động lên một đối tượng độc lập
- **Input**: Nhập liệu các trường thông tin từ bàn phím
- **Validate**: Kiểm tra các ràng buộc tính hợp lệ của dữ liệu đầu vào
- **Get Info / To_String**: Trích xuất chuỗi thông tin của đối tượng để hiển thị

#### ii. Động từ tác động lên một nhóm đối tượng
- **Add**: Thêm đối tượng mới vào cấu trúc ánh xạ key-value
- **Update**: Cập nhật thông tin đối tượng dựa trên ID key
- **Search**: Tìm kiếm đối tượng theo khóa hoặc lọc theo điều kiện
- **List / ShowAll**: Hiển thị danh sách, chuyển đổi sang cấu trúc tuyến tính để sắp xếp khi có yêu cầu
- **Remove**: Xóa cặp key-value khỏi map
- **Load**: Đọc dữ liệu từ tập tin
- **Save**: Ghi dữ liệu xuống tập tin

---

## 3. Thiết kế cấu trúc các Lớp (Class Design)

Để đơn giản hóa và phù hợp với yêu cầu low coupling trong thiết kế (tốt nhất khi đạt tới Atomicity), ta xây dựng class dựa trên danh từ chính, với các thuộc tính là những danh từ phụ thuộc, cùng các phương thức là những động từ thuộc các đối tượng độc lập.

Mặt khác, thuộc tính của đối tượng hiển nhiên thì che giấu (`private`) và mọi hành vi nên được thực hiện dựa trên phương thức của đối tượng tương ứng nhằm đảm bảo sự tương tác linh hoạt, dễ nâng cấp và bảo mật thông tin.

### a. Club Class

```text
Club
----------------------------------------
- id: String
- name: String
- sponsorBrand: String
- budget: double
----------------------------------------
+ Club()
+ Club(id: String, name: String, sponsorBrand: String, budget: double)
+ Getters/Setters()
+ toString(): String
```

### b. Player Class

```text
Player
----------------------------------------
- id: String
- clubId: String
- name: String
- position: String
- shirtNumber: int
----------------------------------------
+ Player()
+ Player(id: String, clubId: String, name: String, position: String, shirtNumber: int)
+ Getters/Setters()
+ toString(): String
```

### c. Business Logic Classes (quan hệ "is A" – "has A")

Vì chương trình trong quá trình hoạt động cần lưu trữ và thao tác trên nhiều đối tượng cùng loại, đồng thời yêu cầu tối ưu hóa tốc độ tìm kiếm theo ID (O(1)) và kiểm tra tính duy nhất (uniqueness constraints) của Club ID cũng như Player ID một cách nhanh chóng mà không cần duyệt tuyến tính.

Để tối ưu hóa hiệu suất tra cứu và thuận tiện cho các thao tác trên tập dữ liệu lớn, sử dụng quan hệ "is A" bằng cách áp dụng kỹ thuật thừa kế, ta chọn **HashMap** (có sẵn trong Java Collection Framework) làm lớp cơ sở với cơ chế ánh xạ khóa là ID (`String`) và giá trị là thực thể đối tượng tương ứng (`Club` hoặc `Player`).

#### Clubs Class (extends HashMap<String, Club>)

```text
Clubs
----------------------------------------
- pathFile: String
- isSaved: boolean
----------------------------------------
+ Clubs()
+ cracks()                    // kiểm tra trạng thái lưu
+ add(c: Club): void
+ searchById(id: String): Club
+ update(id: String, name: String, brand: String, budget: Double): void
+ filterByBudget(maxBudget: double): void
+ dataToObject(text: String): Club
+ readFromFile(): void
+ saveToFile(): void
```

#### Players Class (extends HashMap<String, Player>)

```text
Players
----------------------------------------
- pathFile: String
- isSaved: boolean
----------------------------------------
+ Players()
+ cracks()                    // kiểm tra trạng thái lưu
+ add(p: Player): void
+ searchByName(name: String): void
+ update(id: String, name: String, pos: String, shirt: Integer): void
+ remove(id: String): void
+ showAllSorted(clubsMap: Clubs): void
+ filterByPosition(position: String): void
+ isUniqueShirtNumber(clubId: String, shirtNumber: int): boolean
+ dataToObject(text: String): Player
+ readFromFile(): void
+ saveToFile(): void
```

### d. Công cụ phục vụ việc nhập và kiểm tra dữ liệu

Dữ liệu trước khi đưa vào object nên được kiểm tra để đảm bảo tính đúng đắn và hợp lệ theo yêu cầu của project, ta xây dựng interface `Acceptable` và lớp hỗ trợ nhập liệu `Inputter`.

#### Interface Acceptable

```text
<<interface>>
Acceptable
----------------------------------------
+ CLUB_ID_VALID: String <<final>>
+ PLAYER_ID_VALID: String <<final>>
+ STRING_NON_EMPTY: String <<final>>
+ POSITIONS: String[] <<final>>
+ isValid(data: String, pattern: String): boolean <<static>>
+ isValidPosition(position: String): boolean <<static>>
```

#### Class Inputter

```text
Inputter
----------------------------------------
- scan: Scanner
----------------------------------------
+ Inputter()
+ getString(mess: String): String
+ getStringWithRegex(mess: String, regex: String): String
+ getInt(mess: String, min: int, max: int): int
+ getPositiveDouble(mess: String): double
+ getPosition(mess: String): String
```

---
# II – Triển khai kỹ thuật và điều chỉnh thiết kế

## 1. Validation: Kiểm tra dữ liệu

Về nguyên tắc, dữ liệu khi được đưa vào chương trình, lưu trữ phải đảm bảo tính đúng đắn, hợp lệ. Vì vậy, sau khi được nhập bởi người sử dụng, dữ liệu cần phải được kiểm tra.

**Ví dụ:**
- Ngân sách (budget) của câu lạc bộ phải là số thực dương
- Số áo (shirt number) phải thuộc khoảng giá trị từ 1 đến 99

Thông thường, để kiểm tra dữ liệu, người lập trình sẽ sử dụng các phép logic hoặc đôi khi dùng `try...catch...` (trong trường hợp kiểm tra dữ liệu có phải là số). Những cách này hoàn toàn đúng, tuy nhiên lại tiềm ẩn một số nhược điểm:

- Mã lệnh với thuật giải phức tạp, rắc rối (trong những trường hợp xét logic chặt chẽ định dạng ID)
- Không đem lại hiệu suất thực thi tốt (khi lạm dụng `try...catch...`)
- Chỉ có thể kiểm tra những dữ liệu đặc thù (Số, ngày tháng...)

### a. Regular Expression

Nhằm đơn giản hóa và thuận lợi cho việc kiểm tra dữ liệu mà không gia tăng độ phức tạp của thuật toán, người lập trình có thể xây dựng các "mẫu mô tả dữ liệu" đối với dạng thức của dữ liệu mong muốn, dựa trên các ký hiệu đặc biệt (Meta characters). Kỹ thuật này thường được gọi là **Regular Expression**.

#### Ưu điểm của kỹ thuật RegEx:

- Có thể dùng ở hầu hết các ngôn ngữ và công nghệ phát triển ứng dụng
- Áp dụng cho hầu hết các dạng thức dữ liệu cũng như điều kiện kiểm tra theo cách đơn giản (thay vì xử lý bằng logic, chỉ cần liệt kê để xét tính hợp lệ)
- Hỗ trợ tốt cho tính tổng quát hóa của thuật toán
- Có thể dùng cho yêu cầu "pre-input" nhằm tăng cường tính dễ dùng cho ứng dụng

Để có thể xây dựng được các "mẫu mô tả dữ liệu", bạn cần phải nắm vững 3 khái niệm sau:

- Regular Expression Patterns
- Metacharacters
- Quantifiers

> 📚 **Tham khảo thêm:** Thông tin liên quan đến regular expression có thể tham khảo tại: [https://www.w3schools.com/java/java_regex.asp](https://www.w3schools.com/java/java_regex.asp)

### b. Interface với hằng số và static methods

Thay vì phải viết mã lệnh để kiểm tra dữ liệu dựa trên các logic phức tạp, ta chỉ cần mô tả mẫu dữ liệu sẽ dùng cho việc kiểm tra, đồng thời kết hợp với phương thức `matches()` của lớp `String` để kiểm tra chuỗi dữ liệu có khớp với mẫu đã thiết lập hay không trước khi đưa vào, hoặc chuyển đổi để sử dụng trong chương trình.

Do đó, interface `Acceptable` được triển khai theo các ràng buộc của giải đấu EEL như sau:

#### i. Kiểm tra mã câu lạc bộ (Club ID)

Theo ràng buộc của đề bài, Club ID phải có định dạng "CL-xxxx" (trong đó xxxx là số). Ta sử dụng chuỗi mẫu cố định phần đầu là "CL-", tiếp theo là 4 chữ số, sử dụng meta character `\d` kết hợp với quantifier `{4}`.

**Mẫu hoàn chỉnh:** `^CL-\\d{4}$`

#### ii. Kiểm tra mã cầu thủ (Player ID)

Theo ràng buộc, Player ID phải có định dạng "Pxxxx". Tương tự như Club ID, ta thiết lập mẫu như sau: `^P\\d{4}$`

#### iii. Kiểm tra tên không được để trống

Để đảm bảo tên câu lạc bộ, tên thương hiệu tài trợ, hoặc tên cầu thủ không bị rỗng (hoặc chỉ chứa toàn khoảng trắng), ta sử dụng mẫu: `^(?=\\s*\\S).*$`

#### iv. Xây dựng static method và hằng số

Việc khai báo các mẫu đã xây dựng như là những hằng số trong interface sẽ tăng cường tính "tái sử dụng", đồng thời tạo ra sự "nhất quán" trong thuật toán xử lý. Tương tự, phương thức kiểm tra vị trí thi đấu (Position) được xây dựng dưới dạng static để so sánh với danh mục cố định.

```java
public interface Acceptable {
    public final String CLUB_ID_VALID = "^CL-\\d{4}$";
    public final String PLAYER_ID_VALID = "^P\\d{4}$";
    public final String STRING_NON_EMPTY = "^(?=\\s*\\S).*$";
    public final String[] POSITIONS = {
        "Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"
    };

    public static boolean isValid(String data, String pattern) {
        if (data == null) return false;
        return data.matches(pattern);
    }

    public static boolean isValidPosition(String pos) {
        if (pos == null) return false;
        for (String p : POSITIONS) {
            if (p.equalsIgnoreCase(pos.trim())) return true;
        }
        return false;
    }
}
```

---

## 2. Inputter: Ứng dụng Coupling – Cohesion

Một nhược điểm khá phổ biến là sự "dư thừa mã lệnh" do sao chép và chỉnh sửa mã lệnh nhập liệu nhiều lần. Để cải thiện vấn đề này, các thành phần khi thiết kế cần phải đạt được 2 đặc tính **low coupling – high cohesion**:

- **Low coupling:** giúp giảm "mã dư thừa", hướng đến sự "đơn giản, chuyên nghiệp"
- **High cohesion:** tăng cường tính hữu dụng khi có sự "gắn kết cao"

Để phân tích các mục tiêu nhập liệu (VD: Nhập ID có Regex, nhập số nguyên có khoảng min/max, nhập chuỗi bắt buộc, nhập số thực dương), ta xây dựng lớp `Inputter` chứa các phương thức chuyên biệt, tổng quát hóa kết hợp với interface `Acceptable`.

```java
public class Inputter {
    private Scanner scan;

    public Inputter() {
        scan = new Scanner(System.in);
    }

    // Nhận một chuỗi không rỗng
    public String getString(String mess) {
        String result;
        while (true) {
            System.out.print(mess);
            result = scan.nextLine().trim();
            if (Acceptable.isValid(result, Acceptable.STRING_NON_EMPTY)) {
                return result;
            }
            System.out.println("This field cannot be empty!");
        }
    }

    // Nhận một chuỗi theo Regex (cho phép bỏ qua nếu allowEmpty = true, dùng khi Update)
    public String getStringWithRegex(String mess, String pattern, boolean allowEmpty) {
        String result;
        while (true) {
            System.out.print(mess);
            result = scan.nextLine().trim();
            if (allowEmpty && result.isEmpty()) return result;
            if (Acceptable.isValid(result, pattern)) return result;
            System.out.println("Invalid format. Please try again.");
        }
    }

    // Nhận số nguyên có giới hạn (Dùng cho Shirt Number 1-99)
    public int getInt(String mess, int min, int max, boolean allowEmpty) {
        // Triển khai kết hợp parseInt và điều kiện min max, xử lý NumberFormatException
        return 0; // Giả lập
    }

    // Nhận số thực dương (Dùng cho Budget)
    public double getPositiveDouble(String mess, boolean allowEmpty) {
        // Triển khai kiểm tra > 0
        return 0.0; // Giả lập
    }
}
```

---

## 3. Overloading Method

Trong lớp `Players` và `Clubs`, các công việc hiển thị danh sách có xu hướng lặp lại nhiều lần.

**Ví dụ:**
- List of all clubs
- List all clubs with budget ≤ input value
- List all players in ascending order
- List all players by a specific position

Thay vì viết lại code định dạng bảng (table header/footer) cho từng chức năng, ta áp dụng kỹ thuật **Overloading** để định nghĩa một phương thức `showAll()` xuất toàn bộ HashMap và một phương thức `showAll(List)` nhận vào một danh sách đã được lọc hoặc sắp xếp để xuất ra.

```java
public class Players extends HashMap<String, Player> {
    
    // Hiển thị dạng bảng cho một danh sách bất kỳ được truyền vào
    public void showAll(List<Player> list) {
        if (list == null || list.isEmpty()) {
            System.out.println("No data to display.");
            return;
        }
        System.out.println("---------------------------------------------------------------");
        System.out.printf("%-10s | %-10s | %-20s | %-15s | %-5s\n", 
                          "Player ID", "Club ID", "Name", "Position", "Shirt");
        System.out.println("---------------------------------------------------------------");
        for (Player p : list) {
            System.out.println(p.toString());
        }
        System.out.println("---------------------------------------------------------------");
    }

    // Overload: Chuyển dữ liệu từ Map sang List và gọi hàm hiển thị
    public void showAll() {
        showAll(new ArrayList<>(this.values()));
    }
}
```

---

## 4. Xử lý nghiệp vụ trên HashMap: Sắp xếp và Lọc

Khi dùng `HashMap`, việc lọc hoặc sắp xếp (như yêu cầu số 6: Sắp xếp cầu thủ theo tên câu lạc bộ tăng dần, rồi đến số áo tăng dần) đòi hỏi phải chuyển dữ liệu sang `List` để tương tác bằng `Comparator`. Do cầu thủ chỉ chứa mã `clubId`, ta phải truy xuất đối tượng `Clubs` để lấy tên câu lạc bộ phục vụ việc so sánh.

```java
// Bên trong lớp Players
public void showAllSorted(Clubs clubsMap) {
    List<Player> list = new ArrayList<>(this.values());
    
    // Sử dụng Collections.sort với Comparator tùy biến
    Collections.sort(list, new Comparator<Player>() {
        @Override
        public int compare(Player p1, Player p2) {
            // Lấy tên câu lạc bộ từ Clubs map (Thời gian O(1))
            String clubName1 = clubsMap.get(p1.getClubId()).getName();
            String clubName2 = clubsMap.get(p2.getClubId()).getName();
            
            // So sánh tên câu lạc bộ
            int clubCompare = clubName1.compareToIgnoreCase(clubName2);
            if (clubCompare != 0) {
                return clubCompare;
            }
            // Nếu cùng câu lạc bộ, sắp xếp theo số áo tăng dần
            return Integer.compare(p1.getShirtNumber(), p2.getShirtNumber());
        }
    });
    
    this.showAll(list);
}
```

---

## 5. Đọc/Ghi File

Dữ liệu của chương trình cần được lưu vào thiết bị lưu trữ (Bộ nhớ ngoài) dưới dạng tập tin văn bản (`clubs.txt` và `players.txt`).

### Text File

Vì đề bài cung cấp định dạng lưu trữ là Text, chúng ta ứng dụng `File`, `FileReader`/`FileWriter`, và `BufferedReader`/`BufferedWriter`.

> **Lưu ý đối với project này:**

Quá trình `readFromFile` của hệ thống sẽ làm nhiệm vụ, kết hợp với hàm `dataToObject` (nhận tham số là 1 dòng dữ liệu đọc được, dùng `String.split(",")` để cắt các thuộc tính ra), sau đó đưa object này vào HashMap.

Việc này giúp chương trình luôn có sẵn dữ liệu khi khởi động, đáp ứng yêu cầu số 13 (Load data) và số 12 (Save data).

Tương tự, thao tác ghi file sẽ duyệt qua `values()` của HashMap và định dạng lại thành chuỗi ngăn cách bởi dấu phẩy trước khi dùng `BufferedWriter` ghi xuống.
