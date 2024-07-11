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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const MockTypes = __importStar(require("./test"));
const processor_1 = require("../utils/singleType/processor");
const processor_2 = require("../utils/complexTypes/processor");
suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");
    // Single type tests
    test("Simple object", () => {
        const result = (0, processor_1.singleTypeProcessor)(MockTypes.Test1);
        const parse = JSON.parse(result);
        assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
    });
    test("Simple object with comments", () => {
        const result = (0, processor_1.singleTypeProcessor)(MockTypes.Test2);
        const parse = JSON.parse(result);
        assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
    });
    test("Complicating object with comments", () => {
        const result = (0, processor_1.singleTypeProcessor)(MockTypes.Test3);
        console.log("result", result);
        const parse = JSON.parse(result);
        assert.deepEqual({
            adsf: "",
            b: 0,
            cvcxv: [],
            "123": "any",
            z123: null,
            d: "undefined",
            e: {},
            f: { t: { a: "", b: [], c: { h: { k: "" } } } },
            k: {},
            o: { t: { a: "", b: [], c: { h: { j: "", n: 0 } } } },
        }, parse);
    });
    // Multi types tests
    test("Multiple types with a root type", () => {
        const result = (0, processor_2.complexTypesProcessor)(MockTypes.Test4);
        const parse = JSON.parse(result);
        assert.deepEqual({
            Child1: { esfdsa: "", vcxzvcxz: "", tewtwe: "", qqew: "" },
            Child2: {
                dasda: "",
                gfxzgf: "",
                bcvk4: "",
                wqe123: "",
                kdkeiII: "",
            },
            Info: {
                FEFEss: 0,
                fskeo: 0,
                tfkr4D: 0,
                fddsfe: "",
                azfds: { esfdsa: "", vcxzvcxz: "", tewtwe: "", qqew: "" },
                bvnb: "",
                tests: [],
                qqqqaaaaa: [
                    { dasda: "", gfxzgf: "", bcvk4: "", wqe123: "", kdkeiII: "" },
                ],
                ttt: [{ dasda: "", gfxzgf: "", bcvk4: "", wqe123: "", kdkeiII: "" }],
                ccccxxxxx: [{ esfdsa: "", vcxzvcxz: "", tewtwe: "", qqew: "" }],
            },
        }, parse);
    });
});
//# sourceMappingURL=extension.test.js.map