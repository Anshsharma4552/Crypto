import React,{useState , useEffect} from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'
import { coinObject } from '../functions/convertObject'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinprices'
import Loader from '../components/Common/Loader'
import List from '../components/Dashboard/List'
import CoinInfo from '../components/Coin/Coininfo'

function ComparePage() {
    const [crypto1,setCrypto1]=useState("bitcoin")
    const [crypto2,setCrypto2]=useState("ethereum")
    const [crypto1Data,setCrypto1Data]=useState(null)
    const [crypto2Data,setCrypto2Data]=useState(null)
    const[isLoading,setIsLoading]=useState(true)
    const [days,setDays]=useState(30)
    const [priceType,setPricesType]=useState("prices")

    function handleDaysChange(event){
        setDays(event.target.value)
    }

    useEffect(()=>{
        getData()
    },[])

    async function getData(){
        try{
            setIsLoading(true)
            console.log('=== getData called ===')
            console.log('Fetching data for crypto1:', crypto1)
            console.log('Fetching data for crypto2:', crypto2)
            
            const data1 = await getCoinData(crypto1)
            console.log('Raw data1 received:', data1)
            
            const data2 = await getCoinData(crypto2)
            console.log('Raw data2 received:', data2)
            
            if (data1) {
                console.log('Processing data1 with coinObject...')
                coinObject(setCrypto1Data, data1)
            } else {
                console.error('No data1 received for:', crypto1)
            }
            
            if (data2) {
                console.log('Processing data2 with coinObject...')
                coinObject(setCrypto2Data, data2)
            } else {
                console.error('No data2 received for:', crypto2)
            }
            
            // Optional: Fetch prices
            if(data1 && data2){
                console.log('Fetching prices...')
                const prices1 = await getCoinPrices(crypto1, days, priceType)
                const prices2 = await getCoinPrices(crypto2, days, priceType)
                console.log('Prices1:', prices1)
                console.log('Prices2:', prices2)
            }
            
        }catch (error) {
            console.error('Error in getData:', error)
        }finally {
            setIsLoading(false)
        }
    }

    const handleCoinChange = async (event, isCoin2) => {
        const newCoinValue = event.target.value
        console.log('=== handleCoinChange called ===')
        console.log('New coin value:', newCoinValue)
        console.log('Is coin2?', isCoin2)
        
        setIsLoading(true)
        
        try {
            if(isCoin2){
                console.log('Changing crypto2 to:', newCoinValue)
                setCrypto2(newCoinValue)
                
                // Fetch new coin2 data
                const data2 = await getCoinData(newCoinValue)
                console.log('New data2 received:', data2)
                
                if (data2) {
                    coinObject(setCrypto2Data, data2)
                    console.log('crypto2Data should be updated now')
                } else {
                    console.error('Failed to get data for coin:', newCoinValue)
                }
                
            } else {
                console.log('Changing crypto1 to:', newCoinValue)
                setCrypto1(newCoinValue)
                
                // Fetch new coin1 data
                const data1 = await getCoinData(newCoinValue)
                console.log('New data1 received:', data1)
                
                if (data1) {
                    coinObject(setCrypto1Data, data1)
                    console.log('crypto1Data should be updated now')
                } else {
                    console.error('Failed to get data for coin:', newCoinValue)
                }
            }
            
        } catch (error) {
            console.error('Error in handleCoinChange:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Debug: Log current state
    console.log('Current render state:')
    console.log('- isLoading:', isLoading)
    console.log('- crypto1:', crypto1, 'crypto1Data:', crypto1Data)
    console.log('- crypto2:', crypto2, 'crypto2Data:', crypto2Data)

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className='coins-days-flex'>
                        <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange}/>
                        <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true}/>
                    </div>
                    
                    {/* Show crypto1 data */}
                    {crypto1Data ? (
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={crypto1Data} />
                        </div>
                    ) : (
                        <div>No data for {crypto1}</div>
                    )}
                    
                    {/* Show crypto2 data */}
                    {crypto2Data ? (
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={crypto2Data} />
                        </div>
                    ) : (
                        <div>No data for {crypto2}</div>
                    )}
                    
                    {/* Show crypto1 info */}
                    {crypto1Data && crypto1Data.name && crypto1Data.desc ? (
                        <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
                    ) : (
                        <div>No info available for {crypto1}</div>
                    )}
                    
                    {/* Show crypto2 info */}
                    {crypto2Data && crypto2Data.name && crypto2Data.desc ? (
                        <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
                    ) : (
                        <div>No info available for {crypto2}</div>
                    )}
                </>
            )}
        </div>
    )
}

export default ComparePage