# forecastingEngine.py
from sklearn.linear_model import LinearRegression
import numpy as np


class ForecastingEngine:
    def __init__(self):
        self.model = LinearRegression()

    # Fit and predict next value(s)
    # x_values and y_values should be 1D arrays or lists
    def predict_next(self, x_values, y_values, steps=1):
        try:
            X = np.array(x_values).reshape(-1,1)
            y = np.array(y_values)
            self.model.fit(X, y)
            last_x = X[-1,0]
            predictions = []
            for i in range(1, steps+1):
                next_val = self.model.predict(np.array([[last_x+i]]))[0]
                predictions.append(next_val)
            return predictions
        except Exception as e:
            return f"Error in forecasting: {e}"

# Example usage
if __name__ == "__main__":
    forecast = ForecastingEngine()
    x = [1,2,3,4,5]
    y = [2,4,6,8,10]
    print("Next 3 predictions:", forecast.predict_next(x, y, steps=3))