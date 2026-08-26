# Functions

## 1. What Is It?

A **function** (*hàm*) is a reusable, self-contained block of code designed to perform a specific task. A function can receive input values (**parameters** / **arguments**), execute logic, and optionally return a single computed result (**return value**).

---

## 2. Why Does It Exist?

Writing all code inside a monolithic `main()` function leads to repetitive, unmaintainable programs. Functions provide:
1. **Reusability (DRY - Don't Repeat Yourself)**: Write once, call multiple times.
2. **Decomposition & Modularity**: Break a large, complex problem into small, manageable, testable sub-problems.
3. **Readability**: Give descriptive names to logical operations (`isPrime(n)`, `gcd(a, b)`).

---

## 3. Basic Syntax

```cpp
return_type function_name(parameter_type1 param1, parameter_type2 param2) {
    // Body of the function
    return value; // (Omitted if return_type is void)
}
```

- **`return_type`**: The type of value the function sends back (`int`, `double`, `bool`, or `void` if nothing is returned).
- **`function_name`**: The identifier used to call the function.
- **`parameters`**: Input variables received by the function.
- **`return`**: Returns a value to the caller and immediately exits the function.

---

## 4. How Does It Work?

![[16 - Functions-20260826200804227.svg]]

### 1. Function Declaration (Prototype) vs Definition
- **Declaration (Prototype)**: Informs the compiler that a function exists with a specific signature before `main()` uses it.
- **Definition**: Contains the actual `{ ... }` implementation body.

```cpp
// 1. Declaration / Prototype (Ends with semicolon)
int multiply(int a, int b);

int main() {
    int res = multiply(4, 5); // Compiler knows multiply() exists!
    return 0;
}

// 2. Definition
int multiply(int a, int b) {
    return a * b;
}
```

### 2. Pass by Value (Default Behavior)
By default, C++ passes arguments **by value**—meaning the function receives a **copy** of the variable. Modifying a parameter inside the function does not change the original variable in the caller.

---

## 5. Examples

### Example 1: Basic Arithmetic Function
```cpp
#include <iostream>

int add(int a, int b) {
    return a + b;
}

int main() {
    int sum = add(15, 27);
    std::cout << "Sum: " << sum << '\n'; // 42
    return 0;
}
```

### Example 2: `void` Function (No Return Value)
```cpp
#include <iostream>
#include <string>

void printMessage(const std::string& name) {
    std::cout << "Hello, " << name << "! Welcome to C++.\n";
}

int main() {
    printMessage("Alex");
    printMessage("Brian");
    return 0;
}
```

### Example 3: Boolean Predicate Function (`isPrime`)
```cpp
#include <iostream>

bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int num = 29;
    if (isPrime(num)) {
        std::cout << num << " is a prime number.\n";
    } else {
        std::cout << num << " is not prime.\n";
    }
    return 0;
}
```

---

## 6. Common Variations

### 1. Function Overloading (Nạp chồng hàm)
C++ allows multiple functions to share the **same name**, provided they have **different parameter types or counts**:

```cpp
#include <iostream>

int multiply(int a, int b) {
    return a * b;
}

double multiply(double a, double b) {
    return a * b;
}

int main() {
    std::cout << multiply(3, 4) << '\n';       // Calls int version -> 12
    std::cout << multiply(2.5, 4.0) << '\n';   // Calls double version -> 10.0
    return 0;
}
```

### 2. Default Parameter Values
```cpp
void greet(std::string name = "Guest") {
    std::cout << "Welcome, " << name << "!\n";
}
```

---

## 7. Common Mistakes

### 1. Missing `return` in a Non-Void Function (Undefined Behavior!)
```cpp
int getScore(int level) {
    if (level == 1) return 100;
    // BUG: If level != 1, function ends without returning a value! (Undefined behavior)
}
```
*Fix: Ensure all control paths return a value.*

### 2. Calling a Function Before Declaring It
```cpp
int main() {
    sayHi(); // COMPILE ERROR: 'sayHi' was not declared in this scope
    return 0;
}

void sayHi() {
    std::cout << "Hi!\n";
}
```
*Fix: Place the function definition above `main()`, or add a prototype declaration at the top.*

---

## 8. When Should I Use It? (Competitive Programming Guide)

- **The `solve()` Function Pattern**: Wrap each test case inside a dedicated `void solve()` function to easily use `return;` to exit early:
  ```cpp
  #include <iostream>

  void solve() {
      int n;
      std::cin >> n;
      if (n == 0) {
          std::cout << "Empty\n";
          return; // Early exit from current testcase
      }
      std::cout << (n * 2) << '\n';
  }

  int main() {
      int t;
      std::cin >> t;
      while (t--) {
          solve();
      }
      return 0;
  }
  ```
- **Helper Math Utilities**: `gcd(a, b)`, `lcm(a, b)`, `binpow(base, exp)`.

---

## 9. Practice

### Exercise 1 (Easy)
Write a function `int maxOfThree(int a, int b, int c)` that returns the largest of three integers.

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

int maxOfThree(int a, int b, int c) {
    int maxVal = a;
    if (b > maxVal) maxVal = b;
    if (c > maxVal) maxVal = c;
    return maxVal;
}

int main() {
    std::cout << "Max: " << maxOfThree(14, 29, 8) << '\n'; // 29
    return 0;
}
```
</details>

### Exercise 2 (Basic Application - Factorial Function)
Write a function `long long factorial(int n)` that calculates and returns $n! = 1 \times 2 \times \dots \times n$ (with $0! = 1$).

<details>
<summary>🔍 Solution</summary>

```cpp
#include <iostream>

long long factorial(int n) {
    long long result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    int n = 6;
    std::cout << n << "! = " << factorial(n) << '\n'; // 720
    return 0;
}
```
</details>

---

## 10. Summary

- A function encapsulates reusable logic with parameters and a return type.
- `void` indicates a function returns nothing.
- Function prototypes allow calling functions defined lower in the source file.
- Arguments are passed by value (copied) by default.
- Function overloading allows multiple functions with the same name and different signatures.

---

## 11. Sources

- **ISO/IEC 14882 (C++ Standard)**: *[dcl.fct]* — Function declarations, *[stmt.return]* — The return statement.
- **cppreference.com**: *[Function declaration](https://en.cppreference.com/w/cpp/language/function)*, *[Function overloading](https://en.cppreference.com/w/cpp/language/overload_resolution)*.
- **isocpp.org**: *[C++ Core Guidelines - F: Functions](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines#S-functions)*.
