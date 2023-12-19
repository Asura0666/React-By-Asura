import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../main";
import ErrorCompo from "../ErrorCompo";
import Loader from "../Loader";
import Chart from "./Chart";

const CoinDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorCompo message={"Error While Fetching Coin"} />;

  return (
    <div className="container mx-auto">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="border p-4 mb-4">
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </div>

          <div className="flex p-4 overflow-x-auto">
            {btns.map((i) => (
              <button
                key={i}
                disabled={days === i}
                onClick={() => switchChartStats(i)}
                className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ${
                  days === i && "opacity-50 cursor-not-allowed"
                }`}
              >
                {i}
              </button>
            ))}
          </div>

          <div className="p-8">
            <div className="mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  value="inr"
                  checked={currency === "inr"}
                  onChange={() => setCurrency("inr")}
                />
                INR
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value="usd"
                  checked={currency === "usd"}
                  onChange={() => setCurrency("usd")}
                />
                USD
              </label>
              <label>
                <input
                  type="radio"
                  value="eur"
                  checked={currency === "eur"}
                  onChange={() => setCurrency("eur")}
                />
                EUR
              </label>
            </div>

            <div className="flex justify-between">
              <p className="text-sm opacity-70">
                Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
              </p>

              <img
                src={coin.image.large}
                className="w-16 h-16 object-contain"
                alt={coin.name}
              />
            </div>

            <div className="mt-4">
              <div className="mb-4">
                <p className="font-bold text-xl">{coin.name}</p>
                <p className="text-2xl">
                  {currencySymbol}
                  {coin.market_data.current_price[currency]}
                </p>
                <p className="text-sm">
                  {coin.market_data.price_change_percentage_24h > 0 ? (
                    <span className="text-green-500">↑</span>
                  ) : (
                    <span className="text-red-500">↓</span>
                  )}
                  {coin.market_data.price_change_percentage_24h}%
                </p>
              </div>

              <span className="bg-black text-white text-2xl p-2">{`#${coin.market_cap_rank}`}</span>

              <CustomBar
                high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
              />

              <div className="w-full p-4">
                <Item title="Max Supply" value={coin.market_data.max_supply} />
                <Item
                  title="Circulating Supply"
                  value={coin.market_data.circulating_supply}
                />
                <Item
                  title="Market Cap"
                  value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                />
                <Item
                  title="All Time Low"
                  value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                />
                <Item
                  title="All Time High"
                  value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Item = ({ title, value }) => (
  <div className="flex justify-between w-full my-4">
    <p className="font-bebas-neue">{title}</p>
    <p>{value}</p>
  </div>
);

const CustomBar = ({ high, low }) => (
  <div className="w-full">
    <div className="bg-teal-500 h-4"></div>
    <div className="flex justify-between w-full p-2">
      <span className="bg-red-500">{low}</span>
      <p className="text-sm">24H Range</p>
      <span className="bg-green-500">{high}</span>
    </div>
  </div>
);

export default CoinDetails;
