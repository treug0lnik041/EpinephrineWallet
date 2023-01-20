import React, { useEffect, useState } from "react";
import { Grid, Table, Text } from "@nextui-org/react";
import Transaction from "../../../web3-sdk/Transaction";
import Web3 from "web3";

type TxRow = {
	key: number;
	from: string;
	to: string | null;
	amount: string;
	gas?: string | number;
}

function TransactionTable({ transactions, yourAddress } : { transactions: Transaction[], yourAddress: string }) {
	const [ rows, setRows ] = useState<TxRow[]>([]);

	useEffect(() => {
		let arr = [];
		for (let key = 0; key < transactions.length; key++) {
			let from = transactions[key].from;
			let to = transactions[key].to;

			if (from === yourAddress.toLocaleLowerCase()) {
				from = "Your account";
			}

			if (to) {
				if (to === yourAddress.toLocaleLowerCase()) {
					to = "Your account";
				}	
			}

			arr.push({
				key: key,
				from: from,
				to: to,
				amount: Web3.utils.fromWei(transactions[key].value, 'ether')
			});
		}

		setRows(arr);
	}, [transactions, yourAddress]);


	const columns = [
		{
			key: "from",
			label: "FROM",
		},
		{
			key: "to",
			label: "TO",
		},
		{
			key: "amount",
			label: "AMOUNT (ETH)",
		},
	];

	

	return (
		<Grid.Container>
			<Grid xs={12}>
				{transactions.length ?
		<Table
			bordered
			lined
			headerLined
			aria-label="transactions"
			color="success"
      		containerCss={{'height': "auto", 'minWidth': "100%",}}>
									
			<Table.Header columns={columns}>
				{(column) => (
					<Table.Column key={column.key}>{column.label}</Table.Column>
				)}
			</Table.Header>
			<Table.Body items={rows}>
        		{(item) => (
          			<Table.Row key={item.key}>
            			{(columnKey) => <Table.Cell>{item[columnKey as keyof TxRow]}</Table.Cell>}
          			</Table.Row>
        		)}
			</Table.Body>
		</Table>
 : <Text>You have no transactions yet</Text>}
		</Grid>
		</Grid.Container>
	)
}

export default TransactionTable;