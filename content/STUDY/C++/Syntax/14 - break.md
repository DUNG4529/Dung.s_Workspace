# break

## 1. What Is It?

The **`break` statement** (*lệnh ngắt*) is a jump statement in C++ that immediately terminates the execution of the innermost enclosing loop (`for`, `while`, `do while`) or `switch` block. Control transfers directly to the statement immediately following the terminated block.

---

## 2. Why Does It Exist?

In many algorithms, a loop has done its job before reaching its nominal end condition:
- You are searching for an item in a list and found it early (no need to scan the rest of the list).
- An invalid input or error condition occurred that requires immediate loop exit.
- You are implementing an infinite simulation loop that stops when a specific goal state is reached.

`break` avoids unnecessary iterations and simplifies exit logic.

---

## 3. Basic Syntax

```cpp
break;
```

---

## 4. How Does It Work?

![[14 - break-20260826200752222.svg]]

When the CPU encounters `break;`:
1. It ignores all remaining statements inside the current iteration.
2. It stops all further loop iterations.
3. It exits **only the innermost enclosing loop** in which `break` is located.

---

## 5. Examples

### Example 1: Early Exit in Linear Search
```cpp
#include <iostream>

int main() {
    int target = 7;
    bool found = false;

    for (int i = 1; i <= 1000; ++i) {
        if (i == target) {
            std::cout << "Target found at value: " << i << '\n';
            found = true;
            break; // Stop iterating! No need to check 8 through 1000.
        }
    }

    return 0;
}
```

### Example 2: Exiting an Infinite Loop on Sentinel Input
```cpp
#include <iostream>

int main() {
    int sum = 0;

    while (true) {
        int x;
        std::cin >> x;

        if (x == -1) { // Sentinel value -1 signals stop
            break;
        }

        sum += x;
    }

    std::cout << "Sum: " << sum << '\n';
    return 0;
}
```

---

## 6. Common Variations: `break` in Nested Loops

A `break` statement exits **only one level** of nesting (the innermost loop):

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 3; ++i) {
        for (int j = 1; j <= 3; ++j) {
            if (j == 2) {
                break; // Exits only the INNER loop (j)
            }
            std::cout << "(" << i << ", " << j << ") ";
        }
        std::cout << '\n';
    }
    return 0;
}
```

**Output:**
```text
(1, 1) 
(2, 1) 
(3, 1) 
```

> [!NOTE]
> If you need to exit multiple nested loops simultaneously, either use a boolean flag (e.g., `bool stop = true; break;`) or extract the search into a dedicated function and use `return`.

---

## 7. Common Mistakes

### 1. Using `break` Outside of a Loop or `switch`
```cpp
if (x > 5) {
    break; // COMPILE ERROR: 'break' statement not within loop or switch
}
```

### 2. Expecting `break` to Exit an `if` Statement
`break` does not terminate an `if` statement—it terminates the loop that *contains* the `if` statement.

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Early Exit in Prime Checking**: Once a divisor is found, break immediately ($O(\sqrt{N})$ optimization).
- **Sentinel Input Termination**: Stopping on $N = 0$ or $EOF$.
- **Graph Traversal / BFS / DFS**: Stopping the search as soon as the destination node is reached.

---

## 9. Practice

### Exercise 1 (Easy)
Write a loop that counts from $1$ to $100$, but immediately breaks and stops printing as soon as it reaches the number $13$.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 100; ++i) {
        if (i == 13) {
            break;
        }
        std::cout << i << " ";
    }
    std::cout << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - First Multiple Finder)
Read an integer $K$. Find and print the first number $\ge 100$ that is divisible by $K$, then terminate the loop immediately.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int k;
    std::cin >> k;

    for (int i = 100; ; ++i) {
        if (i % k == 0) {
            std::cout << "First multiple >= 100 is: " << i << '\n';
            break;
        }
    }
    return 0;
}
```
</details>

---

## 10. Summary

- `break;` immediately exits the innermost enclosing loop (`for`, `while`, `do while`) or `switch`.
- Useful for early search termination and sentinel input loops.
- In nested loops, `break` only exits the current innermost layer.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.break]* — The break statement.
- **cppreference.com**: *[break statement](https://en.cppreference.com/w/cpp/language/break)*.
