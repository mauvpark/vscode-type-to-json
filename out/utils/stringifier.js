"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Change pure string to stringified JSON.
 */
exports.default = (text) => {
    const divide = text.split(":");
    // key case "{a" "...,c"
    const regexCondition1 = /^{\w+/g; // "{a"
    const regexCondition2 = /.+,\w+/g; // "...,c"
    const stringifiedList = divide.map((e) => {
        const matchedList1 = e.match(regexCondition1);
        const matchedList2 = e.match(regexCondition2);
        if (Array.isArray(matchedList1)) {
            const stringifiedKey = `{\"${matchedList1[0].slice(1)}\"`;
            return stringifiedKey;
        }
        if (Array.isArray(matchedList2)) {
            const lastCommaIdx = matchedList2[0].lastIndexOf(",");
            const targetKey = matchedList2[0].slice(lastCommaIdx + 1);
            const stringifiedKey = matchedList2[0].slice(0, lastCommaIdx + 1) + `\"${targetKey}\"`;
            return stringifiedKey;
        }
        return e;
    });
    const result = stringifiedList.join(":");
    return `${result}`;
};
//# sourceMappingURL=stringifier.js.map