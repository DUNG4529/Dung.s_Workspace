##  **UseCase Diagram**

-           Biểu đồ mô tả Ai (Actor) sử dụng và làm gì (Use Case) với hệ thống

o  Actor: Người dùng hoặc hệ thống bên ngoài. VD: Student, Admin, Payment System…

o  Use Case: Hành động/Chức năng mà hệ thống cung cấp. VD: Login, Buy Course, Thanh Toán…

o  Có 2 loại Actor:

§ Primary Actor – Sử dụng chính/ Khởi tạo usecase

§ Secondary Actor – Hổ trợ Primary

-           Quan hệ trong Use Case

o  Association: Nó là 1 đường thẳng -> Nối từ actor đến usecase

o  <<include>> : Luôn xảy ra -> Khi có 1 UC A luôn gọi đến UC B

§ VD: Đăng kí khóa học -> Thanh toán
![[Use Cases Diagrams-20260808134708705.png]]

o  <<extends>>: Mô tả 1 tính năng có nhiều lựa chọn/ Use case chỉ xảy ra khi có điều kiện

§ VD: Tham gia vào WaitList -> Đăng kí khóa học (Khóa học đã full slot)
![[Use Cases Diagrams-20260808135026194.png]]
o  Generalization -> Mô tả 1 cái Actor kế thừa Actor Cha

§ Ví dụ: User (Login, Register) , Student (Xem lớp học, chọn tkb)
![[Use Cases Diagrams-20260808135039534.png]]
Ví thụ tham khảo:
![[Use Cases Diagrams-20260808135055000.png]]