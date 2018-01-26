var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  fullname: String,
  accessToken: String,
  "userId":String,
  "cartList":[{
      "productId": String,
      "productName": String,
      "productPrice": String,
      "productImg": String,
      "checked": String,
      "productNum": String,
  }],
});

module.exports = mongoose.model("User",userSchema);
