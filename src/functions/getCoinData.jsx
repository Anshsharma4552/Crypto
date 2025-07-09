import axios from "axios"

export const getCoinData = (id) => {
    const myData = axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
            console.log(`✅ Successfully fetched data for ${id}:`, response.data)
            return response.data
        })
        .catch((error) => {
            console.error(`❌ Error fetching data for ${id}:`, error)
            console.error('Error details:', error.response?.data || error.message)
            return null // Return null instead of undefined
        })
    return myData
}