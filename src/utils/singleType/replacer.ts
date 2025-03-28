import {
	anyTool,
	arrayTool,
	booleanTool,
	commentTool,
	functionTool,
	nullTool,
	numberTool,
	objectTool,
	semicolonTool,
	spaceTool,
	stringTool,
	undefinedTool,
} from "../common/replaceTools";

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
	const startIndex = text.indexOf("{");
	const endIndex = text.lastIndexOf("}"); // Type value could be object type. So, it must be last index or should check signs are matching.
	const onlyKeyTypeText = text.slice(startIndex + 1, endIndex);

	// string
	const stringReplaced = stringTool(onlyKeyTypeText, defaultValues?.string);
	// number
	const numberReplaced = numberTool(stringReplaced, defaultValues?.number);
	// boolean
	const booleanReplaced = booleanTool(numberReplaced, defaultValues?.boolean);
	// default array
	const arrayReplaced = arrayTool(booleanReplaced);
	// function
	const functionReplaced = functionTool(arrayReplaced);
	// object
	const objectReplaced = objectTool(functionReplaced);
	// null
	const nullReplaced = nullTool(objectReplaced);
	// undefined
	const undefinedReplaced = undefinedTool(nullReplaced);
	// any
	const anyReplaced = anyTool(undefinedReplaced);
	// comment
	const commentReplaced = commentTool(anyReplaced);
	// space
	const spaceReplaced = spaceTool(commentReplaced);
	// semicolon
	const semicolonReplaced = semicolonTool(spaceReplaced);

	const result = `{${semicolonReplaced}}`;

	return result;
};
