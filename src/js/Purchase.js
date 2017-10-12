var vendors = ['Coffee', 'Shoes'];

/*---------------------
    purchase function
-----------------------*/
Purchase = {
    purchase: function() {
	var LLCoinJInstance;

	//get user accounts
	web3.eth.getAccounts(function(err, accounts) {
		if (err)
			console.log(err);
		else {
            //get user account
			var userAccount = accounts[0];
                App.contracts.vendors.deployed().then(function(instance) {			
				//set instance
                LLCoinJ = instance;
                //run contract purchase function
                return LLCoinJInstance.purchase({from: account});
            }).then(function(result) {
                App.getView();  //update view
                return App.get();
            }).catch(function(err)) {
                console.log(err.message);
            });
		}
	});
};
