import React, { useEffect, useState } from 'react'
import { get100Coins } from '../../../functions/get100coin'
import Select from "@mui/material/Select"
import MenuItem  from '@mui/material/MenuItem'
import "./styles.css"
function SelectCoins({cryto1,cryto2,handleCoinChange}) {
    const [allCoins,setAllCoins]=useState([])
    const styles={
        height: "2.5rem",
          color: "var(--white)",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "var(--white)",
          },
          "& .MuiSvgIcon-root": {
            color: "var(--white)",
          },
          "&:hover": {
            "&& fieldset": {
              borderColor: "#3a80e9",
            },
          },
    }
    useEffect(()=>{
       getData()
    },[])
    async function getData(){
        const coins=await get100Coins()
        setAllCoins(coins)
    }
  return (
    <div className='coins-flex'>
        <p>Crypto 1</p>
        <Select
        sx={styles}
          value={cryto1}
          label="Crypto 1"
          onChange={(event)=>handleCoinChange(event,false)}
        >
            {allCoins.map((coin,i)=>(
            <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
            ))}
        </Select>
        <p>Crypto 2</p>
        <Select
        sx={styles}
          value={cryto2}
          label="Crypto 2"
          onChange={(event)=>handleCoinChange(event,true)}
        >
            {allCoins.map((coin,i)=>(
            <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
            ))}
        </Select>
    </div>
  )
}

export default SelectCoins