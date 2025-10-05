import {CurrencyConverter, CurrencyConverterDecorator} from "./CurrencyConverter";

const cost = (qty, price) => Promise.resolve(qty * price);

cost(20, 5).then((result) => console.log(result));

// with converter
const costPlus = CurrencyConverter(cost);
costPlus(20, 5, "SGD", "USD").then((result) => console.log(result));

class Cost {
  @CurrencyConverterDecorator("INR", "USD")
  compute(qty, price) {
    return Promise.resolve(qty * price);
  }
}

const price = new Cost();
price.compute(20, 5).then(result => console.log(result));
