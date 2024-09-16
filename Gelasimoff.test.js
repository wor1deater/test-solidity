const { expect } = require("chai")
const { ethers } = require("hardhat")


describe("Gelasimoff", function () {
    let acc1, acc2, acc3, gelasimoff


    beforeEach(async function () {
        [acc1, acc2, acc3] = await ethers.getSigners()
        Gelasimoff = await ethers.getContractFactory("Gelasimoff", acc1)
        gelasimoff = await Gelasimoff.deploy([acc1.address, acc2.address, acc3.address])
        await gelasimoff.deployed
    })

    //it("deployed", async function() {})

    it("empty address list", async function() {
        await expect(
            Gelasimoff.deploy([])
          ).to.be.revertedWith("Address list is empty");
    })

    it("too many addresses", async function() {

        const accounts = [];
        for (let i = 0; i < 11; i++) {
            accounts.push(ethers.Wallet.createRandom().address);
        }

        await expect(
            Gelasimoff.deploy(accounts)
          ).to.be.revertedWith("Too many addresses");
    })

    it("tokens distributed", async function() {
        expect(await gelasimoff.totalSupply()).to.equal(300000n * 10n ** 18n);
        expect(await gelasimoff.balanceOf(acc1.address)).to.equal(100000n * 10n ** 18n);
        expect(await gelasimoff.balanceOf(acc2.address)).to.equal(100000n * 10n ** 18n);
        expect(await gelasimoff.balanceOf(acc3.address)).to.equal(100000n * 10n ** 18n);
    })

    it("owner mint tokens within the total supply limit", async function() {
        await gelasimoff.mint(500000n * 10n ** 18n, acc1.address);
        expect(await gelasimoff.balanceOf(acc1.address)).to.equal(600000n * 10n ** 18n);
        
        await expect(
            gelasimoff.mint(500000n * 10n ** 18n, acc1.address)
        ).to.be.revertedWith("Cannot mint");
    });

    it("non-owner mint tokens", async function() {
        await expect(
            gelasimoff.connect(acc2).mint(1000n * 10n ** 18n, acc2.address)
        ).to.be.reverted;
    });

    
})