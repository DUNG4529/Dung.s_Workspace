# for

## 1. What Is It?

The **`for` loop** (*vòng lặp for*) is a counter-controlled iteration statement in C++. It repeatedly executes a block of code for a predetermined number of iterations or until a specific condition becomes `false`.

---

## 2. Why Does It Exist?

Many computational problems require repeating operations over a known range or collection of data:
- Summing numbers from $1$ to $N$.
- Iterating through array elements from index $0$ to $N - 1$.
- Generating mathematical sequences.

The `for` loop consolidates the loop's **initialization**, **continuation condition**, and **step update** into a single, compact line.

---

## 3. Basic Syntax

```cpp
for (initialization; condition; update) {
    // Body: statements to repeat
}
```

---

## 4. How Does It Work?

![[11 - for-20260826200736714.svg]]

1. **Initialization (`int i = 0`)**: Executes exactly once when the loop begins. Usually declares and initializes a counter variable.
2. **Condition (`i < n`)**: Evaluated *before* each iteration. If `true`, the body executes; if `false`, the loop immediately terminates.
3. **Body (`{ ... }`)**: The statements inside the curly braces execute.
4. **Update (`++i`)**: Executes *after* each body execution. Increments or updates the counter, then jumps back to re-evaluate the **Condition**.

---

## 5. Examples

### Example 1: Standard $0$ to $N-1$ Iteration
```cpp
#include <iostream>

int main() {
    int n = 5;
    for (int i = 0; i < n; ++i) {
        std::cout << "i = " << i << '\n';
    }
    return 0;
}
```

**Output:**
```text
i = 0
i = 1
i = 2
i = 3
i = 4
```

### Example 2: Reverse Counting ($N$ Down to $1$)
```cpp
#include <iostream>

int main() {
    for (int i = 5; i >= 1; --i) {
        std::cout << i << " ";
    }
    std::cout << "Blast off!\n";
    return 0;
}
```

**Output:**
```text
5 4 3 2 1 Blast off!
```

---

## 6. Common Variations

### 1. Multiple Variables in Loop Header
```cpp
for (int i = 0, j = 10; i <= j; ++i, --j) {
    std::cout << i << " <-> " << j << '\n';
}
```

### 2. Infinite Loop
```cpp
for (;;) {
    // Runs indefinitely until an internal 'break' or 'return'
    break; 
}
```

---

## 7. Common Mistakes

### 1. The Unsigned Reverse Loop Trap (Infinite Loop!)
When iterating backward using an `unsigned` integer:

```cpp
// DANGEROUS BUG: Infinite Loop!
for (unsigned int i = 5; i >= 0; --i) {
    std::cout << i << '\n';
}
```
*Why?* An `unsigned int` can never be negative. When `i` is `0`, `--i` wraps around to `4294967295`, which is still $\ge 0$!
*Fix: Use signed `int` for reverse countdown loops.*

### 2. Off-by-One Errors
- `i < n` iterates $n$ times ($0, 1, \dots, n-1$).
- `i <= n` iterates $n+1$ times ($0, 1, \dots, n$).
Mixing these up causes out-of-bounds array access bugs.

### 3. Accidental Semicolon After `for (...)`
```cpp
for (int i = 0; i < 5; ++i); // BUG: Semicolon creates empty loop!
{
    std::cout << "Runs only once!\n";
}
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **0-based Array Iteration**: `for (int i = 0; i < n; ++i)` (The bread and butter of CP).
- **1-based Mathematical Problems**: `for (int i = 1; i <= n; ++i)`.
- **Nested Loops**: Iterating 2D grid matrices:
  ```cpp
  for (int r = 0; r < rows; ++r) {
      for (int c = 0; c < cols; ++c) {
          // Process cell (r, c)
      }
  }
  ```

---

## 9. Practice

### Exercise 1 (Easy)
Write a program that calculates and prints the sum of all integers from $1$ to $N$ using a `for` loop.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int n;
    std::cin >> n;

    long long sum = 0;
    for (int i = 1; i <= n; ++i) {
        sum += i;
    }

    std::cout << "Sum: " << sum << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Multiplication Table)
Read an integer $N$ and print its multiplication table from $1$ to $10$ in the format: `N x i = Result`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int n;
    std::cin >> n;

    for (int i = 1; i <= 10; ++i) {
        std::cout << n << " x " << i << " = " << (n * i) << '\n';
    }
    return 0;
}
```
</details>

---

## 10. Summary

- A `for` loop combines `initialization; condition; update` in one header.
- The condition is checked *before* every iteration.
- Use `++i` for updates.
- Watch out for off-by-one errors and unsigned reverse loops.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.for]* — The for statement.
- **cppreference.com**: *[for loop](https://en.cppreference.com/w/cpp/language/for)*.
- **isocpp.org**: *[C++ Core Guidelines - ES.71: Prefer a range-for loop to a for-loop when there is an obvious element type](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#Res-for-range)*.
