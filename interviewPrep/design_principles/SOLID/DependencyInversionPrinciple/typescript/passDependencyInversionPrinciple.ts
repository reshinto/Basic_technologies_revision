// does not change regardless of payment services
interface PaymentProcessor {
  pay(amountInDollars: number): void;
}

class Store2 {
  paymentProcessor: PaymentProcessor;

  constructor(paymentProcessor: PaymentProcessor) {
    this.paymentProcessor = paymentProcessor;
  }

  purchaseBike(quantity: number) {
    this.paymentProcessor.pay(200 * quantity);
  }

  purchaseHelmet(quantity: number) {
    this.paymentProcessor.pay(15 * quantity);
  }
}

// behaves as a wrapper
class StripePaymentProcessor implements PaymentProcessor {
  stripe: Stripe;

  constructor(user: string) {
    this.stripe = new Stripe(user);
  }

  pay(amountInDollars: number) {
    this.stripe.makePayment(amountInDollars * 100);
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

// behaves as a wrapper
class PaypalPaymentProcessor implements PaymentProcessor {
  paypal: Paypal;
  user: string;

  constructor(user: string) {
    this.paypal = new Paypal();
    this.user = user;
  }

  pay(amountInDollars: number) {
    this.paypal.makePayment(this.user, amountInDollars);
  }
}

class Paypal {
  makePayment(user: string, amountInDollars: number) {
    console.log(`${user} made payment of $${amountInDollars} with Paypal`);
  }
}

const store = new Store2(new StripePaymentProcessor("John"));
store.purchaseBike(2);
store.purchaseHelmet(2);

const store2 = new Store2(new PaypalPaymentProcessor("John2"));
store2.purchaseBike(2);
store2.purchaseHelmet(2);
