import * as vscode from "vscode";
import * as fs from "fs";
import * as os from "os";
import path from "path";
import parse from "./utils/parse";

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
    throw new Error("Nothing is selected. 😢");
  } else if (!hasStartIndex || !hasEndIndex) {
    throw new Error(
      "The text must have left and right brace. e.g. {key: string} 😱"
    );
  } else {
    return text;
  }
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

export async function tranformFromTs() {
  try {
    vscode.window.showInformationMessage(
      "typeToJson: Transforming is ongoing...😊"
    );
    // Parsing process
    const selectedText = getSelectedText();
    const validatedText = validateText(selectedText);
    const stringifiedObj = parse(validatedText);

    // Make file
    const tmpFilePath = path.join(os.tmpdir(), "ts-to-values.json");
    const tmpFileUri = vscode.Uri.file(tmpFilePath);
    fs.writeFileSync(tmpFilePath, stringifiedObj);

    // Execute
    vscode.commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());
    vscode.window.showInformationMessage(
      "typeToJson: Transformation is completed.✅"
    );
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
