import React, { useContext, useState } from "react";
import { Modal, Text, Button, Input } from "@nextui-org/react";
import { WalletContext } from "../../../../web3-sdk/WalletContext";

function SendModal({ visible, setVisible } : { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { wallet, setWallet } = useContext(WalletContext);
	const [ address, setAddress ] = useState("");
	const [ amount, setAmount ] = useState("0");


	const handler = () => {
		// TODO: Implement sending ether
		console.log(`DEBUG: Sending ${amount} to "${address}"`);
		setVisible(false);
	}

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
				<Text>Send Ether</Text>
			</Modal.Header>
			<Modal.Body>
				<Input
					clearable
					bordered
					fullWidth
					color="primary"
					size="lg"
					placeholder="Address"
					onChange={(e) => setAddress(e.target.value)}
				/>
				<Input
            		clearable
            		bordered
            		fullWidth
            		color="primary"
            		size="lg"
            		placeholder="Amount in ETH"
					onChange={(e) => setAmount(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button auto flat color="error" onPress={() => setVisible(false)}>
            		Close
          		</Button>
          		<Button auto color="success" onPress={handler}>
            		Send
          		</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default SendModal;