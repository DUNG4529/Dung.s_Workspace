# while

## 1. What Is It?

The **`while` loop** (*vòng lặp while*) is a condition-controlled iteration statement in C++. It repeatedly executes a block of code as long as a specified boolean condition evaluates to `true`.

---

## 2. Why Does It Exist?

Unlike a `for` loop (which is typically used when the number of iterations is known in advance), a `while` loop is ideal when:
- The number of iterations depends on runtime events or input state.
- You are reducing or transforming a number until it reaches a target threshold (e.g., dividing $N$ by $2$ until $N = 0$).
- You are reading continuous input until the End-of-File (EOF).

---

## 3. Basic Syntax

```cpp
while (condition) {
    // Body: statements to repeat
}
```

---

## 4. How Does It Work?

![[12 - while-20260826200742386.svg]]

1. **Pre-test Evaluation**: The condition inside `(...)` is evaluated *before* every iteration.
2. If the condition is `true`, the body executes.
3. After the body finishes, control jumps back to re-evaluate the condition.
4. If the condition is initially `false`, the loop body is **never executed** ($0$ times).

---

## 5. Examples

### Example 1: Sum of Digits of an Integer
Extracting digits of a positive number using modulo `% 10` and integer division `/= 10`:

```cpp
#include <iostream>

int main() {
    int n = 12345;
    int sum = 0;

    while (n > 0) {
        sum += (n % 10); // Extract last digit
        n /= 10;         // Remove last digit
    }

    std::cout << "Sum of digits: " << sum << '\n'; // 15
    return 0;
}
```

### Example 2: Euclidean Algorithm for Greatest Common Divisor (GCD)
```cpp
#include <iostream>

int main() {
    int a = 48, b = 18;

    while (b != 0) {
        int remainder = a % b;
        a = b;
        b = remainder;
    }

    std::cout << "GCD: " << a << '\n'; // 6
    return 0;
}
```

---

## 6. Common Variations

### 1. Reading Stream Input Until EOF (Competitive Programming)
```cpp
#include <iostream>

int main() {
    int val;
    // Loops continuously until standard input stream runs out of data
    while (std::cin >> val) {
        std::cout << "Read: " << val << '\n';
    }
    return 0;
}
```

### 2. Infinite Loop with Sentinel Break
```cpp
while (true) {
    int cmd;
    std::cin >> cmd;
    if (cmd == 0) break; // Exit on sentinel value 0
}
```

---

## 7. Common Mistakes

### 1. Forgetting to Update the Condition Variable (Infinite Loop!)
```cpp
int i = 0;
while (i < 5) {
    std::cout << i << '\n';
    // BUG: Forgot ++i; Loop runs forever and crashes / freezes!
}
```

### 2. Accidental Semicolon After `while (...)`
```cpp
int x = 0;
while (x < 10); // BUG: Infinite loop! Semicolon creates an empty loop body where x is never updated.
{
    ++x;
}
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Digit Processing**: Extracting digits, reversing numbers, counting digits.
- **Euclidean GCD & Binary Exponentiation**: Mathematical algorithms that reduce problem size iteratively ($N \rightarrow N / 2$).
- **Continuous Test Case Processing**:
  ```cpp
  int t;
  std::cin >> t;
  while (t--) {
      // Run each testcase
  }
  ```

---

## 9. Practice

### Exercise 1 (Easy)
Read an integer $N$ and count how many digits it contains using a `while` loop (assume $N > 0$).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    long long n;
    std::cin >> n;

    int digitCount = 0;
    while (n > 0) {
        n /= 10;
        ++digitCount;
    }

    std::cout << "Number of digits: " << digitCount << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Reversing a Number)
Read a positive integer $N$ and print its digits in reverse order as a new number (e.g., $1234 \rightarrow 4321$).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int n;
    std::cin >> n;

    int reversed = 0;
    while (n > 0) {
        int lastDigit = n % 10;
        reversed = reversed * 10 + lastDigit;
        n /= 10;
    }

    std::cout << "Reversed: " << reversed << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- `while` checks its condition *before* executing the body.
- If the condition is initially `false`, the body executes $0$ times.
- Always ensure the condition variable changes inside the body to avoid infinite loops.
- `while (t--)` is standard CP shorthand for running $T$ test cases.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.while]* — The while statement.
- **cppreference.com**: *[while loop](https://en.cppreference.com/w/cpp/language/while)*.
