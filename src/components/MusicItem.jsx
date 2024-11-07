import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context';
import { CLIENT_ID } from '../hook/useEnv';
import SpotifyWebApi from 'spotify-web-api-node';
import { useNavigate } from 'react-router-dom';

function MusicItem({ artistName }) {


  const { token, setPlay, setPlaying } = useContext(Context)
  const [tracksList, setTracksList] = useState([])

  const navigate = useNavigate()

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })


  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if (token) {
      spotifyApi.searchTracks(artistName).then(res => {
        setTracksList(res.body.tracks.items.map(item => {
          const data = {
            id: item.id,
            img: item.album.images[0].url,
            trackName: item.name,
            artistName: item.album.artists[0].name,
            uri: item.uri
          }
          return data
        }));
      })
    }
  }, [token])

  function handlePlay(item) {
    setPlay(item.uri)
    setPlaying(true)
    navigate(`/music/${item.id}`)
  }


  return (
    <div className=''>
      <h2 className='mb-[26px] font-bold text-[30px] text-white'>{artistName}</h2>
      <div className='flex justify-between gap-5  overflow-x-auto overflow-y-hidden'>
        {tracksList?.map(item => (
          <div onClick={() => handlePlay(item)} key={item.id} className="min-w-[225px] h-[320px] cursor-pointer p-[21px] rounded-[8px] bg-[#1B1B1B]">
            <img className='h-[182px] mb-[25px] rounded-[8px]' src={item.img} alt="Tracks img" width={"100%"} />
            <h2 className='text-white font-bold text-[20px] mb-2'>{item.trackName}</h2>
            <p className='font-normal text-[18px] text-white opacity-60'>{item.artistName}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicItem
