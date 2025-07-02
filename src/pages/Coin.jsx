import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header'
import Loader from '../components/Common/Loader'
import { coinObject } from '../functions/convertObject'
import List from '../components/Dashboard/List'
import CoinInfo from '../components/Coin/Coininfo'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinprices'
import LineChart from '../components/Coin/Linechart'
import SelectDays from '../components/Coin/SelectDays'
import { settingChartData } from '../functions/SettingChartData'

function CoinPage() {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [coinData, setCoinData] = useState(null)
    const [days, setDays] = useState(365)
    const [chartData, setChartData] = useState({})

    useEffect(() => {
        if (id) {
            getData()
        }
    }, [id])

    async function getData() {
        try {
            setIsLoading(true)
            
            const data = await getCoinData(id)
            if (data) {
                coinObject(setCoinData, data)
                
                const prices = await getCoinPrices(id, days)
                if (prices && prices.length > 0) {
                    settingChartData(setChartData, prices)
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDaysChange = useCallback(async (event) => {
        const newDays = event.target.value
        
        setDays(newDays)
        setIsLoading(true)
        
        try {
            const prices = await getCoinPrices(id, newDays)
            
            if (prices && prices.length > 0) {
                settingChartData(setChartData, prices)
            }
        } catch (error) {
            console.error('Error fetching price data:', error)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    return (
        <div>
            <Header />
            {isLoading ? (
                <Loader />
            ) : (
                coinData && (
                    <>
                        <div className='grey-wrapper' style={{ padding: "0rem 1rem" }}>
                            <List coin={coinData} />
                        </div>
                        <div className='grey-wrapper'>
                            <SelectDays days={days} handleDaysChange={handleDaysChange} />
                            <LineChart chartData={chartData} />
                        </div>
                        <CoinInfo heading={coinData.name} desc={coinData.desc} />
                    </>
                )
            )}
        </div>
    )
}

export default CoinPage