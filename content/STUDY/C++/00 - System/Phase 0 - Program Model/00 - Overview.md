# Phase 0: C++ Program Model — Overview

## 1. Introduction

When writing C++, we write human-readable text in a file such as `main.cpp`. However, the central processing unit (CPU) of a computer cannot directly understand or execute C++ text. Before a line of code can run, it must pass through a multi-stage translation and execution pipeline.

This module establishes the core conceptual lifecycle of a C++ program—from raw text on disk to a running process in memory.

---

## 2. High-Level Program Pipeline

Below is the conceptual journey of every standard C++ program:

![[00 - Overview-20260826183327483.svg|281]]

> [!NOTE]
> **Important Distinctions**:
> - **Source code** is plain text written by developers.
> - **Compilation** translates a single translation unit into object code; it does *not* produce the final executable by itself.
> - **Linking** combines object files and runtime libraries to form a runnable binary.
> - An **Executable** is a static file on disk, whereas a **Process** is a live instance running in RAM.

---

## 3. The Core Example

Throughout this module, we use one consistent, standard C++ program to illustrate every stage of the pipeline:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

Here is what happens to this specific file at each stage:

1. **Source Code**: Saved as `main.cpp` containing text characters.
2. **Preprocessing**: The directive `#include <iostream>` is replaced with the actual declarations needed for stream output.
3. **Compilation**: The preprocessed code is checked for syntax and type correctness, then translated into machine-level instructions stored in `main.o` (or `main.obj`), leaving external references (like `std::cout`) unresolved.
4. **Linking**: The linker resolves the reference to `std::cout` against the C++ Standard Library, producing an executable file (`main.exe` or `main`).
5. **Operating System Loading**: The OS reads the executable from disk, allocates memory (RAM), sets up stack and memory pages, initializes runtime components, and creates a **Process**.
6. **Execution**: The OS/runtime transfers control to `main()`, which prints `"Hello World\n"` to the standard output and returns `0`.

---

## 4. Module Map

Explore each concept in detail through the notes below:

1. [[01 - Source Code|01 - Source Code]]: What `.cpp` files are and why we write code for humans.
2. [[02 - Preprocessor|02 - Preprocessor]]: Textual transformations, header inclusions, and why `#include` is not runtime importing.
3. [[03 - Compiler|03 - Compiler]]: Translation from source text to machine-oriented representation.
4. [[04 - Object File|04 - Object File]]: Intermediate binary output and the concept of separate compilation.
5. [[05 - Linker|05 - Linker]]: Combining object files, resolving symbols, and understanding link errors.
6. [[06 - Executable and Process|06 - Executable and Process]]: Static files vs. running instances, OS loading, and how `main()` gets called.
7. [[07 - Program Pipeline|07 - Program Pipeline]]: The complete synthesis and end-to-end breakdown.
8. [[08 - Checkpoint|08 - Checkpoint]]: Review questions and diagnostic exercises to verify your understanding.

---

## 5. Sources & Authoritative References

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — Phases of translation.
- `[REFERENCE]` **cppreference.com**: *[Phases of translation](https://en.cppreference.com/w/cpp/language/translation_phases)*.
- `[REFERENCE]` **Bjarne Stroustrup**: *The C++ Programming Language (4th Edition)*, Chapter 2: "The Basics".
- `[STANDARD]` **ISO C++ Foundation**: *[Standard C++ FAQ](https://isocpp.org/wiki/faq)*.
