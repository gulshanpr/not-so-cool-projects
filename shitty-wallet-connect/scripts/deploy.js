async function main() {
    const PlusOne = await ethers.getContractFactory("PlusOne");
    const plusone = await PlusOne.deploy();

    await plusone.waitForDeployment();

    console.log("Contract Deployed to Address:", plusone.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });