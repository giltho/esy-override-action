# esy-action-override

An action for overriding esy projects.
For now, it is only able to override the ocaml-version. It can be used for testing on different ocaml-verions.

Here's a simple workflow example :

```yaml
name: CI

on: [push]

jobs:
  run:
    name: Build
    runs-on: ${{ matrix.operating-system }}
    strategy:
      matrix:
        operating-system: [macos-latest, ubuntu-latest, windows-latest]
        ocaml-version: [ '4.9.0', '4.8.1000', '4.7.1004', '4.6.1000' ]
    steps:
    - uses: actions/checkout@v1
    - name: Setup Node.js for use with actions
      uses: actions/setup-node@v1.1.0
    - name: Install esy
      run: npm install -g esy
    - name: Override esy version
      uses: giltho/esy-override-action@v0.0.3
    - name: Esy install
      run: esy install
    - name: Esy build
      run: esy build
      with:
        ocaml-version: ${{ matrix.ocaml-version }}
    - name: Testing
      run:  esy x Test.exe
```

If one also wants to execute on different sandboxes, (`esy @sandbox`), one can also specify the sandbox name.

A `null` sandbox means the default sandbox detected by esy.

```yaml
name: CI

on: [push]

jobs:
  run:
    name: Build
    runs-on: ${{ matrix.operating-system }}
    strategy:
      matrix:
        operating-system: [macos-latest, ubuntu-latest, windows-latest]
        ocaml-version: [ '4.9.0', '4.8.1000', '4.7.1004', '4.6.1000' ]
        sandbox: [ null, 'debug-build' ]
    steps:
    - uses: actions/checkout@v1
    - name: Setup Node.js for use with actions
      uses: actions/setup-node@v1.1.0
    - name: Install esy
      run: npm install -g esy
    - name: Execute esy
      uses: giltho/esy-override-action@v0.0.3
      with:
        ocaml-version: ${{ matrix.ocaml-version }}
        sandbox: ${{ matrix.sandbox }}
    - name: Esy install
      run: esy install
    - name: Esy build
      run: esy build
    - name: Testing
      run:  esy x Test.exe
```
