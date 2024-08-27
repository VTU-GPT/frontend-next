import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req,res){
  const resp = await req.json();
  const response = await prisma.users.create({
      data : {
         email : resp.email,
         name : resp.name,
         phone : resp.phone,
         college : resp.college,
         sem : +resp.semester,
         branch : resp.branch,
         passing_year : +resp.passingYear,
         uid : resp.userId,
         usn : resp.usn
      }
   })
   return NextResponse.json({response});
}
