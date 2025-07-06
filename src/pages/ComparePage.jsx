import React,{useState , useEffect} from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'
import { coinObject } from '../functions/convertObject'
import { getCoinData } from '../functions/getCoinData'
import { getCoinPrices } from '../functions/getCoinprices'
import Loader from '../components/Common/Loader'
function ComparePage() {
    const [cryto1,setCrypto1]=useState("bitcoin")
    const [cryto2,setCrypto2]=useState("ethereum")
    const [cryto1Data,setCrypto1Data]=useState()
    const [cryto2Data,setCrypto2Data]=useState()
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
        const data1 = await getCoinData(cryto1)
        const data2 = await getCoinData(cryto2)
        if (data1) {
            coinObject(setCrypto1Data, data1)
            }
        if (data2) {
            coinObject(setCrypto2Data, data2)
        }
        if(data1&&data2){
            const prices1 = await getCoinPrices(cryto1, days,"prices")
            const prices2 = await getCoinPrices(cryto2, days,"prices")
                if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
                    // settingChartData(setChartData, prices)
                    console.log("Both fetched",prices1,prices2)
                }
        }
    }catch (error) {
        console.error('Error fetching data:', error)
    }finally {
        setIsLoading(false)
    }
}
const handleCoinChange= async (event,isCoin2)=>{
    if(isCoin2){
        setCrypto2(event.target.value)
        try {
            setIsLoading(true)
            const data = await getCoinData(event.target.value)
            coinObject(setCrypto2Data, data)    
        } catch (error) {
                    console.error('Error fetching data:', error)
        } finally {
            setIsLoading(false)
        }
}else{
        setCrypto1(event.target.value)
        try {
            setIsLoading(true)
            const data = await getCoinData(event.target.value)
            coinObject(setCrypto1Data, data)
        } catch (error) {
                    console.error('Error fetching data:', error)
        } finally {
                    setIsLoading(false)
        }
    }
    const prices1=await getCoinPrices(cryto1,days,priceType)
    const prices2=await getCoinPrices(cryto2,days,priceType)
    if (prices1 && prices1.length > 0 && prices2 && prices2.length > 0) {
        // settingChartData(setChartData, prices)
        console.log("Both fetched",prices1,prices2)
        setIsLoading(false)
    }
}
  return (
    <div>
        <Header />
            {isLoading ? (
                <Loader />
            ) : (
        <div className='coins-days-flex'>
        <SelectCoins cryto1={cryto1}   cryto2={cryto2} handleCoinChange={handleCoinChange}/>
        <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true}/>
        </div>)
}
    </div>
  )
}

export default ComparePage