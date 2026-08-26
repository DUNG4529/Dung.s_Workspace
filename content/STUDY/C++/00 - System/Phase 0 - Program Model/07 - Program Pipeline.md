# Program Pipeline (Quy trình xây dựng và thực thi chương trình)

## 1. The Complete End-to-End Journey

Building and executing a C++ program is an organized multi-stage pipeline. Every stage has a specific input, a dedicated tool or component, and a well-defined output.

![[07 - Program Pipeline-20260826184743292.svg|720]]

---

## 2. Stage-by-Stage Breakdown

### Stage 1: Source Code Creation
- **Input**: Human thought, problem specifications, and algorithms.
- **Action**: Written as plain-text files using standard C++ syntax (e.g., `main.cpp`).
- **Output**: UTF-8/ASCII source files (`.cpp`) and header files (`.h`).
- **Learn more**: [[01 - Source Code|01 - Source Code]].

### Stage 2: Preprocessing
- **Input**: Source file (`main.cpp`) and referenced headers (`<iostream>`).
- **Tool**: The **Preprocessor**.
- **Action**: Strips comments, expands `#define` macros, evaluates conditional blocks (`#ifdef`), and textually copies referenced headers via `#include`.
- **Output**: A fully expanded, self-contained **Translation Unit**.
- **Learn more**: [[02 - Preprocessor|02 - Preprocessor]].

### Stage 3: Compilation (Translation)
- **Input**: The preprocessed Translation Unit.
- **Tool**: The **Compiler** (e.g., GCC, Clang, MSVC).
- **Action**: Performs lexical analysis, parses C++ grammar, checks type safety, enforces language rules, performs code optimizations, and translates the high-level logic into machine instructions.
- **Output**: An **Object File** (`main.o` / `main.obj`) containing machine code, data, and unresolved reference placeholders.
- **Learn more**: [[03 - Compiler|03 - Compiler]].

### Stage 4: Object File Generation
- **Nature**: An intermediate binary container representing the compiled translation unit.
- **Role**: Enables **separate compilation**—allowing large codebases to recompile only modified files rather than the entire project.
- **Learn more**: [[04 - Object File|04 - Object File]].

### Stage 5: Linking
- **Input**: One or more Object Files (`main.o`, `math.o`) and standard/third-party runtime libraries.
- **Tool**: The **Linker**.
- **Action**: Matches unresolved external symbols (function calls, global variables) to their concrete definition addresses, merges code and data sections into a single layout, and adds runtime initialization tables.
- **Output**: A standalone **Executable File** (`program.exe` on Windows, `a.out` / binary on Linux).
- **Learn more**: [[05 - Linker|05 - Linker]].

### Stage 6: Operating System Loading & Process Creation
- **Input**: The static Executable File on disk.
- **Tool**: The **Operating System Loader**.
- **Action**: Allocates a virtual address space in RAM, copies code and initialized data from the executable into memory, sets up the execution stack and heap, and instantiates an active **Process**.
- **Learn more**: [[06 - Executable and Process|06 - Executable and Process]].

### Stage 7: Runtime Startup & `main()` Execution
- **Input**: The active process memory environment.
- **Tool**: The **C++ Runtime Startup Routine** & the **CPU**.
- **Action**: Initializes standard library internals and global variables, then calls `int main()`. When `main()` finishes, it returns an integer exit code to the operating system, which cleans up and terminates the process.

---

## 3. Pipeline Reference Table

| Stage | Primary Tool | Input | Output | Typical Error Type |
| :--- | :--- | :--- | :--- | :--- |
| **1. Source** | Text Editor / IDE | Human logic | `.cpp` / `.h` files | Typos, unformatted text |
| **2. Preprocess** | Preprocessor | `.cpp` + `#include` | Translation Unit (text) | `fatal error: iostream: No such file or directory` |
| **3. Compile** | Compiler | Translation Unit | `.o` / `.obj` file | Syntax error, type mismatch, undeclared identifier |
| **4. Link** | Linker | `.o` files + Libraries | Executable binary | `undefined reference to 'add'`, `multiple definition of...` |
| **5. Load & Run** | OS + CPU | Executable on disk | Process in RAM -> `main()` | Segmentation fault, runtime crash, non-zero exit code |

---

## 4. Pipeline Walkthrough with Our Core Example

Tracing our standard example through every stage:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

1. **`main.cpp`** is saved on disk.
2. Preprocessor replaces `#include <iostream>` with declarations for `std::cout` and strips any comments.
3. Compiler parses `main()`, verifies types, and produces `main.o` with a placeholder for `std::cout`.
4. Linker combines `main.o` with the C++ Standard Library runtime (which provides the real implementation of `std::cout`), generating `main.exe`.
5. When executed, the OS creates a process, sets up RAM, runs runtime startup code, and invokes `main()`.
6. `main()` prints `"Hello World\n"` and returns `0` to signal successful execution.

---

## 5. Sources & Further Reading

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — The 8 translation phases of C++.
- `[REFERENCE]` **cppreference.com**: *[Phases of translation](https://en.cppreference.com/w/cpp/language/translation_phases)*.
- `[REFERENCE]` **Computer Systems: A Programmer's Perspective (CS:APP)**: Chapter 1 — "A Tour of Computer Systems".
- `[STANDARD]` **ISO C++ Foundation**: *[Standard C++ FAQ](https://isocpp.org/wiki/faq)*.
