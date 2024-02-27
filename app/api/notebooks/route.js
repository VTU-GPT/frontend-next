import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(req,res){
    const userId = req.nextUrl.searchParams.get('userId');
    const resp = await sql`select notebook_id,notebook_name from notebooks where uid = ${userId} `;
    return NextResponse.json(resp.rows);
}