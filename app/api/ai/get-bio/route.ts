
import { ChatGPT } from "@/lib/ChatGPT";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse){

    try{

        
        const profession = req.nextUrl.searchParams.get('profession');

        if(!profession ) return NextResponse.json({ error:'profession is required'}, { status:400});
        
        const bioPrompt = `Suggest 4 short bio for ${profession} for resume`;
        
        const bio  = await ChatGPT(bioPrompt);
        
        return NextResponse.json(bio,{status:200});
    }
    catch(e){
        console.log(`Error in GET req ${e}`);
        return NextResponse.json({error:`Error in GET req ${e}`},{status:500});
    }

     
}