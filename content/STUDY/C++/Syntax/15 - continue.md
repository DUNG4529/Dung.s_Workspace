# continue

## 1. What Is It?

The **`continue` statement** (*lệnh tiếp tục*) is a jump statement in C++ that skips the remaining code in the **current iteration** of a loop (`for`, `while`, `do while`) and immediately jumps to the next iteration.

---

## 2. Why Does It Exist?

When processing items in a loop, some elements might not be relevant or should be ignored (e.g., negative numbers, whitespace characters, or invalid grid obstacles). 

Using `continue` allows you to:
- Filter out invalid cases early (**Guard Clauses**).
- Avoid deeply nested `if` statements inside your loop body.

---

## 3. Basic Syntax

```cpp
continue;
```

---

## 4. How Does It Work?

![[15 - continue-20260826200758890.svg]]

- In a **`for` loop**: `continue` skips the rest of the body and jumps directly to the **update step** (e.g., `++i`), then tests the condition.
- In a **`while` / `do while` loop**: `continue` skips the rest of the body and jumps directly to the **condition test**.

---

## 5. Examples

### Example 1: Printing Only Odd Numbers
```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 10; ++i) {
        if (i % 2 == 0) {
            continue; // Skip even numbers!
        }
        std::cout << i << " "; // Prints only 1 3 5 7 9
    }
    std::cout << '\n';
    return 0;
}
```

**Output:**
```text
1 3 5 7 9 
```

### Example 2: Skipping Negative Input Values
```cpp
#include <iostream>

int main() {
    int sum = 0;
    for (int i = 0; i < 5; ++i) {
        int val;
        std::cin >> val;

        if (val < 0) {
            std::cout << "Negative value skipped!\n";
            continue; // Do not add negative numbers
        }

        sum += val;
    }

    std::cout << "Sum of positive numbers: " << sum << '\n';
    return 0;
}
```

---

## 6. Comparison: `break` vs `continue`

| Feature | `break;` | `continue;` |
| :--- | :--- | :--- |
| **Action** | **Terminates** the loop completely | **Skips** to the next iteration |
| **Remaining Iterations** | Canceled ($0$ more) | Continues with the next cycle |
| **Valid Inside `switch`** | ✅ Yes | ❌ No |

---

## 7. Common Mistakes

### 1. The `while` Loop Infinite Increment Bug!
In a `while` loop, if your counter increment (`++i`) is placed *after* the `continue` statement, it will be skipped—causing an infinite loop!

```cpp
int i = 1;
while (i <= 5) {
    if (i == 3) {
        continue; // DANGEROUS BUG: ++i is skipped! i remains 3 forever!
    }
    std::cout << i << '\n';
    ++i;
}
```
*Fix: Always increment the counter before `continue` in a while loop:*
```cpp
int i = 1;
while (i <= 5) {
    if (i == 3) {
        ++i; // Increment before skipping!
        continue;
    }
    std::cout << i << '\n';
    ++i;
}
```

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **Filtering Obstacles / Self-Loops in Graphs**:
  ```cpp
  if (u == v) continue; // Skip self-loops
  if (visited[next_node]) continue; // Skip already visited nodes
  ```
- **Grid Boundary Guard Clauses**:
  ```cpp
  if (nr < 0 || nr >= R || nc < 0 || nc >= C) continue; // Skip out-of-bounds
  ```

---

## 9. Practice

### Exercise 1 (Easy)
Write a program that prints all numbers from $1$ to $20$ **except** multiples of $3$ using `continue`.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    for (int i = 1; i <= 20; ++i) {
        if (i % 3 == 0) {
            continue;
        }
        std::cout << i << " ";
    }
    std::cout << '\n';
    return 0;
}
```
</details>

### Exercise 2 (Basic Application)
Read $N$ integers from the user. Calculate the product of all non-zero numbers (skip any numbers equal to `0` using `continue`).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int main() {
    int n;
    std::cin >> n;

    long long product = 1;
    for (int i = 0; i < n; ++i) {
        int x;
        std::cin >> x;

        if (x == 0) {
            continue; // Skip zero
        }

        product *= x;
    }

    std::cout << "Product: " << product << '\n';
    return 0;
}
```
</details>

---

## 10. Summary

- `continue;` skips the remainder of the current iteration.
- In `for` loops, it jumps to the update step (`++i`).
- In `while` loops, ensure the counter is updated before `continue` to avoid infinite loops.
- Use `continue` for clean guard clauses and data filtering.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[stmt.cont]* — The continue statement.
- **cppreference.com**: *[continue statement](https://en.cppreference.com/w/cpp/language/continue)*.
