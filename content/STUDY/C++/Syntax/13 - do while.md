# do while

## 1. What Is It?

The **`do while` loop** (*vòng lặp do-while*) is a post-test iteration construct in C++. It executes its code block **at least once** before evaluating its continuation condition.

---

## 2. Why Does It Exist?

In standard `for` and `while` loops, the condition is evaluated *before* entering the loop body. If the initial condition is `false`, the body never executes.

However, in many real-world scenarios, an action **must happen first** before you can check whether to repeat it:
- Prompting a user for input and validating that it meets constraints.
- Displaying an interactive menu at least once.
- Reading data packets where at least the first header packet must be inspected.

---

## 3. Basic Syntax

```cpp
do {
    // Body: executes AT LEAST ONCE
} while (condition); // Notice the required trailing semicolon!
```

---

## 4. How Does It Work?

![[13 - do while-20260826200746702.svg]]

1. Execution enters the loop and **immediately runs the body**.
2. The boolean `condition` is evaluated *at the end* of the iteration.
3. If `true`, control loops back to step 1.
4. If `false`, the loop terminates.

---

## 5. Examples

### Example 1: Input Validation Loop
Prompt the user repeatedly until they enter a positive number:

```cpp
#include <iostream>

int main() {
    int number;

    do {
        std::cout << "Enter a positive number (> 0): ";
        std::cin >> number;
    } while (number <= 0); // Repeat as long as input is invalid

    std::cout << "Valid number entered: " << number << '\n';
    return 0;
}
```

### Example 2: Interactive Menu System
```cpp
#include <iostream>

int main() {
    int choice;

    do {
        std::cout << "\n--- MENU ---\n";
        std::cout << "1. Start Game\n";
        std::cout << "2. Settings\n";
        std::cout << "3. Exit\n";
        std::cout << "Enter choice: ";
        std::cin >> choice;

        if (choice == 1) std::cout << "Starting...\n";
        else if (choice == 2) std::cout << "Settings opened.\n";

    } while (choice != 3);

    std::cout << "Goodbye!\n";
    return 0;
}
```

---

## 6. Comparison: `while` vs `do while`

| Feature | `while (condition) { }` | `do { } while (condition);` |
| :--- | :--- | :--- |
| **Condition Check** | **Pre-test** (Before entering body) | **Post-test** (After executing body) |
| **Minimum Executions** | **$0$ times** | **$1$ time** |
| **Syntax Note** | No semicolon after condition | **Requires trailing semicolon `;`** |

---

## 7. Common Mistakes

### 1. Forgetting the Trailing Semicolon `;`
Unlike `for` and `while`, a `do while` statement **must end with a semicolon**:

```cpp
// SYNTAX ERROR: Expected ';' after while
do {
    std::cout << "Hello\n";
} while (x < 5) 
```

### 2. Variable Scope Inside `do { ... }`
Variables declared inside the `do` block are destroyed before the `while(...)` condition is reached:

```cpp
do {
    int input;
    std::cin >> input;
} while (input > 0); // ERROR: 'input' was not declared in this scope!
```
*Fix: Declare the variable `int input;` outside the `do` block.*

---

## 8. When Should I Use It?

- **Input Prompting**: Any time you need to prompt, receive, and validate input from a user or stream.
- **Game/Menu Loops**: Running an interactive loop where the user sees choices first.
- *Note for CP*: `do while` is used less frequently in competitive programming than `for` and `while`, except in interactive problems or menu-driven simulation problems.

---

## 9. Practice

### Exercise 1 (Easy)
Write a `do while` loop that prints numbers from $1$ up to $5$.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int i = 1;
    do {
        std::cout << i << '\n';
        ++i;
    } while (i <= 5);
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Guessing Game Simulation)
Write a program that uses a `do while` loop to prompt the user to guess a secret number (e.g., `secret = 7`). Keep asking until they enter `7`, then print `"Correct!"`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    const int SECRET = 7;
    int guess;

    do {
        std::cout << "Guess the secret number: ";
        std::cin >> guess;
    } while (guess != SECRET);

    std::cout << "Correct! You guessed it.\n";
    return 0;
}
```
</details>

---

## 10. Summary

- `do while` evaluates its condition *after* the body executes.
- Guaranteed to run at least once.
- Always remember the trailing semicolon: `do { ... } while (condition);`.
- Declare condition variables outside the loop body.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.do]* — The do statement.
- **cppreference.com**: *[do-while loop](https://en.cppreference.com/w/cpp/language/do)*.
