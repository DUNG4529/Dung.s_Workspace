# Source Code (Mã nguồn)

## 1. Overview

**Source code** (*mã nguồn*) is human-readable text written in a formal programming language—in this case, C++. It contains instructions, definitions, and logic designed to solve a specific computational problem.

A typical C++ program begins its life as one or more text files saved with extensions like `.cpp`, `.cc`, or `.cxx`. Accompanying header files typically use `.h` or `.hpp` (or standard header names without extensions such as `<iostream>`).

![[01 - Source Code-20260826182920974.svg|720]]

---

## 2. Why Does It Exist?

Computers and central processing units (CPUs) do not understand human language or high-level mathematical concepts directly. A CPU operates strictly on low-level binary machine instructions (sequences of `0`s and `1`s encoding specific processor operations like loading memory into a register or adding two registers).

Writing binary or assembly instructions directly is:
- Error-prone and difficult to maintain.
- Tied to a specific CPU architecture (x86, ARM, RISC-V).
- Extremely inefficient for implementing complex algorithms and data structures.

Source code provides a **high-level abstraction**. It allows developers to express algorithms, logic, and data structures in a structured, readable format that can be translated automatically into machine code for any target platform.

---

## 3. Mental Model

Think of source code as an **architectural blueprint** or a **cooking recipe**:

- The recipe (*source code*) is written in human language for the chef (*programmer / compiler*).
- The physical actions of turning on the stove, cutting vegetables, and applying heat (*machine instructions*) are the actual execution steps performed in the kitchen (*computer hardware*).
- You cannot eat the paper blueprint; it must be constructed or prepared first.

---

## 4. Example

Here is a standard C++ source file named `main.cpp`:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

### Breakdown of the Source File:
- `#include <iostream>`: A preprocessor directive requesting declarations for standard input/output streams.
- `int main()`: The entry-point function signature where execution conceptually starts.
- `std::cout << "Hello World\n";`: A statement requesting text to be written to standard output.
- `return 0;`: A statement returning status code `0` (indicating successful termination) to the operating system.

---

## 5. What Actually Happens?

1. **Storage as Plain Text** `[FACT]`: When you save `main.cpp` in an editor or IDE, it is written to the file system as an encoded text file (typically UTF-8 or ASCII).
2. **Grammar & Structure** `[STANDARD]`: The source file contains:
   - **Statements & Expressions**: The logical commands to execute.
   - **Type declarations & Function definitions**: The structures and operations available.
   - **Preprocessor directives**: Instructions beginning with `#` that control preliminary text translation.
3. **Role of Headers (Conceptual)** `[FACT]`: Header files (`.h` / `<iostream>`) provide declarations—telling the compiler *what* functions and types exist without needing their full implementation details in the current file.
4. **Input to the Pipeline** `[FACT]`: The `.cpp` file is the starting input for the [[02 - Preprocessor|Preprocessor]], which begins the translation pipeline.

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"The CPU executes the `.cpp` file directly."** | The CPU only executes binary machine instructions. The `.cpp` file must first pass through preprocessing, compilation, and linking. |
| **"Adding comments or blank lines slows down program execution."** | Comments and whitespace exist solely for human readability. They are stripped out during translation and have zero effect on execution speed or binary size. |
| **"A single `.cpp` file always contains the entire program."** | Real-world C++ programs frequently consist of dozens, hundreds, or thousands of separate `.cpp` source files and headers compiled independently. |

---

## 7. What You Need to Remember

- Source code is **plain text** written for humans to design logic and algorithms.
- The CPU cannot execute `.cpp` files directly.
- Source files (`.cpp`) contain definitions and logic; headers (`.h`) provide declarations.
- Source code is the initial input to the [[02 - Preprocessor|Preprocessor]] and the broader [[07 - Program Pipeline|Program Pipeline]].

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — Translation phases, *[lex.token]* — Lexical tokens.
- `[REFERENCE]` **cppreference.com**: *[C++ Language - Basic concepts](https://en.cppreference.com/w/cpp/language/basic_concepts)*.
- `[REFERENCE]` **Bjarne Stroustrup**: *The C++ Programming Language (4th Edition)*, Chapter 2: "The Basics".
