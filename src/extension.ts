import * as vscode from "vscode";
import parseType from "./utils/parseType";
import * as fs from "fs";
import * as os from "os";
import path from "path";

/**
 *
 * @description This gets a selected text from your current editor.
 */
function getSelectedText() {
  const { selection, document } = vscode.window.activeTextEditor!;
  return document.getText(selection).trim();
}

/**
 *
 * @description Validate text which is valid object or not.
 */
function validateText(text: string) {
  const startIndex = text.indexOf("{");
  const hasStartIndex = startIndex >= 0 ? true : false;
  const endIndex = text.lastIndexOf("}");
  const hasEndIndex = endIndex >= 1 ? true : false;
  if (!text.length) {
    throw new Error("Nothing is selected");
  } else if (!hasStartIndex || !hasEndIndex) {
    throw new Error(
      "The text must have left and right brace. e.g. {key: string}"
    );
  } else {
    return text;
  }
}

/**
 *
 * @description Parse type object.
 */
function parse(text: string) {
  const customSettings = vscode.workspace.getConfiguration("typetojson");
  const typeList: Array<string[]> = [];
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}"); // Type value could be object type. So, it must be last index or should check signs are matching.
  const onlyKeyTypeText = text.slice(startIndex + 1, endIndex - 1);
  onlyKeyTypeText.split(";").forEach((keyType) => {
    const splited = keyType.split(":");
    if (splited.length === 2) {
      splited[0] = splited[0].trim();
      splited[1] = parseType(
        splited[1].trim(),
        customSettings.get("defaultValues")
      );
      typeList.push(splited);
    }
  });
  if (typeList.length > 0) {
    const transformedObj = Object.fromEntries(typeList);
    return transformedObj;
  }
  throw new Error("Type is empty!");
}

/**
 *
 * @description Get unused column from your current editor.
 */
const getViewColumn = () => {
  const activeEditor = vscode.window.activeTextEditor;
  if (!activeEditor) {
    return vscode.ViewColumn.One;
  }

  switch (activeEditor.viewColumn) {
    case vscode.ViewColumn.One:
      return vscode.ViewColumn.Two;
    case vscode.ViewColumn.Two:
      return vscode.ViewColumn.Three;
  }

  return activeEditor.viewColumn;
};

async function tranformFromTs() {
  try {
    const selectedText = getSelectedText();
    const validatedText = validateText(selectedText);
    const transformedObj = JSON.stringify(parse(validatedText));
    const tmpFilePath = path.join(os.tmpdir(), "ts-to-values.json");
    const tmpFileUri = vscode.Uri.file(tmpFilePath);
    fs.writeFileSync(tmpFilePath, `${transformedObj}`);
    vscode.commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());
  } catch (error) {
    vscode.window.showErrorMessage((error as { message: string }).message);
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("typetojson.typetojson", tranformFromTs)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
