# Python Example

## Violate DIP

```python
# Violates the dependency inversion principle
# store has to be rewritten to change the payment service from stripe to paypal
class Store:
    def __init__(self, user):
        # self.stripe = Stripe(user)
        self.paypal = Paypal()
        self.user = user

    def purchase_bike(self, quantity):
        # self.stripe.make_payment(200 * quantity * 100)
        self.paypal.make_payment(self.user, 200 * quantity)

    def purchase_helmet(self, quantity):
        # self.stripe.make_payment(15 * quantity * 100)
        self.paypal.make_payment(self.user, 15 * quantity)


class Stripe:
    def __init__(self, user):
        self.user = user

    def make_payment(self, amount_in_cents):
        print(
            f"{self.user} made payment of ${amount_in_cents / 100} with Stripe",
        )


class Paypal:
    def make_payment(self, user, amount_in_dollars):
        print(f"{user} made payment of ${amount_in_dollars} with Paypal")


store = Store("John")
store.purchase_bike(2)
store.purchase_helmet(2)
```

## Pass DIP

```python
# does not change regardless of payment services
class Store:
    def __init__(self, payment_processor):
        self.payment_processor = payment_processor

    def purchase_bike(self, quantity):
        self.payment_processor.pay(200 * quantity)

    def purchase_helmet(self, quantity):
        self.payment_processor.pay(15 * quantity)


# behaves as a wrapper
class StripePaymentProcessor:
    def __init__(self, user):
        self.stripe = Stripe(user)

    def pay(self, amount_in_dollars):
        self.stripe.make_payment(amount_in_dollars * 100)


class Stripe:
    def __init__(self, user):
        self.user = user

    def make_payment(self, amount_in_cents):
        print(
            f"{self.user} made payment of ${int(amount_in_cents / 100)} with Stripe",
        )


# behaves as a wrapper
class PaypalPaymentProcessor:
    def __init__(self, user):
        self.paypal = Paypal()
        self.user = user

    def pay(self, amount_in_dollars):
        self.paypal.make_payment(self.user, amount_in_dollars)


class Paypal:
    def make_payment(self, user, amount_in_dollars):
        print(f"{user} made payment of $${amount_in_dollars} with Paypal")


store = Store(StripePaymentProcessor("John"))
store.purchase_bike(2)
store.purchase_helmet(2)

store2 = Store(PaypalPaymentProcessor("John2"))
store2.purchase_bike(2)
store2.purchase_helmet(2)
```
