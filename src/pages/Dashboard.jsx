import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import axios from 'axios'
import TabsComponent from '../components/Dashboard/Tabs'
import Search from '../components/Dashboard/Search'
import PaginationComponent from '../components/Dashboard/Pagination'


function DashboardPage() {
    const [coins,setCoins]=useState([])
    const [paginatedcoins,setPaginatedCoins]=useState([])
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const handlePageChange=(event,value)=>{
        setPage(value)
        var previousindex=(value - 1)*10 
        setPaginatedCoins(coins.slice(previousindex,previousindex + 10))
    }
    const onSearchChange=(e)=>{
        setSearch(e.target.value)
    }
    var filteredCoins=coins.filter(
        (item)=>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.symbol.toLowerCase().includes(search.toLowerCase())
    )
    useEffect(()=>{
        // fetch('https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ids&names=names&symbols=symbols&category=category&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h')
        axios
        .get(
           "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
        .then((response)=>{
            setCoins(response.data)
            setPaginatedCoins(response.data.slice(0,10))
        })
        .catch((error)=>{
            console.log(Error)
        })
    },[])
    return (
    <div>
        <Header/>
        <Search search={search} onSearchChange={onSearchChange}/>
        <TabsComponent coins={search ? filteredCoins : paginatedcoins}/>
        {!search && (
            <PaginationComponent page={page} handlePageChange={handlePageChange}/>
        )}
    </div>
  )
}

export default DashboardPage