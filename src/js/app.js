var vendors = [];

App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../products.json', function(data) {
      var productRow = $('#productRow');
      var productTemplate = $('#productTemplate');

      var walletRow = $('#wallet');
      var walletTemplate = $('#walletTemplate');

      for (i = 0; i < data.length; i ++) {
        vendors.push(data[i].vendor);
        productTemplate.find('.panel-title').text(data[i].name);
        productTemplate.find('img').attr('src', data[i].picture);
        productTemplate.find('.price').text(data[i].price);
        productTemplate.find('.btn-purchase').attr('data-vendor', data[i].vendor).attr('data-price', data[i].price);

        productRow.append(productTemplate.html());

        walletTemplate.find('.balance').html('<strong>' + data[i].vendor + ':</strong> Number of purchases until your next freebie is <span id="balance-' + data[i].vendor + '"></span>');
        walletRow.append(walletTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
      // Is there is an injected web3 instance?
      if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);
      } else {
          // If no injected web3 instance is detected, fallback to the TestRPC.
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
          web3 = new Web3(App.web3Provider);
      }

    return App.initContract();
  },

  initContract: function() {
      for (var i in vendors) {
          if (vendors.hasOwnProperty(i)) {
              $.getJSON(vendors[i] + '.json', function(data) {
                  console.log('Adding the contract for vendor ', vendors[i]);
                  // Get the necessary contract artifact file and instantiate it with truffle-contract.
                  var artifact = data;
                  App.contracts[vendors[i]] = TruffleContract(artifact);

                  // Set the provider for our contract.
                  App.contracts[vendors[i]].setProvider(App.web3Provider);

                  // Use our contract to get the loyalty balance
                  //Balance.get(vendors[i]);
              });
          }
      }

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-purchase', Purchase.purchase());
  },

  markAdopted: function(adopters, account) {
        var adoptionInstance;

      App.contracts.Adoption.deployed().then(function(instance) {
          adoptionInstance = instance;

          return adoptionInstance.getAdopters.call();
      }).then(function(adopters) {
          for (i = 0; i < adopters.length; i++) {
              if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                  $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
              }
          }
      }).catch(function(err) {
          console.log(err.message);
      });
  },

  handleAdopt: function() {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    /*
     * Replace me...
     */
      var adoptionInstance;

      web3.eth.getAccounts(function(error, accounts) {
          if (error) {
              console.log(error);
          }

          var account = accounts[0];

          App.contracts.Adoption.deployed().then(function(instance) {
              adoptionInstance = instance;

              return adoptionInstance.adopt(petId, {from: account});
          }).then(function(result) {
              return App.markAdopted();
          }).catch(function(err) {
              console.log(err.message);
          });
      });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
