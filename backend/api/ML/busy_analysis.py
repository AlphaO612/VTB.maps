import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler

class Prediction:
    def __init__(self):
        self.data = pd.read_csv('ML/bank_data.csv')

        self.data['timestamp'] = pd.to_datetime(self.data['timestamp'])

        self.data['hour'] = self.data['timestamp'].dt.hour
        self.data['day_of_week'] = self.data['timestamp'].dt.dayofweek

        model_filename = 'ML/bank_model.pkl'
        self.loaded_model = joblib.load(model_filename)

        fit_data_filename = 'ML/fit_data.dst'
        self.fit_data = joblib.load(fit_data_filename)

    def getPredict(self, w):
        next_hour = 9
        day_of_week = w

        input_data = np.array([[next_hour, day_of_week],[next_hour+1, day_of_week],[next_hour+2, day_of_week],
                               [next_hour+3, day_of_week],[next_hour+4, day_of_week],[next_hour+5, day_of_week],
                               [next_hour+6, day_of_week],[next_hour+7, day_of_week],[next_hour+8, day_of_week],
                               [next_hour+9, day_of_week],[next_hour+10, day_of_week]])
        scaler = StandardScaler()
        self.fit_data = scaler.fit_transform(self.fit_data)
        input_data = scaler.transform(input_data)

        predicted_load = self.loaded_model.predict(input_data)

        return predicted_load
