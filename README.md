# typetojson README

**This is only for typescript**

This extension makes you get easier default values from your type or interface.

## Features

![](assets/example.gif);

### How to use

#### One type object

1. Select your type or interface object. Target type or interface's each type property ❗❗❗**must be divided with `;`**❗❗❗.
2. Open Command palette by following command.

- Windows: `Ctrl+Shift+P`
- Mac: `Cmd+Shift+P`

3. Apply `Type To Json: Make default values from a type object`.

#### Multiple type objects

1. Select your whole type objects. But you must include `type [name] = {}`, `interface [name] {}` or it will not work. And each type property ❗❗❗**must be divided with `;`**❗❗❗.
2. Open Command palette by following command.

- Windows: `Ctrl+Shift+P`
- Mac: `Cmd+Shift+P`

3. Apply `Type To Json: Make default values from complex types`.

#### Example

**Simple type input**

```typescript
type Case1 = {
  adsf: string;
  b: number;
  cvcxv: [];
  d: undefined; // undefined will be parsed as string type "undefined"
  e: Object;
  f: {
    t: {
      a: string;
      b: [];
      c: {
        h: {
          k: string;
        };
      };
    };
  };
  k: Object;
  o: { t: { a: string; b: []; c: { h: { j: string; n: number } } } };
};
```

**Output**

```json
{
  "adsf": "",
  "b": 0,
  "cvcxv": [],
  "d": "undefined",
  "e": {},
  "f": { "t": { "a": "", "b": [], "c": { "h": { "k": "" } } } },
  "k": {},
  "o": { "t": { "a": "", "b": [], "c": { "h": { "j": "", "n": 0 } } } }
}
```

**Multiple type inputs**

```typescript
export interface Child1 {
  esfdsa: string;
  vcxzvcxz: string; // test
  tewtwe: string;
  qqew: string;
}

export interface Child2 {
  dasda: string;
  gfxzgf: string; // dfafdsa
  bcvk4: string;
  wqe123: string;
  kdkeiII: string;
}

interface Info {
  FEFEss: number;
  fskeo: number;
  tfkr4D: number;
  fddsfe: string;
  azfds: Child1;
  bvnb: string;
  tests: []; //test comment
  qqqqaaaaa: Child2[]; // test comment~
  ttt: Array<Child2>;
  ccccxxxxx: Child1[];
}
```

**Output**

```json
{
  "Child1": { "esfdsa": "", "vcxzvcxz": "", "tewtwe": "", "qqew": "" },
  "Child2": {
    "dasda": "",
    "gfxzgf": "",
    "bcvk4": "",
    "wqe123": "",
    "kdkeiII": ""
  },
  "Info": {
    "FEFEss": 0,
    "fskeo": 0,
    "tfkr4D": 0,
    "fddsfe": "",
    "azfds": { "esfdsa": "", "vcxzvcxz": "", "tewtwe": "", "qqew": "" },
    "bvnb": "",
    "tests": [],
    "qqqqaaaaa": [
      { "dasda": "", "gfxzgf": "", "bcvk4": "", "wqe123": "", "kdkeiII": "" }
    ],
    "ttt": [
      { "dasda": "", "gfxzgf": "", "bcvk4": "", "wqe123": "", "kdkeiII": "" }
    ],
    "ccccxxxxx": [{ "esfdsa": "", "vcxzvcxz": "", "tewtwe": "", "qqew": "" }]
  }
}
```

## Extension Settings

![](assets/settings.png)

### Properties

You could customize your default values.

```json
{
  "typetojson.defaultValues": {
    "string": "hello",
    "number": 123,
    "boolean": false
  }
}
```

Expected output with custom default values.

```typescript
type Test = {
  a: string;
  b: number;
  c: boolean;
};
```

```json
{
  "a": "hello",
  "b": 123,
  "c": false
}
```

## Known Issues

This extension divides each type property with `;`. So you must divide each type with `;`.

Union type is not availabe yet.

## Release Notes

### 0.0.1

- Initial release

### 1.0.0

- Parsing process is changed.
- Nested object is available(⚠️imported class name is not usable yet. I will try to find out in next version!).
- Comment per property is also available(But comment will be removed in json).

### 1.1.0

- ~~Custom `any`, `undefined`, `null` is available.~~
- Process messages will be poped up.
- Updated test case.
- Updated Readme.

### 1.2.0

- `"Type To Json: Make default values from complex types"`: Change multiple types at once is available. But you should select whole type object with type kind and name(e.g. `interface MyType {}`, `type MyType = {}`).

> ⚠️ Such as `terface MyType {}`, `MyType {}` are not available with `"Type To Json: Make default values from complex types"`.

- Custom array, `any|undefined|null`s are eliminated. Becuase custom array can be replaced with new command `"Type To Json: Make default values from complex types"`. If you need to change `any|undefined|null`, you could change such _special values_ with search.
- Some regex bugs are fixed.

### 1.2.1

- Update Readme.

---
