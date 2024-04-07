import { createCipheriv } from "crypto";
import { useState, useEffect } from "react";
import { topTrackProp } from "../types";

export default function useGetFavoriteArtists(token: string) {
    const [topTracks, setTopTracks] = useState<topTrackProp[] | null> (null);
    useEffect((): void => {
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
                    console.log('error getting users favorite artists');
                    return;
                }

                const data = await response.json();
                setTopTracks(data);
                return;
            }catch(error){
                console.log(error)
            }
        }
        fetchFavoriteArtists();
    },[])
    return{topTracks}
}