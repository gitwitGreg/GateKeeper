import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    const uri = 'https://api.spotify.com/v1/me/playlists'

    try{
        const response = await fetch(uri, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${body}`
            }
        })
        
        if(!response.ok){
            const error = await response.text();
            console.log(error);
            return NextResponse.json({error: error});
        }

        const data = await response.json();
        const playlists = data.items;

        return NextResponse.json(playlists);

    }catch(error){
        console.log(error);
        return NextResponse.json({error: error})
    }
}