import axios from "axios";

export const CurrencyConverter = (fn) => async (qty, price, base, to) => {
  const result = await fn(qty, price); // Call the original function
  const currencyRate = await axios(`https://free.currconv.com/api/v7/convert?q=${to.toUpperCase()}_${base.toUpperCase()}&compact=y&apiKey=84d74466e0748caf6de3`);

  return (currencyRate.data[`${to.toUpperCase()}_${base.toUpperCase()}`]["val"] * result);
};

export const CurrencyConverterDecorator = (base, to) => {
  return function(target, name, descriptor) {
    try {
      const fn = descriptor.value; // The original function
      descriptor.value = async (...args) => {
        // Define the decorator
        const result = await fn.call(this, ...args);
        const currencyRate = await axios(`https://free.currconv.com/api/v7/convert?q=${to.toUpperCase()}_${base.toUpperCase()}&compact=y&apiKey=84d74466e0748caf6de3`);

        return await (currencyRate.data[`${to.toUpperCase()}_${base.toUpperCase()}`]["val"] * result);
      };

      return descriptor;
    } catch (error) {
      console.log(error);
    }
  };
};
