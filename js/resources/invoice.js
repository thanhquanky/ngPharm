var Invoice = $resource('/invoice/:invoiceId', {invoiceId:'@id'});
