import React,{useState} from 'react'
import Header from '../components/Common/Header'
import SelectCoins from '../components/Compare/SelectCoins'
import SelectDays from '../components/Coin/SelectDays'

function ComparePage() {
    const [cryto1,setCrypto1]=useState("bitcoin")
    const [cryto2,setCrypto2]=useState("ethereum")
    const [days,setDays]=useState(30)
function handleDaysChange(event){
    setDays(event.target.value)
}
  return (
    <div>
        <Header/>
        <div className='coins-days-flex'>
        <SelectCoins cryto1={cryto1}  setCrypto1={setCrypto1} cryto2={cryto2} setCrypto2={setCrypto2}/>
        <SelectDays days={days} handleDaysChange={handleDaysChange} noPTag={true}/>
        </div>
    </div>
  )
}

export default ComparePage