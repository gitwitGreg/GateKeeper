import { useEffect, useState } from "react"

interface searchTokenProp {
    token : string
  }

export default function Search({token}: searchTokenProp) {

    const [artist, setArtist] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMess, setErrMess] = useState<string>('')

    const handleSubmit = async (e: any)=> {
        if(!artist){
            console.log('No artist enteres')
            return;
        }
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await fetch('/api/spotifyArtist', {
                method: 'POST',
                body: JSON.stringify(artist)
            })
            if(!response.ok){
                throw new Error('Artist doesnt exsist on spotify')
            }
            const artistId = await response.text();
            console.log(artistId)
            setIsLoading(false);
        }catch(error){
            setErrMess(error as string);
            console.log(error);
        }
    }

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }


    return(
        <div className="w-full h-auto">
             <form onSubmit={handleSubmit}>
                <input 
                className="w-full h-16 rounded-lg text-black px-6 text-lg"
                placeholder="Enter an artist you like"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}/>
            </form>
        </div>
    )
}
