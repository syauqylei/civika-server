var md5 = require("md5");
const fetch = require("node-fetch");
let merchantCode = process.env.merchantCode;
let merchantKey = process.env.merchantKey;
let orderId = Math.round(Math.random() * 100000).toString();

module.exports = function payment(total, method) {
  let combination = merchantCode + orderId + total + merchantKey;
  let signature = md5(combination);
  let data = {
    merchantCode: merchantCode,
    paymentAmount: total,
    paymentMethod: method,
    merchantOrderId: orderId,
    signature: signature,
    expiryPeriod: 10,
  };
  return fetch("https://passport.duitku.com/webapi/api/merchant/v2/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) return response.json();
      else throw response;
    })
    .then((data) => {
      return data;
    })
    .catch((err) => err.json().then((body) => body));
};
