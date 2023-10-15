import pandas as pd
import random
from datetime import datetime, timedelta

start_time = datetime(2023, 1, 1, 9, 0)
end_time = datetime(2023, 10, 1, 19, 0)
data = []

current_time = start_time
while current_time <= end_time:
    if current_time.hour <= 19 and current_time.hour >= 9:
        mean_load = random.uniform(4, 7)
        std_deviation = random.uniform(1, 3)
        load = max(0, int(random.gauss(mean_load, std_deviation)))
        data.append([current_time, load])
    current_time += timedelta(hours=1)

df = pd.DataFrame(data, columns=['timestamp', 'load'])
df.to_csv('bank_data.csv', index=False)