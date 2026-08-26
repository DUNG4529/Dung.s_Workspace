# Linker (Trình liên kết)

## 1. Overview

The **Linker** (*trình liên kết*) is the tool that collects one or more [[04 - Object File|Object Files]] along with necessary runtime libraries, resolves all external references between them, and combines them into a single final [[06 - Executable and Process|Executable]] binary file (e.g., `program.exe` or `a.out`).

In the ISO C++ translation model (*[lex.phases]* Phase 8), linking is the final phase of building a program.

![[05 - Linker-20260826184454721.svg|720]]

---

## 2. Why Does It Exist?

Because the [[03 - Compiler|Compiler]] translates each `.cpp` source file independently into a separate `.o` object file, individual object files are left with "loose ends" (calls to functions defined in other files or in standard libraries).

The linker exists to:
1. **Resolve Symbol References (*Symbol Resolution*)** `[FACT]`: Match every function call and global variable reference to its exact definition address.
2. **Combine Sections (*Relocation & Layout*)** `[FACT]`: Merge code and data sections from disparate object files into one coherent binary with a unified memory layout.
3. **Attach Standard Libraries** `[FACT]`: Pull in required precompiled runtime code (such as the implementations behind `std::cout`, stream buffers, and memory allocators).
4. **Establish the Program Entry Point** `[STANDARD]`: Configure the binary metadata so the operating system knows how to initialize the runtime and launch the program.

---

## 3. Mental Model

Think of the linker as a **master assembly technician**:

- The [[03 - Compiler|Compiler]] manufactures individual mechanical parts (*object files*), leaving open screw holes (*unresolved references*).
- The linker brings in the screws and bolts (*standard libraries*), aligns all the parts together, fits every screw into its matching hole, and tightens them into a finished, working machine (*the executable*).
- If one required part or screw is missing (*unresolved external symbol*), or if two incompatible parts try to fit into the exact same spot (*multiple definition*), the technician stops and raises a **linker error**.

---

## 4. Example

Continuing from our multi-file example:

```text
[ main.o ]
Needs: add(int, int)
Needs: std::cout implementation
Provides: main()

[ math.o ]
Provides: add(int, int)

[ C++ Standard Runtime Library (libstdc++ / libc++ / MSVCPRT) ]
Provides: std::cout implementation & runtime startup code
```

When the linker runs:
1. It reads `main.o` and sees the unresolved request for `add(int, int)`.
2. It searches `math.o`, finds the matching definition of `add`, and patches the call site in `main.o` with the actual address of `add`.
3. It finds the references for `std::cout` and resolves them against the C++ standard library.
4. It packages the combined code and startup tables into `program.exe`.

---

## 5. What Actually Happens: Compile-Time vs. Link-Time Errors

Understanding where an error occurs is a crucial debugging skill:

| Stage | Typical Cause | Common Error Message |
| :--- | :--- | :--- |
| **Compilation** *(Compiler error)* | Missing semicolon, type mismatch, undeclared identifier, bad syntax. | `error: expected ';' before '}'`<br/>`error: 'cout' was not declared in this scope` |
| **Linking** *(Linker error)* | Declared a function, but forgot to implement it or omitted its `.cpp` / `.o` from the build. | `undefined reference to 'add(int, int)'`<br/>`unresolved external symbol add` |
| **Linking** *(Linker error)* | Defined the same non-inline global function or variable in two different files. | `multiple definition of 'add(int, int)'` |

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"The linker translates C++ code into machine code."** | The linker does not parse C++ source code or translate C++ syntax. It only manipulates already-compiled binary machine code and symbol tables inside `.o` files and libraries. |
| **"If my code compiles with 0 errors, it is guaranteed to link."** | Compilation only checks that declarations exist. If a function is declared (`int add(int, int);`) but its body is never provided in any linked `.cpp` or library, compilation succeeds but linking fails with an `undefined reference` error. |
| **"Linker errors are just 'syntax errors'."** | Linker errors occur *after* all syntax checks have passed. They indicate missing or duplicate symbol definitions, not bad grammar. |

---

## 7. What You Need to Remember

- The linker merges **multiple object files** (`.o` / `.obj`) and **libraries** into a single [[06 - Executable and Process|Executable]].
- It resolves **external symbols** by connecting callers to their actual definitions.
- **Linker errors** (e.g., `undefined reference`, `unresolved external symbol`) happen when definitions are missing or duplicated across files.
- Linking is the bridge between separate object files and a runnable program on disk.

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — Phase 8: Linking.
- `[REFERENCE]` **cppreference.com**: *[Phases of translation](https://en.cppreference.com/w/cpp/language/translation_phases)*.
- `[REFERENCE]` **GNU Binutils / LLVM Documentation**: *[GNU Linker ld](https://sourceware.org/binutils/docs/ld/)*, *[LLD Linker](https://lld.llvm.org/)*.
- `[REFERENCE]` **Computer Systems: A Programmer's Perspective (CS:APP)**: Chapter 7 — "Linking: Symbol Resolution & Relocation".
