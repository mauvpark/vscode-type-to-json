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
const assert = __importStar(require("assert"));
const MockTypes = __importStar(require("./test"));
const parse_1 = __importDefault(require("../utils/parse"));
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = __importStar(require("vscode"));
// import * as myExtension from '../../extension';
suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");
    test("Simple object", () => {
        const result = (0, parse_1.default)(MockTypes.Test1);
        const parse = JSON.parse(result);
        assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
    });
    test("Simple object with comments", () => {
        const result = (0, parse_1.default)(MockTypes.Test2);
        const parse = JSON.parse(result);
        assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
    });
    test("Complicating object with comments", () => {
        const result = (0, parse_1.default)(MockTypes.Test3);
        const parse = JSON.parse(result);
        assert.deepEqual({
            adsf: "",
            b: 0,
            cvcxv: [],
            d: "undefined",
            e: {},
            f: { t: { a: "", b: [], c: { h: { k: "" } } } },
            k: {},
            o: { t: { a: "", b: [], c: { h: { j: "", n: 0 } } } },
        }, parse);
    });
});
//# sourceMappingURL=extension.test.js.map