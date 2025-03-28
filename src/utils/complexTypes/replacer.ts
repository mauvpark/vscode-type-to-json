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

const customArrayTool = (replaceTarget: string) => {
	const regexListType = /(([A-Z]\w+\[\])|(Array<\w+>))(?=;)/g;
	let listTypeReplaced = replaceTarget;
	const regexListTypePatternList = replaceTarget.match(regexListType);
	regexListTypePatternList?.forEach((listType) => {
		let regexListType = listType; // square brackets([]) would be accepted as regex. so they have to be changed.
		if (listType.includes("[")) {
			regexListType = regexListType
				.replaceAll("[", `\\[`)
				.replaceAll("]", `\\]`);
		}
		listTypeReplaced = listTypeReplaced.replace(
			new RegExp(`${regexListType}`, "g"),
			`"type-${listType}"`
		);
	});

	return listTypeReplaced;
};

const markCustomTypeTool = (replaceTarget: string) => {
	const regexType = /[A-Z]\w+(?=;)/g;
	const typeTitleList = replaceTarget.match(regexType);
	let typeTitleReplaced = replaceTarget;
	typeTitleList?.forEach(
		(title) =>
			(typeTitleReplaced = typeTitleReplaced.replaceAll(
				new RegExp(`${title}(?=;)`, "g"),
				`"type-${title}"`
			))
	);

	return typeTitleReplaced;
};

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
	const regexTitle = /(\w+(?=(( extends)?|( ?=)?).+{))/g;
	const fullTitleRegex = /.+(?={)/g;
	const fullTitle = text.match(fullTitleRegex)?.at(0);
	const title = text.match(regexTitle)?.at(0);

	const extendType = fullTitle
		?.split(/extends|=/)
		?.at(1)
		?.match(/\w+/)
		?.at(0);

	const startIndex = text.indexOf("{");
	const endIndex = text.lastIndexOf("}"); // Type value could be object type. So, it must be last index or should check signs are matching.
	let onlyKeyTypeText = text.slice(startIndex + 1, endIndex);

	if (extendType) {
		onlyKeyTypeText = `extend${extendType}: ${extendType};${onlyKeyTypeText}`;
	}

	// string
	const stringReplaced = stringTool(onlyKeyTypeText, defaultValues?.string);
	// number
	const numberReplaced = numberTool(stringReplaced, defaultValues?.number);
	// boolean
	const booleanReplaced = booleanTool(numberReplaced, defaultValues?.boolean);
	// default array
	const arrayReplaced = arrayTool(booleanReplaced);
	// typed array
	const typedArrayReplaced = customArrayTool(arrayReplaced);
	// function
	const functionReplaced = functionTool(typedArrayReplaced);
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
	// type name
	const typeTitleReplaced = markCustomTypeTool(commentReplaced);
	// space
	const spaceReplaced = spaceTool(typeTitleReplaced);
	// semicolon
	const semicolonReplaced = semicolonTool(spaceReplaced);

	const result = `{${title}: {${semicolonReplaced}}}`;

	return result;
};
