# typetojson README

This extension makes you get easier default values from your type or interface.

## Features

![](assets/example.gif);

### How to use

1. Select your type or interface object.
2. Open Command palette by following command.

- Windows: `Ctrl+Shift+P`
- Mac: `Cmd+Shift+P`

3. Type `Type To Json`

#### Example

Input

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

Output

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

## Extension Settings

![](assets/settings.png)

### Properties

You could customize your default values.

```json
{
  "typetojson.defaultValues": {
    "string": "hello",
    "number": 123,
    "boolean": false,
    "array": [],
    "any": "any",
    "null": null,
    "undefined": "\"undefined\""
  }
}
```

Expected output with custom default values.

```typescript
type Test = {
  a: string;
  b: number;
  c: boolean;
  d: [];
  e: any;
  f: null;
  g: undefined;
};
```

```json
{
  "a": "hello",
  "b": 123,
  "c": false,
  "d": [],
  "e": "any",
  "f": null,
  "g": "undefined"
}
```

## Known Issues

This extension divides each type property with `;`. So you must divide each type with `;`.

I don't recommend to change all types at once. Json will be broken.

## Release Notes

### 0.0.1

- Initial release

### 1.0.0

- Parsing process is changed.
- Nested object is available(⚠️imported class name is not usable yet. I will try to find out in next version!).
- Comment per property is also available(But comment will be removed in json).

### 1.1.0

- Custom `any`, `undefined`, `null` is available.
- Process messages will be poped up.
- Updated test case.
- Updated Readme.

---
