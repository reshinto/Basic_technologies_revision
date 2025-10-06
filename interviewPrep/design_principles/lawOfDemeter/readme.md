# The Law of Demeter / Principle of Least Knowledge

- The purpose of the law of Demeter is lower cohesion
- The low cohesion shows that the design is of good quality
- The Law of Demeter for functions requires that a method m of an object a may only invoke the methods of the following kinds of objects
  - a itself
  - m's parameters
  - any objects instantiated within m
  - a's attributes
  - global variables accessible by a in the scope of m
- In particular, an object should avoid invoking methods of an object returned by another method
  - For many modern object-oriented languages that use a dot as a field identifier, the law can be stated simply as `use only one dot`
  - That is, the code `a.m().n()` breaks the law where `a.m()` does not
  - As an analogy, when one wants a dog to walk, one does not command the dog's legs to walk directly
    - instead one commands the dog which then commands its own legs
- Some violations of the Law of Demeter are harmless, although others are a sign that the public interface has not been segregated correctly or has not been segregated at all
- example
  ```
  1. customer.bicycle.wheel.tire();
  2. customer.bicycle.wheel.rotate();
  3. Object.keys(...).sort(...).join(',');
  ```
  - 1st and 2nd line violates the law of demeter
  - 3rd line is reasonable and does not violate the law of demeter

## Avoiding violations

- how to avoid unnecessary dependency
- problem

  - a User who have Account and this account has a plan and User has discountedPlanPrice which violate the Law of Demeter

  ```ts
  abstract class User {
    private account: Account;

    discountedPlanPrice(coupon: Coupon) {
      return coupon.discount(this.account.getPlan().getPrice());
    }
  }

  class Account {
    private plan: Plan;

    getPlan() {
      return this.plan;
    }
  }
  ```

- solution

  - One of the common ways to remove such chains is by using delegation
    - A wrapper method encapsulates or hides knowledge that would otherwise be implemented in the message chain
    - Delegation is an effective technique to avoid Law of Demeter violations, but only for behavior, not for attributes
  - To avoid such problems, you need to think over the application architecture in advance

  ```ts
  class Account {
    private plan: Plan;

    discountedPlanPrice(coupon) {
      return coupon.discount(this.plan.getPrice());
    }
  }
  ```
