# Comments

## 1. What Is It?

A **comment** (*chú thích*) is explanatory text placed in C++ source code that is completely ignored by the compiler. Comments exist exclusively for human developers to document code, explain complex logic, or temporarily disable statements during debugging.

---

## 2. Why Does It Exist?

Source code is read far more often than it is written. Comments help:
- Explain the *intent* or *reasoning* behind a block of code.
- Provide documentation for functions, parameters, and algorithms.
- Temporarily deactivate code during testing without deleting it.

---

## 3. Basic Syntax

C++ supports two types of comments:

```cpp
// 1. Single-line comment: everything from // to the end of the line is ignored

/* 
   2. Multi-line (block) comment:
   Everything between /* and */ is ignored
*/
```

---

## 4. How Does It Work?

![[02 - Comments-20260826200605591.svg]]

- During translation (Phase 3 of translation in ISO C++), the compiler replaces each comment with a single whitespace character.
- Comments have **zero impact** on:
  - Compiled binary size.
  - Program execution speed or CPU usage.
  - Memory usage.

---

## 5. Examples

### Example 1: Documenting Variables and Logic
```cpp
#include <iostream>

int main() {
    // Number of test cases
    int testCases = 5;

    /* Calculate the total score
       Initial score starts at zero */
    int totalScore = 0;

    std::cout << "Test cases: " << testCases << '\n';
    return 0;
}
```

### Example 2: Inline Comments for Clarification
```cpp
#include <iostream>

int main() {
    int maxLimit = 1000000; // 10^6 upper bound for problem constraints
    std::cout << maxLimit << '\n';
    return 0;
}
```

---

## 6. Common Variations

### Commenting Out Code Blocks (Debugging)
```cpp
#include <iostream>

int main() {
    int a = 10;
    // int b = 20; // Temporarily disabled

    std::cout << a << '\n';
    return 0;
}
```

---

## 7. Common Mistakes

### 1. Nesting Multi-Line Comments (Syntax Error)
C++ does **not** support nested `/* ... */` comments. The first `*/` encountered will immediately close the comment block.

```cpp
// WRONG: Syntax Error!
/* Outer comment starts
   /* Inner comment */
   The compiler thinks the comment ended above, so this text causes an error!
*/
```

### 2. Over-commenting the Obvious
Comments should explain *why*, not state the obvious *what*.

```cpp
// BAD: Redundant comment
int x = 5; // Set x to 5

// GOOD: Explains intention/context
int maxRetryCount = 5; // Allow at most 5 connection attempts before timeout
```

---

## 8. When Should I Use It?

- **Use single-line `//`** for short notes, clarifying variable purposes, and problem constraints.
- **Use multi-line `/* ... */`** for file headers, algorithm overviews, and multi-line function documentation.
- **In Competitive Programming**: Use comments to note edge cases, time complexity (e.g., `// O(N log N)`), and tricky mathematical assumptions.

---

## 9. Practice

### Exercise 1 (Easy)
Identify which of the following comments are valid and which cause syntax errors:

```cpp
// Option A: // This is a comment

/* Option B:
   Line 1
   Line 2
*/

// Option C: /* Option C inside single line */

/* Option D: /* Nested */ */
```

<details>
<summary>🔍 Solution</summary>

- **Option A**: Valid (Single-line).
- **Option B**: Valid (Multi-line).
- **Option C**: Valid (The `/* ... */` characters are part of the single-line comment).
- **Option D**: **Invalid** (Nested multi-line comments are illegal in C++).
</details>

---

## 10. Summary

- `//` comments out a single line.
- `/* ... */` comments out a multi-line block.
- Comments are completely stripped during compilation and do not affect performance.
- Multi-line comments cannot be nested.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[lex.comment]* — Comments.
- **cppreference.com**: *[Comments](https://en.cppreference.com/w/cpp/comment)*.
- **isocpp.org**: *[C++ Core Guidelines - NL.1 to NL.4: Comments](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-comments)*.
