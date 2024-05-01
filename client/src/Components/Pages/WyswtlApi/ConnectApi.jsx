import React from 'react'

const ConnectApi =async()=>{
    return await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_rank_desc&per_page=100&page=1&sparkline=true')
     .then(res=>res.json())
 };

export default ConnectApi
