const axios = require('axios').default

module.exports = async (puuid, API_KEY) => {
    const res = await axios.get(
        `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${API_KEY}`
    )
    return res.data
}
