// Function to mint a new certificate
async function mintCertificate() {
    const certificateType = document.getElementById('certificateType').value;
    const holdersName = document.getElementById('holdersName').value;
    const additionalData = document.getElementById('additionalData').value;

    try {
        const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';
        const contractAbi = YOUR_CONTRACT_ABI_HERE;

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const accounts = await web3.eth.getAccounts();
        const senderAddress = accounts[0];

        const result = await contract.methods.issueCertificate(
            certificateType,
            holdersName,
            additionalData
        ).send({ from: senderAddress });

        console.log('Certificate minted successfully. Transaction hash:', result.transactionHash);

        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Certificate minted successfully!';
        successMessage.classList.remove('hidden');
    } catch (error) {
        console.error('Error minting certificate:', error);
    }
}

document.getElementById('mintCertificateForm').addEventListener('submit', (event) => {
    event.preventDefault();
    mintCertificate();
});
