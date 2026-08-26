# Compiler (Trình biên dịch)

## 1. Overview

The **Compiler** (*trình biên dịch*) is the component in the translation pipeline that takes preprocessed C++ source text—the **Translation Unit** (*đơn vị biên dịch*)—and translates it into lower-level, machine-oriented object code.

During this stage, the compiler parses the C++ language grammar, enforces type rules, checks syntax correctness, performs optimizations, and produces an [[04 - Object File|Object File]] (e.g., `main.o` or `main.obj`).

![[03 - Compiler-20260826184438157.svg]]

---

## 2. Why Does It Exist?

Computers do not execute text commands like `std::cout << "Hello World\n";` or `int x = a + b;`. A CPU executes binary instructions tailored to its hardware instruction set (such as moving bytes between memory and hardware registers, or performing integer arithmetic).

The compiler exists to:
1. **Bridge High-Level Logic and Hardware** `[FACT]`: Convert human-expressive C++ constructs (functions, expressions, control flow) into efficient low-level instructions.
2. **Enforce Correctness** `[STANDARD]`: Validate that code follows the rules of the C++ language (type safety, scope rules, syntax validity) *before* any code runs.
3. **Optimize Performance** `[FACT]`: Transform logical steps into equivalent, highly efficient instruction sequences for the target processor architecture.

---

## 3. Mental Model

Think of the compiler as a **rigorous legal translator & auditor**:

- It takes an essay written in formal English (*C++ source*) and checks every sentence against the grammar and legal rulebook (*C++ Standard rules*).
- If there is a grammatical error or an undefined term (*syntax or type error*), it immediately halts and refuses to proceed.
- Once verified, it translates the text into a low-level dialect (*machine instructions and data tables*) stamped onto an intermediate document (*an object file*).
- However, if the document mentions a person or function defined in another room (*external reference*), the compiler leaves a blank placeholder note for the [[05 - Linker|Linker]] to fill in later.

---

## 4. Example

Let's follow `main.cpp`:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

When the compiler processes the translation unit for `main.cpp`:
1. It validates that `int main()` conforms to the required signature for the program entry point.
2. It verifies that `std::cout` has a valid declaration (provided by `<iostream>`) and that the output operator `<<` is valid for a string literal.
3. It generates machine instructions to:
   - Prepare the string `"Hello World\n"`.
   - Call the stream output function.
   - Return status code `0`.
4. It packages these instructions into `main.o`, recording a placeholder (*unresolved symbol*) indicating that the actual implementation body of `std::cout` must be supplied later.

---

## 5. What Actually Happens?

Compilation operates on **one translation unit at a time** (separate from all other `.cpp` files). While internal compiler architectures vary across implementations (such as GCC, Clang, and MSVC), the process conceptually involves several key translation stages `[STANDARD]`:

![[03 - Compiler-20260826184440025.svg]]

> [!NOTE]
> Modern compilers rarely translate C++ text directly into binary in a single naive jump. They typically transform code into an **Intermediate Representation (IR)** to perform extensive optimizations before emitting platform-specific machine code.

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"The compiler turns C++ directly into a finished runnable `.exe`."** | The compiler only translates a single translation unit into an [[04 - Object File|Object File]]. It does *not* link separate files or standard libraries together. |
| **"The compiler must know the implementation body of every called function."** | The compiler only needs a **declaration** (the function signature) to verify types and generate call instructions. The actual definition can live in another file and will be resolved by the [[05 - Linker|Linker]]. |
| **"If compilation succeeds, the program is completely built."** | Compilation only guarantees that individual `.cpp` files are syntactically and semantically valid. The build can still fail at the linking stage (e.g., if a referenced function has no definition). |

---

## 7. What You Need to Remember

- The compiler processes **one translation unit at a time**.
- It checks C++ syntax, semantics, and types, reporting **compile-time errors** if rules are violated.
- It produces an [[04 - Object File|Object File]] (`.o` or `.obj`) containing machine-oriented instructions and unresolved references.
- The compiler does **not** create the final executable; that is the role of the [[05 - Linker|Linker]].

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[lex.phases]* — Translation phases 5 through 7.
- `[REFERENCE]` **cppreference.com**: *[Phases of translation](https://en.cppreference.com/w/cpp/language/translation_phases)*.
- `[REFERENCE]` **GCC / Clang Documentation**: *[GCC Translation Stages](https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html)*.
- `[REFERENCE]` **Computer Systems: A Programmer's Perspective (CS:APP)**: Chapter 1 — "A Tour of Computer Systems: Compilation System".
