# Hello World

## 1. What Is It?

A **"Hello World"** program is the simplest functional program in C++. Its sole purpose is to output the text `"Hello, World!"` to the screen and exit successfully. It serves as the baseline test that your development environment, compiler, and basic code structure are working properly.

---

## 2. Why Does It Exist?

In C++, every standalone executable requires a defined starting point (an entry-point function) and a way to interact with the outside world (input/output). The "Hello World" program introduces the absolute minimum skeleton required for any C++ program.

---

## 3. Basic Syntax

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    return 0;
}
```

---

## 4. How Does It Work?

Breaking down the program line by line:

![[01 - Hello World-20260826200508888.svg]]

1. **`#include <iostream>`**: A preprocessor directive that includes the standard Input/Output stream header file, providing access to `std::cout`.
2. **`int main()`**: The entry-point function of every C++ program. Execution begins here. `int` specifies that the function returns an integer status code to the operating system.
3. **`{ ... }`**: Curly braces define the body (scope) of the `main` function.
4. **`std::cout`**: Standard character output stream object (pronounced *"see-out"*), located in the `std` (standard) namespace.
5. **`<<`**: The stream insertion operator. It directs the data on its right into the output stream on its left.
6. **`"Hello, World!\n"`**: A string literal. `\n` represents a newline character.
7. **`;`**: Semicolon terminates the statement. Every statement in C++ must end with a semicolon.
8. **`return 0;`**: Exits the `main` function and returns status code `0` to the operating system, indicating successful execution. *(In C++, omitting `return 0;` in `main` implicitly returns `0`, but writing it explicitly is clear and standard practice).*

---

## 5. Examples

### Example 1: Basic Output with Multiple Lines
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!\n";
    std::cout << "Welcome to C++.\n";
    return 0;
}
```

**Output:**
```text
Hello, World!
Welcome to C++.
```

### Example 2: Chaining Multiple Items with `<<`
```cpp
#include <iostream>

int main() {
    std::cout << "My name is " << "Alex" << " and I am " << 20 << " years old.\n";
    return 0;
}
```

**Output:**
```text
My name is Alex and I am 20 years old.
```

---

## 6. Common Variations

### Variation 1: `\n` vs `std::endl`
```cpp
#include <iostream>

int main() {
    std::cout << "Line 1" << std::endl; // Prints newline AND flushes the output buffer
    std::cout << "Line 2\n";            // Prints newline without forced flushing (Faster)
    return 0;
}
```

> [!TIP]
> Prefer `'\n'` over `std::endl`. In Competitive Programming and high-performance applications, `std::endl` forces an unnecessary buffer flush, which can significantly slow down I/O.

---

## 7. Common Mistakes

### 1. Missing Semicolon
```cpp
// ERROR: Expected ';' after statement
std::cout << "Hello, World!"
```

### 2. Forgetting `#include <iostream>`
```cpp
// ERROR: 'cout' is not a member of 'std' if <iostream> is omitted
int main() {
    std::cout << "Hello!\n";
}
```

### 3. Misspelling `main` or returning wrong type
```cpp
// ERROR: C++ standard requires main to return int
void main() { // Non-standard!
}
```

---

## 8. When Should I Use It?

- Use this template structure as the starting framework for every standalone C++ console program and competitive programming solution.

---

## 9. Practice

### Exercise 1 (Easy)
Write a program that prints your favorite programming language and why you want to learn C++ on two separate lines.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    std::cout << "Favorite Language: C++\n";
    std::cout << "Goal: Relearn fundamentals for Competitive Programming.\n";
    return 0;
}
```
</details>

### Exercise 2 (Basic Application)
Write a program that prints a 3x3 square pattern of asterisks (`*`) using `std::cout`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    std::cout << "***\n";
    std::cout << "***\n";
    std::cout << "***\n";
    return 0;
}
```
</details>

---

## 10. Summary

- `main()` is the entry-point function of every C++ program.
- `#include <iostream>` is required to use `std::cout`.
- `std::cout <<` outputs data to the terminal.
- Prefer `'\n'` over `std::endl` for faster newlines.
- Every statement ends with a semicolon `;`.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[basic.start.main]* — Main function.
- **cppreference.com**: *[Main function](https://en.cppreference.com/w/cpp/language/main_function)*, *[std::cout](https://en.cppreference.com/w/cpp/io/cout)*.
