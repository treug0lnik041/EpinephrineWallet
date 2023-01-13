import { createContext } from "react";

import Wallet from "./Wallet";

export const WalletContext = createContext<{wallet: Wallet | undefined, setWallet: any}>({wallet: undefined, setWallet: undefined});