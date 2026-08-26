# Object File (Tệp đối tượng)

## 1. Overview

An **Object File** (*tệp đối tượng*, usually ending in `.o` on Linux/macOS or `.obj` on Windows) is an intermediate binary file produced by the [[03 - Compiler|Compiler]] from a single translation unit.

It contains compiled machine instructions, initialized data, and a list of exported symbols (functions and variables defined in the file) alongside **unresolved references** (*tham chiếu chưa giải quyết*)—placeholders for functions or variables that are declared and used in this file, but whose actual definitions reside in other files or libraries.

![[04 - Object File-20260826184446580.svg|720]]

---

## 2. Why Does It Exist?

Real-world C++ software is rarely written in a single monolithic file. Separating code into multiple files and generating intermediate object files enables:

1. **Separate Compilation (*Biên dịch riêng rẽ*)** `[FACT]`: If you modify `main.cpp` in a 1,000-file project, only `main.cpp` needs to be recompiled into `main.o`. The remaining 999 `.o` files are reused directly, saving enormous amounts of build time.
2. **Modular Architecture** `[GUIDELINE]`: Different team members can develop and compile different modules independently.
3. **Reusability & Libraries** `[FACT]`: Precompiled object files can be packaged into reusable static or dynamic libraries without distributing the original source code text.

---

## 3. Mental Model

Think of an object file as an **unassembled puzzle piece with connector tabs**:

- The puzzle piece has parts of the picture already drawn on it (*compiled local functions and data*).
- But it also has empty connector notches (*unresolved references*) that need to snap into matching tabs from other puzzle pieces.
- By itself, one puzzle piece cannot stand alone as a completed picture (*it cannot be executed directly*).

---

## 4. Example

Imagine a project with two source files:

### `math.cpp` (Defines the math function)
```cpp
int add(int a, int b) {
    return a + b;
}
```

### `main.cpp` (Calls the function)
```cpp
#include <iostream>

// Declaration: Tells compiler that add exists somewhere
int add(int a, int b);

int main() {
    int result = add(2, 3);
    std::cout << "Result: " << result << "\n";
    return 0;
}
```

When compiled separately:
- **`math.o`**: Contains machine code for `add(int, int)`. It advertises: *"I have the definition for `add`."*
- **`main.o`**: Contains machine code for `main()`. Inside `main()`, the call to `add(2, 3)` contains a placeholder: *"Call the function named `add`, wherever it ends up being located."*

Neither `main.o` nor `math.o` can run alone. They must be joined together by the [[05 - Linker|Linker]].

---

## 5. What Actually Happens?

An object file is a structured binary container holding several distinct sections `[REFERENCE]`:

1. **Text / Code Section**: The raw machine instructions translated from your functions.
2. **Data Section**: Global and static variables initialized in the code.
3. **Exported Symbols List**: The names and relative memory offsets of functions/variables defined in this file (e.g., `math.o` lists `add`).
4. **Unresolved References List**: The names of functions/variables this file uses but does not define (e.g., `main.o` lists `add` and `std::cout`).

Because the exact final memory locations of other functions are not known at compilation time, the compiler inserts temporary placeholder addresses in the machine code.

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"An object file can be double-clicked and run by the OS."** | An object file is incomplete. It lacks final memory layout, standard library runtime connections, and resolved function addresses. The operating system cannot load or execute a bare `.o` / `.obj` file. |
| **"Every compiler and OS produces the same object file format."** | Object file formats are platform- and toolchain-specific (e.g., ELF on Linux, PE-COFF on Windows, Mach-O on macOS). However, the conceptual role of an object file remains identical across all platforms. |
| **"An object file contains C++ text."** | An object file contains binary machine code and binary symbol tables, not C++ text. |

---

## 7. What You Need to Remember

- An object file (`.o` / `.obj`) is the binary output of compiling a **single** translation unit.
- It contains compiled machine instructions, local data, and **unresolved references**.
- Object files make **separate compilation** possible.
- An object file is *not* an executable; it must be processed by the [[05 - Linker|Linker]] to produce a runnable program.

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — Phase 7: Compilation producing object definitions.
- `[REFERENCE]` **cppreference.com**: *[Phases of translation](https://en.cppreference.com/w/cpp/language/translation_phases)*.
- `[REFERENCE]` **Computer Systems: A Programmer's Perspective (CS:APP)**: Chapter 7 — "Linking: Object Files".
- `[GUIDELINE]` **ISO C++ Foundation**: *[Standard C++ FAQ: Separate Compilation](https://isocpp.org/wiki/faq)*.
