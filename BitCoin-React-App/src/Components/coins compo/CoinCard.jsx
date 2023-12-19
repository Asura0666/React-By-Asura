import React from 'react'
import { Link } from 'react-router-dom'

const CoinCard = ({id, name, img, symbol, price, currencySymbol = "₹"}) => {
  return (
    <div className='shadow-sm hover:shadow-md hover:shadow-gray-500 shadow-gray-600 w-8/12 flex justify-center items-center my-8 px-4 py-4'>
      <Link className='flex flex-col justify-center items-center' to={`/coin/${id}`}>
        <img className='w-16' src={img} alt='coinPng'/>
        <p>{symbol}</p>
        <p>{name}</p>
        <p>{price? `${currencySymbol}${price}` : "NA"}</p>
      </Link>
    </div>
  )
}

export default CoinCard