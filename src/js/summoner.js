const axios = require('axios').default

module.exports = async (name, API_KEY) => {
    const summoner = await axios.get(
        `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${API_KEY}`
    )
    return summoner.data
}
