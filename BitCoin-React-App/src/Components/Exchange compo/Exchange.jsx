import React, { useEffect, useState } from "react";
import { server } from "../../main";
import Loader from "../Loader";
import ErrorCompo from "../ErrorCompo";
import axios from "axios";

const Exchange = () => {
  const [exchangeData, setExchangeData] = useState({
    data: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchangeData((prevData) => ({
          ...prevData,
          data: data,
          isLoading: false,
        }));
      } catch (error) {
        setExchangeData((prevData) => ({
          ...prevData,
          isLoading: false,
          isError: true,
        }));
      }
    };
    fetchData();
  }, []);
  console.log(exchangeData);
  exchangeData.isError ? (
    <ErrorCompo message={"Error While Fetching Exchanges"} />
  ) : (
    ""
  );

  return (
    <div className="overflow-hidden flex justify-center items-center mx-8">
      {exchangeData.isLoading ? (
        <Loader />
      ) : exchangeData.isError ? (
        <ErrorCompo message={"Error While Fetching Exchanges"} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 mx-auto justify-items-center mb-12">
          {
            exchangeData.data.map((item) => (
              <ExchangeCard
                key={item.id}
                name={item.name}
                rank={item.trust_score_rank}
                img={item.image}
                url={item.url}
              />
            ))
          }
        </div>
      )}

    </div>
  );
};

const ExchangeCard = ({ name, rank, img, url }) => {
  return (
    <div className="shadow-sm hover:shadow-md hover:shadow-gray-500 shadow-gray-600 w-8/12 flex justify-center items-center mx-4 mt-16 ">
      <a href={url} className="flex flex-col justify-center items-center py-2">
        <img src={img} />
        <div className="font-bold mt-2">{rank}</div>
        <div className="font-bold mb-2">{name}</div>
      </a>
    </div>
  );
};

export default Exchange;
