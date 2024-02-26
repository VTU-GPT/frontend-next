import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req,res){
   const resp = await req.json();
   const sqlResponse =  await sql`insert into users (email,name,phone,college,city,sem,branch,passing_Year,scheme,uid) values (${resp.email},${resp.name},${resp.phone},${resp.college},${resp.city},${resp.semester},${resp.branch},${resp.passingYear},${resp.passingYear},${resp.userId})`
   return NextResponse.json({sqlResponse});
}