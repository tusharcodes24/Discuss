import PostList from "@/components/posts/post-list";
import { fetchPostBySearch } from "@/lib/query/post";
import React from "react";

type SearchPageProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const term = (await searchParams).term;

  return (
    <div className="w-full ml-14">
      <h1 className="text-blue-600 font-bold text-2xl my-2  mb-4">
        Search result for <span className=" underline">{term}</span>
      </h1>
      <div className=" w-[55%]">
        <PostList fetchData={() => fetchPostBySearch(term)} />
        </div>
      
    </div>
  );
};

export default SearchPage;