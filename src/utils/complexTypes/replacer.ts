/**
 * Replace type to having default value
 */
export default (
  text: string,
  defaultValues?: {
    string: string;
    number: number;
    boolean: boolean;
  }
) => {
  const regexTitle = /\w+( )?(=)?( )?{/g;
  const regexTitleExtractor = /\w+/g;
  const title = text
    .match(regexTitle)
    ?.at(0)
    ?.match(regexTitleExtractor)
    ?.at(0);

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
  // typed array
  const regexListType = /(([A-Z]\w+\[\])|(Array<\w+>))(?=;)/g;
  let listTypeReplaced = booleanReplaced;
  const regexListTypePatternList = booleanReplaced.match(regexListType);
  regexListTypePatternList?.forEach((listType) => {
    let regexListType = listType; // square brackets([]) would be accepted as regex. so they have to be changed.
    if (listType.includes("[")) {
      regexListType = regexListType
        .replaceAll("[", `\\[`)
        .replaceAll("]", `\\]`);
    }
    listTypeReplaced = listTypeReplaced.replace(
      new RegExp(`${regexListType}`, "g"),
      `"type-${listType}"`
    );
  });
  // default array
  const regexArray = /((\[\])|(Array))(?=;)/g;
  const arrayReplaced = listTypeReplaced.replace(regexArray, "[]");

  // object
  const regexObject = /({})|(Object)/g;
  const objectReplaced = arrayReplaced.replace(regexObject, "{}");

  // null
  const regexNull = /null/g;
  const nullReplaced = objectReplaced.replace(regexNull, "null");

  // undefined
  const regexUndefined = /undefined/g;
  const undefinedReplaced = nullReplaced.replace(
    regexUndefined,
    `\"undefined\"`
  );

  // any
  const regexAny = /any/g;
  const anyReplaced = undefinedReplaced.replace(regexAny, `\"any\"`);

  // comment
  const regexComment = /\/\/.+/g;
  const commentReplaced = anyReplaced.replace(regexComment, ""); // remove comment

  // type name
  const regexType = /[A-Z]\w+(?=;)/g;
  const typeTitleList = commentReplaced.match(regexType);
  let typeTitleReplaced = commentReplaced;
  typeTitleList?.forEach(
    (title) =>
      (typeTitleReplaced = typeTitleReplaced.replaceAll(
        new RegExp(`${title}(?=;)`, "g"),
        `"type-${title}"`
      ))
  );

  // space
  const regexSpace = /\r\n| |\s+/g;
  const spaceReplaced = typeTitleReplaced.replace(regexSpace, ""); // remove all spaces for finding keys easier.

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
  const result = `{${title}: {${semicolonReplaced}}}`;

  return result;
};
