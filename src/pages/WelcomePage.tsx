import { Button, Card, Container, Spacer, Text } from "@nextui-org/react";
import React, { useContext, useState } from "react";

import ImportModal from "../components/UI/Modal/ImportModal/ImportModal";
import CreateModal from "../components/UI/Modal/CreateModal/CreateModal";
import { ProviderEnum, getProviderName } from "../web3-sdk/utils";
import Web3 from "web3";
import { WalletContext } from "../web3-sdk/WalletContext";

function WelcomePage() {
	const { wallet, setWallet } = useContext(WalletContext);

	const [visibleImport, setVisibleImport] = useState(false);
	const [visibleCreate, setVisibleCreate] = useState(false);

	const connectToEthereum = () => {
		let _wallet = wallet;
		if (_wallet !== undefined)
		{
			_wallet.web3 = new Web3(ProviderEnum.Mainnet);
			setWallet(_wallet);
		}
	};

	return (
		<div style={{'marginTop': '3vh'}}>
			<Text>{
				wallet.web3?.currentProvider ? 
					`Powered by ${(typeof wallet?.web3.currentProvider === "object") ? 
						("host" in wallet.web3.currentProvider) ? 
							getProviderName(wallet.web3.currentProvider.host) : 
							"unknown" : 
						getProviderName(wallet.web3.currentProvider)}` : 
					<Button onPress={connectToEthereum}>Connent to Ethereum</Button>}
			</Text>

			<Container css={{'width': '700px'}}>
				<Card color="primary">
					<Card.Header>
						<Text h1>Epinephrine Wallet</Text>
					</Card.Header>
					<Card.Body css={{'justifyContent': 'center', 'justifyItems': 'center', 'alignItems': 'center'}}>
						<Text h2>Seems like you have no wallets. Let's import or create a new one.</Text>
					</Card.Body>
					<Spacer y={2}/>
					<Card.Body>
						<Button.Group vertical bordered color="gradient">
							<Button color='gradient' onPress={() => setVisibleImport(true)}>Import wallet</Button>
							<Button color='gradient' onPress={() => setVisibleCreate(true)}>Create new wallet</Button>
						</Button.Group>

						<ImportModal setVisible={setVisibleImport} visible={visibleImport}/>
						<CreateModal setVisible={setVisibleCreate} visible={visibleCreate}/>
					</Card.Body>
				</Card>
			</Container>
		</div>
	)
}

export default WelcomePage;