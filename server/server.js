const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require("spotify-web-api-node")
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    clientId: "fbbd938899474e458fde2f40f77e3e92",
    clientSecret: "c9d72ae916f24d208a5ce6ce61d6ff6b",
    redirectUri: "http://localhost:5173",
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch(err => {
    res.sendStatus(400)
  })
})

app.listen(3001)