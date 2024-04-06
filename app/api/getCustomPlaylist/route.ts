import { randomInt } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import * as querystring from 'querystring'


export async function POST (req: NextRequest, res: NextResponse) {
    
    const body = await req.json();
    const { artistId, userId, token } = body;

    if(!artistId || !userId || !token){
        console.log('missing token or Id');
        return NextResponse.json({error: 'Missing token or artistId'});
    }


    try{
        const reqBody = {
            name: `Keys{${randomInt(1,10000)}}`,
            public: true,
            collaborative: true,
            description: 'Putting you on {}'
        }

        const reqUri = `https://api.spotify.com/v1/users/${userId}/playlists`

        const playlistResponse = 
        await fetch(reqUri,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type' : 'application/json',

            },
            body: JSON.stringify(reqBody)

        })

        if(!playlistResponse.ok){
            const error = await playlistResponse.text();
            console.log(error);
        }

        const newPlaylist = await playlistResponse.json();

        const artistIdSliced = artistId.slice(1, -1);

        const similarUri = `https://api.spotify.com/v1/artists/${artistIdSliced }/related-artists`

        try{
            const similarArtistsRequest = await fetch(similarUri, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(!similarArtistsRequest.ok){
                console.log('error finding sim artists');
                const error = await similarArtistsRequest.text();
                console.log(error);
                return NextResponse.json({error: error});
            }

            const data = await similarArtistsRequest.json();

            const spotifyArtistArr = data.artists;

            const relatedArtistArr = [];

            const getrandomIndex = (num : number) => {
                return Math.floor(Math.random() * num);
            }

            for(let i = 0 ; i < 10; i++){
                const randomArtist = 
                spotifyArtistArr[getrandomIndex(spotifyArtistArr.length)].id;
                relatedArtistArr.push(randomArtist);
            }

            const playlistSongs: unknown[] = [];


            const fetchPromise = relatedArtistArr.map(async (artist) => {
                const topTracksUri = 
                `https://api.spotify.com/v1/artists/${artist}/top-tracks`;

                try{
                    const songResponse = await fetch(topTracksUri, {
                        method: "GET",
                        headers: {
                            'Authorization' : `Bearer ${token}`
                        }
                    })

                    if(!songResponse.ok){
                        const error = await songResponse.text();
                        console.log(error);
                        return NextResponse.json({error: error});
                    }

                    const trackObject = await songResponse.json();
                    const topTracks = trackObject.tracks;

                    if(topTracks.length <= 10){
                        topTracks.forEach((track: any) => {
                            const songUri = track.uri;
                            if(!playlistSongs.some(song  => song === songUri)){
                                playlistSongs.push(songUri);
                            }
                        })
                    }else{
                        for(let i = 0; i < 10; i++){
                            const songUri = topTracks[getrandomIndex(topTracks.length)].uri
                            if(!playlistSongs.some(song => song === songUri)){
                                playlistSongs.push(songUri);
                            }
                        }
                    }  

                    if(playlistSongs.length < 100){
                        let numTofill =  100 - playlistSongs.length ;
                        const slicedArtistname = artistId.slice(1,-1)
                        const recomendationUri = `https://api.spotify.com/v1/recommendations?limit=100&seed_artists=${slicedArtistname}`

                        try{
                            const recomendationResponse = 
                            await fetch(recomendationUri, {
                                method:  'GET',
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                },
                            })

                            if(!recomendationResponse.ok){
                                const error = await recomendationResponse.json();
                                console.log(error.error.message);
                                return NextResponse.json({error: error});
                            }
                            
                            const data = await recomendationResponse.json();
                            const tracks = data.tracks;

                            for(let i = 0; playlistSongs.length< 100; i++){
                                const songUri = tracks[getrandomIndex(tracks.length)].uri;
                                if(!playlistSongs.some(song => song === songUri)){
                                    playlistSongs.push(songUri);
                                    numTofill -= 1;
                                }
                            }
                        }catch(error){

                        }
                    }
                }catch(error){
                    console.log(error);
                    return NextResponse.json({error: error});
                }
            })


            await Promise.all(fetchPromise);
            
            try{

                const uri = `https://api.spotify.com/v1/playlists/${newPlaylist.id}/tracks`

                const addItemsResponse = await fetch(uri, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({'uris': playlistSongs})
                })

                if(!addItemsResponse.ok){
                    const jsonResp = await addItemsResponse.json();
                    console.log(jsonResp);
                }

                return NextResponse.json({status: 200});
            }catch(error){
                console.log(error)
            }

        }catch(error){
            console.log(error);
            return NextResponse.json({error: error})
        }

    }catch(error){
        return NextResponse.json({error: error})
    }
}