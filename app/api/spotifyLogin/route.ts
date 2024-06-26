import { randomBytes } from 'crypto'
import  * as querystring from 'querystring'
import { NextResponse, NextRequest } from "next/server";

export async function GET (req: NextRequest, res: NextResponse ) {

    console.log('we are trying to come back after giving access');

    const client_id =  process.env.SPOTIFY_CLIENT_ID;

    const scope = 'user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private user-top-read';

    const redirect_uri = 'https://gatekeeper-pink.vercel.app/api/spotifyToken';    
    
    const state =  randomBytes(60).toString('hex').slice(0,16);

    const authUrl = 'https://accounts.spotify.com/authorize?'

    try{
       return NextResponse.redirect(authUrl +
       querystring.stringify({
         response_type: 'code',
         client_id: client_id,
         scope: scope,
         redirect_uri: redirect_uri,
         state: state
       }),
       {status: 307}
       )
    }catch(error){
        console.log(error);
    }
}