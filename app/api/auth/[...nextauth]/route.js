import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { sql } from "@vercel/postgres";

const authOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks : {
       async signIn ({user,account}){
        if(account.provider == 'google'){
            const res = await sql`select * from Users where email = ${user?.email}`
            if(!res.rowCount){
                await sql`insert into Users (UID,Name,Email,Hashed_Password) values (${user?.id},${user?.name},${user?.email},'google')`;
            }
            return user;
        }
       }
    }
}

const handler =  NextAuth(authOptions);

export {handler as GET, handler as POST,authOptions}