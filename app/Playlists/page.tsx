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
                No user Playlists to show
            </div>
        )
    }

    return(
        <section>
            <h1 className=" text-2xl font-bold font-serif mb-4">
                Playlists
            </h1>
            <div className="h-full w-full flex flex-wrap gap-10">
                {playlists.map((playlists, index) => (
                    <Link href={playlists.external_urls.spotify}>
                        <div key={index} className="gap-4 flex flex-col items-center">
                            <img 
                            src={playlists.images[0].url}
                            width={220}
                            height={220}
                            alt='Playlist Cover'/>
                            <h1 className="text-bold font-xl">
                                {playlists.name}
                            </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}