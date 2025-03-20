import * as vscode from "vscode";

/**
 *
 * @description Get a selected text from your current editor.
 */
function getSelectedText() {
	const { selection, document } = vscode.window.activeTextEditor!;
	return document.getText(selection).trim();
}

/**
 *
 * @description Validate text whether it is valid object or not.
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

export { getSelectedText, validateText, getViewColumn };
