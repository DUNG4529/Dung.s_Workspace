# if / else

## 1. What Is It?

The **`if / else` statement** (*cấu trúc rẽ nhánh điều kiện*) is the fundamental control flow construct in C++. It allows a program to execute different blocks of code depending on whether a given condition evaluates to `true` or `false`.

---

## 2. Why Does It Exist?

Algorithms must make decisions based on dynamic data:
- Is a user's password correct?
- Is a number positive, negative, or zero?
- Has a game character's health reached zero?

`if / else` statements provide the branching logic necessary to handle multiple scenarios.

---

## 3. Basic Syntax

```cpp
// 1. Single if statement
if (condition) {
    // Executes if condition is true
}

// 2. if ... else statement
if (condition) {
    // Executes if condition is true
} else {
    // Executes if condition is false
}

// 3. if ... else if ... else ladder
if (condition1) {
    // Executes if condition1 is true
} else if (condition2) {
    // Executes if condition1 is false AND condition2 is true
} else {
    // Executes if all conditions above are false
}
```

---

## 4. How Does It Work?

```mermaid
flowchart TD
    A["Evaluate condition"] -->|true (non-zero)| B["Execute 'if' body"]
    A -->|false (zero)| C["Execute 'else' body (or skip)"]
    B --> D["Continue sequential execution"]
    C --> D

    style A fill:#e1f5fe,stroke:#0288d1;
    style B fill:#e8f5e9,stroke:#388e3c;
    style C fill:#ffebee,stroke:#d32f2f;
    style D fill:#f3e5f5,stroke:#7b1fa2;
```

1. The expression inside `(...)` is evaluated and converted to a `bool`.
2. Any non-zero numeric value is treated as `true`; `0` is treated as `false`.
3. If `true`, the corresponding code block `{ ... }` runs, and all subsequent `else if` / `else` branches in the chain are skipped.

---

## 5. Examples

### Example 1: Basic Positive/Negative/Zero Check
```cpp
#include <iostream>

int main() {
    int n;
    std::cout << "Enter an integer: ";
    std::cin >> n;

    if (n > 0) {
        std::cout << n << " is positive.\n";
    } else if (n < 0) {
        std::cout << n << " is negative.\n";
    } else {
        std::cout << "The number is zero.\n";
    }

    return 0;
}
```

### Example 2: Combining Logical Conditions
```cpp
#include <iostream>

int main() {
    int age = 19;
    bool hasID = true;

    if (age >= 18 && hasID) {
        std::cout << "Access granted.\n";
    } else {
        std::cout << "Access denied.\n";
    }

    return 0;
}
```

---

## 6. Common Variations

### C++17 `if` with Initializer
Modern C++ allows declaring and initializing a variable directly inside the `if` condition, restricting its scope strictly to that `if / else` block:

```cpp
#include <iostream>

int main() {
    // 'val' is only accessible inside this if/else statement
    if (int val = 42; val % 2 == 0) {
        std::cout << val << " is even.\n";
    } else {
        std::cout << val << " is odd.\n";
    }

    // val is out of scope here!
    return 0;
}
```

---

## 7. Common Mistakes

### 1. Accidental Semicolon After `if (...)`
Putting a semicolon `;` immediately after the `if` condition creates an empty statement. The block underneath will **always** execute regardless of the condition!

```cpp
int x = -5;
if (x > 0); // BUG: Semicolon ends the if statement here!
{
    std::cout << "Positive!\n"; // Always executes!
}
```

### 2. Assignment (`=`) instead of Equality (`==`)
```cpp
int x = 0;
if (x = 5) { // BUG: Assigns 5 to x; 5 is non-zero (true)!
    std::cout << "Always true!\n";
}
```

### 3. Omitting Braces `{}` in Multi-line Logic
```cpp
if (isLoggedIn)
    std::cout << "Welcome!\n";
    grantAdminAccess(); // BUG: Always executes! Indentation does not create blocks in C++.
```
*Rule: Always use curly braces `{ ... }` even for single-line statements.*

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Input Validation & Constraints**: Checking boundary conditions ($1 \le N \le 10^5$).
- **Base Cases**: Detecting termination conditions in recursion or special-case $N = 1$ logic.
- **Decision Trees**: Classifying test cases into distinct processing paths.

---

## 9. Practice

### Exercise 1 (Easy)
Read an integer representing a student's exam score ($0 - 100$). Print `"Pass"` if the score is $\ge 50$, and `"Fail"` otherwise.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int score;
    std::cin >> score;

    if (score >= 50) {
        std::cout << "Pass\n";
    } else {
        std::cout << "Fail\n";
    }
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Leap Year Checker)
A year is a leap year if:
- It is divisible by 4 **and** not divisible by 100, **OR**
- It is divisible by 400.
Read a year and print `"Leap Year"` or `"Not Leap Year"`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int year;
    std::cin >> year;

    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        std::cout << "Leap Year\n";
    } else {
        std::cout << "Not Leap Year\n";
    }
    return 0;
}
```
</details>

---

## 10. Summary

- `if` tests a condition; `else if` chains additional conditions; `else` catches all remaining cases.
- Any non-zero value evaluates to `true`; `0` evaluates to `false`.
- Always wrap body statements in curly braces `{}`.
- Watch out for accidental semicolons `if (cond);` and assignment `x = 5` in conditions.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.if]* — The if statement.
- **cppreference.com**: *[if statement](https://en.cppreference.com/w/cpp/language/if)*.
- **isocpp.org**: *[C++ Core Guidelines - ES.3: Always use braces](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-always-braces)*.
