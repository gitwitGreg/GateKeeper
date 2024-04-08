import { useEffect, useState } from "react"
import { searchTokenProp } from "../types";
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast";

export default function Search({token, user}: searchTokenProp) {

    const [artist, setArtist] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMess, setErrMess] = useState<string>('');
    const [artistId, setArtistId] = useState<string>('');
    const { toast } = useToast()

    const handleSubmit = async (e: any)=> {
        if(!artist){
            console.log('No artist entered')
            return;
        }

        e.preventDefault();
        setIsLoading(true);

        const artIdObj = {
            artist: artist,
            token: token
        }

        try{
            const response = await fetch('/api/spotifyArtist', {
                method: 'POST',
                body: JSON.stringify(artIdObj)
            })

            if(!response.ok){
                setErrMess('Error finding spotify user id');
            }

            const artistId = await response.text();

            if(artistId){
                setArtistId(artistId);
            }

        }catch(error){
            setErrMess(error as string);
            console.log(error);
        }
    }

    useEffect(() => {
        const generateNewPlaylist = async() =>{
            if(!artistId || !user){
                return
            }else{
                const reqObj = {
                    artistId: artistId,
                    userId: user.id,
                    token: token
                }
                try{
                    const response = await fetch('/api/getCustomPlaylist',{
                        method: 'POST',
                        body: JSON.stringify(reqObj)
                    });

                    if(!response.ok){
                        console.log('Error generating custom playlist');
                    }


                    toast({
                        title: 'Created Playlist',
                        description: 'playlist was created successfully'
                    })

                    setArtist('');

                    setArtistId('');

                    setIsLoading(false);

                }catch(error){
                    console.log(error);
                }
            }
        }
        generateNewPlaylist();
    },[artistId,user])

    if(isLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }


    return(
        <div className="w-full h-auto">
            <h1 className=" text-2xl font-bold font-serif mb-4">
                Create Custom Playlist
            </h1>
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
