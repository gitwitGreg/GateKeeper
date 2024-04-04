'use client'
import { useState, useEffect } from "react";
import Search from "../componets/Search";
import { useSearchParams } from 'next/navigation'


export default function Home({clientId, secret}: {clientId:string, secret: string}) {

  const [token, setToken] = useState('');
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

  useEffect(() => {
    const getToken = async() => {
      const code = search.get('code');
      const state = search.get('state');

      const tokenObj = {
        code: code,
        state: state
      }
      console.log({tokenObj})
      if(code && state){
        const response = await fetch('/api/spotifyToken', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tokenObj)
        })
        if(response.ok){
          const data = await response.json();
          const accessToken = data.accessToken
          const refreshToken = data.refreshToken
          //console.log({accessToken, refreshToken});
        }else{
          console.log('bad req');
        }
      }
    }
    getToken();

  },[search.values])


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