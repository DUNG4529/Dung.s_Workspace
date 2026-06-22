# Bài tập: Hệ thống quản lý trường đại học

The below content describe the business requirements to manage an university. Construct ERD and convert this ERD to relational model.

- The aim of this assignment is to develop a database system to hold records for students and their training programs. The system will be used for analyzing the students’s performance during the training program as well as to select students of the year based on the data entered into the system.

## Yêu cầu nghiệp vụ chi tiết

- Our university is organized into several **departments** which are described by a name, department code, office number, office phone, and a particular instructor who ***manages*** the department. We keep track of the start date when that instructor began managing the department.

- University recruits more **instructors** and ***arranges*** them on each different department based on their expertise. Instructors are known as the identification number, name, birthdate, startdate, sex and qualifications. For each **qualification**, they should provide information about specialized training, training institute or university and year of graduation

- Scientific **subjects** are ***distributed*** on each department. Information on subjects includes subject code, name, total credit, credits theory, practice credits, and ***prerequisite*** Department assigns its courses for instructors. Each instructor can ***teach*** multiple subjects from different departments. We also keep information about when he/she started and/or stopped teaching a particular subject.

- Annual university enrollments 2000 students and ***arranges*** them in many different **classes** and assigns for departments depending on the coursework program that students sign up. Information about the class is including class code, coursework program. Each class has one ***academic supervisor*** from instructors of its managing department.

- The information on students includes student’s name, student number, social security name, current address and phone, permanent address and phone, birth date, sex. Both social security number and student number has unique values for each student.

- The coursework program lasts for 4 years, with 8 semesters. The subjects are arranged for classes by ***sections*** in each semester. Information on section includes number of semester, training year, section number. The section number distinguishes sections of the same class that are taught during the same semester/year; its values are 1, 2, 3... up to the number of sections taught during each semester for this class. Managing department assigns specific instructor for each section depending on its subject.

- Student has grade report for each subject that he/she ***has joined***. There are two evaluation modes: grade theory and practical grade in rating 50%-50%. One student passes the course if grade theory is greater than 4.0 and total score is greater than 5.0. Otherwise, student must take part in a retake exam for grade theory. Finally, he/she must rejoin the course in the next chances.

## Yêu cầu thực hiện

Construct ERD and convert this ERD to relational model.