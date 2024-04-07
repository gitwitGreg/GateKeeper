import useGetRandomSongs from "../hooks/useGetRandomSongs"

interface TokenProp{
    token: string
}


export default function RandomSongs({token}: TokenProp) {

    const { randomSongs } = useGetRandomSongs(token)
    return(
        <div>
            Random songs
        </div>
    )
}