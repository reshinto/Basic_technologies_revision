# Pre-commit

## How to install

> pip install pre-commit

## Create a `.pre-commit-config.yaml` file

> touch .pre-commit-config.yaml

## Setup

### Add configs into `.pre-commit-config.yaml`

- sample
  ```yaml
  repos:
    - repo: https://github.com/pre-commit/pre-commit-hooks
      rev: v2.3.0
      hooks:
        - id: check-yaml
        - id: end-of-file-fixer
        - id: trailing-whitespace
        - id: name-tests-test
    - repo: https://github.com/psf/black
      rev: 19.3b0
      hooks:
        - id: black
    - repo: local
      hooks:
        - id: pytest-check
          name: pytest-check
          entry: pytest
          language: system
          pass_filenames: false
          always_run: true
        - id: commit-msg
          name: commit-msg
          entry: commit-msg
          always_run: true
          language: system
          stages: [commit-msg]
  ```

### Add `branchLint.py`

- sample

  ```python
  import re

  # Manually change projectAcronym
  project_acronym = "TEMPLATE"
  rule_branch = fr"^(feature|bugfix|improvement|library|prerelease|release|hotfix)\/{project_acronym}-(\d+)[a-z0-9._-]+$"

  msg = f"""
  # Invalid branch name!
  #
  # Branch names in this project must adhere to this contract:
  # {rule_branch}
  #
  # Your commit will be rejected.
  # Please use the following rules:
  # '[required key1]/(required key2)-<required name>'
  #
  # - [required key1]: '(key1)/', when the (key1) is a type of branch of either
  #   - feature | bugfix | improvement | library | prerelease | release | hotfix
  # - (required key2): '{project_acronym}-(key2)-', when the (key2) is a valid JIRA issue key
  # - <required name>: '(name)', when the (name) is a clear branch name
  #
  # For example:
  # 'feature/{project_acronym}-01-feature-branch-name'
  """

  branch_name = ""
  with open(".git/HEAD", "r") as f:
      branch_name = f.read().split("ref: refs/heads/")[1].split("\n")[0]

  if not re.match(rule_branch, branch_name):
      print(msg)
      raise SystemExit("")
  ```

- at `.git/hooks/pre-commit` file modify the contents to the following

  ```python
  #!/usr/bin/env python3.9
  import os
  import sys

  if sys.version_info < (3, 3):
      from distutils.spawn import find_executable as which
  else:
      from shutil import which

  # work around https://github.com/Homebrew/homebrew-core/issues/30445
  os.environ.pop('__PYVENV_LAUNCHER__', None)

  # start templated
  INSTALL_PYTHON = 'venv/bin/python3.9'
  ARGS = ['hook-impl', '--config=.pre-commit-config.yaml', '--hook-type=pre-commit']
  # end templated
  ARGS.extend(('--hook-dir', os.path.realpath(os.path.dirname(__file__))))
  ARGS.append('--')
  ARGS.extend(sys.argv[1:])

  DNE = '`pre-commit` not found.  Did you forget to activate your virtualenv?'
  if os.access(INSTALL_PYTHON, os.X_OK):
      CMD = [INSTALL_PYTHON, '-mpre_commit']
  elif which('pre-commit'):
      CMD = ['pre-commit']
  else:
      raise SystemExit(DNE)

  CMD.extend(ARGS)

  exec(open("branchLint.py").read())

  if sys.platform == 'win32':  # https://bugs.python.org/issue19124
      import subprocess

      if sys.version_info < (3, 7):  # https://bugs.python.org/issue25942
          raise SystemExit(subprocess.Popen(CMD).wait())
      else:
          raise SystemExit(subprocess.call(CMD))
  else:
      os.execvp(CMD[0], CMD)
  ```

### Add `commitLint.py` file

- sample

  ```python
  import re

  # Manually change projectAcronym
  project_acronym = "TEMPLATE"
  rule_commit = fr"\[(({project_acronym})-(\d)+)\]:\s\w"

  msg = f"""
    # Invalid commit message!
    #
    # Please use the following rules:
    # '[required key]: <required message>'
    #
    # - [required key]: '[{project_acronym}-(key)]: ', when the (key) is a valid JIRA issue key
    # - <required msg>: '(msg)', when the (msg) is a clear commit message
    #
    # For example:
    # '[{project_acronym}-1234]: Commit message'
  """

  commit_msg = ""
  with open(".git/COMMIT_EDITMSG", "r") as f:
      commit_msg = f.read()

  if not re.match(rule_commit, commit_msg):
      print(msg)
      raise SystemExit("")
  ```

- at `.git/hooks/commit-msg` file modify the contents to the following

  ```python
  #!/usr/bin/env python3.9
  exec(open("commitLint.py").read())
  ```
