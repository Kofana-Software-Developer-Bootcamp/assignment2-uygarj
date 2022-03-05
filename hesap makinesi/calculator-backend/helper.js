const axios = require("axios");

const requestCalculator = async (op, intA, intB) => {
  let data = `<?xml version="1.0" encoding="utf-8"?>\n<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">\n  <soap12:Body>\n    <${op} xmlns="http://tempuri.org/">\n      <intA>${intA}</intA>\n      <intB>${intB}</intB>\n    </${op}>\n  </soap12:Body>\n</soap12:Envelope>\n`;
  let config = {
    method: "post",
    url: "http://www.dneonline.com/calculator.asmx",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
    data: data,
  };
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.log("error");
  }
};

const xmlToJson = (xml, op) => {
  return xml.split(`<${op}Result>`).pop().split(`</${op}Result>`)[0];
};

module.exports = {
  requestCalculator,
  xmlToJson,
};
