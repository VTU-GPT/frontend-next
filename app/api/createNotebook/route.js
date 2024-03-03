import { sql } from "@vercel/postgres";
import { nanoid } from "@reduxjs/toolkit";
import { NextResponse } from "next/server";

export async function POST(req,res){
    const request = await req.json();
    try {
       const checkIfNotebook = await sql`select * from notebooks where uid=${request.userId} and notebook_name =${request.notebookName}`;
       if(checkIfNotebook.rows.length == 0) {
        await sql`insert into notebooks (notebook_id,uid,notebook_name) values (${nanoid()},${request.userId},${request.notebookName});`
        return NextResponse.json({message : 'success'});
       }else{
        return NextResponse.json({message : 'failed'});
       }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message : 'failed'});
    }
}