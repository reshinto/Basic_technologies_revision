from MobilePhone import MobilePhone
from Laptop import Laptop
from CatalogCreateComposite import Catalog

# Phone
iPhoneXS = MobilePhone("Apple iPhone XS", "White", 89000)
onePlus = MobilePhone("OnePlus", "Midnight Black", 46000)
galaxy = MobilePhone("Samsung Galaxy", "Ocean Blue", 12000)

iPhoneXS.getDetails()
onePlus.getDetails()
galaxy.getDetails()

# Phone Catalog
Phones = Catalog("** Mobile Phones **")
Phones.add(iPhoneXS).add(onePlus).add(galaxy)

# Laptops
MacbookPro = Laptop("Apple", "Mackbook Pro 16", 150000)
DellInspiron = Laptop("Dell", "Inspiron 5370", 63000)

MacbookPro.getDetails()
DellInspiron.getDetails()


# Laptop Catalog
Laptops = Catalog("** Laptops **")
Laptops.add(MacbookPro).add(DellInspiron)


Phones.getDetails()
Laptops.getDetails()

# Shopping Catalog: Composites can also be collections of other composites
PrimeProducts = Catalog("** Prime Products 2020 **")
PrimeProducts.add(Phones).add(Laptops)

PrimeProducts.getDetails()
