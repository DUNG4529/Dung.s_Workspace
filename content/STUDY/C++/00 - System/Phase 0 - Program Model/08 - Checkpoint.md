
# Phase 0 Checkpoint: Understanding Diagnostic

This checkpoint evaluates your conceptual understanding of the C++ program model and translation pipeline. Try answering every question on your own before clicking to reveal the detailed answer.

---

## Category A: Recall (Nhận diện & Khái niệm cơ bản)

### Question A1
**What is the fundamental difference between Source Code and an Executable?**
*(Related: [[01 - Source Code]], [[06 - Executable and Process]])*

<details>
<summary>🔍 Click to reveal answer</summary>

- **[[01 - Source Code|Source Code]]** (`.cpp`): Human-readable plain text written in high-level C++ syntax. It cannot be directly executed by the CPU.
- **[[06 - Executable and Process|Executable]]** (`.exe` / binary): A machine-oriented binary file structured specifically for the operating system to load into memory and execute on the CPU.
- **Key distinction**: Source code is meant for human programmers to express logic; an executable contains binary instructions ready for the machine.

</details>

---

### Question A2
**What is the difference between an Executable and a Process?**
*(Related: [[06 - Executable and Process]])*

<details>
<summary>🔍 Click to reveal answer</summary>

- An **Executable** is a static file resting passively on permanent disk storage (SSD/HDD).
- A **Process** is an active, running instance of that executable loaded into system RAM with its own isolated memory space, registers, stack, and heap managed by the Operating System.
- **Analogy**: An executable is a cookbook on a shelf; a process is the chef actively cooking in the kitchen.

</details>

---

## Category B: Explain (Giải thích cơ chế)

### Question B1
**Why is `#include <iostream>` NOT a runtime operation? Explain what actually happens when `#include` is used.**
*(Related: [[02 - Preprocessor]])*

<details>
<summary>🔍 Click to reveal answer</summary>

- `#include` is handled entirely by the [[02 - Preprocessor|Preprocessor]] during the very first phase of build time, long before the program is executed or even compiled into machine code.
- When the preprocessor encounters `#include <iostream>`, it performs a **textual copy-and-paste**: it finds the `<iostream>` header file on disk and pastes its declarations directly into the source file to produce the expanded **Translation Unit**.
- At runtime, the `#include` directive no longer exists; only the compiled machine instructions for the program are loaded into RAM.

</details>

---

### Question B2
**Why is compilation done separately for each `.cpp` file before linking, rather than compiling everything all at once into an `.exe`?**
*(Related: [[03 - Compiler]], [[04 - Object File]])*

<details>
<summary>🔍 Click to reveal answer</summary>

- This design is called **Separate Compilation** (*Biên dịch riêng rẽ*).
- By compiling each `.cpp` file independently into an [[04 - Object File|Object File]] (`.o` / `.obj`), large software projects do not need to recompile the entire codebase when a single file changes. Only the modified `.cpp` is recompiled into its corresponding `.o`, and then the [[05 - Linker|Linker]] quickly relinks the existing object files.
- It also supports modular software architecture and the distribution of precompiled libraries.

</details>

---

## Category C: Reasoning (Tư duy & Lập luận kỹ thuật)

### Question C1
**Suppose `main.cpp` calls a function `int calculateTotal(int price, int tax);` whose definition is written inside `calculator.cpp`. Why does `main.cpp` compile without error even if `calculator.cpp` has not been compiled yet, but the overall build fails if `calculator.o` is omitted during linking?**
*(Related: [[03 - Compiler]], [[04 - Object File]], [[05 - Linker]])*

<details>
<summary>🔍 Click to reveal answer</summary>

1. **At Compilation Time**: The [[03 - Compiler|Compiler]] only needs the **declaration** (`int calculateTotal(int, int);`) in `main.cpp` to verify syntax, check parameter types, and generate the function call instruction. It leaves an **unresolved reference placeholder** in `main.o` and succeeds.
2. **At Link Time**: The [[05 - Linker|Linker]] must find the actual **definition** (the machine code body) of `calculateTotal`. If `calculator.o` is not provided to the linker, the symbol cannot be resolved, producing an `undefined reference` linker error.

</details>

---

### Question C2
**Why is `main()` not the very first machine instruction executed when a program is launched?**
*(Related: [[06 - Executable and Process]])*

<details>
<summary>🔍 Click to reveal answer</summary>

Before user code in `main()` can safely run, several crucial setup operations must take place:
1. The **Operating System Loader** must map the binary into RAM, allocate virtual memory, and set up the CPU stack pointer.
2. The **C++ Runtime Startup Code** must initialize the standard library runtime, configure standard input/output streams (`std::cin`, `std::cout`), and initialize any global and static objects.
3. Only after this runtime environment is established does the startup routine jump to `main()`.

</details>

---

## Category D: Debugging (Chẩn đoán lỗi)

### Scenario D1
**You run your build tool and receive the following terminal error:**

```
main.cpp: In function 'int main()':
main.cpp:5:5: error: 'cout' was not declared in this scope; did you mean 'std::cout'?
```

**Which pipeline stage produced this error, and why?**

<details>
<summary>🔍 Click to reveal answer</summary>

- **Stage**: [[03 - Compiler|Compilation Stage]] (Compiler Error).
- **Reason**: The compiler is performing semantic analysis and cannot find a declaration for the identifier `cout` in the current scope. (The fix is writing `std::cout` or adding `using namespace std;`).

</details>

---

### Scenario D2
**You compile `main.cpp` and it reports 0 errors. However, when generating the final binary, you receive:**

```
undefined reference to `computeScore(int)'
collect2.exe: error: ld returned 1 exit status
```

**Which pipeline stage produced this error, and why?**

<details>
<summary>🔍 Click to reveal answer</summary>

- **Stage**: [[05 - Linker|Linking Stage]] (Linker Error — notice `ld` which is the GNU linker).
- **Reason**: `main.cpp` compiled successfully because `computeScore` was declared, but the linker could not find the concrete implementation/definition of `computeScore(int)` in any of the provided object files or libraries.

</details>

---

## Category E: Full Pipeline Synthesis (Tổng hợp quy trình)

### Question E1
**Fill in the missing stages and outputs for the end-to-end journey of `main.cpp`:**
*(Related: [[07 - Program Pipeline]])*

```
1. Source File: main.cpp
   ↓ [ Step 1: ? ]
2. Intermediate Output: ?
   ↓ [ Step 2: ? ]
3. Binary Output: ?
   ↓ [ Step 3: ? (+ Libraries) ]
4. Disk Output: ?
   ↓ [ Step 4: ? ]
5. Memory Entity: ?
   ↓ [ Step 5: ? ]
6. Execution Point: main()
```

<details>
<summary>🔍 Click to reveal answer</summary>

```mermaid
flowchart TD
    A["1. Source File (main.cpp)"] -->|Preprocessing| B["2. Translation Unit (Expanded Source Text)"]
    B -->|Compilation / Translation| C["3. Object File (main.o / main.obj)"]
    C -->|Linking (+ Runtime Libraries)| D["4. Executable Binary (main.exe / a.out)"]
    D -->|OS Loader| E["5. Active Process (In System RAM)"]
    E -->|Runtime Startup Routine| F["6. main() Execution"]

    style A fill:#e1f5fe,stroke:#0288d1;
    style B fill:#e0f2f1,stroke:#00897b;
    style C fill:#fff3e0,stroke:#f57c00;
    style D fill:#f3e5f5,stroke:#7b1fa2;
    style E fill:#e8f5e9,stroke:#388e3c;
    style F fill:#fbe9e7,stroke:#d84315,stroke-width:2px;
```

</details>

---

## Next Steps

Once you are confident with all five categories in this diagnostic checkpoint, you have mastered the fundamental [[07 - Program Pipeline|C++ Program Model]].
