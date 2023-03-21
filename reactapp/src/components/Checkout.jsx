import React from 'react'
import { useBasket } from '../contexts/BasketContext';
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

export default function Checkout() 

{
   const { basketTotal, viewBasket, basketTotalPrice } = useBasket();

  return (
    <div>
      Checkout:
      {viewBasket()}
      <CurrencyFormat
        renderText={(value) => <h3>Order Total :{value}</h3>}
        decimalScale={2}
        value={basketTotalPrice()}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <div className="col">
        <Link to="/Shop">Return to Shop</Link>
      </div>
    </div>
  );
}
