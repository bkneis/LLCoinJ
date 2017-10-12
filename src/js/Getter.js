var Balance = {
    getView: function (vendor) {
        var viewInstance;
        App.contracts[vendor].deployed().then(function(instance) {
            viewInstance = instance;
            return viewInstance.getView.call(publicKey);
        }).then(function(view) {
            $(el).clear().append(view);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    get: function (vendor, walletAddress, callback) {
        var balanceInstance;
        App.contracts[vendor].deployed().then(function(instance) {
            balanceInstance = instance;
            return balanceInstance.get.call(walletAddress);
        }).then(function(balance) {
            callback(balance);
        }).catch(function(err) {
            console.log(err.message);
        });

    }
};