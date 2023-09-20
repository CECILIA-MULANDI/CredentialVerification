
function loadPage(pageName) {
    const mainContent = document.querySelector('main');
    fetch(`${pageName}.html`)
        .then((response) => response.text())
        .then((html) => {
            mainContent.innerHTML = html;
        })
        .catch((error) => {
            console.error('Error loading page:', error);
        });
}


let isRequestPending = false;

async function connectToMetaMask() {
    try {
        if (!window.ethereum) {
            console.warn('MetaMask is not detected. Please install and configure MetaMask.');
            return;
        }

        if (window.ethereum.selectedAddress) {
            console.log('Already connected to MetaMask.');
            return;
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum); 
        console.log('Connected to MetaMask');
    } catch (error) {
        console.error('User denied account access:', error);
    }
}


async function initializeApp() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageName = event.target.getAttribute('href');
            loadPage(pageName);
        });
    });

    loadPage('issueCertificate');

    if (typeof window.ethereum !== 'undefined') {
        const connectButton = document.getElementById('connect-button');
        connectButton.addEventListener('click', connectToMetaMask);

        window.ethereum.on('connect', (connectInfo) => {
            console.log('Connected to MetaMask:', connectInfo);
        });

        window.ethereum.on('disconnect', (disconnectInfo) => {
            console.log('Disconnected from MetaMask:', disconnectInfo);
        });

        connectButton.addEventListener('click', connectToMetaMask);
    } else {
        console.warn('MetaMask is not detected. Please install and configure MetaMask.');
    }
}


document.addEventListener('DOMContentLoaded', initializeApp);
