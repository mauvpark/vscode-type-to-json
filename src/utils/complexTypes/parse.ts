import * as vscode from "vscode";
import replacer from "./replacer";
import stringifier from "./stringifier";

/**
 *
 * @description Parse type object.
 */
export default (text: string) => {
	const customSettings = vscode.workspace.getConfiguration("typetojson");
	const typeReplacedText = replacer(
		text,
		customSettings.get("defaultValues")
	);
	const stringifiedJson = stringifier(typeReplacedText);
	console.log("string", stringifiedJson); // TODO 삭제
	const json = JSON.parse(stringifiedJson);

	return json;
};
