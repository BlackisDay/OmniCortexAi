# statisticsEngine.py
import numpy as np
from scipy import stats

class StatisticsEngine:
    def __init__(self):
        pass

    # Mean
    def mean(self, data):
        try:
            return np.mean(data)
        except Exception as e:
            return f"Error calculating mean: {e}"

    # Median
    def median(self, data):
        try:
            return np.median(data)
        except Exception as e:
            return f"Error calculating median: {e}"

    # Variance
    def variance(self, data):
        try:
            return np.var(data, ddof=1)
        except Exception as e:
            return f"Error calculating variance: {e}"

    # Standard deviation
    def std_dev(self, data):
        try:
            return np.std(data, ddof=1)
        except Exception as e:
            return f"Error calculating standard deviation: {e}"

    # Linear regression
    def linear_regression(self, x, y):
        try:
            slope, intercept, r_value, p_value, std_err = stats.linregress(x, y)
            return {
                "slope": slope,
                "intercept": intercept,
                "r_value": r_value,
                "p_value": p_value,
                "std_err": std_err
            }
        except Exception as e:
            return f"Error performing linear regression: {e}"

# Example usage
if __name__ == "__main__":
    stat = StatisticsEngine()
    data = [1, 2, 3, 4, 5]
    print("Mean:", stat.mean(data))
    print("Median:", stat.median(data))
    print("Variance:", stat.variance(data))
    print("Standard Deviation:", stat.std_dev(data))
    print("Linear Regression:", stat.linear_regression([1,2,3],[2,4,6]))