/**
 *
 * @param replaceTarget A text to replace value
 * @param defaultValue Default value for string
 * @returns Replaced text
 */
export const stringTool = (replaceTarget: string, defaultValue?: string) => {
	const regexString = /string(?=;)/g;
	return replaceTarget.replace(
		regexString,
		defaultValue ? `${defaultValue}` : `\"\"`
	);
};

/**
 *
 * @param replaceTarget A text to replace value
 * @param defaultValue Default value for number
 * @returns Replaced text
 */
export const numberTool = (replaceTarget: string, defaultValue?: number) => {
	const regexNumber = /number(?=;)/g;
	return replaceTarget.replace(
		regexNumber,
		defaultValue ? `${defaultValue}` : "0"
	);
};

/**
 *
 * @param replaceTarget A text to replace value
 * @param defaultValue Default value for boolean
 * @returns Replaced text
 */
export const booleanTool = (replaceTarget: string, defaultValue?: boolean) => {
	const regexBoolean = /((boolean)|(Boolean))(?=;)/g;
	return replaceTarget.replace(
		regexBoolean,
		defaultValue ? `${defaultValue}` : "false"
	);
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const arrayTool = (replaceTarget: string) => {
	return replaceTarget
		.replace(/(string\[\])(?=;)/g, '[""]')
		.replace(/(number\[\])(?=;)/g, "[0]")
		.replace(/((boolean\[\])|(Boolean\[\]))(?=;)/g, "[false]")
		.replace(/(Function\[\])(?=;)/g, '["function"]') // e.g. Function[];
		.replace(/\(\(.*\) ?\=\> ?[a-zA-Z0-9]*\)\[\](?=;)/g, '["function"]') // e.g. ((abc: string) => boolean)[];
		.replace(/((\[\])|(Array))(?=;)/g, "[]");
};

export const functionTool = (replaceTarget: string) => {
	return replaceTarget
		.replace(/Function(?=;)/g, '"function"')
		.replace(/\(.*\) ?\=\> ?[a-zA-Z0-9]*(?=;)/g, '"function"');
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const objectTool = (replaceTarget: string) => {
	const regexObject = /(({})|(Object))(?=;)/g;
	return replaceTarget.replace(regexObject, "{}");
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const nullTool = (replaceTarget: string) => {
	const regexNull = /null(?=;)/g;
	return replaceTarget.replace(regexNull, "null");
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const undefinedTool = (replaceTarget: string) => {
	const regexUndefined = /undefined(?=;)/g;
	return replaceTarget.replace(regexUndefined, `\"undefined\"`);
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const anyTool = (replaceTarget: string) => {
	const regexAny = /any(?=;)/g;
	return replaceTarget.replace(regexAny, `\"any\"`);
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const commentTool = (replaceTarget: string) => {
	const regexComment = /\/\/.+/g;
	return replaceTarget.replace(regexComment, ""); // remove comment
};

/**
 *
 * @param replaceTarget A text to replace value
 * @returns Replaced text
 */
export const spaceTool = (replaceTarget: string) => {
	const regexSpace = /\r\n| |\s+/g;
	return replaceTarget.replace(regexSpace, ""); // remove all spaces for finding keys easier.
};

export const semicolonTool = (replaceTarget: string) => {
	/**
	 * Not an object type with semicolon
	 */
	const regexNotObjEndWithSemicolon = /[^}];\w/g;
	const notObjEndWithSemicolonPatternList = replaceTarget.match(
		regexNotObjEndWithSemicolon
	);
	let notObjEndWithSemicolonReplaced = replaceTarget;
	notObjEndWithSemicolonPatternList?.forEach(
		(pattern) =>
			(notObjEndWithSemicolonReplaced =
				notObjEndWithSemicolonReplaced.replace(
					pattern,
					pattern.replace(";", ",")
				))
	);

	/**
	 * Object type with semicolon
	 */
	const regexObjEndWithSemicolon = /};\w/g;
	const objEndWithSemicolonPatternList = replaceTarget.match(
		regexObjEndWithSemicolon
	);
	let objEndWithSemicolonReplaced = notObjEndWithSemicolonReplaced;
	objEndWithSemicolonPatternList?.forEach(
		(pattern) =>
			(objEndWithSemicolonReplaced = objEndWithSemicolonReplaced.replace(
				pattern,
				pattern.replace(";", ",")
			))
	);

	/**
	 * Other possible semicolons
	 */
	const regexSemicolon = /;/g;
	return objEndWithSemicolonReplaced.replace(regexSemicolon, "");
};
