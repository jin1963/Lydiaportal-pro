
let contractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
let abi = [/* ABI would be placed here */];

let provider;
let signer;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        document.getElementById("wallet-address").innerText = address;
        contract = new ethers.Contract(contractAddress, abi, signer);
    } else {
        alert("Please install MetaMask!");
    }
}

async function stakeTokens() {
    const amount = document.getElementById("stake-amount").value;
    if (!contract) return;
    try {
        const tx = await contract.stake(ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        alert("Staked successfully!");
    } catch (e) {
        alert("Error staking: " + e.message);
    }
}

async function claimRewards() {
    if (!contract) return;
    try {
        const tx = await contract.claim();
        await tx.wait();
        alert("Rewards claimed!");
    } catch (e) {
        alert("Error claiming: " + e.message);
    }
}

async function withdrawTokens() {
    if (!contract) return;
    try {
        const tx = await contract.withdraw();
        await tx.wait();
        alert("Withdraw successful!");
    } catch (e) {
        alert("Error withdrawing: " + e.message);
    }
}
