import useGetRandomSongs from "../hooks/useGetRandomSongs"

export default function RandomSongs({token}: {token: string}) {
    const { randomSongs } = useGetRandomSongs(token)
    return(
        <div>
            Random songs
        </div>
    )
}