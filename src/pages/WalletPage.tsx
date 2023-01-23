import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../web3-sdk/WalletContext";
import { Button, Card, Container, Spacer, Text} from "@nextui-org/react";
import SendModal from "../components/UI/Modal/SendModal/SendModal";
import TransactionTable from "../components/UI/TransactionTable/TransactionTable";
import SelectAccount from "../components/UI/SelectAccount/SelectAccount";
import ChangeNetwork from "../components/UI/ChangeNetwork/ChangeNetwork";

import { Mainscan, Goerliscan, Transaction } from "../web3-sdk/Etherscan";
import { ProviderEnum } from "../web3-sdk/utils";

function WalletPage() {
	const { wallet } = useContext(WalletContext);
	const [ provider, setProvider ] = useState<string>(ProviderEnum.Mainnet);
	const [ currentAccount, setCurrentAccount ] = useState(wallet.asArray()[0]);
	const [ balance, setBalance ] = useState(0);
	const [ inUSD, setInUSD ] = useState("0");
	const [ visibleSendModal, setVisibleSendModal ] = useState(false);
	const [ txs, setTxs ] = useState<Array<Transaction>>([]);

	useEffect(() => {
		wallet.balanceOf(currentAccount.address).then((_balance) => setBalance(_balance));

		if (provider === "Mainnet") {
			Mainscan.getAccountTransactions(wallet.web3, currentAccount.address).then((value) => setTxs(value.reverse()));
			Mainscan.etherToUSD().then((value) => setInUSD((parseFloat(value.ethusd) * parseFloat(wallet.web3.utils.fromWei(balance.toString(), "ether"))).toFixed(2)));
		} else if (provider === "Goerli") {
			Goerliscan.getAccountTransactions(wallet.web3, currentAccount.address).then((value) => setTxs(value.reverse()));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance, currentAccount, wallet, visibleSendModal, provider]);

	return (
		<div style={{'marginTop': '3vh'}}>
			<Container css={{'width': '1100px'}}>
				<Card color="primary">
					<Card.Header>
						<SelectAccount currentAccount={currentAccount} setCurrentAccount={setCurrentAccount}/>
						<Spacer x={27}/>
						<ChangeNetwork setProvider={setProvider}/>
					</Card.Header>
					<Card.Body>
						<Text h4>{wallet.web3.utils.fromWei(balance.toString(), 'ether')} ETH</Text>
						<Text h5>${inUSD}</Text>
						<Spacer y={5}></Spacer>
						<Button auto color='gradient' onPress={() => setVisibleSendModal(true)}>Send</Button>

						<SendModal visible={visibleSendModal} setVisible={setVisibleSendModal} currentAccount={currentAccount}/>
					</Card.Body>
					<Card.Footer>
						<Card>
							<Card.Header><Text h4>Transactions</Text></Card.Header>
							<Card.Body>
								<TransactionTable transactions={txs} yourAddress={currentAccount.address}/>
							</Card.Body>
						</Card>
					</Card.Footer>
				</Card>
			</Container>
		</div>
	)
}

export default WalletPage;