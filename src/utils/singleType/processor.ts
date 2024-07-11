import { validateText } from "../common/steps";
import parse from "./parse";

export function singleTypeProcessor(text: string): any {
  // Parsing process
  const validatedText = validateText(text);
  const stringifiedJSON = parse(validatedText);

  return stringifiedJSON;
}
