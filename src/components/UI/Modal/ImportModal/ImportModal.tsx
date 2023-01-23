import { Button, Input, Modal, Text } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { WalletContext } from "../../../../web3-sdk/WalletContext";
import { useNavigate } from "react-router-dom";

function ImportModal({visible, setVisible} : {visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>>}) {
	const navigate = useNavigate();
	const [privateKey, setPrivateKey] = useState("");
	const { wallet, setWallet } = useContext(WalletContext);

	const handler = () => {
		wallet.add(privateKey);
		setWallet(wallet);
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
