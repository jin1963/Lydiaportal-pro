window.addEventListener("load", async () => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = new Web3(window.ethereum);
    const contractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
    const abi = [
      {
        "inputs": [],
        "name": "rewardRate",
        "outputs": [{"internalType": "uint256","name":"","type":"uint256"}],
        "stateMutability": "view","type":"function"
      },
      {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [{"internalType": "uint256","name":"","type":"uint256"}],
        "stateMutability": "view","type":"function"
      }
    ];
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
      const totalStaked = await contract.methods.totalStaked().call();
      const rewardRate = await contract.methods.rewardRate().call();
      document.getElementById("tvl").textContent = web3.utils.fromWei(totalStaked, "ether");
      document.getElementById("reward").textContent = web3.utils.fromWei(rewardRate, "ether");
    } catch (err) {
      console.error("Error fetching contract data", err);
    }

    // Dummy price placeholder
    document.getElementById("price").textContent = "0.00025"; // สมมติว่า 1 LYDIA = 0.00025 BNB
  }
});
