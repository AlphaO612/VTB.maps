import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
from datetime import datetime
import joblib

data = pd.read_csv('bank_data.csv')
data['timestamp'] = pd.to_datetime(data['timestamp'])
data = data.sort_values(by='timestamp')
data['hour'] = data['timestamp'].dt.hour
data['day_of_week'] = data['timestamp'].dt.dayofweek

X = data[['hour', 'day_of_week']]
y = data['load']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
fit_data_filename = 'fit_data.dst'
joblib.dump(X_train, fit_data_filename)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

model_filename = 'bank_model.pkl'
joblib.dump(model, model_filename)

current_time = datetime.now()
next_hour = current_time.hour + 1
day_of_week = current_time.weekday()

y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f'Среднеквадратичная ошибка на тестовом наборе данных: {mse}')

input_data = np.array([[next_hour, day_of_week]])
input_data = scaler.transform(input_data)
predicted_load = model.predict(input_data)
print(f'Предсказанная загруженность на следующий час: {predicted_load[0]}')
