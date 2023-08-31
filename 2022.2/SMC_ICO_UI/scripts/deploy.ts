import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {

    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

    // const Floppy = await ethers.getContractFactory("Floppy");
    // const floppy = await Floppy.deploy();
    // console.log('Floppy address: ', floppy.address);
    // Config.setConfig(network + '.Floppy', floppy.address);

    // const Vault = await ethers.getContractFactory("Vault");
    // const vault = await Vault.deploy();
    // console.log('Floppy address: ', vault.address);
    // Config.setConfig(network + '.Vault', vault.address);
    
    // const Floppy = await ethers.getContractFactory("USDT");
    // const floppy = await Floppy.deploy();
    // console.log('USDT address: ', floppy.address);
    // Config.setConfig(network + '.USDT', floppy.address);

    const Ico = await ethers.getContractFactory("FLPCrowdSale");
    const ico = await Ico.deploy(1000,100,'0x76b5077Cb7FF8b9Bb37AfcbD63A4c3782F3259ee', '0xA3929a29bf0228e4Ecd095c1F93B33FB93fA543A');
    console.log('ICO address: ', ico.address);
    Config.setConfig(network + '.ico', ico.address);

    await Config.updateConfig();
    
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});


