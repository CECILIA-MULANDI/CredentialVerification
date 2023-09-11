// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    address public owner;
    mapping(uint => Certificate) public certificates;
    
    uint public certificateCounter;
    event CertificateIssued(uint256 indexed certificateId,address indexed issuer);
    event CertificateVerified(uint256 indexed certificateId, address indexed verifier, bool isValid);


    constructor() {
        owner = msg.sender;
        certificateCounter=0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    struct Certificate {
        address issuer;
        string certificateType;
        string holdersname;
        uint256 dateofIssuance;
        bool isValid;
    }

    function issueCertificate(string memory certificateType, string memory holdersname) external onlyOwner {
        certificateCounter++;
        uint256 certificateId = certificateCounter;
        require(certificates[certificateId].issuer == address(0), "Certificate with this ID already exists");

        certificates[certificateId] = Certificate({
            issuer: msg.sender,
            certificateType: certificateType,
            holdersname: holdersname,
            dateofIssuance: block.timestamp,
            isValid: true
        });
        emit CertificateIssued(certificateId, msg.sender);
       
    }
        // Step 2: Certificate Verification
    function verifyCertificate(uint256 certificateId) external returns (bool) {
        Certificate storage certificate = certificates[certificateId];
        require(certificate.issuer != address(0), "Certificate not found");

        // Implement verification checks here (e.g., check expiration, issuer's authority)
        // For simplicity, we assume all certificates issued are valid.

        emit CertificateVerified(certificateId, msg.sender, certificate.isValid);
        return certificate.isValid;
    }

}
