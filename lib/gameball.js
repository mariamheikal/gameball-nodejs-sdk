let helpers=require('./utils/helpers');

let Player=require('./resources/Player');
let Actions=require('./resources/Actions');
let Coupon=require('./resources/Coupon');
let Events=require('./resources/Events');
let Referral=require('./resources/Referral');
let Transactions=require('./resources/Transactions');




class Gameball {
    constructor(apiKey, transactionKey){
        if(apiKey!==undefined){
            helpers.setUp({'apiKey':apiKey})
        }
        if(transactionKey!==undefined){
            helpers.setUp({'transactionKey': transactionKey})
        }
        helpers.classBinder(Player, this),
        helpers.classBinder(Actions, this),
        helpers.classBinder(Coupon, this),
        helpers.classBinder(Events, this),
        helpers.classBinder(Referral, this),
        helpers.classBinder(Transactions, this)

    }
}
Gameball.prototype.setUp = function(options){
    helpers.setUp(options)
}

Gameball.prototype.language = {
    'English': 'en',
    'Arabic': 'ar',
    'French': 'fr',
    'Spanish': 'es',
    'German': 'de',
    'Portuguese': 'pt',
    'Polish': 'pl',
    'Italian': 'it'
}

module.exports = Gameball