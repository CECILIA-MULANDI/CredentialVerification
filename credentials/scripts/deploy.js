async function main() {
  const CertificateVerification = await ethers.getContractFactory(
    "CertificateVerification"
  );
  // begin deployment
  const credentials = await CertificateVerification.deploy();
  console.log("Contract deployed to address:", credentials.address);
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
