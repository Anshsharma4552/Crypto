import React from 'react'
import "./style.css"
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
function List({coin}) {
  return (
    <tr className='list-row'>
         <td className='td-image'>
            <img src={coin.image} className='coin-logo'/>
            </td>
            <td>
            <div className='name-col'>
                <p className='coin-symbol'>{coin.symbol}</p>
                <p className='coin-name'>{coin.name}</p>
            </div>
        </td>
        {coin.price_change_percentage_24h > 0 ?(
        <td className='chip-flex'>
                <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip'>
                    <TrendingUpIcon/>
                </div>
        </td>):(
            <td className='chip-flex'>
                <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                <div className='icon-chip chip-red'>
                    <TrendingDownIcon/>
                </div>
            </td>
        )}
        <td>
            <h3 className='coin-price' style={{color:coin.price_change_percentage_24h < 0 ? "var(--red)":"var(--green)"  }}>${coin.current_price.toLocaleString()}
            </h3>
        </td>
        <td>
            <p className='total_volume'>{coin.total_volume.toLocaleString()}
            </p>
        </td>
        <td>
            <p className='total_volume'>${coin.market_cap.toLocaleString()}</p>
        </td>
    </tr>
  )
}

export default List