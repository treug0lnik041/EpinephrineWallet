import Web3 from 'web3';

export default class Account {
	public web3: Web3;
	public address: string;
	private privateKey: string;

	constructor(web3: Web3, privateKey?: string) {
		this.web3 = web3;
		if (privateKey) {
			this.privateKey = privateKey;
			this.address = this.web3.eth.accounts.privateKeyToAccount(this.privateKey).address;
		} else {
			const account = this.web3.eth.accounts.create();
			this.address = account.address;
			this.privateKey = account.privateKey;
		}
	}

	static create(web3: Web3) : string {
		return web3.eth.accounts.create().privateKey;
	}

	async signTransaction(tx: any) {
		return this.web3.eth.accounts.signTransaction(tx, this.privateKey);
	}

	async getBalance() {
		return parseInt(await this.web3.eth.getBalance(this.address))
	}

	async transfer(to: string, value: number) {
		const tx = {
			to,
			value,
			gas: this.web3.utils.toWei('30', 'gwei')
		};

		const signedTx = await this.signTransaction(tx);
		if (signedTx.rawTransaction) {
			return await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
		} else {
			throw TypeError;
		}
	}
}