/**
 * Replace type to having default value
 */
export default (
  text: string,
  defaultValues?: {
    string: string;
    number: number;
    boolean: boolean;
    array: [];
    any: any;
    null: any;
    undefined: any;
  }
) => {
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}"); // Type value could be object type. So, it must be last index or should check signs are matching.
  const onlyKeyTypeText = text.slice(startIndex + 1, endIndex - 1);
  // string
  const regexString = /string/g;
  const stringReplaced = onlyKeyTypeText.replace(
    regexString,
    defaultValues?.string ? `${defaultValues.string}` : `\"\"`
  );
  // number
  const regexNumber = /number/g;
  const numberReplaced = stringReplaced.replace(
    regexNumber,
    defaultValues?.number ? `${defaultValues.number}` : "0"
  );
  // boolean
  const regexBoolean = /(boolean)|(Boolean)/g;
  const booleanReplaced = numberReplaced.replace(
    regexBoolean,
    defaultValues?.boolean ? `${defaultValues.boolean}` : "false"
  );
  // array
  const regexArray = /(\[\]) | (Array)/g;
  const arrayReplaced = booleanReplaced.replace(
    regexArray,
    defaultValues?.array ? `${defaultValues.array}` : "[]"
  );
  // object
  const regexObject = /({}) | (Object)/g;
  const objectReplaced = arrayReplaced.replace(regexObject, "{}");
  // null
  const regexNull = /null/g;
  const nullReplaced = objectReplaced.replace(
    regexNull,
    defaultValues?.null ? `${defaultValues.null}` : "null"
  );
  // undefined
  const regexUndefined = /undefined/g;
  const undefinedReplaced = nullReplaced.replace(
    regexUndefined,
    defaultValues?.undefined ? `${defaultValues.undefined}` : `\"undefined\"`
  );
  // any
  const regexAny = /any/g;
  const anyReplaced = undefinedReplaced.replace(
    regexAny,
    defaultValues?.any ? `${defaultValues.any}` : `\"any\"`
  );
  // comment
  const regexComment = /\/\/.+/g;
  const commentReplaced = anyReplaced.replace(regexComment, ""); // remove comment
  // space
  const regexSpace = /\r\n| |\s+/g;
  const spaceReplaced = commentReplaced.replace(regexSpace, ""); // remove all spaces for finding keys easier.
  // semicolon
  const regexNoObjAndSemicolon = /[^}];\w/g;
  const noObjAndSemicolonPatternList = spaceReplaced.match(
    regexNoObjAndSemicolon
  );
  let noObjAndSemicolonReplaced = spaceReplaced;
  noObjAndSemicolonPatternList?.forEach(
    (pattern) =>
      (noObjAndSemicolonReplaced = noObjAndSemicolonReplaced.replace(
        pattern,
        pattern.replace(";", ",")
      ))
  );
  const regexObjAndSemicolon = /};\w/g;
  const objAndSemicolonPatternList = spaceReplaced.match(regexObjAndSemicolon);
  let objAndSemicolonReplaced = noObjAndSemicolonReplaced;
  objAndSemicolonPatternList?.forEach(
    (pattern) =>
      (objAndSemicolonReplaced = objAndSemicolonReplaced.replace(
        pattern,
        pattern.replace(";", ",")
      ))
  );
  const regexSemicolon = /;/g;
  const semicolonReplaced = objAndSemicolonReplaced.replace(regexSemicolon, "");
  const result = `{${semicolonReplaced}}`;

  return result;
};
