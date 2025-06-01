import React from "react";
import numeral from "numeral";
let CurrencyFormat = ({ amount }) => {
  let formattedAmount = numeral(amount).format("$0,0.00");
  return <div>{formattedAmount}</div>;
};
export default CurrencyFormat;

