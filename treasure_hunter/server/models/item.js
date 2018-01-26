const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: Number,
  productName: String,
  productPrice: Number,
  productNum: Number,
  soldBy: String,
  checked: String,
  productImg: String,
  auction: {
    isAuction: Boolean,
    expire: { type: Date, default: Date.now },
    winningBidBy: { type: String, default: '' },
  },
  productDescription: { type: String, default: '' },
});

module.exports = mongoose.model('Item', productSchema);
