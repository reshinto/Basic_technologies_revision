// Violates the dependency inversion principle
// store has to be rewritten to change the payment service from stripe to paypal
class Store {
  strip: Stripe;
  paypal: Paypal;
  user: string;

  constructor(user: string) {
    // this.stripe = new Stripe(user);
    this.paypal = new Paypal();
    this.user = user;
  }

  purchaseBike(quantity: number) {
    // this.stripe.makePayment(200 * quantity * 100);
    this.paypal.makePayment(this.user, 200 * quantity);
  }

  purchaseHelmet(quantity: number) {
    // this.stripe.makePayment(15 * quantity * 100);
    this.paypal.makePayment(this.user, 15 * quantity);
  }
}

class Stripe {
  user: string;

  constructor(user: string) {
    this.user = user;
  }

  makePayment(amountInCents: number) {
    console.log(
      `${this.user} made payment of $${amountInCents / 100} with Stripe`,
    );
  }
}

class Paypal {
  makePayment(user: string, amountInDollars: number) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store("John");
store.purchaseBike(2);
store.purchaseHelmet(2);
