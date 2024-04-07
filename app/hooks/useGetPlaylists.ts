'use client'

import { useEffect, useState } from "react";
import { playlistProp } from "../types";

export default function useGetPlaylist(token: string) {
    const [playlists, setPlayLists] = useState<playlistProp[]>([]);

    useEffect(() => {
        const fetchPlaylists = async() => {
            try{
                const response = await fetch('/api/getUserPlaylists',{
                    method: 'POST',
                    body: JSON.stringify(token)
                })
            
                if(!response.ok){
                    const error = await response.text();
                    console.log(error);
                }
            
                const data = await response.json();

                const albums:playlistProp[] = data;

                setPlayLists(albums);

            }catch(error){
                console.log(error)
            }
        }
        fetchPlaylists();
    },[])
    return {playlists: playlists}
}