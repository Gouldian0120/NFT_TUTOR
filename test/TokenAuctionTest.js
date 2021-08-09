describe("createAuction", () => {
    let nft, auctionContract, tokens;
  
    before(async () => {
      nft = await GradientToken.new();
      auctionContract = await TokenAuction.new(nft.address);
  
      await nft.mint("#ff00dd", "#ddddff");
      tokens = await nft.tokensOf(accounts[0]);
  
      await nft.approve(auctionContract.address, tokens[0]);
      await auctionContract.createAuction(tokens[0], 100);
    });
  
    it("Should take ownership of a token", async () => {
      const tokenOwner = await nft.ownerOf(tokens[0]);
      assert.equal(tokenOwner, auctionContract.address);
    });
  
    it("Should create new auction", async () => {
      const auction = await auctionContract.tokenIdToAuction(tokens[0]);
      assert.equal(auction[0], accounts[0]);
      assert.equal(auction[1].toNumber(), 100);
    });
  });