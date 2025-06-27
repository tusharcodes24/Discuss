import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/lib";

export const {handlers:{GET,POST} , auth}= NextAuth({
    adapter: PrismaAdapter(prisma),
    providers:[
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    callbacks:{
        async session({session, user}){
            if(session && user){
                session.user.id = user.id
            }
            return session;
        }
    }
})