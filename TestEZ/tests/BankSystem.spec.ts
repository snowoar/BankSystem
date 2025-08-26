import * as BankSystem from "../shared/BankSystem";
// If using Jest, import the following types for autocomplete and type safety
import { describe, it, expect } from "@jest/globals";

export function _() {
	describe("createAccount", function () {
		it("should create an account", function () {
			const account = BankSystem.createAccount("Player1", "Main");
			expect(account).toBeDefined();
		});
	});
}
