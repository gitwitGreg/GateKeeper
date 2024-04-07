import { useEffect, useState } from "react";

export default function useGetRandomSongs(token: string) {

    const [randomSongs, setRandomSongs] = useState(null)
    
    useEffect(() => {
        const  fetchRandomSongs = async() => {
            try{
                const response = await fetch('/api/getRandomSongs',{
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(token)
                })
                
                if(!response.ok){
                    console.log('error getting  random songs');
                    return;
                }
                const data = await response.json();

                console.log(data);

                setRandomSongs(data);

            }catch(error){
                console.log(error)
            }
        }
        fetchRandomSongs()
    },[])
    return{randomSongs}
}