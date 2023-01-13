import { Button, Input, Modal, Text } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { WalletContext } from "../../../../web3-sdk/WalletContext";

function ImportModal({visible, setVisible} : {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
	const [privateKey, setPrivateKey] = useState("");
	const { wallet, setWallet } = useContext(WalletContext);

	const handler = () => {
		let _wallet = wallet;
		_wallet?.add(privateKey);
		setWallet(_wallet);
		console.log(`New account has been added with public key: ${wallet?.accounts[wallet.accounts.length-1].address}`)
		setVisible(false);
	};

	return (
		<Modal
        	closeButton
        	preventClose
			blur
        	aria-labelledby="modal-title"
        	open={visible}
        	onClose={() => { setVisible(false) }}
		>
			<Modal.Header>
				<Text>Import Private Key</Text>
			</Modal.Header>
			<Modal.Body>
				<Input
            		clearable
            		bordered
            		fullWidth
            		color="primary"
            		size="lg"
            		placeholder="Private Key"
					onChange={(e) => setPrivateKey(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button auto flat color="error" onPress={() => setVisible(false)}>
            		Close
          		</Button>
          		<Button auto onPress={handler}>
            		Import
          		</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImportModal;
