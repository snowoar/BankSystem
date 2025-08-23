import Signal from "@rbxts/signal";

// Variables
const Accounts: {
	[userId: number]: {
		[accountName: string]: {
			balance: number;
			transactions: {
				[time: number]: {
					amountChange: number;
					note?: string;
				};
			};
		};
	};
} = {};

// Public Functions
export function getAccounts(player: Player) {
	return Accounts[player.UserId];
}

export function getAccountBalance(player: Player, accountName: string) {
	const account = Accounts[player.UserId][accountName];
	if (account === undefined) {
		warn(`Account ${accountName} does not exist for player ${player.Name}`);
		return 0;
	}
	return account.balance;
}

export function getAccountTransactions(player: Player, accountName: string) {
	const account = Accounts[player.UserId][accountName];
	if (account === undefined) {
		warn(`Account ${accountName} does not exist for player ${player.Name}`);
		return [];
	}
	return account.transactions;
}

export function createAccount(player: Player, accountName: string) {
	if (Accounts[player.UserId] === undefined) {
		Accounts[player.UserId] = {};
	}
	if (Accounts[player.UserId][accountName] === undefined) {
		Accounts[player.UserId][accountName] = {
			balance: 0,
			transactions: [],
		};
	} else {
		warn(`Account ${accountName} already exists for player ${player.Name}`);
	}
	return true;
}

export function addToAccount(player: Player, accountName: string, amount: number, note?: string) {
	const account = Accounts[player.UserId][accountName];
	if (account === undefined) {
		warn(`Account ${accountName} does not exist for player ${player.Name}`);
		return false;
	}
	account.balance += amount;
	account.transactions[os.time()] = {
		amountChange: amount,
		note: note,
	};

	AccountChanged.Fire(player, accountName, account.balance);
	return true;
}

export function cleanAccounts(player: Player) {
	delete Accounts[player.UserId];
}

export const AccountChanged = new Signal<(player: Player, accountName: string, newBalance: number) => void>();
