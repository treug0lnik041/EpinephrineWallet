import React, { useContext, useEffect, useMemo, useState } from "react";
import { WalletContext } from "../../../web3-sdk/WalletContext";
import { Button, Dropdown, Input, Modal, Text } from "@nextui-org/react";
import { ProviderEnum } from "../../../web3-sdk/utils";

const networkItems = [
	{ key: "Mainnet", name : "Mainnet (Infura)" },
	{ key: "Ganache", name: "Ganache" },
	{ key: "Goerli", name: "Goerli" },
	{ key: "Custom", name: "Custom" }
];

function ChangeNetwork({ setProvider }: { setProvider: React.Dispatch<React.SetStateAction<string>>}) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { wallet, setWallet } = useContext(WalletContext);
	const [ visible, setVisible ] = useState(false);
	const [ rpcURL, setRpcURL ] = useState("");
	const [selected, setSelected] = useState(new Set(["Mainnet"]));

	const selectedValue = useMemo(
    	() => Array.from(selected).join(", ").replaceAll("_", " "),
	[selected]);

	useEffect(() => {
		setProvider(selectedValue);

		switch (selectedValue) {
			case "Mainnet":
				wallet.web3.setProvider(ProviderEnum.Mainnet);
				break;
			case "Ganache":
				wallet.web3.setProvider(ProviderEnum.Ganache);
				break;
			case "Goerli":
				wallet.web3.setProvider(ProviderEnum.Goerli);
				break;
			case "Custom":
				setVisible(true);
				break;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue]);


	const handler = () => {
		wallet.web3.setProvider(rpcURL);
		setVisible(false);
	}

	return (
		<div className="changenetwork">
			<Dropdown>
				<Dropdown.Button color="gradient">
					{selectedValue}
				</Dropdown.Button>
					<Dropdown.Menu
        			aria-label="Single selection actions"
        			color="secondary"
					disabledKeys={[wallet.asArray().length === 1 ? "$.0.2" : " "]}
        			disallowEmptySelection
        			selectionMode="single"
        			selectedKeys={selected}
        			onSelectionChange={setSelected as any}>
						<Dropdown.Section title="Change network" items={networkItems}>
							{(item) => (
          						<Dropdown.Item
            						key={item.key}
            					color={item.key === "delete" ? "error" : "default"}>{item.name}</Dropdown.Item>
        )}
						</Dropdown.Section>
      				</Dropdown.Menu>
				</Dropdown>

			<Modal
        	closeButton
        	preventClose
			blur
        	aria-labelledby="modal-title"
        	open={visible}
        	onClose={() => { setVisible(false) }}
		>
			<Modal.Header>
				<Text>Change RPC provider</Text>
			</Modal.Header>
			<Modal.Body>
				<Input
            		clearable
            		bordered
            		fullWidth
            		color="primary"
            		size="lg"
            		placeholder="rpc url"
					onChange={(e) => setRpcURL(e.target.value)}
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
		</div>
	)
}

export default ChangeNetwork;