import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function POST(req,res){
    const resp = await req.json();
    if(resp){
        const response = await sql`select * from Users where Email = ${resp.email}`;
        return NextResponse.json(response)
    }
    return NextResponse.json(false);
}