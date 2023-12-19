import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../main";
import Loader from "../Loader";
import ErrorCompo from "../ErrorCompo";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coinsData, setCoinsData] = useState({
    coins: [],
    isLoading: true,
    isError: false,
    page: 1,
    currency: "inr",
  });

  const [selectedCurrency, setSelectedCurrency] = useState(coinsData.currency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${coinsData.currency}&page=${coinsData.page}`
        );
        setCoinsData((prevData) => ({
          ...prevData,
          coins: data,
          isLoading: false,
        }));
      } catch (error) {
        setCoinsData((prevData) => ({
          ...prevData,
          isLoading: false,
          isError: true,
        }));
      }
    };
    fetchData();
  }, [selectedCurrency, coinsData.page]);

  const currencySymbol =
    coinsData.currency === "inr"
      ? "₹"
      : coinsData.currency === "eur"
      ? "€"
      : "$";

  const changePage = (page) => {
    setCoinsData((prevData) => ({
      ...prevData,
      isLoading: true,
      page: page,
    }));
  };

  const btns = new Array(132).fill(1);
  const handleCurrency = (e) => {
    setSelectedCurrency(e.target.value);
    setCoinsData((prevData) => ({
      ...prevData,
      currency: e.target.value,
    }));
    console.log(coinsData);
  };

  return (
    <div>
      {coinsData.isLoading ? (
        <Loader />
      ) : coinsData.isError ? (
        <ErrorCompo message={"Error While Fetching Coins"} />
      ) : (
        <div>
          <div className="flex mx-12 my-4 w-1/4 justify-between">
            <label>
              <input
                type="radio"
                value="inr"
                checked={selectedCurrency === "inr"}
                onChange={handleCurrency}
              />
              INR
            </label>
            <label>
              <input
                type="radio"
                value="usd"
                checked={selectedCurrency === "usd"}
                onChange={handleCurrency}
              />
              USD
            </label>
            <label>
              <input
                type="radio"
                value="eur"
                checked={selectedCurrency === "eur"}
                onChange={handleCurrency}
              />
              EUR
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mx-auto justify-items-center mb-12">
            {coinsData.coins.map((item) => (
              <CoinCard
                id={item.id}
                key={item.id}
                name={item.name}
                price={item.current_price}
                img={item.image}
                symbol={item.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </div>

          <div className="overflow-x-hidden">
            <div className="flex w-full p-8 hideScroll overflow-auto">
              {btns.map((item, index) => (
                <button
                  key={index}
                  className="bg-black bg-opacity-90 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coins;
