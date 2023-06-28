
import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

import Post from '@/components/Post';
import React from 'react'
import MiniCreatePost from '@/components/MiniCreatePost';
interface PageProps {
    params: {
        slug: string
      }
}

const SubredditPage = async  ({params}: PageProps) => {
    const { slug }= params;



    const session = await getAuthSession();


    const subreddit = await db.subreddit.findFirst({
        where: { name: slug },
        include: {
          posts: {
            include: {
              author: true,
              votes: true,
              comments: true,
              subreddit: true,
            },
            orderBy: {
              createdAt: 'desc'
            },
            
          },
        },
      })

console.log(subreddit?.posts)


      if (!subreddit) return notFound()

  return (
    <div>
         <h1 className='font-bold text-3xl md:text-4xl h-14 '>
        w/{subreddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <ul className=' mt-5   flex flex-col col-span-2 space-y-6'>
      {
        subreddit.posts.map((post) => { 
        
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        )
        
          return(  
            <div key={post.id} className=''>
              <Post
              subredditName={subreddit.name}
              post={post}
              commentAmt={post.comments.length}
              votesAmt={votesAmt}
              currentVote={currentVote}
              />

            </div>
          )
        })
      }
      </ul>
    </div>
  )
}

export default SubredditPage