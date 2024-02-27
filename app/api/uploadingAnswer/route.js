import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
export async function POST(req,res){
    const request = await req.json();
    console.log(request);
    await sql`insert into questions(question_id,question,answer,sources,user_id,notebook_id) values (${request.id},${request.question},${request.answer},${JSON.stringify(request.sources)},${request.userId},${request.notebookId})`;
    return NextResponse.json(true)
}