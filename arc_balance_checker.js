const { Web3 } = require('web3');

const rpcUrl = 'https://rpc.testnet.arc.network';
const web3 = new Web3(rpcUrl);

const yourAddress = '0x5dB79De09492368d6808754edBC8F7A403c10677';  // Yahan apna real Arc Testnet wallet address daal (MetaMask se copy)

async function checkBalance() {
  try {
    const connected = await web3.eth.net.isListening();
    console.log('✅ Connected to Arc Testnet! Chain ID should be 5042002 🚀');

    const balanceWei = await web3.eth.getBalance(yourAddress);
    const balance = web3.utils.fromWei(balanceWei, 'ether');
    console.log(`Your native USDC balance: ${balance} USDC`);

    const usdcAddress = '0x3600000000000000000000000000000000000000';
    const usdcAbi = [{
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function'
    }];
    const usdcContract = new web3.eth.Contract(usdcAbi, usdcAddress);
    const usdcBalanceWei = await usdcContract.methods.balanceOf(yourAddress).call();
    const usdcBalance = Number(usdcBalanceWei) / 1e6;
    console.log(`USDC display balance: ${usdcBalance} USDC`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkBalance();
