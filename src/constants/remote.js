const params = {
  clientid: "AR4TrBFjmuxRGYLeEaTvviA1jbehG5N9",
  appid: "reacthue",
  response_type: "code",
  deviceid: "52eb92e3-4488-4d8d-853c-2c747f878f88",
  state: "6c981565-c346-4a2f-a569-0647a134bfa7"
};


var str = "";
for (var key in params) {
  if (str !== "") {
    str += "&";
  }
  str += key + "=" + encodeURIComponent(params[key]);
}

export default str;
