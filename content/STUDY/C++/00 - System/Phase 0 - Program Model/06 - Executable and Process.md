# Executable and Process (Tệp thực thi và Tiến trình)

## 1. Overview

Building a C++ program ends with an **Executable** (*tệp thực thi*), but running it creates a **Process** (*tiến trình*). Understanding the clear distinction between these two concepts is fundamental:

- **Executable**: A complete, self-contained binary file stored passively on disk (e.g., `main.exe` on Windows, or `main` on Linux/macOS) formatted so that the operating system can load it.
- **Process**: An active, running instance of an executable program currently residing in the computer's memory (RAM), possessing its own private address space, resources, and execution state managed by the Operating System (OS).

![[06 - Executable and Process-20260826184501455.svg|720]]

---

## 2. Why Does It Exist?

Why can't code just execute straight from the hard drive?

1. **Storage vs. Execution** `[FACT]`: Storage drives (SSDs/HDDs) are non-volatile and slow compared to RAM and CPU registers. Code must be mapped into fast system RAM so the CPU can fetch and execute instructions at gigabytes per second.
2. **Isolation & Security** `[FACT]`: Operating systems must ensure that one misbehaving program cannot overwrite the memory or crash another running program. Creating an isolated **Process** with its own virtual memory space guarantees safety and stability.
3. **Multiple Concurrent Instances** `[FACT]`: A single static executable file on disk (like a calculator app or text editor) can be launched five times simultaneously, creating **five independent processes** running in memory without interfering with one another.

---

## 3. Mental Model

Think of the distinction as a **musical score vs. a live concert**:

- **Executable** = A printed sheet of music (*sheet notes printed on paper sitting quietly on a shelf*).
- **Process** = The orchestra actively playing the music on stage (*musicians using energy, instruments, and time to produce sound*).
- If you have one sheet of music, ten different orchestras can perform it at the same time in ten different concert halls (*ten independent processes from one executable*).

---

## 4. Example

Let's look at what happens when our sample program runs:

```cpp
#include <iostream>

int main() {
    std::cout << "Hello World\n";
    return 0;
}
```

When you build this code, the compiler and linker create `main.exe` on your storage drive.
When you run `./main.exe` from your terminal or double-click it:
1. The operating system creates a new process for `main.exe`.
2. The process prints `"Hello World\n"` to the terminal screen.
3. `main()` finishes and returns status code `0`.
4. The OS cleans up the process and reclaims its memory, while `main.exe` remains unchanged on the disk.

---

## 5. What Actually Happens: From Disk to `main()`

When a program is launched, the Operating System and the C++ Runtime cooperate through several organized steps `[STANDARD]`:

![[06 - Executable and Process-20260826184503791.svg]]

> [!NOTE]
> `main()` is **not** the very first machine instruction executed by the CPU when an executable launches. The OS and the C++ runtime startup routine execute first to prepare memory and global state, after which `main()` is called.

---

## 6. Common Misconceptions

| Misconception | Reality |
| :--- | :--- |
| **"An executable and a process are the exact same thing."** | An executable is a passive **file on disk**; a process is an active **running instance in memory**. |
| **"`main()` is the very first instruction executed when the program launches."** | Before `main()` is called, the OS loader maps the program into memory, and the C++ runtime startup routine initializes essential runtime state. |
| **"Running the same `.exe` twice shares the same variables in memory."** | Each process receives its own private, isolated memory space. Modifying a variable in Process A will never alter the memory of Process B. |

---

## 7. What You Need to Remember

- An **Executable** is a static file on disk produced by the [[05 - Linker|Linker]].
- A **Process** is an active, running instance loaded into RAM by the **Operating System**.
- The OS loader and C++ runtime startup prepare the environment *before* calling `main()`.
- Returning an integer from `main()` (like `return 0;`) sends an exit status back to the operating system.

---

## 8. Sources

- `[STANDARD]` **ISO/IEC 14882:2020 (C++ Standard)**: *[basic.start.main]* — Main function, *[basic.start.term]* — Termination.
- `[REFERENCE]` **cppreference.com**: *[Main function](https://en.cppreference.com/w/cpp/language/main_function)*.
- `[REFERENCE]` **Silberschatz, Galvin, Gagne**: *Operating System Concepts (10th Edition)*, Chapter 3: "Processes".
- `[REFERENCE]` **Computer Systems: A Programmer's Perspective (CS:APP)**: Chapter 8 — "Exceptional Control Flow: Process Context".
