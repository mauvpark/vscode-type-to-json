"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.tranformFromTs = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const path_1 = __importDefault(require("path"));
const parse_1 = __importDefault(require("./utils/parse"));
/**
 *
 * @description This gets a selected text from your current editor.
 */
function getSelectedText() {
    const { selection, document } = vscode.window.activeTextEditor;
    return document.getText(selection).trim();
}
/**
 *
 * @description Validate text which is valid object or not.
 */
function validateText(text) {
    const startIndex = text.indexOf("{");
    const hasStartIndex = startIndex >= 0 ? true : false;
    const endIndex = text.lastIndexOf("}");
    const hasEndIndex = endIndex >= 1 ? true : false;
    if (!text.length) {
        throw new Error("Nothing is selected");
    }
    else if (!hasStartIndex || !hasEndIndex) {
        throw new Error("The text must have left and right brace. e.g. {key: string}");
    }
    else {
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
async function tranformFromTs() {
    try {
        // Parsing process
        const selectedText = getSelectedText();
        const validatedText = validateText(selectedText);
        const stringifiedObj = (0, parse_1.default)(validatedText);
        // Make file
        const tmpFilePath = path_1.default.join(os.tmpdir(), "ts-to-values.json");
        const tmpFileUri = vscode.Uri.file(tmpFilePath);
        fs.writeFileSync(tmpFilePath, stringifiedObj);
        // Execute
        vscode.commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());
    }
    catch (error) {
        vscode.window.showErrorMessage(error.message);
    }
}
exports.tranformFromTs = tranformFromTs;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("typetojson.typetojson", tranformFromTs));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map