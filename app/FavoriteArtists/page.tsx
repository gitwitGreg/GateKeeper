import useGetFavoriteArtists from "../hooks/useGetFavoriteArtists"

export default function FavoriteArtists({token}: {token: string}) {

    const { artists }: any = useGetFavoriteArtists(token);
    
    return(
        <div>
            hi
        </div>
    )
}