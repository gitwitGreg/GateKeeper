import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    const token = await req.json();
    try{

        const userResponse = await fetch('https://api.spotify.com/v1/me',{
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(!userResponse.ok){
            return Response.json({error: 'Error finding user with token'});
        }

        const user = await userResponse.json();

        return NextResponse.json(user);

    }catch(error){
        console.log(error)
        return NextResponse.json({error: error});
    }
}