# Input and Output

## 1. What Is It?

**Input and Output (I/O)** (*nhập và xuất dữ liệu*) refers to the mechanism by which a C++ program interacts with the outside environment:
- **Input**: Reading data from the keyboard, files, or competitive programming online judges into variables.
- **Output**: Displaying text, numbers, and computed results to the terminal or screen.

In C++, I/O is primarily managed through the `<iostream>` standard library streams.

---

## 2. Why Does It Exist?

Algorithms and programs need to operate on dynamic data provided at runtime rather than hardcoded numbers. I/O enables interactive applications, problem solving with arbitrary test cases, and diagnostic debugging.

---

## 3. Basic Syntax

```cpp
#include <iostream>
#include <string>

// 1. Output: std::cout with insertion operator <<
std::cout << data << '\n';

// 2. Input: std::cin with extraction operator >>
std::cin >> variable;

// 3. Line Input: std::getline for full sentences (including spaces)
std::getline(std::cin, string_variable);
```

---

## 4. How Does It Work?

```mermaid
flowchart LR
    Keyboard["Keyboard / Terminal Input"] -->|std::cin >> (Stream Extraction)| RAM["Program Variables (RAM)"]
    RAM -->|std::cout << (Stream Insertion)| Screen["Terminal Screen / Output"]

    style Keyboard fill:#e1f5fe,stroke:#0288d1;
    style RAM fill:#fff3e0,stroke:#f57c00;
    style Screen fill:#e8f5e9,stroke:#388e3c;
```

- **`std::cin`** *(Standard Input Stream)*: Reads characters from the input buffer. The `>>` operator skips leading whitespace (spaces, tabs, newlines), reads data until the next whitespace character, and automatically parses it into the target variable's type.
- **`std::cout`** *(Standard Output Stream)*: Writes formatted data into the output buffer using the `<<` operator.

---

## 5. Examples

### Example 1: Reading Multiple Numerical Values
```cpp
#include <iostream>

int main() {
    int a, b;
    std::cout << "Enter two integers separated by space: ";
    std::cin >> a >> b; // Chains reading of a and b

    std::cout << "Sum: " << (a + b) << '\n';
    return 0;
}
```

### Example 2: Reading Strings with Spaces (`std::getline`)
`std::cin >> word;` stops at the first whitespace. To read an entire line with spaces, use `std::getline`:

```cpp
#include <iostream>
#include <string>

int main() {
    std::string fullName;
    std::cout << "Enter your full name: ";
    std::getline(std::cin, fullName);

    std::cout << "Welcome, " << fullName << "!\n";
    return 0;
}
```

---

## 6. Common Variations: Fast I/O for Competitive Programming

By default, C++ streams synchronize with C's standard I/O (`stdio.h`) and flush streams automatically. In Competitive Programming, when input sizes reach $10^5$ to $10^6$ lines, default I/O can cause **Time Limit Exceeded (TLE)**.

To make C++ I/O as fast as C's `scanf`/`printf`:

```cpp
#include <iostream>

int main() {
    // Disable synchronization between C and C++ standard streams
    std::ios::sync_with_stdio(false);
    // Untie cin from cout (prevents flushing cout before every cin)
    std::cin.tie(nullptr);

    int n;
    while (std::cin >> n) {
        std::cout << (n * 2) << '\n'; // Prefer '\n' over std::endl
    }

    return 0;
}
```

---

## 7. Common Mistakes

### 1. Confusing `<<` and `>>`
- `std::cout << x;` (Arrow points **towards** `cout` / output).
- `std::cin >> x;` (Arrow points **towards** variable `x` / input).

### 2. Mixing `std::cin >>` and `std::getline` (The Leftover Newline Trap)
When you read a number with `std::cin >> n;`, the trailing Enter key (`\n`) remains in the buffer. A subsequent `std::getline` will immediately read this empty newline instead of waiting for your next input.

```cpp
int age;
std::string name;

std::cin >> age;
std::cin.ignore(); // FIX: Discard the leftover newline '\n' from the buffer
std::getline(std::cin, name);
```

### 3. Using `std::endl` in Tight Loops (Performance Hit)
`std::endl` writes a newline **and forces a buffer flush**. In loops with $10^5$ iterations, this causes extreme slowdown. Always prefer `'\n'`.

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Standard Reading**: `std::cin >> a >> b;` for numbers and single-word tokens.
- **Reading until End-of-File (EOF)**:
  ```cpp
  int x;
  while (std::cin >> x) {
      // Process each test case until input ends
  }
  ```
- **Fast I/O Template**: Place `std::ios::sync_with_stdio(false); std::cin.tie(nullptr);` at the top of `main()`.

---

## 9. Practice

### Exercise 1 (Easy)
Write a program that reads the length and width of a rectangle from the user and outputs its perimeter and area.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int length, width;
    std::cout << "Enter length and width: ";
    std::cin >> length >> width;

    int perimeter = 2 * (length + width);
    int area = length * width;

    std::cout << "Perimeter: " << perimeter << '\n';
    std::cout << "Area: " << area << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Continuous Input)
Write a program that continuously reads integers until the input ends (EOF), and prints the running sum of all numbers entered.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    long long sum = 0;
    long long num;

    while (std::cin >> num) {
        sum += num;
    }

    std::cout << "Total Sum: " << sum << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- `std::cin >>` reads data, skipping leading whitespace.
- `std::cout <<` writes data to the terminal.
- `std::getline(std::cin, str)` reads full lines containing spaces.
- Use `std::cin.ignore()` when switching from `cin >>` to `getline()`.
- Use fast I/O optimizations (`ios::sync_with_stdio(false); cin.tie(nullptr);`) and `'\n'` for competitive programming.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[iostream.objects]* — Standard iostream objects.
- **cppreference.com**: *[std::cin](https://en.cppreference.com/w/cpp/io/cin)*, *[std::cout](https://en.cppreference.com/w/cpp/io/cout)*, *[std::getline](https://en.cppreference.com/w/cpp/string/basic_string/getline)*.
