# calculusEngine.py
from sympy import symbols, diff, integrate, limit, sympify, sin, cos, tan

class CalculusEngine:
    def __init__(self):
        pass

    # Derivative of a function
    def derivative(self, func_str: str, var_str: str):
        try:
            x = symbols(var_str)
            func = sympify(func_str)
            return diff(func, x)
        except Exception as e:
            return f"Error calculating derivative: {e}"

    # Indefinite integral
    def integrate_indefinite(self, func_str: str, var_str: str):
        try:
            x = symbols(var_str)
            func = sympify(func_str)
            return integrate(func, x)
        except Exception as e:
            return f"Error calculating integral: {e}"

    # Definite integral
    def integrate_definite(self, func_str: str, var_str: str, a: float, b: float):
        try:
            x = symbols(var_str)
            func = sympify(func_str)
            return integrate(func, (x, a, b))
        except Exception as e:
            return f"Error calculating definite integral: {e}"

    # Limit of a function
    def limit_func(self, func_str: str, var_str: str, point):
        try:
            x = symbols(var_str)
            func = sympify(func_str)
            return limit(func, x, point)
        except Exception as e:
            return f"Error calculating limit: {e}"

# Example usage
if __name__ == "__main__":
    calc = CalculusEngine()
    print("Derivative:", calc.derivative("x**2 + 3*x + 1", "x"))
    print("Indefinite Integral:", calc.integrate_indefinite("x**2", "x"))
    print("Definite Integral:", calc.integrate_definite("x**2", "x", 0, 2))
    print("Limit:", calc.limit_func("sin(x)/x", "x", 0))