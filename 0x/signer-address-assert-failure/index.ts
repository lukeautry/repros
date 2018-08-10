import { PrivateKeyWalletSubprovider } from '@0xproject/subproviders';
import { Web3Wrapper } from '@0xproject/web3-wrapper';
import ProviderEngine = require('web3-provider-engine');
import RpcSubprovider = require('web3-provider-engine/subproviders/rpc');
import * as readline from 'readline-sync';
import chalk from 'chalk';

(async () => {
  const pk = readline.question(
    chalk.blue(`Enter a private key for a wallet that you don't care about, e.g. generate a new one in Metamask\n`), {
      hideEchoBack: true
    });

  const engine = new ProviderEngine();

  engine.addProvider(new RpcSubprovider({ rpcUrl: 'https://kovan.infura.io' }));

  const pkProvider = new PrivateKeyWalletSubprovider(pk);
  const pkAccounts = await pkProvider.getAccountsAsync();
  console.log(chalk.green(`Account successfully detected from private key subprovider: ${pkAccounts[0]}`));

  engine.addProvider(pkProvider);
  engine.start();

  const web3 = new Web3Wrapper(engine);

  const accounts = await web3.getAvailableAddressesAsync();
  if (accounts.length === 0) {
    console.log(chalk.red(`Account not detected when calling getAvailableAddressesAsync`))
  } else {
    console.log(chalk.green(`Account successfully detected when calling getAvailableAddressesAsync`))
  }
})();
