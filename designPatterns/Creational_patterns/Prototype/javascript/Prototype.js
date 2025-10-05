function CustomerPrototype(proto) {
  this.proto = proto;

  this.clone = function() {
    const customer = new Customer();

    for (const attr in proto) {
      customer[attr] = proto[attr];
    }

    return customer;
  };
}

function Customer(first, last, status) {
  this.first = first;
  this.last = last;
  this.status = status;

  this.say = function() {
    console.log("name: " + this.first + " " + this.last +
              ", status: " + this.status);
  };
}

function run() {
  const customer = new Customer("n/a", "n/a", "pending");
  customer.say();
  const prototype = new CustomerPrototype(customer);

  const customer2 = prototype.clone();
  customer2.say();
}

run();

