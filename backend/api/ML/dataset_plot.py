import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('bank_data.csv')
data['timestamp'] = pd.to_datetime(data['timestamp'])
daily_data = data.groupby(data['timestamp'].dt.date)['load'].sum()

plt.figure(figsize=(12, 6))
for day, load in daily_data.items():
    plt.plot(data[data['timestamp'].dt.date == day]['timestamp'], data[data['timestamp'].dt.date == day]['load'], label=day)

plt.title('Загруженность отделения банка по дням')
plt.xlabel('Время')
plt.ylabel('Загруженность')
plt.grid(True)
plt.xticks(rotation=45)
plt.legend(loc='upper right', title='Дни')
plt.tight_layout()

plt.show()
