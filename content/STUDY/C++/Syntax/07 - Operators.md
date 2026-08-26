# Operators

## 1. What Is It?

An **operator** (*toán tử*) is a special symbol that directs the compiler to perform a specific mathematical, relational, or logical manipulation on one or more **operands** (*toán hạng*).

For example, in `a + b`, `+` is the operator, while `a` and `b` are operands.

---

## 2. Why Does It Exist?

Operators provide the foundational vocabulary for performing computations, comparing values, combining logical conditions, and updating memory variables.

---

## 3. Categories of C++ Operators

### 1. Arithmetic Operators
`+` (Addition), `-` (Subtraction), `*` (Multiplication), `/` (Division), `%` (Modulo / Remainder).

### 2. Relational (Comparison) Operators
`==` (Equal to), `!=` (Not equal to), `<` (Less than), `>` (Greater than), `<=` (Less than or equal), `>=` (Greater than or equal).
*Result is always a `bool` (`true` or `false`).*

### 3. Logical Operators
`&&` (Logical AND), `||` (Logical OR), `!` (Logical NOT).

### 4. Compound Assignment Operators
`+=`, `-=`, `*=`, `/=`, `%=` (e.g., `x += 5` is shorthand for `x = x + 5`).

### 5. Increment and Decrement
`++` (Add 1), `--` (Subtract 1).

### 6. Ternary (Conditional) Operator
`condition ? value_if_true : value_if_false`

---

## 4. How Does It Work?

![[07 - Operators-20260826200705428.svg]]

### Short-Circuit Evaluation (Đánh giá ngắn mạch)
For logical operators:
- In `A && B`: If `A` is `false`, `B` is **never evaluated** because the whole expression cannot be true.
- In `A || B`: If `A` is `true`, `B` is **never evaluated** because the whole expression is already true.

---

## 5. Examples

### Example 1: Arithmetic & Modulo Operations
```cpp
#include <iostream>

int main() {
    int a = 14, b = 4;

    std::cout << "Addition:       " << (a + b) << '\n'; // 18
    std::cout << "Subtraction:    " << (a - b) << '\n'; // 10
    std::cout << "Multiplication: " << (a * b) << '\n'; // 56
    std::cout << "Int Division:   " << (a / b) << '\n'; // 3 (Truncated)
    std::cout << "Modulo (Rem):   " << (a % b) << '\n'; // 2 (14 = 4 * 3 + 2)

    return 0;
}
```

### Example 2: Prefix vs Postfix Increment
```cpp
#include <iostream>

int main() {
    int x = 5;
    int y = ++x; // Prefix: x is incremented to 6 first, then y becomes 6
    std::cout << "x: " << x << ", y: " << y << '\n'; // 6, 6

    int a = 5;
    int b = a++; // Postfix: b gets current value (5), then a is incremented to 6
    std::cout << "a: " << a << ", b: " << b << '\n'; // 6, 5

    return 0;
}
```

> [!TIP]
> Prefer prefix increment `++i` over postfix `i++` in loops. For basic integers they produce identical code, but for complex iterators in C++, prefix avoids creating temporary copy objects.

---

## 6. Common Variations

### Ternary Operator (`?:`) for Concise Conditional Assignment
```cpp
#include <iostream>

int main() {
    int score = 85;
    std::string result = (score >= 50) ? "Pass" : "Fail";
    std::cout << "Result: " << result << '\n'; // Pass
    return 0;
}
```

---

## 7. Common Mistakes

### 1. Integer Division Truncation
When dividing two integers, C++ performs integer division and discards the remainder:

```cpp
int a = 5, b = 2;
double result = a / b; // WRONG: a / b evaluates to integer 2, then assigned to double 2.0!
```
*Fix: Cast at least one operand to `double`:*
```cpp
double result = (double)a / b; // 2.5
// Or: double result = 1.0 * a / b;
```

### 2. Confusing Assignment (`=`) with Equality Comparison (`==`)
```cpp
int x = 5;
if (x = 10) { // BUG: Assigns 10 to x, which evaluates to true!
    std::cout << "Always prints!\n";
}
```

### 3. Modulo with Negative Numbers in C++
In C++, the sign of `a % b` matches the sign of the dividend `a`:
`-7 % 3` yields `-1` (not `2`).

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Checking Even / Odd**: `if (n % 2 == 0)` (Even) vs `if (n % 2 != 0)` (Odd).
- **Fast Max / Min via Ternary**: `int maxVal = (a > b) ? a : b;`
- **Prefix Increment**: Use `++i` in `for` loops.

---

## 9. Practice

### Exercise 1 (Easy)
Read an integer `n` from the user and print `1` if it is odd, and `0` if it is even, using the modulo `%` operator.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int n;
    std::cin >> n;
    std::cout << (n % 2 != 0) << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Accurate Floating Division)
Read two integers `totalScore` and `numberOfStudents`. Calculate and print the exact average score with decimals.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int totalScore, numberOfStudents;
    std::cin >> totalScore >> numberOfStudents;

    double average = static_cast<double>(totalScore) / numberOfStudents;
    std::cout << "Average: " << average << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- Arithmetic: `+`, `-`, `*`, `/`, `%`. Integer division truncates towards zero.
- Relational: `==`, `!=`, `<`, `>`, `<=`, `>=` return `bool`.
- Logical: `&&`, `||`, `!` support short-circuit evaluation.
- Prefix `++i` increments before use; postfix `i++` increments after use.
- Always be mindful of integer truncation when calculating ratios.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[expr.compound]* — Compound expressions, *[expr.precedence]* — Operator precedence.
- **cppreference.com**: *[C++ Operator Precedence](https://en.cppreference.com/w/cpp/language/operator_precedence)*, *[Arithmetic operators](https://en.cppreference.com/w/cpp/language/operator_arithmetic)*.
