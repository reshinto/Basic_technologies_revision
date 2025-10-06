# Python Example

## Violate SRP

```python
class CalorieTracker:
    def __init__(self, max_calories):
        self.max_calories = max_calories
        self.current_calories = 0

    # 1st reason to change: how we track the calories
    def track_calories(self, calorie_count):
        self.current_calories += calorie_count
        if self.current_calories > self.max_calories:
          self.log_calorie_surplus()

    # 2nd reason to change: how we log the calories
    def log_calorie_surplus(self):
        print("Max calories exceeded")


calorie_tracker = CalorieTracker(2000)
calorie_tracker.track_calories(500)
calorie_tracker.track_calories(1000)
calorie_tracker.track_calories(700)
```

## Pass SRP

```python
def log_message(message):
    print(message)
```

```python
from logger import log_message

class CalorieTracker:
    def __init__(self, max_calories):
        self.max_calories = max_calories
        self.current_calories = 0

    def track_calories(self, calorie_count):
        self.current_calories += calorie_count
        if self.current_calories > self.max_calories:
          log_message("Max calories exceeded")


calorie_tracker = CalorieTracker(2000)
calorie_tracker.track_calories(500)
calorie_tracker.track_calories(1000)
calorie_tracker.track_calories(700)
```
