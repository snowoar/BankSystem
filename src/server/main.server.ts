import { Players } from "@rbxts/services";
import * as BankSystem from "../shared/BankSystem";

// Private Functions

function PlayerAdded(player: Player) {
	// Accounts[player.UserId] = {};
	BankSystem.createAccount(player, "Main");
	BankSystem.createAccount(player, "Savings");

	print(BankSystem.getAccounts(player));
	task.spawn(() => {
		while (true) {
			BankSystem.addToAccount(player, "Main", 100);
			// print(BankSystem.getAccountBalance(player, "Main"));
			task.wait(1);
		}
	});
}

function PlayerRemoving(player: Player) {
	// delete Accounts[player.UserId];
	BankSystem.cleanAccounts(player);
}

function onAccountChanged(player: Player, accountName: string, newBalance: number) {
	print(`Account ${accountName} for player ${player.Name} changed to ${newBalance}`);
	print("Accounts: ", BankSystem.getAccounts(player));
}

// Initialization

Players.PlayerAdded.Connect(PlayerAdded);
Players.PlayerRemoving.Connect(PlayerRemoving);
BankSystem.AccountChanged.Connect(onAccountChanged);
