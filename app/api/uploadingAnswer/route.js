import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const request = await req.json();
    // await sql`insert into `
    return NextResponse.json(false)
}