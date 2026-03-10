import sys
import json

from algebraEngine import AlgebraEngine
from calculusEngine import CalculusEngine
from trigEngine import TrigEngine
from statisticsEngine import StatisticsEngine
from forecastingEngine import ForecastingEngine

algebra = AlgebraEngine()
calculus = CalculusEngine()
trig = TrigEngine()
stats = StatisticsEngine()
forecast = ForecastingEngine()


def run_task(task):
    engine = task["engine"]
    action = task["action"]
    params = task["params"]

    if engine == "algebra":

        if action == "solve":
            return algebra.solve_equation(params["equation"], params["variable"])

        if action == "simplify":
            return str(algebra.simplify_expression(params["expression"]))

        if action == "factor":
            return str(algebra.factor_expression(params["expression"]))

        if action == "expand":
            return str(algebra.expand_expression(params["expression"]))

        if action == "evaluate":
            return str(algebra.evaluate_polynomial(
                params["poly"],
                params["var"],
                params["value"]
            ))

    if engine == "calculus":

        if action == "derivative":
            return str(calculus.derivative(params["expression"], params["var"]))

        if action == "integral":
            return str(calculus.integrate_indefinite(params["expression"], params["var"]))

        if action == "definite_integral":
            return str(calculus.integrate_definite(
                params["expression"],
                params["var"],
                params["a"],
                params["b"]
            ))

        if action == "limit":
            return str(calculus.limit_func(params["expression"], params["var"], params["point"]))

    if engine == "trig":

        if action == "simplify":
            return str(trig.simplify_trig(params["expression"]))

        if action == "solve":
            return str(trig.solve_trig_equation(params["equation"], params["var"]))

    if engine == "statistics":

        data = params["data"]

        if action == "mean":
            return stats.mean(data)

        if action == "median":
            return stats.median(data)

        if action == "variance":
            return stats.variance(data)

        if action == "std":
            return stats.std_dev(data)

    if engine == "forecast":

        if action == "predict":
            return forecast.predict_next(
                params["x"],
                params["y"],
                params["steps"]
            )

    return "Unknown task"


if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    result = run_task(input_data)
    print(json.dumps(result))