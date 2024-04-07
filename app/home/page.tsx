'use client'
import { useState, useEffect } from "react";
import Search from "../componets/Search";
import { useSearchParams } from 'next/navigation'
import React from "react";
import Playlist from "../Playlists/page";
import FavoriteArtists from "../FavoriteArtists/page";
import RandomSongs from "../RandomSongs/page";


export default function Home() {

  const [token, setToken] = useState('');
  const [reFreshToken, setRefreshToken] = useState('')
  const [user, setUser] = useState(null);

  const search = useSearchParams();


  const handleclick = async() => {
    try{
      try {
        window.location.href= '/api/spotifyLogin';
      } catch (error) {
        console.log(error);
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=> {
    const tokenSearch =() => {
      const foundToken = search.get('accessToken');
      const refreshToken = search.get('refreshToken');
      if(!foundToken || !refreshToken){
        console.log('missing one or more tokens');
        return
      }
      setToken(foundToken);
      setRefreshToken(refreshToken)
    }
    tokenSearch();
  },[search.values])

  useEffect(() => {
    const fetchUser = async() => {
      try{
        const response = await fetch('/api/getUser',{
          method: 'POST',
          body: JSON.stringify(token)
        })

        if(!response.ok){
          console.log('error fetching user');
          throw new Error('Error fetching user details');
        }

        const founduser = await response.json();

        setUser(founduser);

      }catch(error){
        console.log(error);
      }
    }
    fetchUser();
  },[token])

  if(!token || !reFreshToken || !user){
    return (
      <div>
          <button onClick={handleclick} 
          className="h-[40px] w-60 bg-red-500">
            Give us Access
          </button>
      </div>
    )
  }

    return(
        <section className=" h-auto w-full gap-10 flex flex-col">
          <Search
          token={token}
          user={user}/>

          <Playlist 
          token={token}
          user={user}/> 

          <FavoriteArtists 
          token={token}/>
{/* 
          <RandomSongs 
          token={token}/> */}
        </section>
    )
}