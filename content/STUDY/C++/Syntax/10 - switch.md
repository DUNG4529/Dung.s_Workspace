# switch

## 1. What Is It?

The **`switch` statement** (*cấu trúc rẽ nhánh đa trường hợp*) is a control flow statement that selects one of several code blocks to execute based on the exact matching value of an **integral or enumeration expression**.

---

## 2. Why Does It Exist?

When comparing a single variable against many discrete constant values (e.g., matching a menu choice $1, 2, 3, 4, 5$ or direction characters `'U'`, `'D'`, `'L'`, `'R'`), writing long chains of `if (x == 1) ... else if (x == 2) ...` is repetitive and verbose.

`switch` provides:
- Clean, readable multi-way branching.
- **Performance Optimization**: Compilers frequently compile `switch` statements into efficient direct lookup tables (**jump tables**), enabling $O(1)$ dispatch regardless of the number of cases.

---

## 3. Basic Syntax

```cpp
switch (integral_expression) {
    case constant_value_1:
        // Statements executed if expression == constant_value_1
        break; // Exits the switch block

    case constant_value_2:
        // Statements executed if expression == constant_value_2
        break;

    default:
        // Statements executed if no case matches (optional)
        break;
}
```

---

## 4. How Does It Work?

```mermaid
flowchart TD
    A["Evaluate switch(expression)"] --> B{"Matches case?"}
    B -->|case 1| C["Execute Case 1 Body"]
    B -->|case 2| D["Execute Case 2 Body"]
    B -->|No match| E["Execute default Body"]

    C --> F{"Encountered break?"}
    D --> F
    E --> G["Exit switch"]

    F -->|Yes| G
    F -->|No (Fallthrough)| H["Execute subsequent case!"]

    style A fill:#e1f5fe,stroke:#0288d1;
    style B fill:#fff3e0,stroke:#f57c00;
    style G fill:#e8f5e9,stroke:#388e3c;
    style H fill:#ffebee,stroke:#d32f2f;
```

1. The `expression` inside `switch(...)` is evaluated once.
2. Control jumps directly to the matching `case constant:` label.
3. Execution proceeds sequentially until a `break;` statement is encountered, which jumps out of the `switch`.
4. If no `break;` is present, execution flows directly into the next case (**fallthrough**).

---

## 5. Examples

### Example 1: Basic Calculator Operation
```cpp
#include <iostream>

int main() {
    char op;
    int a = 10, b = 2;

    std::cout << "Enter an operator (+, -, *, /): ";
    std::cin >> op;

    switch (op) {
        case '+':
            std::cout << "Result: " << (a + b) << '\n';
            break;
        case '-':
            std::cout << "Result: " << (a - b) << '\n';
            break;
        case '*':
            std::cout << "Result: " << (a * b) << '\n';
            break;
        case '/':
            std::cout << "Result: " << (a / b) << '\n';
            break;
        default:
            std::cout << "Invalid operator!\n";
            break;
    }

    return 0;
}
```

---

## 6. Common Variations

### Intentional Fallthrough (Grouping Multiple Cases)
Multiple `case` labels can share the same execution block:

```cpp
#include <iostream>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
        case 'B':
        case 'C':
            std::cout << "Passing grade!\n"; // Runs for 'A', 'B', or 'C'
            break;
        case 'D':
        case 'F':
            std::cout << "Failing grade.\n";
            break;
        default:
            std::cout << "Invalid grade.\n";
            break;
    }

    return 0;
}
```

> [!NOTE]
> In C++17, if you intentionally omit `break` between non-empty cases, use the attribute `[[fallthrough]];` to suppress compiler warnings.

---

## 7. Common Mistakes

### 1. Forgetting the `break;` Statement (Accidental Fallthrough)
```cpp
int choice = 1;
switch (choice) {
    case 1:
        std::cout << "One\n"; // Missing break!
    case 2:
        std::cout << "Two\n"; // Also executes even though choice is 1!
        break;
}
```

### 2. Using Non-Integral Types (e.g., `double`, `std::string`)
In C++, `switch` expressions **must be integers, characters, or enums**. Floating-point numbers and strings are illegal:

```cpp
double d = 3.14;
switch (d) { // COMPILE ERROR: switch quantity not an integer
}

std::string s = "hello";
switch (s) { // COMPILE ERROR: switch quantity not an integer
}
```

### 3. Non-Constant `case` Labels
Every `case` value must be a **compile-time constant**:
```cpp
int y = 5;
switch (x) {
    case y: // COMPILE ERROR: 'y' cannot appear in a constant-expression
        break;
}
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Grid Navigation**: Parsing direction commands (`'U'`, `'D'`, `'L'`, `'R'`).
- **State Machine Transitions**: Handling discrete state IDs ($0, 1, 2, 3$).
- **Menu / Query Type Dispatch**: Handling queries of type $1, 2, 3$ in dynamic problem sets.

---

## 9. Practice

### Exercise 1 (Easy)
Read an integer $1 \le day \le 7$ and print the corresponding weekday name (`1` $\rightarrow$ `"Monday"`, `7` $\rightarrow$ `"Sunday"`). If out of range, print `"Invalid Day"`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int day;
    std::cin >> day;

    switch (day) {
        case 1: std::cout << "Monday\n"; break;
        case 2: std::cout << "Tuesday\n"; break;
        case 3: std::cout << "Wednesday\n"; break;
        case 4: std::cout << "Thursday\n"; break;
        case 5: std::cout << "Friday\n"; break;
        case 6: std::cout << "Saturday\n"; break;
        case 7: std::cout << "Sunday\n"; break;
        default: std::cout << "Invalid Day\n"; break;
    }

    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Direction Movement)
Given a position `(x, y)` starting at `(0, 0)`. Read a direction character (`'U'`, `'D'`, `'L'`, `'R'`) and update the coordinates accordingly:
- `'U'` (Up): $y + 1$
- `'D'` (Down): $y - 1$
- `'R'` (Right): $x + 1$
- `'L'` (Left): $x - 1$
Print the final `(x, y)` coordinates.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int x = 0, y = 0;
    char dir;
    std::cin >> dir;

    switch (dir) {
        case 'U': ++y; break;
        case 'D': --y; break;
        case 'R': ++x; break;
        case 'L': --x; break;
        default: std::cout << "Unknown command!\n"; break;
    }

    std::cout << "Position: (" << x << ", " << y << ")\n";
    return 0;
}
```
</details>

---

## 10. Summary

- `switch` branches execution based on an integer/char expression.
- Every `case` label must be a compile-time constant.
- Always include `break;` to prevent unintended fallthrough.
- `default:` handles unmatched values.
- `switch` does not support `double`, `float`, or `std::string`.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.switch]* — The switch statement.
- **cppreference.com**: *[switch statement](https://en.cppreference.com/w/cpp/language/switch)*.
- **isocpp.org**: *[C++ Core Guidelines - ES.78: Always end a switch case with a break](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-break)*.
