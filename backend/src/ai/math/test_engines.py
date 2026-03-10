# test_engines.py
from algebraEngine import AlgebraEngine
from calculusEngine import CalculusEngine
from forecastingEngine import ForecastingEngine
from statisticsEngine import StatisticsEngine
from trigEngine import TrigEngine

# Initialize engines
algebra = AlgebraEngine()
calculus = CalculusEngine()
forecast = ForecastingEngine()
statistics = StatisticsEngine()
trig = TrigEngine()

# Algebra tests
print("Algebra Solve:", algebra.solve_equation("2*x + 3 - 7", "x"))
print("Algebra Simplify:", algebra.simplify_expression("2*x + 3*x - 5"))
print("Algebra Factor:", algebra.factor_expression("x**2 - 5*x + 6"))
print("Algebra Expand:", algebra.expand_expression("(x+2)*(x-3)"))
print("Algebra Linear System:", algebra.solve_linear_system(["x + y = 5", "2*x - y = 1"], ["x", "y"]))
print("Algebra Polynomial Eval:", algebra.evaluate_polynomial("x**2 - 3*x + 2", "x", 3))

# Calculus tests
print("Calculus Derivative:", calculus.derivative("x**2 + 3*x + 1", "x"))
print("Calculus Indefinite Integral:", calculus.integrate_indefinite("x**2", "x"))
print("Calculus Definite Integral:", calculus.integrate_definite("x**2", "x", 0, 2))
print("Calculus Limit:", calculus.limit_func("sin(x)/x", "x", 0))

# Forecasting test
x_vals = [1,2,3,4,5]
y_vals = [2,4,6,8,10]
print("Forecast Next 3:", forecast.predict_next(x_vals, y_vals, steps=3))

# Statistics test
data = [1, 2, 3, 4, 5]
print("Statistics Mean:", statistics.mean(data))
print("Statistics Median:", statistics.median(data))
print("Statistics Variance:", statistics.variance(data))
print("Statistics Std Dev:", statistics.std_dev(data))
print("Statistics Linear Regression:", statistics.linear_regression([1,2,3],[2,4,6]))

# Trig tests
print("Trig Simplify:", trig.simplify_trig("sin(x)**2 + cos(x)**2"))
print("Trig Solve:", trig.solve_trig_equation("sin(x) - 0.5", "x"))