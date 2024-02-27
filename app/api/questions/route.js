import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req,res){
    // const request = await req.json();
    const notebookId = req.nextUrl.searchParams.get('notebookId')
    const resp = await sql`select question_id,question,answer,sources from questions where notebook_id = ${notebookId}`
    return NextResponse.json(resp.rows);
}