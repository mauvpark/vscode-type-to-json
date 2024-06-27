import * as assert from "assert";
import * as vscode from "vscode";
import TypeToJson from "../utils/parse";
import * as MockTypes from "./test";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Simple object", () => {
    const result = TypeToJson(MockTypes.Test1);
    const parse = JSON.parse(result);
    assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
  });

  test("Simple object with comments", () => {
    const result = TypeToJson(MockTypes.Test2);
    const parse = JSON.parse(result);
    assert.deepEqual({ a: "", b: 0, c: [], d: "undefined" }, parse);
  });

  test("Complicating object with comments", () => {
    const result = TypeToJson(MockTypes.Test3);
    const parse = JSON.parse(result);
    assert.deepEqual(
      {
        adsf: "",
        b: 0,
        cvcxv: [],
        123: "any",
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
});
