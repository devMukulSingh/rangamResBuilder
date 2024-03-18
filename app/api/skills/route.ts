import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req:NextRequest,res:NextResponse){
    
    try{

        const profession = req.nextUrl.searchParams.get('profession');
        
        if(!profession) return NextResponse.json({error:'Profession is required'},{status:400});
        
        const res = await prisma.profession.findFirst({
            where:{
                name:profession,
            },
            include:{
                skills:true
            }
        });
        
        return NextResponse.json({skills:res?.skills},{status:200});
    }
    catch(e){
        console.log(`Error in GET skills req ${e}`);
        return NextResponse.json({error:e},{status:500});
    }

}