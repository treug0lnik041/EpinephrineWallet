import Web3 from "web3";
import axios from "axios";

export default interface Transaction {
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

export async function getAccountTransactions(web3: Web3, address: string) {
	const lastBlock = (await web3.eth.getBlock("latest")).number;
	const request = "http://api.etherscan.io/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=" + lastBlock + "&sort=asc&apikey=AAA82GTY8DK43EYKHP3NHS5P92T8948KYG";
	return await ((await axios.get(request)).data.result) as Array<Transaction>;
}