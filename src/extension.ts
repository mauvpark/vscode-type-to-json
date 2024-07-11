import * as vscode from "vscode";
import generator from "./utils/common/generator";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("typetojson.typetojson", () =>
      generator("typetojson")
    ),
    vscode.commands.registerCommand("typetojson.complextypestojson", () =>
      generator("complextypestojson")
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
