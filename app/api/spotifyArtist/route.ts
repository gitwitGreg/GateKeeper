import puppeteer from "puppeteer";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {

    const body = await req.json();

    if(!body){
        throw new Error('No content in body');
    }
    try{
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();

        await page.goto('https://www.google.com/');
        await page.waitForSelector('.gLFyf');
        await page.type('.gLFyf', `spotify ${body} artist id`);
        await page.keyboard.press('Enter');


        await page.waitForSelector('.LC20lb.MBeuO.DKV0Md');
        await page.click('.LC20lb.MBeuO.DKV0Md');
        await page.waitForNetworkIdle();

        const url = page.url();
        const artistId = url.split('/').pop();

        console.log(artistId);

        await browser.close()

        return Response.json(artistId);

    }catch(error){
        return Response.json({
            error: 'Unable to find artist', 
            status: 200
        })
    }
}