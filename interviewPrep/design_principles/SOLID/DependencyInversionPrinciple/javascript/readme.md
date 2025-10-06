# JavaScript Example

## Violate DIP

```js
// Violates the dependency inversion principle
// store has to be rewritten to change the payment service from stripe to paypal
class Store {
  constructor(user) {
    // this.stripe = new Stripe(user);
    this.paypal = new Paypal();
    this.user = user;
  }

  purchaseBike(quantity) {
    // this.stripe.makePayment(200 * quantity * 100);
    this.paypal.makePayment(this.user, 200 * quantity);
  }

  purchaseHelmet(quantity) {
    // this.stripe.makePayment(15 * quantity * 100);
    this.paypal.makePayment(this.user, 15 * quantity);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store("John");
store.purchaseBike(2);
store.purchaseHelmet(2);
```

## Pass DIP

```js
// does not change regardless of payment services
class Store {
  constructor(paymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelmet(quantity) {
    this.paymentProcessor.pay(15 * quantity);
  }
}

// behaves as a wrapper
class StripePaymentProcessor {
  constructor(user) {
    this.stripe = new Stripe(user);
  }

  pay(amountInDollars) {
    this.stripe.makePayment(amountInDollars * 100);
  }
}

class Stripe {
  constructor(user) {
    this.user = user;
  }

  makePayment(amountInCents) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`
    );
  }
}

// behaves as a wrapper
class PaypalPaymentProcessor {
  constructor(user) {
    this.paypal = new Paypal();
    this.user = user;
  }

  pay(amountInDollars) {
    this.paypal.makePayment(this.user, amountInDollars);
  }
}

class Paypal {
  makePayment(user, amountInDollars) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store(new StripePaymentProcessor("John"));
store.purchaseBike(2);
store.purchaseHelmet(2);

const store2 = new Store(new PaypalPaymentProcessor("John2"));
store2.purchaseBike(2);
store2.purchaseHelmet(2);
```
