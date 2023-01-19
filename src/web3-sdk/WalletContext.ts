import { createContext } from "react";

import Wallet from "./Wallet";

export const WalletContext = createContext<{wallet: Wallet, setWallet: any}>({wallet: new Wallet(), setWallet: undefined});