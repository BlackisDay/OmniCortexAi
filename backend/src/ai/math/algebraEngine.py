# algebraEngine.py
from sympy import symbols, solve, simplify, factor, expand
from sympy.parsing.sympy_parser import parse_expr

class AlgebraEngine:
    def __init__(self):
        pass

    # Solve a single algebraic equation, e.g., "2*x + 3 = 7"
    def solve_equation(self, equation_str: str, variable_str: str):
        try:
            x = symbols(variable_str)
            eq = parse_expr(equation_str, evaluate=False)
            solution = solve(eq, x)
            return solution
        except Exception as e:
            return f"Error solving equation: {e}"

    # Simplify an expression, e.g., "2*x + 3*x - 5"
    def simplify_expression(self, expr_str: str):
        try:
            expr = parse_expr(expr_str)
            return simplify(expr)
        except Exception as e:
            return f"Error simplifying expression: {e}"

    # Factor an expression, e.g., "x**2 - 5*x + 6"
    def factor_expression(self, expr_str: str):
        try:
            expr = parse_expr(expr_str)
            return factor(expr)
        except Exception as e:
            return f"Error factoring expression: {e}"

    # Expand an expression, e.g., "(x+2)*(x-3)"
    def expand_expression(self, expr_str: str):
        try:
            expr = parse_expr(expr_str)
            return expand(expr)
        except Exception as e:
            return f"Error expanding expression: {e}"

    # Solve a system of linear equations
    # Example: equations = ["x + y = 5", "2*x - y = 1"]
    #          variables = ["x", "y"]
    def solve_linear_system(self, equations, variables):
        try:
            syms = symbols(variables)
            eqs = [parse_expr(eq.replace("=", "-(") + ")") for eq in equations]  # converts "x+y=5" to "x+y-(5)"
            solution = solve(eqs, syms)
            return solution
        except Exception as e:
            return f"Error solving system: {e}"

    # Evaluate a polynomial at a specific value
    # Example: poly_str = "x**2 - 3*x + 2", var = "x", value = 3
    def evaluate_polynomial(self, poly_str: str, var: str, value: float):
        try:
            x = symbols(var)
            poly = parse_expr(poly_str)
            return poly.subs(x, value)
        except Exception as e:
            return f"Error evaluating polynomial: {e}"


# Example usage
if __name__ == "__main__":
    engine = AlgebraEngine()
    print("Solve equation:", engine.solve_equation("2*x + 3 - 7", "x"))
    print("Simplify:", engine.simplify_expression("2*x + 3*x - 5"))
    print("Factor:", engine.factor_expression("x**2 - 5*x + 6"))
    print("Expand:", engine.expand_expression("(x+2)*(x-3)"))
    print("Solve linear system:", engine.solve_linear_system(["x + y = 5", "2*x - y = 1"], ["x", "y"]))
    print("Evaluate polynomial:", engine.evaluate_polynomial("x**2 - 3*x + 2", "x", 3))