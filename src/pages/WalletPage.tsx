import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../web3-sdk/WalletContext";
import { Button, Card, Col, Container, Dropdown, Spacer, Text, User } from "@nextui-org/react";
import SendModal from "../components/UI/Modal/SendModal/SendModal";

function WalletPage() {
	const { wallet } = useContext(WalletContext);
	const [ currentAccount, setCurrentAccount ] = useState(wallet.asArray()[0]);
	const [ balance, setBalance ] = useState(0);
	const [ visibleSendModal, setVisibleSendModal ] = useState(false);

	useEffect(() => {
		wallet.balanceOf(currentAccount.address).then((_balance) => setBalance(_balance));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balance, currentAccount, wallet]);

	const handleAction = (key: any) => {
		if (!(key.anchorKey[0] === '$')) {
			setCurrentAccount(wallet.asArray()[key.anchorKey]);
		} else {
			switch (key.anchorKey) {
				case "$.0.0":
					// Export current account's private key directly to the clipboard
					console.log("Exporting!");
					break;
				case "$.0.1":
					// Delete current account
					wallet.remove(currentAccount.address);
					setCurrentAccount(wallet.asArray()[0]);
					break;
			}
		}
	}

	return (
		<div style={{'marginTop': '3vh'}}>
			<Container css={{'width': '1000px'}}>
				<Card color="primary">
					<Card.Header>
						<Dropdown placement="bottom-left">
							<Dropdown.Trigger>
								<User
									bordered
									size="lg"
									as="button"
									color="gradient"
									name={`Account ${wallet.asArray().indexOf(currentAccount)}`}
									description={currentAccount.address}
									src="https://m.myfin.by/images/cryptoCurrency/eth.png"
								/>
							</Dropdown.Trigger>
      						<Dropdown.Menu
        					aria-label="Single selection actions"
        					color="secondary"
        					disallowEmptySelection
        					selectionMode="single"
        					selectedKeys={new Set([`${wallet.asArray().indexOf(currentAccount)}`])}
        					onSelectionChange={(key) => handleAction(key)}>
								<Dropdown.Section title="Actions">
									<Dropdown.Item color="warning">Export private key</Dropdown.Item>
									<Dropdown.Item color="error">Delete Account</Dropdown.Item>
								</Dropdown.Section>
								<Dropdown.Section title="Accounts">
									{wallet.asArray().map((value, index) =>
										<Dropdown.Item key={index} color="default">{`Account ${index}`}</Dropdown.Item>
									)}
								</Dropdown.Section>
      						</Dropdown.Menu>
    					</Dropdown>
					</Card.Header>
					<Card.Body>
						<Text h4>{wallet.web3.utils.fromWei(balance.toString(), 'ether')} ETH</Text>
						<Spacer y={5}></Spacer>
						<Button auto color='gradient' onPress={() => setVisibleSendModal(true)}>Send</Button>

						<SendModal visible={visibleSendModal} setVisible={setVisibleSendModal}/>
					</Card.Body>
					<Card.Footer>
						<Col>
							<Text>Transactions</Text>
						</Col>
					</Card.Footer>
				</Card>
			</Container>
		</div>
	)
}

export default WalletPage;