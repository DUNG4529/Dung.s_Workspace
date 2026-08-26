# Variables

## 1. What Is It?

A **variable** (*biến*) is a named storage location in computer memory (RAM) that holds a value of a specific data type. You can read, use, and modify the value stored in a variable throughout your program's execution.

---

## 2. Why Does It Exist?

Computers process dynamic data—such as user input, game scores, coordinates, or array counters. Variables allow programmers to:
- Store values for later computation.
- Give meaningful names to memory locations instead of referencing raw hardware addresses.
- Manipulate data dynamically as the program runs.

---

## 3. Basic Syntax

```cpp
// 1. Declaration: Specifies type and name (allocates memory)
type variable_name;

// 2. Initialization: Declares and assigns an initial value in one step
type variable_name = value;

// 3. Assignment: Changes the value of an already declared variable
variable_name = new_value;
```

---

## 4. How Does It Work?

A variable in C++ has four key attributes:

![[03 - Variables-20260826200616754.svg]]

```cpp
int score = 100;
```

1. **`int` (Data Type)**: Tells the compiler how much memory to allocate (typically 4 bytes) and how to interpret the binary bits (as an integer).
2. **`score` (Identifier/Name)**: The label you use in C++ code to refer to this memory location.
3. **`=` (Assignment Operator)**: Copies the value on the right into the memory location on the left.
4. **`100` (Literal Value)**: The actual data stored in the allocated memory.

---

## 5. Examples

### Example 1: Declaration, Initialization, and Modification
```cpp
#include <iostream>

int main() {
    int age = 20;               // Initialization
    std::cout << "Age: " << age << '\n';

    age = 21;                   // Reassignment
    std::cout << "Next year age: " << age << '\n';

    return 0;
}
```

**Output:**
```text
Age: 20
Next year age: 21
```

### Example 2: Forms of Initialization in Modern C++
```cpp
#include <iostream>

int main() {
    int a = 10;     // Copy initialization
    int b(20);      // Direct initialization
    int c{30};      // Brace (uniform/list) initialization (Modern C++ recommended)

    std::cout << a << " " << b << " " << c << '\n';
    return 0;
}
```

> [!TIP]
> **Brace initialization `{}`** prevents accidental narrowing conversions (e.g., passing a decimal `3.14` to an integer variable will raise a compiler error rather than silently truncating).

---

## 6. Common Variations

### Declaring Multiple Variables on One Line
```cpp
int x = 1, y = 2, z = 3;
```

### Identifier Naming Rules
Variable names in C++:
- Can contain letters (`a-z`, `A-Z`), digits (`0-9`), and underscores (`_`).
- **Must start** with a letter or an underscore (cannot start with a digit).
- Are **case-sensitive** (`Score` and `score` are two different variables).
- Cannot use C++ reserved keywords (`int`, `return`, `for`, `class`, etc.).

---

## 7. Common Mistakes

### 1. Using Uninitialized Variables (Undefined Behavior / Garbage Value)
```cpp
// DANGEROUS: 'x' contains random leftover garbage data from RAM!
int x; 
std::cout << x << '\n'; // Undefined behavior!
```
*Rule: Always initialize your variables when declaring them.*

### 2. Redeclaring an Existing Variable in the Same Scope
```cpp
int count = 5;
int count = 10; // ERROR: Redefinition of 'count'
```

### 3. Using a Variable Before Declaring It
```cpp
x = 5;      // ERROR: 'x' was not declared in this scope
int x;
```

---

## 8. When Should I Use It?

- Use descriptive names (`userScore`, `maxWidth`) in software engineering projects for readability.
- **In Competitive Programming**: Short, conventional variable names (`n`, `m`, `k`, `ans`, `sum`, `i`, `j`) are standard practice for speed and clarity in algorithmic math models.

---

## 9. Practice

### Exercise 1 (Easy)
Declare two integer variables `a = 15` and `b = 27`. Calculate their sum into a third variable `sum` and print it.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int a = 15;
    int b = 27;
    int sum = a + b;
    std::cout << "Sum: " << sum << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application)
Write a program that swaps the values of two integer variables `x = 5` and `y = 10` using a temporary variable `temp`, then prints their new values.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int x = 5;
    int y = 10;

    int temp = x;
    x = y;
    y = temp;

    std::cout << "x = " << x << ", y = " << y << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- A variable is a named memory location with a specific type and value.
- Always initialize variables before reading from them.
- Variable names are case-sensitive and cannot start with numbers or use reserved keywords.
- Modern C++ supports brace initialization `int x{0};`.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[dcl.init]* — Initializers, *[basic.scope]* — Scope.
- **cppreference.com**: *[Initialization](https://en.cppreference.com/w/cpp/language/initialization)*, *[Identifiers](https://en.cppreference.com/w/cpp/language/identifiers)*.
- **isocpp.org**: *[C++ Core Guidelines - ES.20: Always initialize an object](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-always)*.
