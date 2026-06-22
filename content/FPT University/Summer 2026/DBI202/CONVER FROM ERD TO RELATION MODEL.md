1. Có bao nhiêu entity thì có bấy nhiêu relation
2. Mỗi entity có những attribute nào thì mỗi relation có tương tự những attribute đó
3. Convert dựa trên giá trị mối kết hợp
	1.  (1 - M) lấy kháo của 1 thêm vào M
	2. (M - M) Tạo ra 1 relation mới, tên của relation mới chính là tên ủa relationship. Khó của relation mới chính là khóa của 2 ralation liên quan. Nếu có thuộc tính phát sinh trong quá trong quá trình tạo mối kết hợp thì thêm vào luôn
	3. (1 - 1) Lấy khóa của relation thêm vào relation kia. Một trong 2 hướng đều được. 
		1. Tuy nhiên cầu ưu tiên hướng nào có đầy đủ thành phần tham gia
	4. (1 - M Thực thể yếu): lấy khóa của 1 thêm vào M. Đồng thời giữ vai trò là khóa chính của M luôn.
4. none

Relation Model 

Từ ERD sang Relational Model thì bạn cứ đi theo quy trình này:

## Bước 1: Chuyển Strong Entity thành Relation

### EMPLOYEE

```
EMPLOYEE(
    Emp_ID PK,
    Emp_Name,
    BirthDay,
    Address,
    Sex,
    Salary
)
```

### DEPARTMENT

```
DEPARTMENT(
    Dep_ID PK,
    Dep_Name
)
```

### PROJECT

```
PROJECT(
    Proj_ID PK,
    Proj_Name,
    Location
)
```

---

## Bước 2: Chuyển Weak Entity

Trong ERD của bạn:

- DEPENDENT là weak entity
    
- Partial Key = Relationship_Name (hình như bạn đặt tên hơi nhầm, đáng lẽ là Dependent_Name)
    

Weak entity phải lấy khóa của owner entity.

### DEPENDENT

```
DEPENDENT(
    Emp_ID PK, FK,
    Dependent_Name PK,
    BirthDay,
    Sex
)
```

Khóa chính:

```
(Emp_ID, Dependent_Name)
```

---

## Bước 3: Chuyển 1:N Relationship

### WORK_FOR

Employee làm việc cho một Department

```
Department 1 ----- N Employee
```

=> Thêm FK vào phía N

```
EMPLOYEE(
    Emp_ID PK,
    Emp_Name,
    BirthDay,
    Address,
    Sex,
    Salary,
    Dep_ID FK
)
```

---

### CONTROL

Department quản lý nhiều Project

```
Department 1 ----- N Project
```

=> Thêm FK vào PROJECT

```
PROJECT(
    Proj_ID PK,
    Proj_Name,
    Location,
    Dep_ID FK
)
```

---

## Bước 4: Chuyển 1:1 Relationship

### MANAGER

Department có một manager.

Relationship có thuộc tính:

```
StartDate
```

Vì relationship có thuộc tính nên ta đưa FK + StartDate vào DEPARTMENT.

```
DEPARTMENT(
    Dep_ID PK,
    Dep_Name,
    Manager_ID FK,
    StartDate
)
```

Manager_ID tham chiếu:

```
Manager_ID → EMPLOYEE(Emp_ID)
```

---

## Bước 5: Chuyển Recursive Relationship

### SUPERVISION

Một nhân viên giám sát nhiều nhân viên.

```
Employee (1) ---- supervises ---- (N) Employee
```

Thêm khóa ngoại tự tham chiếu:

```
EMPLOYEE(
    Emp_ID PK,
    Emp_Name,
    BirthDay,
    Address,
    Sex,
    Salary,
    Dep_ID FK,
    Supervisor_ID FK
)
```

Trong đó:

```
Supervisor_ID → EMPLOYEE(Emp_ID)
```

---

## Bước 6: Chuyển M:N Relationship

### WORK_ON

Employee làm việc trên nhiều Project.

Project có nhiều Employee.

```
M:N
```

=> Tạo relation mới.

Relationship có thuộc tính:

```
Hours
```

nên:

```
WORK_ON(
    Emp_ID PK, FK,
    Proj_ID PK, FK,
    Hours
)
```

Khóa chính:

```
(Emp_ID, Proj_ID)
```

---

## Bước 7: Chuyển Multivalued Attribute

Ở bên phải hình của bạn có:

```
Department -- Have -- Location
```

Location là multivalued attribute của Department.

Theo quy tắc:

```
DEPARTMENT_LOCATION(
    Dep_ID PK, FK,
    Location PK
)
```

Khóa chính:

```
(Dep_ID, Location)
```

---

# Kết quả cuối cùng

```sql
EMPLOYEE(
    Emp_ID PK,
    Emp_Name,
    BirthDay,
    Address,
    Sex,
    Salary,
    Dep_ID FK,
    Supervisor_ID FK
)

DEPARTMENT(
    Dep_ID PK,
    Dep_Name,
    Manager_ID FK,
    StartDate
)

PROJECT(
    Proj_ID PK,
    Proj_Name,
    Location,
    Dep_ID FK
)

DEPENDENT(
    Emp_ID PK, FK,
    Dependent_Name PK,
    BirthDay,
    Sex,
    NameRelationShip
) 

WORK_ON(
    Emp_ID PK, FK,
    Proj_ID PK, FK,
    Hours
)

DEPARTMENT_LOCATION(
    Dep_ID PK, FK,
    Location PK
)
```
