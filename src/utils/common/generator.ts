import * as fs from "fs";
import * as os from "os";
import path from "path";
import * as vscode from "vscode";
import { getSelectedText, getViewColumn } from "./steps";
import { complexTypesProcessor } from "../complexTypes/processor";
import { singleTypeProcessor } from "../singleType/processor";

export default async (type: "typetojson" | "complextypestojson") => {
  try {
    const selectedText = getSelectedText();
    switch (type) {
      case "typetojson": {
        vscode.window.showInformationMessage(
          "typeToJson: Transforming is ongoing...😊"
        );
        // Transform
        const stringifiedObj = singleTypeProcessor(selectedText);
        // Make file
        const tmpFilePath = path.join(os.tmpdir(), "ts-to-values.json");
        const tmpFileUri = vscode.Uri.file(tmpFilePath);
        fs.writeFileSync(tmpFilePath, stringifiedObj);
        // Execute
        vscode.commands.executeCommand(
          "vscode.open",
          tmpFileUri,
          getViewColumn()
        );
        vscode.window.showInformationMessage(
          "typeToJson: Transformation is completed.✅"
        );
        return;
      }
      case "complextypestojson": {
        vscode.window.showInformationMessage(
          "typeToJson: Transforming is ongoing...😊"
        );
        // Transform
        const stringifiedJson = complexTypesProcessor(selectedText);
        // Make file
        const tmpFilePath = path.join(os.tmpdir(), "ts-to-values.json");
        const tmpFileUri = vscode.Uri.file(tmpFilePath);
        fs.writeFileSync(tmpFilePath, stringifiedJson);
        // Execute
        vscode.commands.executeCommand(
          "vscode.open",
          tmpFileUri,
          getViewColumn()
        );
        vscode.window.showInformationMessage(
          "typeToJson: Transformation is completed.✅"
        );
        return;
      }
      default:
        throw new Error("Printer: please check 'printer' function");
    }
  } catch (error) {
    vscode.window.showErrorMessage((error as { message: string }).message);
  }
};
