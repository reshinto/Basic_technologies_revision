# Vectors
## Understanding Vectors

- **Definition of Vectors**: Vectors are fundamental building blocks in linear algebra, defined from three perspectives: 
  - **Physics Perspective**: Vectors are arrows in space characterized by their **length** and **direction**. They can be moved around as long as these two properties remain unchanged.
  - **Computer Science Perspective**: Vectors are ordered lists of numbers, where the order is significant. For example, a house can be represented as a two-dimensional vector with square footage and price.
  - **Mathematical Perspective**: Vectors can be generalized to any entity where vector addition and scalar multiplication are defined, although this view is more abstract.

## Coordinate Systems

- **2D Coordinate System**: In a two-dimensional space, vectors are represented as pairs of numbers (coordinates) that indicate movement along the x-axis and y-axis from the origin.
- **3D Coordinate System**: In three-dimensional space, vectors are represented as triplets of numbers, adding a z-axis perpendicular to the x and y axes.

## Vector Operations

- **Vector Addition**: To add two vectors, the tail of the second vector is placed at the tip of the first, and a new vector is drawn from the tail of the first to the tip of the second. This operation reflects the idea of combining movements in space.
- **Scalar Multiplication**: Multiplying a vector by a scalar stretches or shrinks the vector. For example, multiplying by 2 doubles its length, while multiplying by -1 flips its direction.

## Importance of Vectors in Linear Algebra

- The operations of vector addition and scalar multiplication are central to linear algebra. Understanding these operations allows for the translation between geometric and numerical representations of vectors.
- The ability to switch between these perspectives enhances data analysis and visualization, providing clarity in understanding patterns and operations. 

## Conclusion

- The basics of vectors set the foundation for further exploration of concepts like span, bases, and linear dependence in subsequent discussions.

# Linear combinations, span, and basis vectors
## Vector Coordinates and Scalars
- Vector coordinates can be thought of as **scalars** that stretch or squish vectors in the coordinate system.
- The unit vectors **i-hat** and **j-hat** are fundamental, representing the x and y directions respectively, and are used to scale vectors based on their coordinates.

## Basis Vectors
- The vectors **i-hat** and **j-hat** together form the **basis** of a coordinate system, allowing any vector to be expressed as a linear combination of these basis vectors.
- Different pairs of basis vectors can be chosen, leading to different coordinate systems while still representing all possible two-dimensional vectors.

## Linear Combinations and Span
- A **linear combination** of vectors involves scaling and adding them, which can be visualized as drawing a straight line when one scalar is fixed and the other varies.
- The **span** of two vectors is the set of all possible vectors that can be formed through linear combinations of those vectors, which can fill the entire two-dimensional space unless the vectors are collinear.

## Visualizing Vectors
- Vectors can be represented as points in space, where the tip of the vector indicates its position, simplifying the visualization of spans and collections of vectors.

## Three-Dimensional Vectors
- In three-dimensional space, the span of two non-collinear vectors forms a flat sheet, while adding a third vector can either expand the span to all of 3D space or remain confined to the existing span if it is dependent on the first two.
- **Linear dependence** occurs when one vector can be expressed as a combination of others, while **linear independence** means each vector contributes a new dimension to the span.

## Basis Definition
- A **basis** of a space is defined as a set of linearly independent vectors that span that space, which aligns with the concepts of span and linear independence discussed.
