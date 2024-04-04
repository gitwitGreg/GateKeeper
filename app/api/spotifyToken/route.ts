import { NextResponse, NextRequest } from "next/server";
import * as querystring from 'querystring'

export async function POST(req: NextRequest, res: NextResponse) {

    const { code , state } = await req.json()

    if(!code || !state){
        return Response.json({error: 'No code or state'})
    }
    const client_id =  process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const redirect_uri = 'http://localhost:3000';

    const formData = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
    };

    const requestBody = querystring.stringify(formData);

    try{

        const tokenUrl = 'https://accounts.spotify.com/api/token' 
        
        const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicAuth}`,
            },
            body: requestBody,
        });

        if(!response.ok){
            const error = await response.text()
            throw new Error(error);
        }

    }catch(error){
        console.log(error)
        return NextResponse.json({error: error})
    }
}