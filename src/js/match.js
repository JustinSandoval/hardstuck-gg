const axios = require('axios').default
const getSummonerData = require('./summoner')

module.exports = async (name, API_KEY) => {
    const summoner = await getSummonerData(name, API_KEY)
    const id = summoner.id

    const res = await axios.get(
        `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`
    )
    return res.data
}
