import { createCipheriv } from "crypto";
import { useState, useEffect } from "react";

export default function useGetFavoriteArtists(token: string) {
    const [artists, setAtrists] = useState(null);
    useEffect(() => {
        const fetchFavoriteArtists = async() => {
            try{
                const response = await fetch('/api/getUsersFavoriteArtits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(token)
                });

                if(!response.ok){
                    const error = await response.text();
                    console.log('error getting users favorite artists');
                    return;
                }
                const data = await response.json();
                setAtrists(data);
                

            }catch(error){
                console.log(error)
            }
        }
        fetchFavoriteArtists();
    },[])
    return{artists}
}