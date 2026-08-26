# Type Conversion

## 1. What Is It?

**Type conversion** (*chuyển đổi kiểu dữ liệu / ép kiểu*) is the process of converting a value of one data type into another data type (e.g., converting an integer `10` into a floating-point `10.0`, or a character `'5'` into its integer ASCII code `53`).

In C++, type conversion happens in two ways:
1. **Implicit Conversion (Coercion)**: Handled automatically by the compiler.
2. **Explicit Conversion (Casting)**: Explicitly requested by the programmer.

---

## 2. Why Does It Exist?

Computers cannot directly combine values stored in different internal binary formats (such as adding an integer to a floating-point number) without converting one format to match the other. Type conversion enables:
- Seamless mathematical expressions mixing different numeric types.
- Precision preservation in division.
- ASCII character-to-integer arithmetic (essential in string algorithms).

---

## 3. Basic Syntax

```cpp
// 1. Implicit Conversion (Automatic)
double d = 10; // Integer 10 is automatically converted to double 10.0

// 2. Explicit Conversion - C++ Recommended (static_cast)
type target = static_cast<target_type>(source_variable);

// 3. Explicit Conversion - C-Style (Legacy)
type target = (target_type)source_variable;
```

---

## 4. How Does It Work?

![[08 - Type Conversion-20260826200715040.svg]]

### 1. Numeric Promotion & Widening (Safe)
Smaller integer types (`char`, `bool`, `short`) are automatically promoted to `int` or `long long` before arithmetic operations. Integers are promoted to `double` when mixed with decimals.

### 2. Narrowing & Truncation (Data Loss)
Converting from a larger or decimal type to a smaller integer type truncates the decimal portion (e.g., `3.99` becomes `3`, not `4`).

---

## 5. Examples

### Example 1: `static_cast` for Division Precision
```cpp
#include <iostream>

int main() {
    int totalPoints = 95;
    int totalTests = 10;

    // Without casting: 95 / 10 = 9 (Integer division)
    double wrongAvg = totalPoints / totalTests;

    // With static_cast: 95.0 / 10 = 9.5 (Floating-point division)
    double correctAvg = static_cast<double>(totalPoints) / totalTests;

    std::cout << "Wrong:   " << wrongAvg << '\n';
    std::cout << "Correct: " << correctAvg << '\n';

    return 0;
}
```

### Example 2: Character and ASCII Conversion
Characters in C++ are stored as ASCII integers:

```cpp
#include <iostream>

int main() {
    char ch = 'A';
    int asciiCode = static_cast<int>(ch); // 65

    char digitChar = '7';
    int numericValue = digitChar - '0';  // '7' (ASCII 55) - '0' (ASCII 48) = 7

    std::cout << "ASCII of 'A': " << asciiCode << '\n';
    std::cout << "Numeric of '7': " << numericValue << '\n';
    return 0;
}
```

---

## 6. Common Variations

### `static_cast<T>()` vs C-Style `(T)`
```cpp
int a = 10;
double d1 = static_cast<double>(a); // C++ Standard (Safe, checked at compile-time)
double d2 = (double)a;              // C-Style (Works, but less safe for complex types)
```

> [!TIP]
> In modern C++, prefer `static_cast<type>()` because it is explicit, searchable, and prevents dangerous accidental type conversions.

---

## 7. Common Mistakes

### 1. Premature Integer Overflow Before Casting
```cpp
int a = 1000000;
int b = 1000000;

// BUG: a * b overflows 32-bit int BEFORE being assigned to long long!
long long result = a * b; 

// FIX: Cast at least one operand to long long first:
long long resultFixed = static_cast<long long>(a) * b;
// Or in CP shorthand:
long long resultCP = 1LL * a * b;
```

### 2. Expecting Rounding Instead of Truncation
```cpp
double pi = 3.9999;
int intPi = static_cast<int>(pi); // Evaluates to 3, NOT 4!
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Preventing 64-bit Overflow**: `1LL * a * b` (forces 64-bit multiplication).
- **Converting Character Digit to Integer**: `int val = c - '0';`
- **Converting Alphabet Character to 0-Indexed Index**:
  - `int idx = c - 'a';` (for lowercase `'a'` $\rightarrow 0$, `'b'` $\rightarrow 1$, ..., `'z'` $\rightarrow 25$).
  - `int idx = c - 'A';` (for uppercase).

---

## 9. Practice

### Exercise 1 (Easy)
Read a character `c` from the input and print its integer ASCII code.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    char c;
    std::cin >> c;
    std::cout << "ASCII value: " << static_cast<int>(c) << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - CP Character Arithmetic)
Read a lowercase English letter (between `'a'` and `'z'`) and print its 0-based alphabetical position (e.g., `'a'` is `0`, `'c'` is `2`, `'z'` is `25`).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    char ch;
    std::cin >> ch;

    int index = ch - 'a';
    std::cout << "Alphabet Index: " << index << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- Implicit conversion happens automatically during widening (e.g., `int` to `double`).
- Explicit casting uses `static_cast<target_type>(value)`.
- Converting floating-point to integer **truncates** the decimal part.
- Use `1LL * a * b` or explicit casting to prevent integer overflow before multiplication.
- Use `c - '0'` to convert char digits to integers, and `c - 'a'` for alphabet indices.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[conv]* — Standard conversions, *[expr.static.cast]* — Static cast.
- **cppreference.com**: *[Implicit conversions](https://en.cppreference.com/w/cpp/language/implicit_conversion)*, *[static_cast](https://en.cppreference.com/w/cpp/language/static_cast)*.
- **isocpp.org**: *[C++ Core Guidelines - ES.48: Avoid casts](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-casts)*.
