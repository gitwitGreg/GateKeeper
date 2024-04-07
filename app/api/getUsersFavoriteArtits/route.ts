import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    const body = await req.json();

    const topArtistUri = 
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0`

    try{
        const response = await fetch(topArtistUri, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${body}`
            }
        })

        if(!response.ok){
            const error = await response.text();
            console.log('error getting artists info');
            console.log(error);
            return Response.json({error: error});
        }

        const data = await response.json();

        return NextResponse.json(data.items);
        
    }catch(error){
        console.log(error)
        return NextResponse.json({error: error})
    }
}
