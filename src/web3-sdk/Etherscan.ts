import axios from "axios";
import Web3 from "web3";

export interface EthPrice {
	ethbtc: string
	ethbtc_timestamp: string
	ethusd: string
	ethusd_timestamp: string 
}

export interface Transaction {
	confirmations: string
	contractAddress: string
	cumulativeGasUsed: string
	functionName: ""
	gasUsed: "21000"
	isError: "0"
	methodId: "0x"
	timeStamp: "1642110673"
	txreceipt_status: "1"
	hash: string;
    nonce: number;
    blockHash: string | null;
    blockNumber: number | null;
    transactionIndex: number | null;
    from: string;
    to: string | null;
    value: string;
    gasPrice: string;
    maxPriorityFeePerGas?: number | string;
    maxFeePerGas?: number | string;
    gas: number;
    input: string;
}

export class Mainscan {
	static APIKey = "AAA82GTY8DK43EYKHP3NHS5P92T8948KYG";

	static async etherToUSD() {
		const request = "http://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + this.APIKey;
		return ((await axios.get(request)).data.result as EthPrice);
	}

	static async getAccountTransactions (web3: Web3, address: string) {
		const lastBlock = (await web3.eth.getBlock("latest")).number;
		const request = "http://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=" + lastBlock + "&sort=asc&apikey=AAA82GTY8DK43EYKHP3NHS5P92T8948KYG";
		return await ((await axios.get(request)).data.result) as Array<Transaction>;
	}
}

export class Goerliscan {
	static APIKey = "AAA82GTY8DK43EYKHP3NHS5P92T8948KYG";

	static async etherToUSD() {
		const request = "http://api.etherscan.io/api?module=stats&action=ethprice&apikey=" + this.APIKey;
		return ((await axios.get(request)).data.result as EthPrice);
	}

	static async getAccountTransactions (web3: Web3, address: string) {
		const lastBlock = (await web3.eth.getBlock("latest")).number;
		const request = "http://api-goerli.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=" + lastBlock + "&sort=asc&apikey=AAA82GTY8DK43EYKHP3NHS5P92T8948KYG";
		return await ((await axios.get(request)).data.result) as Array<Transaction>;
	}
}
