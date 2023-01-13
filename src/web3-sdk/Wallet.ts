import Web3 from 'web3';
import Account from './Account';

export default class Wallet {
	public web3: Web3;
	public accounts: Account[];

	constructor(web3: Web3, accounts?: Account[]) {
		this.web3 = web3;
		if (accounts) {
			this.accounts = accounts;
		} else {
			this.accounts = new Array<Account>();
			if (localStorage.getItem("length") !== null) {
				this.getFromLocalStorage();
			}
		}
	}

	getFromLocalStorage() {
		const _length = localStorage.getItem("length");
		if (_length) {
			const length = parseInt(_length) - 1;
			for (let i = 0; i < length; i++) {
				const privateKey = localStorage.getItem(`account${i}`);
				if (privateKey) {
					this.accounts.push(new Account(this.web3, privateKey));
				}
			}
		}
	}

	add(privateKey: string) {
		this.accounts.push(new Account(this.web3, privateKey));
		localStorage.setItem("length", (this.accounts.length-1).toString());
		localStorage.setItem(`account${this.accounts.length}`, privateKey);
	}

	clear() {
		this.accounts.splice(0);
		localStorage.clear();
	}

	/*remove(publicKey: string) {
		this.accounts.map((account, index) => {
			if (account.address === publicKey) {
				this.accounts.splice(index, 1);
			}
		});
	}*/
}