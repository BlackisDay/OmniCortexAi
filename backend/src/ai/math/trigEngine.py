# trigEngine.py
from sympy import symbols, simplify, sin, cos, tan, solve, sympify, expand, factor

class TrigEngine:
    def __init__(self):
        pass

    # Simplify trigonometric expressions
    def simplify_trig(self, expr_str: str):
        try:
            expr = sympify(expr_str)
            return simplify(expr)
        except Exception as e:
            return f"Error simplifying trig expression: {e}"

    # Solve a trigonometric equation, e.g., sin(x) - 0.5 = 0
    def solve_trig_equation(self, eq_str: str, var_str: str):
        try:
            x = symbols(var_str)
            eq = sympify(eq_str)
            return solve(eq, x)
        except Exception as e:
            return f"Error solving trig equation: {e}"

# Example usage
if __name__ == "__main__":
    trig = TrigEngine()
    print("Simplify:", trig.simplify_trig("sin(x)**2 + cos(x)**2"))
    print("Solve:", trig.solve_trig_equation("sin(x) - 0.5", "x"))