# Change Log

All notable changes to the "typetojson" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1]

- Initial release

## [1.0.0]

- Parsing process is changed.
- Nested object is available(⚠️imported class name is not usable yet. I will try to find out in next version!).
- Commented type object is also available(But comment will be removed in json).

## [1.1.0]

- Custom `any`, `undefined`, `null` is available.
- Process messages will be poped up.
- Updated test case.
- Updated Readme.

## [1.2.0]

- `"Type To Json: Make default values from complex types"`: Change multiple types at once is available. But you should select whole type object with type kind and name(e.g. `interface MyType {}`, `type MyType = {}`).

> ⚠️ Such as `terface MyType {}`, `MyType {}` is not available with `"Type To Json: Make default values from complex types"`.

- Custom array, `any|undefined|null`s are eliminated. Becuase custom array can be replaced with new command `"Type To Json: Make default values from complex types"`. If you need to change `any|undefined|null`, you could change such _special values_ with search.
- Some regex bugs are fixed.
