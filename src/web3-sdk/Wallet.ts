import Web3 from 'web3';
import { Account, WalletBase } from "web3-core";
import { ProviderEnum } from './utils';

export default class Wallet {
	public web3: Web3;
	private password?: string;
	private accounts: WalletBase;

	constructor(web3?: Web3, password?: string) {
		if (web3) {
			this.web3 = web3;
		} else {
			this.web3 = new Web3(ProviderEnum.Mainnet);
		}

		this.password = password;
		this.accounts = this.web3.eth.accounts.wallet;
	}

	setPassword(password: string) {
		this.password = password;
		this.load();
	}

	load() {
		if (this.password) {
			this.accounts.load(this.password);
		} else {
			throw new Error("Password hasn't been setted");
		}
	}

	save() {
		if (this.password) {
			this.accounts.save(this.password);
		} else {
			throw new Error("Password hasn't been setted");
		}
	}

	add(privateKey: string) {
		this.accounts.add(privateKey);
		this.save();
	}

	create() {
		this.accounts.create(1);
		this.save();
	}

	clear() {
		this.accounts.clear();
		localStorage.clear();
	}

	remove(address: string | number) {
		this.accounts.remove(address);
		this.save();
	}

	asArray() {
		const arr = [];
		for (let i = 0, j = 0; i < this.accounts.length; j++) {
			if (this.accounts[j] !== undefined) { i++ } else { continue; }
			arr.push(this.accounts[j]);
		}

		return arr;
	}

	async balanceOf(address: string) : Promise<number> {
		return parseInt(await this.web3.eth.getBalance(address));
	}

	/// @ from must be a public key that exists in wallet
	async sendEther(from: Account, to: string, amount: number | string) {
		const nonce = await this.web3.eth.getTransactionCount(from.address);

		const tx = {
			to: to,
			gas: 30000,
			value: amount,
			nonce: nonce,
		};

		const signedTx = await from.signTransaction(tx);
		if (signedTx.rawTransaction) return await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		else throw new Error("Cannot sign transaction");
	}
}