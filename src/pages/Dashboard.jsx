import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import axios from 'axios'
import TabsComponent from '../components/Dashboard/Tabs'
import Search from '../components/Dashboard/Search'
import PaginationComponent from '../components/Dashboard/Pagination'
import Loader from '../components/Common/Loader'
import BackToTop from '../components/Common/BackToTop'
import { get100Coins } from '../functions/get100coin'

function DashboardPage() {
    const [coins, setCoins] = useState([])
    const [paginatedcoins, setPaginatedCoins] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const handlePageChange = (event, value) => {
        setPage(value)
        var previousindex = (value - 1) * 10
        setPaginatedCoins(coins.slice(previousindex, previousindex + 10))
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value)
    }

    var filteredCoins = coins.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.symbol.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)
            setError(null)
            
            const response = await get100Coins()
            console.log('API Response:', response) // Debug log
            
            if (response && response.data) {
                setCoins(response.data)
                setPaginatedCoins(response.data.slice(0, 10))
            } else if (response && Array.isArray(response)) {
                // If response is directly an array
                setCoins(response)
                setPaginatedCoins(response.slice(0, 10))
            } else {
                throw new Error('Invalid response format')
            }
        } catch (err) {
            console.error('Error fetching coins:', err)
            setError(err.message || 'Failed to fetch coins')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={getData}>Retry</button>
                </div>
            ) : (
                <div>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : paginatedcoins} />
                    {!search && (
                        <PaginationComponent page={page} handlePageChange={handlePageChange} />
                    )}
                </div>
            )}
        </>
    )
}

export default DashboardPage