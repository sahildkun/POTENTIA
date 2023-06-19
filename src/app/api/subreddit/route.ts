import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { NextResponse } from "next/server";
import { z } from 'zod'

export async function POST(req: Request) {
    
    try {
    const session = await getAuthSession();
    if(!session?.user) {
        return NextResponse.json({message: 'no user found'}, {status: 401})
    }

    const body = await req.json();

    const { name} = SubredditValidator.parse(body); 


    const subredditExists = await db.subreddit.findFirst({
        where:{
            name,
        }
    })

    if(subredditExists){
        return NextResponse.json({message: 'Subreddit already exists'}, {status: 403})
    }
    

    const subreddit = await db.subreddit.create({
        data:{
            name,
            creatorId: session.user.id
        }
    })

    //the creator of subreddit shall be the subscriber tooo

  await db.subscription.create({
        data:{
            userId: session.user.id,
            subredditId: subreddit.id,
        }
    })
   
    return NextResponse.json(subreddit.name)


    }
    catch(error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
          }
      
          return new Response(
            'Could not post to subreddit at this time. Please try later',
            { status: 500 }
          )

    }
    

  
}