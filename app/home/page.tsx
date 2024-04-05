'use client'
import { useState, useEffect } from "react";
import Search from "../componets/Search";
import { useSearchParams } from 'next/navigation'
import React from "react";


export default function Home({clientId, secret}: {clientId:string, secret: string}) {

  const [token, setToken] = useState('');
  const [reFreshToken, setRefreshToken] = useState('')

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

  if(!token || !reFreshToken){
    return (
      <div>
        Missing credentials view
      </div>
    )
  }

    return(
        <section>
          <Search
          token={token}/>
          <button 
          onClick={handleclick}
          className="h-[40px] w-60 bg-red-500">
            Give us Auth
          </button>
        </section>
    )
}