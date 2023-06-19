import { Button, buttonVariants } from "@/components/ui/Button"
import { db } from "@/lib/db"

import Link from "next/link"

export default async  function  Home() {


  const subreddits = await db.subreddit.findMany();
  console.log(subreddits);
  

  return <div>
    <Link className={buttonVariants({
      variant: "outline"
    })} href={'/w/create'}>
     Create Community 
    </Link>
    <div>
      {
        subreddits.map((sub) => { 
       return  (
       <div className="flex flex-col" key={sub.id}>
          <Link href={`/w/${sub.name}`} className="hover:text-blue-300">{sub.name}</Link>
        </div>)
        }
        )
      }
    </div>
 </div>
}
