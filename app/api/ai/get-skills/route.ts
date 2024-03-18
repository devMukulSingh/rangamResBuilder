
import { ChatGPT } from "@/lib/ChatGPT";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req:NextRequest,res:NextResponse){

    try{

        
        const profession = req.nextUrl.searchParams.get('profession');

        if(!profession ) return NextResponse.json({ error:'profession is required'}, { status:400});
        
        const skillPrompt = `My profession is ${profession}, give me a list of 10 technology names used in this profession`;
        
        const skill  = await ChatGPT(skillPrompt);
        
        return NextResponse.json(skill,{status:200});
    }
    catch(e){
        console.log(`Error in GET skill req ${e}`);
        return NextResponse.json({error:`Error in GET skill req ${e}`},{status:500});
    }

     
}