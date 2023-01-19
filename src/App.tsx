import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { NextUIProvider, createTheme } from '@nextui-org/react';

import WelcomePage from './pages/WelcomePage';
import { ProviderEnum } from './web3-sdk/utils';
import Web3 from 'web3';
import Wallet from './web3-sdk/Wallet';
import { WalletContext } from './web3-sdk/WalletContext';
import WalletPage from './pages/WalletPage';
import PasswordModal from './components/UI/Modal/PasswordModal/PasswordModal';

const theme = createTheme({
	type: "dark", // it could be "light" or "dark"
	theme: {
		colors: {
			// brand colors
			primaryLight: '$blue200',
			primaryLightHover: '$blue300',
			primaryLightActive: '$blue400',
			primaryLightContrast: '$blue600',
			primary: '#0072F5',
			primaryBorder: '$blue500',
			primaryBorderHover: '$blue600',
			primarySolidHover: '$blue700',
			primarySolidContrast: '$white',
			primaryShadow: '$blue500',

			gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
			link: '#5E1DAD',
		},
		space: {},
		fonts: {}
	}
})

function App() {
	const [web3] = useState<Web3>(new Web3(ProviderEnum.Mainnet));
	const [wallet, setWallet] = useState<Wallet>(new Wallet(web3));

	const [passwordModalVisible, setPasswordModalVisible] = useState(true);

	useEffect(() => {
		console.log("Wallet has been setted");
	}, [wallet]);

	return (
		<NextUIProvider theme={theme}>
			<div className="App">
				<WalletContext.Provider value={{
					wallet: wallet,
					setWallet: setWallet
				}}>
					<PasswordModal visible={passwordModalVisible} setVisible={setPasswordModalVisible}/>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={wallet.accounts[0] ? <WalletPage/> : <WelcomePage/>}/>
							<Route path="welcome" element={<WelcomePage/>}/>
							<Route path="wallet" element={<WalletPage/>}/>
						</Routes>
					</BrowserRouter>
				</WalletContext.Provider>
			</div>
		</NextUIProvider>
	);
}

export default App;
