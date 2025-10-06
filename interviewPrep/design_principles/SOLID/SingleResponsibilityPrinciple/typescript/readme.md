# TypeScript Example

## Violate SRP

```js
// this violates SRP because this class has 2 reasons to change
class CalorieTracker {
  private maxCalories: number;
  private currentCalories: number;

  public constructor(maxCalories: number) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  // 1st reason to change: how we track the calories
  public trackCalories(calorieCount: number): void {
    this.currentCalories += calorieCount;
    if (this.currentCalories > this.maxCalories) {
      this.logCalorieSurplus();
    }
  }

  // 2nd reason to change: how we log the calories
  public logCalorieSurplus(): void {
    console.log("Max calories exceeded");
  }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(1000);
calorieTracker.trackCalories(700);
```

## Pass SRP

```js
function logMessage(message) {
  console.log(message);
}

export default logMessage;
```

```js
import logMessage from "./logger.js";

class CalorieTracker {
  private maxCalories: number;
  private currentCalories: number;

  public constructor(maxCalories: number) {
    this.maxCalories = maxCalories;
    this.currentCalories = 0;
  }

  trackCalories(calorieCount: number) {
    this.currentCalories += calorieCount;
    if (this.currentCalories > this.maxCalories) {
      logMessage("Max calories exceeded");
    }
  }
}

const calorieTracker = new CalorieTracker(2000);
calorieTracker.trackCalories(500);
calorieTracker.trackCalories(1000);
calorieTracker.trackCalories(700);
```
