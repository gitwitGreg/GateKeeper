import Link from "next/link";
import useGetFavoriteArtists from "../hooks/useGetFavoriteArtists"
import { topTrackProp } from "../types";
import { TokenProp } from "../types";

const FavoriteArtists = ({token}: TokenProp) => {

    const { topTracks }: {topTracks: topTrackProp[] | null} = useGetFavoriteArtists(token);

    if(!topTracks){
        return(
            <div className="w- full h-full">
                <h1>
                    Keep listening, You dont have any top tracks yet!
                </h1>
            </div>
        )
    }
    
    return(
        <section className="h-auto">
            <h1 className=" text-2xl font-bold font-serif mb-4">
                Top Tracks
            </h1>
            <div className="w-full h-auto flex flex-wrap gap-10 overscroll-contain">
                {topTracks.map((track, index) => (
                    <Link href={track.external_urls.spotify}>
                        <div key={index} className="flex flex-col gap-4">
                            <img
                            src={track.album.images[0].url}
                            width={220}
                            height={220}/>
                            <h1 className="font-bold text-lg font-mono">
                                {track.album.name.length > 18? 
                                    track.album.name.substring(0,18) +
                                    '...' : track.album.name
                                }
                            </h1>
                            <p className="font-semibold leading-6 text-lg">
                                {track.name.length > 18? 
                                    track.name.substring(0,18) + 
                                    '...' : track.name
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default FavoriteArtists

