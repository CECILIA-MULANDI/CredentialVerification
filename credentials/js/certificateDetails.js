
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

async function loadCertificateDetails() {
    const certificateId = getCertificateIdFromURL();

    if (!certificateId) {
        console.error('Certificate ID not found in the URL.');
        return;
    }

    try {
        const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; 
        const contractAbi = YOUR_CONTRACT_ABI_HERE;

        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const certificateDetails = await contract.methods.getCertificateDetails(certificateId).call();

        const certificateDetailsElement = document.getElementById('certificateDetails');

        const holderAddress = certificateDetails[0];
        const certificateType = certificateDetails[1];
        const holdersName = certificateDetails[2];
        const dateOfIssuance = new Date(Number(certificateDetails[3]) * 1000).toLocaleDateString();
        const isValid = certificateDetails[4];
        const additionalData = certificateDetails[5];

        const certificateHTML = `
            <h2>Certificate Details</h2>
            <p><strong>Holder's Address:</strong> ${holderAddress}</p>
            <p><strong>Certificate Type:</strong> ${certificateType}</p>
            <p><strong>Holder's Name:</strong> ${holdersName}</p>
            <p><strong>Date of Issuance:</strong> ${dateOfIssuance}</p>
            <p><strong>Is Valid:</strong> ${isValid ? 'Yes' : 'No'}</p>
            <p><strong>Additional Data:</strong> ${additionalData}</p>
        `;

        certificateDetailsElement.innerHTML = certificateHTML;

    } catch (error) {
        console.error('Error loading certificate details:', error);
    }
}


function getCertificateIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('certificateId');
}

document.addEventListener('DOMContentLoaded', async () => {
    const web3Initialized = await initWeb3();

    if (web3Initialized) {
        loadCertificateDetails();
    }
});
