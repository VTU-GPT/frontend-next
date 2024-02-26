import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req,res){
    // const request = await req.json();
    const userid = req.nextUrl.searchParams.get('userId')
    const resp = await sql`select question_id,question,answer,sources from questions where user_id = ${userid}`
    return NextResponse.json(resp.rows);
}