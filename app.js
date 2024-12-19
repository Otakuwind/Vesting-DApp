let web3;
let contract;
const contractAddress = "<your_contract_address>"; // Replace with your deployed contract address
const abi = [
    // ABI of the TokenVesting contract
    {
        "constant": false,
        "inputs": [{"name": "_token", "type": "address"}],
        "name": "registerOrganization",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {"name": "org", "type": "address"},
            {"name": "stakeholder", "type": "address"},
            {"name": "amount", "type": "uint256"},
            {"name": "releaseTime", "type": "uint256"}
        ],
        "name": "addStakeholder",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [{"name": "org", "type": "address"}],
        "name": "claimTokens",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Web3 is connected");
    } else {
        alert("Please install MetaMask!");
    }
}

async function registerOrganization() {
    const tokenAddress = document.getElementById('orgToken').value;
    const accounts = await web3.eth.getAccounts();
    contract.methods.registerOrganization(tokenAddress).send({ from: accounts[0] })
        .then(receipt => {
            displayMessage('Organization registered successfully');
        })
        .catch(error => {
            displayMessage('Error registering organization: ' + error.message);
        });
}

async function addStakeholder() {
    const org = document.getElementById('orgToken').value;
    const stakeholder = document.getElementById('stakeholderAddress').value;
    const amount = document.getElementById('stakeAmount').value;
    const releaseTime = document.getElementById('releaseTime').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.addStakeholder(org, stakeholder, amount, releaseTime).send({ from: accounts[0] })
        .then(receipt => {
            displayMessage('Stakeholder added successfully');
        })
        .catch(error => {
            displayMessage('Error adding stakeholder: ' + error.message);
        });
}

async function claimTokens() {
    const org = document.getElementById('claimOrg').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.claimTokens(org).send({ from: accounts[0] })
        .then(receipt => {
            displayMessage('Tokens claimed successfully');
        })
        .catch(error => {
            displayMessage('Error claiming tokens: ' + error.message);
        });
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}

// Initialize the app when the page loads
window.onload = init;
