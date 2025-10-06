## Publish to pypi

### Install tools for publishing

- Install build
  > python -m pip install --upgrade build
- Install twine
  > python -m pip install --upgrade twine

### Build and compile python package

- make sure to delete existing `dist/` folders before building
  > python -m build

### Deploy to pypi

> twine upload dist/\*
