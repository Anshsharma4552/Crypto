import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import axios from 'axios'
import TabsComponent from '../components/Dashboard/Tabs'
import Search from '../components/Dashboard/Search'
import PaginationComponent from '../components/Dashboard/Pagination'
import Loader from '../components/Common/Loader'
import BackToTop from '../components/Common/BackToTop'

function DashboardPage() {
    const [coins, setCoins] = useState([])
    const [paginatedcoins, setPaginatedCoins] = useState([])
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [retryCount, setRetryCount] = useState(0)

    const handlePageChange = (event, value) => {
        setPage(value)
        const previousindex = (value - 1) * 10
        setPaginatedCoins(coins.slice(previousindex, previousindex + 10))
    }

    const onSearchChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.symbol.toLowerCase().includes(search.toLowerCase())
    )

    const fetchCoins = async (attempt = 1) => {
        try {
            setIsLoading(true)
            setError(null)
            
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
                {
                    timeout: 10000, // 10 second timeout
                    headers: {
                        'Accept': 'application/json',
                    }
                }
            )
            
            setCoins(response.data)
            setPaginatedCoins(response.data.slice(0, 10))
            setRetryCount(0) // Reset retry count on success
            
        } catch (error) {
            console.error('API Error:', error)
            
            if (error.response) {
                // Server responded with error status
                if (error.response.status === 429) {
                    setError('Rate limit exceeded. Please wait a moment before refreshing.')
                } else if (error.response.status >= 500) {
                    setError('Server error. Please try again later.')
                } else {
                    setError(`API Error: ${error.response.status}`)
                }
            } else if (error.request) {
                // Network error
                setError('Network error. Please check your connection.')
                
                // Retry logic for network errors
                if (attempt < 3) {
                    console.log(`Retrying... (${attempt}/3)`)
                    setTimeout(() => {
                        setRetryCount(attempt)
                        fetchCoins(attempt + 1)
                    }, 2000 * attempt) // Exponential backoff
                    return
                }
            } else {
                setError('An unexpected error occurred.')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleRetry = () => {
        fetchCoins()
    }

    useEffect(() => {
        fetchCoins()
    }, [])

    // Error component
    const ErrorComponent = () => (
        <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            color: '#f44336',
            backgroundColor: '#ffebee',
            border: '1px solid #ffcdd2',
            borderRadius: '4px',
            margin: '20px'
        }}>
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            {retryCount > 0 && <p>Retry attempt: {retryCount}/3</p>}
            <button 
                onClick={handleRetry}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '10px'
                }}
            >
                Try Again
            </button>
        </div>
    )

    return (
        <>
            <Header />
            <BackToTop />
            {isLoading ? (
                <Loader />
            ) : error ? (
                <ErrorComponent />
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