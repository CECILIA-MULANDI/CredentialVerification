
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

async function issueCertificate() {
    const certificateType = document.getElementById('certificateType').value;
    const holdersName = document.getElementById('holdersName').value;
    const additionalData = document.getElementById('additionalData').value;
    const documentUrl = document.getElementById('documentUrl').value;
    const holderAddress = document.getElementById('holderAddress').value;

    try {
        const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; 
        const contractAbi = YOUR_CONTRACT_ABI_HERE; 

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        const result = await contract.methods.issueCertificate(
            certificateType,
            holdersName,
            additionalData,
            documentUrl,
            holderAddress
        ).send({ from: senderAddress });

        console.log('Certificate issued successfully. Transaction hash:', result.transactionHash);

        document.getElementById('issueCertificateForm').reset();
    } catch (error) {
        console.error('Error issuing certificate:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const web3Initialized = await initWeb3();
    
    if (web3Initialized) {
        document.getElementById('issueCertificateForm').addEventListener('submit', (event) => {
            event.preventDefault();
            issueCertificate();
        });
    }
});
