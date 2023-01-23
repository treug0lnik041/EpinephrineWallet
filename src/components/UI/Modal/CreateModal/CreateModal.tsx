import { Button, Input, Modal, Text } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../../../web3-sdk/WalletContext";
import { useNavigate } from "react-router-dom";

function ImportModal({visible, setVisible} : {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
	const navigate = useNavigate();
	const [privateKey, setPrivateKey] = useState("");
	const { wallet, setWallet } = useContext(WalletContext);

	useEffect(() => {
		setPrivateKey(wallet.web3.eth.accounts.create().privateKey);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handler = () => {
		let _wallet = wallet; 
		_wallet.add(privateKey);
		setWallet(_wallet);
		setVisible(false);
		navigate("/wallet");
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
				<Text>Create wallet</Text>
			</Modal.Header>
			<Modal.Body>
				<Text>Copy this private key</Text>
				<Input
					readOnly
            		bordered
            		fullWidth
            		color="primary"
            		size="lg"
            		placeholder="Private Key"
					initialValue={privateKey}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button auto flat color="error" onPress={() => setVisible(false)}>
            		Close
          		</Button>
          		<Button auto onPress={handler}>
            		Create
          		</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ImportModal;