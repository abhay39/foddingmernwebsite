import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import Github from "next-auth/providers/github";

import User from '@/app/api/models/user.js';
import { connectMongo } from '@/backend';


export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        }),
        Github({
            clientId:process.env.GITHUB_CLIENT_ID,
            clientSecret:process.env.GITHUB_CLIENT_SECRET,
        }),
      ],
      callbacks:{
        async session({session}){
          await connectMongo();
          const getUser=await User.findOne({
            email: session.user.email
          })
          
          return getUser;
        },
    
        async signIn({profile}){
          // console.log(profile)
          try{
            await connectMongo();
            const user=await User.findOne({
              email:profile.email
            })
            if(user){
              return user
            }else{
              const newUser=new User({
                email:profile.email,
                name:profile.name,
                password:profile.password
                // imageURL:profile.picture
              })
              await newUser.save()
              return newUser
            }
          }catch(e) {
            console.log(e)
          }
        }
      },
    secret: process.env.NEXTAUTH_SECRETE, 
}