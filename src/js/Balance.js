var Balance = {
    // getView: function (vendor) {
    //     web3.eth.getAccounts(function(error, accounts) {
    //         var viewInstance;
    //         var account = accounts[0];
    //         App.contracts[vendor].deployed().then(function (instance) {
    //             viewInstance = instance;
    //             return viewInstance.getView.call({ from: account });
    //         }).then(function (view) {
    //             $(el).clear().append(view);
    //         }).catch(function (err) {
    //             console.log(err.message);
    //         });
    //     });
    // },
    get: function (vendor, callback) {
        web3.eth.getAccounts(function(error, accounts) {
            var balanceInstance;
            var account = accounts[0];
            App.contracts[vendor].deployed().then(function (instance) {
                balanceInstance = instance;
                return balanceInstance.get.call(App.llCoin, { from: account });
            }).then(function (balance) {
                $('#balance-' + vendor).text(balance);
                callback(balance);
            }).catch(function (err) {
                console.log(err.message);
            });
        });

    }
};