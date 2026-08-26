# Data Types

## 1. What Is It?

A **data type** (*kiểu dữ liệu*) defines the category of data that a variable can hold. It determines:
1. How much memory (in bytes) is allocated.
2. How the binary bits in memory are interpreted (as an integer, a decimal number, a character, or a boolean).
3. Which operations (such as addition, subtraction, or bitwise shifts) are valid on that variable.

---

## 2. Why Does It Exist?

Computers store everything in binary bits (`0` and `1`). A sequence of 32 bits like `01000001000000000000000000000000` could represent the integer `1090519040`, the floating-point number `8.0`, or characters. 

Specifying a data type gives **semantic meaning and hardware constraints** to raw memory.

---

## 3. Fundamental C++ Data Types

| Data Type | Typical Size | Description | Range (Typical on 64-bit) |
| :--- | :--- | :--- | :--- |
| **`bool`** | 1 byte | Boolean truth value (`true` or `false`) | `true` (1) or `false` (0) |
| **`char`** | 1 byte | Single character / ASCII code | -128 to 127 (or 0 to 255) |
| **`int`** | 4 bytes | Standard 32-bit signed integer | $\approx -2 \times 10^9$ to $+2 \times 10^9$ |
| **`long long`** | 8 bytes | Extended 64-bit signed integer | $\approx -9 \times 10^{18}$ to $+9 \times 10^{18}$ |
| **`float`** | 4 bytes | Single-precision floating point | $\approx 6 - 7$ decimal digits precision |
| **`double`** | 8 bytes | Double-precision floating point | $\approx 15 - 17$ decimal digits precision |

---

## 4. How Does It Work?

![[04 - Data Types-20260826200629640.svg|720]]

You can inspect the exact size of any type on your compiler using the `sizeof` operator.

---

## 5. Examples

### Example 1: Basic Types in Action
```cpp
#include <iostream>

int main() {
    int count = 42;
    long long bigNumber = 9000000000000000000LL; // Note 'LL' suffix
    double pi = 3.1415926535;
    char grade = 'A';                           // Single quotes for char
    bool isPassed = true;

    std::cout << "Integer: " << count << '\n';
    std::cout << "Big Number: " << bigNumber << '\n';
    std::cout << "Double: " << pi << '\n';
    std::cout << "Char: " << grade << '\n';
    std::cout << "Bool (printed as int): " << isPassed << '\n';

    return 0;
}
```

### Example 2: Checking Memory Sizes with `sizeof`
```cpp
#include <iostream>

int main() {
    std::cout << "sizeof(bool):      " << sizeof(bool) << " byte\n";
    std::cout << "sizeof(char):      " << sizeof(char) << " byte\n";
    std::cout << "sizeof(int):       " << sizeof(int) << " bytes\n";
    std::cout << "sizeof(long long): " << sizeof(long long) << " bytes\n";
    std::cout << "sizeof(double):    " << sizeof(double) << " bytes\n";
    return 0;
}
```

---

## 6. Common Variations

### Signed vs Unsigned Integers
By default, integer types are **signed** (capable of representing negative and positive numbers). The `unsigned` modifier allows only non-negative values, doubling the positive upper limit:

```cpp
unsigned int u = 4000000000U; // 0 to ~4.29 x 10^9
```

> [!WARNING]
> Be careful when subtracting unsigned integers: `0U - 1U` wraps around to `4294967295` rather than `-1`.

---

## 7. Common Mistakes

### 1. Integer Overflow (Tràn số)
When a calculation exceeds the maximum capacity of a type, it wraps around (producing garbage negative or incorrect values).

```cpp
int a = 1000000;
int b = 1000000;
int c = a * b; // OVERFLOW! 10^12 does not fit in 32-bit int (~2 * 10^9 max)
```
*Fix: Use `long long` for values exceeding $2 \times 10^9$.*

### 2. Confusing Single Quotes (`' '`) and Double Quotes (`" "`)
```cpp
char c = "A"; // ERROR: "A" is a string literal (const char*), not a single char
char valid = 'A'; // CORRECT
```

### 3. Floating-Point Inaccuracy
```cpp
double x = 0.1 + 0.2;
// x is approximately 0.30000000000000004 due to binary floating-point representation
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Use `int`** for standard loop counters, array indices, and numbers known to stay within $[-2 \times 10^9, 2 \times 10^9]$.
- **Use `long long`** whenever a sum, product, or problem constraint can exceed $2 \times 10^9$ (e.g., prefix sums, factorial multiplications, geometric sums).
- **Use `double`** for real numbers and mathematical geometry problems (prefer `double` over `float` due to higher precision).
- **Use `char`** when processing text character by character.
- **Use `bool`** for flags, visited arrays in graph searches, and truth conditions.

---

## 9. Practice

### Exercise 1 (Easy)
Declare variables to store:
1. The number of days in a year (integer).
2. The price of an item (`$19.99`).
3. Your initial letter.
4. Whether it is raining (`false`).
Print all 4 values.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int daysInYear = 365;
    double price = 19.99;
    char initial = 'D';
    bool isRaining = false;

    std::cout << "Days: " << daysInYear << '\n';
    std::cout << "Price: $" << price << '\n';
    std::cout << "Initial: " << initial << '\n';
    std::cout << "Is raining: " << isRaining << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Overflow Prevention)
Given $a = 10^9$ and $b = 10^9$. Write a program to calculate their product correctly without integer overflow.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    long long a = 1000000000LL;
    long long b = 1000000000LL;
    long long product = a * b;

    std::cout << "Product: " << product << '\n'; // 1000000000000000000
    return 0;
}
```
</details>

---

## 10. Summary

- `int` holds 32-bit integers (up to $\approx 2 \times 10^9$).
- `long long` holds 64-bit integers (up to $\approx 9 \times 10^{18}$).
- `double` is the standard floating-point type for high precision.
- Single quotes `'c'` for characters; double quotes `"text"` for strings.
- Always watch out for integer overflow when multiplying large numbers.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[basic.fundamental]* — Fundamental types.
- **cppreference.com**: *[Fundamental types](https://en.cppreference.com/w/cpp/language/types)*, *[sizeof operator](https://en.cppreference.com/w/cpp/language/sizeof)*.
