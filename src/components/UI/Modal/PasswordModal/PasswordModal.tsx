import React, { useContext, useState } from "react";
import { Modal, Text, Input, Button } from "@nextui-org/react";
import { WalletContext } from "../../../../web3-sdk/WalletContext";

function PasswordModal({ visible, setVisible } : { visible: boolean, setVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { wallet, setWallet } = useContext(WalletContext);
	const [password, setPassword] = useState("");

	const handler = () => {
		wallet.setPassword(password);
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
				<Text>Decrypt wallet</Text>
			</Modal.Header>
			<Modal.Body>
				<Input.Password
            		clearable
            		bordered
            		fullWidth
            		color="primary"
            		size="lg"
            		placeholder="Password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button auto flat color="error" onPress={() => setVisible(false)}>
            		Close
          		</Button>
          		<Button auto onPress={handler}>
            		Ok
          		</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PasswordModal;