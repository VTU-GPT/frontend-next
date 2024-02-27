import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { nanoid } from "@reduxjs/toolkit";

export async function POST(req,res){
   const resp = await req.json();
   const sqlResponse =  await sql`insert into users (email,name,phone,college,city,sem,branch,passing_Year,scheme,uid) values (${resp.email},${resp.name},${resp.phone},${resp.college},${resp.city},${resp.semester},${resp.branch},${resp.passingYear},${resp.passingYear},${resp.userId})`
   const sqlResponse2 = await sql`insert into notebooks(notebook_name,notebook_id,uid) values ('Notebook1',${nanoid()},${resp.userId})`;
   const sqlResponse3 = await sql`insert into notebooks(notebook_name,notebook_id,uid) values ('Notebook2',${nanoid()},${resp.userId})`;
   return NextResponse.json({sqlResponse});
}