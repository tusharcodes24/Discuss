import TopicCreateForm from "@/components/ui/topics/TopicCreateForm";

export default function Home() {
  return (
    <div className=" w-[70%] flex justify-between mx-auto mt-10">


    <div className="flex flex-col">
      <div className=" font-extrabold text-xl">HOME PAGE</div>
      <div></div>
    </div>

    <div className="flex flex-col">
      <div><TopicCreateForm></TopicCreateForm></div>
      <div></div>
    </div>


    </div>
  );
}
