const MobilePhone = require("./MobilePhone");
const Laptop = require("./Laptop");
const Catalog = require("./CatalogCreateComposite");

// Phone
const iPhoneXS = new MobilePhone("Apple iPhone XS", "White", 89000);
const onePlus = new MobilePhone("OnePlus", "Midnight Black", 46000);
const galaxy = new MobilePhone("Samsung Galaxy", "Ocean Blue", 12000);

iPhoneXS.getDetails();
onePlus.getDetails();
galaxy.getDetails();

// Phone Catalog
const Phones = new Catalog("** Mobile Phones **");
Phones.add(iPhoneXS).add(onePlus).add(galaxy);


// Laptops
const MacbookPro = new Laptop("Apple", "Mackbook Pro 16", 150000);
const DellInspiron = new Laptop("Dell", "Inspiron 5370", 63000);

MacbookPro.getDetails();
DellInspiron.getDetails();

// Laptop Catalog
const Laptops = new Catalog("** Laptops **");
Laptops.add(MacbookPro).add(DellInspiron);


Phones.getDetails();
Laptops.getDetails();


// Shopping Catalog: Composites can also be collections of other composites
const PrimeProducts = new Catalog("** Prime Products 2020 **");
PrimeProducts.add(Phones).add(Laptops);

PrimeProducts.getDetails();
