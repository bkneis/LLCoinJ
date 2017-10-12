$.getJSON('../products.json', function(data) {
    var productRow = $('#productRow');
    var productTemplate = $('#productTemplate');

    var walletRow = $('#wallet');
    var walletTemplate = $('#walletTemplate');

    for (i = 0; i < data.length; i ++) {
        productTemplate.find('.panel-title').text(data[i].name);
        productTemplate.find('img').attr('src', data[i].picture);
        productTemplate.find('.price').text(data[i].price);
        productTemplate.find('.btn-purchase').attr('data-vendor', data[i].vendor).attr('data-price', data[i].price);

        productRow.append(productTemplate.html());

        walletTemplate.find('.balance').html('<strong>' + data[i].vendor + ':</strong> Number of purchases until your next freebie is <span id="balance-' + data[i].vendor + '"></span>');
        walletRow.append(walletTemplate.html());
    }
});

var coffee = 0;
var shoes = 0;
var cider = 0;

$('.btn-purchase').on('click', function(event) {
    if ($(this).data('vendor') === 'coffee') {
        coffee--;
    }
    if ($(this).data('vendor') === 'shoes') {
        shoes--;
    }
});

