export type Provider = ProviderEnum | string;

export enum ProviderEnum {
	Ganache = "http://127.0.0.1:7545",
	Mainnet = "https://mainnet.infura.io/v3/9777398aecef400aadd67a3a6acf9d13"
}

export function getProviderName(provider: Provider) : string {
	switch (provider) {
		case ProviderEnum.Ganache:
			return "Ganache";
		case ProviderEnum.Mainnet:
			return "Mainnet";
		default:
			return provider;
	}
}
