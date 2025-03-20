import * as assert from "assert";
import * as vscode from "vscode";
import * as MockTypes from "./test";
import { singleTypeProcessor } from "../utils/singleType/processor";
import { complexTypesProcessor } from "../utils/complexTypes/processor";

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	// Single type tests
	test("Simple object", () => {
		const result = singleTypeProcessor(MockTypes.Test1);
		const parse = JSON.parse(result);
		assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
	});

	test("Simple object with comments", () => {
		const result = singleTypeProcessor(MockTypes.Test2);
		const parse = JSON.parse(result);
		assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
	});

	test("Complicating object with comments", () => {
		const result = singleTypeProcessor(MockTypes.Test3);
		const parse = JSON.parse(result);
		assert.deepEqual(
			{
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
			},
			parse
		);
	});

	// Multi types tests
	test("Multiple types with a root type", () => {
		const result = complexTypesProcessor(MockTypes.Test4);
		const parse = JSON.parse(result);
		assert.deepEqual(
			{
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
						{
							dasda: "",
							gfxzgf: "",
							bcvk4: "",
							wqe123: "",
							kdkeiII: "",
						},
					],
					ttt: [
						{
							dasda: "",
							gfxzgf: "",
							bcvk4: "",
							wqe123: "",
							kdkeiII: "",
						},
					],
					ccccxxxxx: [
						{ esfdsa: "", vcxzvcxz: "", tewtwe: "", qqew: "" },
					],
				},
			},
			parse
		);
	});

	test("Function type and primitive type array", () => {
		const result = complexTypesProcessor(MockTypes.Test5);
		const parse = JSON.parse(result);
		assert.deepEqual(
			{
				A: {
					test: {
						a: [""],
						b: [0],
						c: [false],
						d: [false],
						e: "function",
						f: "function",
						g: ["function"],
						k: ["function"],
					},
				},
			},
			parse
		);
	});
});
