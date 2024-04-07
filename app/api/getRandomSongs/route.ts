import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {

    const body = await req.json();

    try{

        const recomendationUri = 
        `https://api.spotify.com/v1/recommendations?limit=10&seed_artists=2hlmm7s2ICUX0LVIhVFlZQ`
            const recomendationResponse = 
            await fetch(recomendationUri, {
                method:  'GET',
                headers: {
                    'Authorization': `Bearer ${body}`
                },
            })

            if(!recomendationResponse.ok){
                console.log('error getting recommended songs from spotify');
                const error = await recomendationResponse.text()
                console.log(error);
            }

            const data = await recomendationResponse.json();

            console.log(data);

    }catch(error){

    }

}