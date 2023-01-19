import Web3 from 'web3';
import { ProviderEnum } from './utils';

export default class Wallet {
	public web3: Web3;
	private password?: string;
	public accounts;

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

	asArray() {
		const arr = [];
		for (let i = 0; i < this.accounts.length; i++) {
			arr.push(this.accounts[i]);
		}

		return arr;
	}

	async balanceOf(address: string) : Promise<number> {
		return parseInt(await this.web3.eth.getBalance(address));
	}
}