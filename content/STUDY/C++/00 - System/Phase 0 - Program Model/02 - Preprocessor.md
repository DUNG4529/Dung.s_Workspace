# Preprocessor (Bộ tiền xử lý)

## 1. Overview

The **Preprocessor** (*bộ tiền xử lý*) is the first stage in the C++ translation pipeline. It is a text-processing engine that runs on your source code before the actual [[03 - Compiler|Compiler]] analyzes C++ grammar, types, or syntax.

The preprocessor scans the source text for lines starting with a hash symbol (`#`), known as **preprocessor directives** (*chỉ thị tiền xử lý*), such as `#include`, `#define`, and `#ifdef`. It performs textual transformations, including file inclusion, macro substitution, and comment removal.

![[02 - Preprocessor-20260826184425414.svg|720]]

---

## 2. Why Does It Exist?

The preprocessor exists to perform programmatic text manipulation before semantic compilation begins:

1. **Modular Code Sharing** `[FACT]`: Instead of manually copying declarations (such as standard library input/output functions) into every file, `#include` automatically inserts the necessary declarations.
2. **Platform & Configuration Adaptation** `[FACT]`: Conditional directives (like `#ifdef _WIN32` or `#ifdef DEBUG`) allow code to be selectively included or excluded based on the target operating system or build mode without altering the underlying C++ logic.
3. **Historical Legacy & Simplicity** `[FACT]`: C++ inherited the preprocessor from C as a lightweight, fast, textual way to organize code into reusable header files.

---

## 3. Mental Model

Think of the preprocessor as an **automated copy-paste text editor**:

- When it encounters `#include <iostream>`, it physically opens the file `<iostream>`, copies its entire text content, and pastes it into `main.cpp` at that exact line.
- It is mostly "blind" to C++ language rules: it does not understand variables, types, loops, or classes. It only manipulates text characters and tokens.

---

## 4. Example

Consider this simple source file:

```cpp
// main.cpp: A greeting program
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

When the preprocessor processes this file:
1. The comment `// main.cpp: A greeting program` is stripped out.
2. The directive `#include <iostream>` is replaced by the thousands of lines of declarations contained inside the `<iostream>` header (declaring `std::cout`, stream types, operators, etc.).
3. The resulting expanded text stream is produced as an intermediate output, known in standard C++ as a **Translation Unit** (*đơn vị biên dịch*).

---

## 5. What Actually Happens?

According to the ISO C++ Standard (*[lex.phases]*), preprocessing encompasses Phases 1 through 4 of translation:

1. **Character Mapping** `[STANDARD]`: Physical source file characters are mapped and line endings are normalized.
2. **Line Splicing** `[STANDARD]`: Lines ending with a backslash (`\`) are spliced together with the subsequent line.
3. **Tokenization & Comment Stripping** `[STANDARD]`: Each comment is replaced with a single space character. The source text is broken into preprocessing tokens.
4. **Directive Execution & Macro Expansion** `[STANDARD]`:
   - **`#include` directives**: The preprocessor locates the requested header file and recursively runs preprocessing on it, replacing the `#include` line with the file's contents.
   - **`#define` macros**: Any defined macro names in the text are replaced with their defined replacement text.
   - **Conditional directives (`#if`, `#ifdef`, `#endif`)**: Portions of code that do not satisfy the condition are discarded.

The final output of this stage is a fully expanded, self-contained stream of C++ tokens ready for the [[03 - Compiler|Compiler]].

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"`#include` imports a library at runtime."** | `#include` is strictly a **compile-time textual operation**. It runs before the compiler even parses C++ syntax and has nothing to do with runtime loading or downloading. |
| **"The preprocessor verifies C++ types and syntax."** | The preprocessor only performs text substitution. If you write `#include <iostream>` followed by nonsensical C++ code, the preprocessor succeeds without complaint; only the [[03 - Compiler|Compiler]] will catch the syntax or type errors. |
| **"`#include` brings in executable binary code."** | `#include` brings in **text declarations** from header files. It does not bring in compiled machine code; actual function definitions are linked later by the [[05 - Linker|Linker]]. |

---

## 7. What You Need to Remember

- Preprocessing is a **text-transformation stage** that occurs *before* actual compilation.
- Directives begin with `#` (e.g., `#include`, `#define`).
- `#include` textually copies and pastes header file contents into the translation unit.
- Preprocessing does **not** occur at runtime; it produces the expanded **Translation Unit** fed into the [[03 - Compiler|Compiler]].

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[cpp]* — Preprocessing directives, *[lex.phases]* — Translation phases.
- `[REFERENCE]` **cppreference.com**: *[C++ Preprocessor](https://en.cppreference.com/w/cpp/preprocessor)*.
- `[REFERENCE]` **GCC Documentation**: *[The C Preprocessor](https://gcc.gnu.org/onlinedocs/cpp/)*.
- `[GUIDELINE]` **ISO C++ Foundation**: *[Standard C++ FAQ: How do header files work?](https://isocpp.org/wiki/faq)*.
