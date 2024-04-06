import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const body = await req.json();
    const { artist, token } = body;
    const reqUri = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;


    if(!body){
        throw new Error('No content in body');
    }
    try{

        const response = await fetch(reqUri,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });

        if(!response.ok){
            const error = await response.text();
            console.log(error);
            return NextResponse.json({error: 'No artist found'});
        }

        const data = await response.json();
        
        const artistId = data.artists.items[0].id;

        return NextResponse.json(artistId)

    }catch(error){
        return Response.json({
            error: 'Unable to find artist', 
            status: 200
        })
    }
}