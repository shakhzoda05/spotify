import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import Laoding from "../../assets/images/loading.png"
import { Context } from '../../context/Context';
import SpotifyWebApi from 'spotify-web-api-node';
import { CLIENT_ID } from '../../hook/useEnv';
import Back from "../../assets/images/Back.svg"
import Forward from "../../assets/images/forward.svg"


const MusicItem = lazy(() => new Promise(resolve => {
  return setTimeout(() => {
    resolve(import("../../components/MusicItem"))
  }, 1000);
}))

function Home() {
  const { token } = useContext(Context)
  const [trendMusicList, setTrendMusicList] = useState([])

  const spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID
  })

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token)
  }, [token])

  useEffect(() => {
    if (token) {
      spotifyApi.searchAlbums("Miyagi").then(res => {
        setTrendMusicList(res.body.albums.items.splice(0, 6).map(item => {
          const data = {
            id: item.id,
            img: item.images[0].url,
            trackName: item.name,
            artistName: item.artists[0].name,
            uri: item.uri
          }
          return data
        }));
      })
    }
  }, [token])

  return (
    <Suspense fallback={<img className='absolute inset-0 m-auto' src={Laoding} alt='loading img' width={120} height={120} />} >
      <div className=" w-[105px] mt-5 ml-5 flex items-center justify-between">
        <img className='cursor-pointer' src={Back} alt="back img" width={40} height={40} />
        <img className='cursor-pointer' src={Forward} alt="forward img" width={40} height={40} />

      </div>
      <div className='p-5'>
        <h2 className='font-bold text-white text-[40px] mt-[20px]'>Good afternoon</h2>
        <ul className='flex flex-wrap justify-between mt-[25px] mb-[50px] gap-y-4 gap-x-[30px]'>

          {trendMusicList.map(item => (
            <li className='flex items-center gap-5 w-[48%] home-bg rounded-md overflow-hidden' key={item.id} >
              <img className='h-[82px]' src={item.img} alt="img" width={82} height={82} />
              <h3 className='font-bold text-[23px] text-white'>{item.trackName}</h3>
            </li>
          ))}
        </ul>
        <div className="space-y-[50px]">
          <MusicItem artistName={"Janaga"} />
          <MusicItem artistName={"Xcho"} />
          <MusicItem artistName={"Hamdam Sobirov"} />
          <MusicItem artistName={"Rauf&Faik"} />
          <MusicItem artistName={"Shahzoda"} />
        </div>

      </div>
    </Suspense>
  )
}

export default Home
