const contractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
const abi = [/* shortened for brevity */];

let web3;
let contract;
let account;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet").textContent = account.slice(0, 6) + "..." + account.slice(-4);
    contract = new web3.eth.Contract(abi, contractAddress);
    updateUI();
  } else {
    alert("MetaMask not detected!");
  }
}

async function updateUI() {
  const staked = await contract.methods.balanceOf(account).call();
  const earned = await contract.methods.earned(account).call();
  document.getElementById("staked").textContent = web3.utils.fromWei(staked, "ether");
  document.getElementById("earned").textContent = web3.utils.fromWei(earned, "ether") + " LYDIA";
}

async function stakeTokens() {
  const amount = document.getElementById("amount").value;
  const weiAmount = web3.utils.toWei(amount, "ether");
  await contract.methods.stake(weiAmount).send({ from: account });
  updateUI();
}

async function claimRewards() {
  await contract.methods.getReward().send({ from: account });
  updateUI();
}

async function withdrawTokens() {
  await contract.methods.withdraw().send({ from: account });
  updateUI();
}
