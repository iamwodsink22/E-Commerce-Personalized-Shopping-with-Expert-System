var CryptoJS=require('crypto-js')
var hash = CryptoJS.HmacSHA256("Message", "secret");
 var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
 console.log(hashInBase64)