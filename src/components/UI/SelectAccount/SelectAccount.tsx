import { Dropdown, User } from "@nextui-org/react";
import React, { useContext } from "react";
import { WalletContext } from "../../../web3-sdk/WalletContext";
import { useNavigate } from "react-router-dom";
import { Account } from "web3-core";

function SelectAccount({ currentAccount, setCurrentAccount } : { currentAccount: Account, setCurrentAccount: React.Dispatch<React.SetStateAction<Account>> }) {
	const navigate = useNavigate();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { wallet, setWallet } = useContext(WalletContext);
	const handleAction = (key: any) => {
		if (!(key.anchorKey[0] === '$')) {
			setCurrentAccount(wallet.asArray()[key.anchorKey]);
		} else {
			switch (key.anchorKey) {
				case "$.0.0":
					navigate("/welcome");
					break;
				case "$.0.1":
					// Export current account's public key directly to the clipboard
					navigator.clipboard.writeText(currentAccount.address);
					console.log(`Public key has been exported to the clipboard: ${currentAccount.address}`);
					break;
				case "$.0.2":
					// Export current account's private key directly to the clipboard
					navigator.clipboard.writeText(currentAccount.privateKey);
					console.log(`Private key has been exported to the clipboard: ${currentAccount.privateKey}`);
					break;
				case "$.0.3":
					// Delete current account
					wallet.remove(currentAccount.address);
					setCurrentAccount(wallet.asArray()[0]);
					break;
			}
		}
	}

	return (
		<Dropdown placement="bottom-left">
			<Dropdown.Trigger>
				<User
					bordered
					size="lg"
					as="button"
					color="gradient"
					name={`Account ${wallet.asArray().indexOf(currentAccount)}`}
					description={currentAccount.address}
					src="https://m.myfin.by/images/cryptoCurrency/eth.png"/>
							
			</Dropdown.Trigger>
      		<Dropdown.Menu
        		aria-label="Single selection actions"
        		color="secondary"
				disabledKeys={[wallet.asArray().length === 1 ? "$.0.3" : " "]}
        		disallowEmptySelection
        		selectionMode="single"
        		selectedKeys={new Set([`${wallet.asArray().indexOf(currentAccount)}`])}
        		onSelectionChange={(key) => handleAction(key)}>
				<Dropdown.Section title="Actions">
					<Dropdown.Item color="success">Add new account</Dropdown.Item>
					<Dropdown.Item color="success">Export public key</Dropdown.Item>
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
	)
}

export default SelectAccount;
