import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b-2 pb-4">
      <Link to="/home">
        <span className=' text-3xl font-bold'>Bit</span>
        <span className="text-yellow-500 text-3xl font-bold">Coin</span>
      </Link>
      <ul className="flex w-1/2 justify-evenly items-center font-bold">
      <li>
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li>
        <Link to="/exchanges" className="nav-link">Exchange</Link>
      </li>
      <li>
        <Link to="/coins" className="nav-link">Coins</Link>
      </li>
      </ul>
    </nav>
  
  );
};

export default Header;

//https://api.coingecko.com/api/v3/exchanges
//https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&page=1
