# Machine Learning Basics
## data collection
- primary objective is to identify and gather data we intend to use for machine learning
  - check data accuracy

## data exploration
- the process of describing, visualizing, and analyzing data in order to better understand it
allows us to answer questions such as
  - how many rows and columns are in the data
  - what type of data do we have
  - are there missing, inconsistent or duplicate values in the data

## data preparation
- the process of making sure that our data (by modifying it) is suitable for the machine learning approach that we choose to use
  - check for missing data (changes in data, human error, bias, lack of reliable input)
  - normalizing data: ensures that values share a common property
    - involves scaling data to fall within a small or specified range
    - often required, reduces complexity, improves interpretability
  - sampling data:
    - the process of selecting a subset of the instances in a dataset as a proxy for the whole
    - original dataset is referred to as population, subset is sample
  - dimensionality reduction:
    - the process of reducing the number of features in a dataset prior to modeling
      - helps to reduce time and storage required to process data
      - improves data visualization and model interpretability
    - reduces complexity and helps avoid the curse of dimensionality
    - feature selection:
      - the process of identifying the minimal set of features needed to build a good model
      - also known as variable subset selection
    - feature extraction:
      - use of mathematical functions to transform high-dimensional data into lower dimension
      - also known as feature projection

## modeling
- involves choosing and applying the appropriate machine learning approach that works well with the data we have and solves the problem that we intend to solve
  - in supervised ML: objective is to build a model that maps a given input (which we call the independent variables) to the given output (which we call the dependent variable)
    - depending on the nature of the dependent variable, problem can be either be called Classification or Regression
      - Classification: if dependent variable is a categorical value (e.g.: color, yes or no, the weather)
      - Regression: if we intend to predict a continuous value (e.g.: age, income, temperature)
        - ml algo that solves only regression
          - logistic regression, simple linear regression, multiple linear regression, poisson regression, polynomial regression
  - ML algo that can solve both Classification and regression problems
    - descision tree, Naive Bayes, neural networks, k-nearest neighbors, support vector machines

## evaluation
- after training a ML model, important to see how well suited it is to the problem at hand
- in order to get an unbiased evaluation of the performance of our model, we must train the model with a different dataset (training data, and test data) from the one we use to evaluate it

## actionable insight
