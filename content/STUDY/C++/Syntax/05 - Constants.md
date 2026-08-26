# Constants

## 1. What Is It?

A **constant** (*hằng số*) is a variable whose value cannot be changed after its initial definition. In C++, attempting to modify a constant variable results in a compile-time error.

---

## 2. Why Does It Exist?

1. **Safety & Bug Prevention**: Prevents accidental modification of critical configuration values (such as maximum array sizes, mathematical constants, or tax rates).
2. **Readability & Maintainability**: Replaces "magic numbers" (unexplained numbers like `1000000007` or `3.14159`) with descriptive names.
3. **Compiler Optimization**: When the compiler knows a value is immutable, it can perform aggressive optimizations (such as folding constant math directly into machine instructions).

---

## 3. Basic Syntax

```cpp
// 1. Runtime / General constant (const)
const type CONSTANT_NAME = value;

// 2. Compile-time constant (constexpr) — Evaluated at compilation time
constexpr type CONSTANT_NAME = value;
```

---

## 4. How Does It Work?

![[05 - Constants-20260826200644081.svg]]

- **`const`**: Enforces read-only semantics. The value can be determined either at compile time or at runtime (e.g., initialized from user input), but cannot be reassigned once initialized.
- **`constexpr`** *(Modern C++)*: Guarantees that the value is evaluated and fixed **at compile time**, enabling its use for compile-time array sizes and template arguments.

---

## 5. Examples

### Example 1: Basic `const` Usage
```cpp
#include <iostream>

int main() {
    const double PI = 3.1415926535;
    const int DAYS_IN_WEEK = 7;

    std::cout << "PI: " << PI << '\n';
    std::cout << "Days in week: " << DAYS_IN_WEEK << '\n';

    // PI = 3.14; // COMPILE ERROR: assignment of read-only variable 'PI'
    return 0;
}
```

### Example 2: `constexpr` for Compile-Time Constants
```cpp
#include <iostream>

int main() {
    constexpr int MAX_ITEMS = 100 * 5; // Calculated during compilation (500)
    std::cout << "Max items: " << MAX_ITEMS << '\n';
    return 0;
}
```

---

## 6. Common Variations

### `const` vs `constexpr` vs Legacy `#define`

| Feature | `#define NAME value` (Legacy C) | `const type NAME` | `constexpr type NAME` (Modern C++) |
| :--- | :--- | :--- | :--- |
| **Type Safety** | ❌ No (Raw text substitution) | ✅ Yes (Typed) | ✅ Yes (Typed) |
| **Scope Enforced** | ❌ No (Global text replacement) | ✅ Yes (Respects scopes) | ✅ Yes (Respects scopes) |
| **Evaluation Time** | Preprocessor stage | Compile-time or Runtime | **Guaranteed Compile-time** |
| **Debugger Friendly** | ❌ No (Symbol invisible) | ✅ Yes | ✅ Yes |

> [!TIP]
> **Modern C++ Guideline**: Avoid `#define` for constants. Always use `const` or `constexpr`.

---

## 7. Common Mistakes

### 1. Forgetting to Initialize a `const` Variable
```cpp
const int MAX_LIMIT; // ERROR: uninitialized const 'MAX_LIMIT'
```
*Rule: Every `const` variable must be given a value at the point of declaration.*

### 2. Attempting to Modify a `const` Variable
```cpp
const int score = 100;
score = 200; // ERROR: assignment of read-only variable 'score'
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Modulo Constant**:
  ```cpp
  const int MOD = 1e9 + 7; // Or 998244353
  ```
- **Maximum Array / Problem Bounds**:
  ```cpp
  const int MAXN = 200005;
  ```
- **Infinity Representation**:
  ```cpp
  const int INF = 1e9;
  const long long INF64 = 1e18;
  ```

---

## 9. Practice

### Exercise 1 (Easy)
Define a constant for the acceleration due to gravity `GRAVITY = 9.8` and calculate the weight of an object with `mass = 5.0` kilograms ($W = m \times g$).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    const double GRAVITY = 9.8;
    double mass = 5.0;
    double weight = mass * GRAVITY;

    std::cout << "Weight: " << weight << " N\n";
    return 0;
}
```
</details>

### Exercise 2 (Basic Application)
Create a `constexpr` variable representing the total number of minutes in a day (`MINUTES_PER_DAY = 24 * 60`). Calculate and print how many minutes are in 5 days.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    constexpr int MINUTES_PER_DAY = 24 * 60;
    int days = 5;
    int totalMinutes = days * MINUTES_PER_DAY;

    std::cout << "Total minutes in " << days << " days: " << totalMinutes << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- `const` marks a variable as read-only after initialization.
- `constexpr` forces constant calculation at compile-time.
- Prefer `const` / `constexpr` over `#define` for type safety and clean scoping.
- Always initialize constants at declaration.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[dcl.type.cv]* — Type specifiers (const), *[dcl.constexpr]* — constexpr specifier.
- **cppreference.com**: *[cv type qualifiers](https://en.cppreference.com/w/cpp/language/cv)*, *[constexpr specifier](https://en.cppreference.com/w/cpp/language/constexpr)*.
- **isocpp.org**: *[C++ Core Guidelines - Con.1 to Con.4: Constants](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-const)*.
