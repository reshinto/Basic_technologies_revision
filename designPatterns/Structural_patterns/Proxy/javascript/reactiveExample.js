// A proxy that generates an observable object, which allows us to attach a function which is executed every time a given object is modified
// this kind of behavior is often seen in frameworks like React and Vue, where changes to reactive data properties trigger re-renders on the UI, thus automating and optimizing UI updates

const obj = {
  name: "John Doe",
  age: 32,
  city: "Chicago",
  country: "US",
};

const makeReactive = (obj, observer) => {
  return new Proxy(obj, {
    set(target, key, value) {
      observer({
        [key]: value,
      });
      return (target[key] = value);
    },
  });
};

const reactive = makeReactive(obj, (res) => console.log(res));
// run with nodemon
reactive.color = "Green"; // this will cause an update displayed in the nodemon
