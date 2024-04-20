import { NextResponse, NextRequest } from "next/server";
import * as querystring from 'querystring'

export async function GET(req: NextRequest, res: NextResponse) {
    
    const code = req.nextUrl.searchParams.get('code');

    const state = req.nextUrl.searchParams.get('state');


    if (!code || !state) {
        return Response.json({error: 'No code or state'});
    }

    const client_id =  process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const redirect_uri = 'https://gatekeeper-pink.vercel.app/api/spotifyToken';

    const formData = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
    };

    const requestBody = querystring.stringify(formData);

    const tokenUrl = 'https://accounts.spotify.com/api/token' 
    
    const basicAuth = 'Basic ' + btoa(client_id + ':' + client_secret);

    try{

        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': basicAuth
            },
            body: requestBody,
        });

        if(!response.ok){
            const error = await response.text();
            throw new Error(error);
        }

        const data = await response.json();

        const accessToken = data.access_token;

        const refreshToken = data.refresh_token;

        if(!accessToken || ! refreshToken){
            console.log('no tokens')
            return Response.json({error: 'missing acces or refresh token'});
        }

        return NextResponse.redirect('https://gatekeeper-pink.vercel.app/?accessToken=' + 
        accessToken + '&refreshToken=' + refreshToken);

    }catch(error){
        return NextResponse.json({error: error})
    }
}