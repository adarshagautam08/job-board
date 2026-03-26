import { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import {prisma} from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions:NextAuthOptions=
{
    providers:[
       CredentialsProvider({
        name:'credentials',
        credentials:{
            email:{},
            password:{}
        },

        async authorize(credentials)

        {
            console.log('authorize called', credentials)
            const user=await prisma.user.findUnique({
                where:{email:credentials?.email}
            })

            if(!user)
             throw new Error('No  user Found')

            const passwordMatch=await bcrypt.compare(
                credentials?.password as string,
                user.password
            )
            if(!passwordMatch)
                throw new Error('Wrong password')

            return user
        }
       })
    ],
    callbacks:{
        async jwt({token,user}){
            if(user)
            {
                token.role=user.role
                token.id=user.id
            }
            return token
        },
        async session({session,token})
        {
            if(session.user)
            {
                session.user.role=token.role
                session.user.id = token.id as string
            }
            return session
        }
    },
    pages:{
        signIn:'/login',
        
    },
    session:{
        strategy:'jwt'
    }


}