'use client'
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation'
import Search from "../componets/Search";
import React from "react";
import Playlist from "../componets/Playlist";
import FavoriteArtists  from "../componets/FavoriteArtists";

export default function Home() {

  const [token, setToken] = useState('');
  const [reFreshToken, setRefreshToken] = useState('')
  const [user, setUser] = useState(null);

  const search = useSearchParams();


  const handleclick = async() => {
    try{
      window.location.href = '/api/spotifyLogin';
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
      <div className="h-screen">
          <button onClick={handleclick} 
          className="h-[40px] w-60 bg-red-500">
            Give us Access
          </button>
      </div>
    )
  }

    return(
        <section className=" h-auto w-full gap-10 flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <Search
            token={token}
            user={user}/>

            <Playlist 
            token={token}
            user={user}/> 

            <FavoriteArtists 
            token={token}/>
          </Suspense>
{/* 
          <RandomSongs 
          token={token}/> */}
        </section>
    )
}