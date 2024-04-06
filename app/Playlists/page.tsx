import { useState, useEffect } from "react";
import { playlistTokenProp } from "../types";
import useGetPlaylist from "../hooks/useGetPlaylists";
import { playlistProp } from "../types";
import Image from "next/image";
import Link from "next/link";



export default function Playlist ({token, user}: playlistTokenProp) {
    const  { playlists }  : { playlists: playlistProp[] }  = useGetPlaylist(token);
    
    if(!playlists){
        return(
            <div>
                No user Playlists
            </div>
        )
    }

    return(
        <section>
            <div className="h-full w-full flex flex-wra gap-10">
                {playlists.map((playlists) => (
                    <div key={playlists.id} className="gap-4 flex flex-col items-center">
                        <img 
                        src={playlists.images[0].url}
                        width={300}
                        height={300}
                        alt='Playlist Cover'/>
                        <Link href={playlists.external_urls.spotify}>
                            <h1 className="text-bold font-xl">
                                {playlists.name}
                            </h1>
                        </Link>
                    </div>

                ))}
            </div>
        </section>
    )
}