import mongoose from 'mongoose';
import validator from 'validator';

import priceSchema from './price';
import exchangeRateSchema from './exchangeRate';

let paymentSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true,
        enum: ['BKASH', 'PAYPAL']
    },
    payment_id: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    amount_in_usd: {
        type: priceSchema,
        required: true
    },
    exchange_rate: {
        type: exchangeRateSchema,
        required: false
    },
    amount_in_payment_currency: {
        type: priceSchema,
        required: true
    }
}, {_id: false});

module.exports = paymentSchema;