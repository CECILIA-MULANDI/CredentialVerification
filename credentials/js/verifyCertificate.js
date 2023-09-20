
async function initWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            return true;
        } catch (error) {
            console.error('User denied account access:', error);
            return false;
        }
    } else {
        console.warn('MetaMask is not detected. Please install and configure MetaMask.');
        return false;
    }
}

async function verifyCertificate() {
    const certificateId = document.getElementById('certificateId').value;

    try {
        const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; 
        const contractAbi = YOUR_CONTRACT_ABI_HERE;

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const isValid = await contract.methods.verifyCertificate(certificateId).call();

        const verificationResultElement = document.getElementById('verificationResult');

        if (isValid) {
            verificationResultElement.innerHTML = '<p>Certificate is valid.</p>';
        } else {
            verificationResultElement.innerHTML = '<p>Certificate is not valid.</p>';
        }
    } catch (error) {
        console.error('Error verifying certificate:', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const web3Initialized = await initWeb3();

    if (web3Initialized) {
        document.getElementById('verifyCertificateForm').addEventListener('submit', (event) => {
            event.preventDefault();
            verifyCertificate();
        });
    }
});
