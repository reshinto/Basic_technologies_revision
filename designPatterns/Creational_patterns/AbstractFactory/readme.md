# Abstract Factory

- it is an extension of the factory design pattern
- it is needed when making an implementation or a factory that is more dynamic
  - which is to be able to add more features easily to the factory without needing to modify the factory again
- better to create a factory first before modifying it into an abstrat factory

## Allows you to create families of related objects without specifying a concrete class for each object

### Analogy:

- Imagine that you're a clothing designer
- You need to build types of clothing
  - e.g.: shirts, sweaters, jeans
- You also need sizes of clothing
  - e.g.: petites, regular, tall
- To build these with Abstract Factory pattern
  1. create an interface to build the clothing type (e.g.: sweater)
  2. create another interface to build the size (e.g.: petites)
  - These 2 interfaces will work together to generate a (petite-sized sweater)

### Coding terms:

- Imagine you're creating a "submit" button that will be used on windows and mac operating systems
- The button is the same object with the same functionality
  - only with a different class (Windows or Mac) depending on the operating system

## Structure

![Abstract Factory](../../images/abstract_factory.png)

1. Abstract Products declare interfaces for a set of distinct but related products which make up a product family.

2. Concrete Products are various implementations of abstract products, grouped by variants. Each abstract product (chair/sofa) must be implemented in all given variants (Victorian/Modern).

3. The Abstract Factory interface declares a set of methods for creating each of the abstract products.

4. Concrete Factories implement creation methods of the abstract factory.

   - Each concrete factory corresponds to a specific variant of products and creates only those product variants.

5. Although concrete factories instantiate concrete products, signatures of their creation methods must return corresponding abstract products.
   - This way the client code that uses a factory doesn’t get coupled to the specific variant of the product it gets from a factory.
   - The Client can work with any concrete factory/product variant, as long as it communicates with their objects via abstract interfaces.

## Summary

- makes the factory process easier by offering a generic interface to build a family of related objects
