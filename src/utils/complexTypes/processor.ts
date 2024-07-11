import { validateText } from "../common/steps";
import divider from "./divider";
import parse from "./parse";

function replaceValue(obj: any, targetValue: any, newValue: any) {
  for (const key in obj) {
    if (obj[key] === targetValue) {
      obj[key] = newValue;
      return;
    } else if (typeof obj[key] === "object") {
      replaceValue(obj[key], targetValue, newValue);
    }
  }
}

export function complexTypesProcessor(text: string) {
  // Parsing process
  const typesList = divider(text);
  typesList.forEach((type) => {
    validateText(type);
  });
  const jsonList = typesList.map((type) => parse(type));
  const combinedJson = Object.assign({}, ...jsonList); // e.g. {[type name]: {...type object}, [type name]: {...type object}}
  // allocation
  const typeNames = Object.keys(combinedJson);
  let stringifiedJson = JSON.stringify(combinedJson);
  typeNames.forEach((typeName) => {
    const json = JSON.parse(stringifiedJson);
    // Simple type name e.g. {a: MyType}
    replaceValue(json, `type-${typeName}`, combinedJson[typeName]);

    // Array type name e.g. {a: MyType[]; b: Array<MyType>;}
    replaceValue(json, `type-${typeName}[]`, [combinedJson[typeName]]);
    replaceValue(json, `type-Array<${typeName}>`, [combinedJson[typeName]]);
    stringifiedJson = JSON.stringify(json);
  });

  return stringifiedJson;
}
