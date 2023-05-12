const mongoose = require("mongoose");
 const userSchema = new mongoose.Schema(
   {
     email: {
       type: String,
       required: true,
     },
     password: {
       type: String,
       required: true,
     },
     userName: {
       type: String,
       required: true,
     },
     userImg: {
       type: String,
       default:
         "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
     },
     isBanned: {
       type: Boolean,
       default: false,
     },
     isUser: {
       type: Boolean,
       default: true,
     },
     isVerified: {
       type: Boolean,
       default: false,
     },
   },
   { timestamps: true }
 );

module.exports = User = mongoose.model("User", userSchema); 