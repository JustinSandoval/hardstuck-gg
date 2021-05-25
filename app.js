const express = require('express')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const path = require('path')
const getQueueData = require('./src/js/queueRank')
const getSummonerData = require('./src/js/summoner')
const getMatchIds = require('./src/js/matchIds')
const { match } = require('assert')
const { default: axios } = require('axios')
require('dotenv').config()
const API_KEY = process.env.API_KEY

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/img', express.static(__dirname + '/images'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/lol/search', async (req, res) => {
    try {
        const { summoner } = req.query
        const queue = await getQueueData(summoner, API_KEY)
        const profile = await getSummonerData(summoner, API_KEY)
        const matchids = await getMatchIds(profile.puuid, API_KEY)
        // console.log(queue)
        // console.log(profile)
        // console.log(matchids)
        let match = []
        for (let m of matchids) {
            try {
                let idk = await axios.get(
                    `https://americas.api.riotgames.com/lol/match/v5/matches/${m}?api_key=${API_KEY}`
                )
                match.push(idk.data)
            } catch (e) {
                console.log(`${m} wasnt found`)
            }
        }

        console.log(match)

        res.render('search', { queue, profile, match })
    } catch (e) {
        console.dir(e)
    }
})

app.listen(3000, () => {
    console.log('Listening on 3000')
})
