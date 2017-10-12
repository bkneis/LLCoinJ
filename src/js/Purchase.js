/*---------------------
    purchase function
-----------------------*/
Purchase = {
    purchase: function(vendor) {
        console.log("purchase()")
        var CoffeeInstance;

        //get user accounts
        web3.eth.getAccounts(function(err, accounts) {
            if (err)
                console.error('getting acouns', err);
            else {
                //get user account
                var userAccount = accounts[0];
                    console.log('vend', vendor);
                    App.contracts[vendor].deployed().then(function(instance) {
                        //set instance
                        CoffeeInstance = instance;
                        //run contract purchase function
                        return CoffeeInstance.purchase(App.llCoin, userAccount);
                }).then(function(result) {
                    App.getView();  //update view
                    return App.get();
                }).catch(function(err) {
                    console.log('doing ourhc', err.message);
                });
            }
        });
    }
};
