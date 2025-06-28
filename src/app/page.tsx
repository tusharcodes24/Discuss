import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/ui/topics/TopicCreateForm";
import { fetchTopPosts } from "@/lib/query/post";
 
export default async function Home() {
  return (
    <div className=" w-full ml-30">
       <div className="grid grid-cols-4 gap-4 p-4 ">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold m-2 mb-6 ">Top Posts</h1>
        <PostList fetchData={fetchTopPosts}/>
      </div>
      <div className="translate-x-[-7.6rem] ">
        <TopicCreateForm/>
      </div>
    </div>
    </div>
   
  );
}