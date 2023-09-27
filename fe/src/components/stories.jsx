import { useEffect } from "react";
import { upvoteStory } from "../service";
import back from "../assets/back.svg";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Stories = ({ stories, fetch }) => {
 //logic to prevent multiple upvote in a session
 const preventMultipleUpvote = (id) => {
  const tempState = localStorage.getItem("valid-upvote");
  const parsedData = JSON.parse(tempState);
  if (!parsedData) {
   localStorage.setItem("valid-upvote", JSON.stringify([{ id, status: 1 }]));
  } else {
   localStorage.setItem("valid-upvote", JSON.stringify([...parsedData, { id, status: 1 }]));
  }
 };
 const verifyMultipleUpvote = () => {
  let tempState = localStorage.getItem("valid-upvote");
  tempState = JSON.parse(tempState);
  let ids;
  //   storyId = stories.map((data) => data.id);
  if (tempState) {
   ids = tempState?.map((data) => data.id);
   return [...new Set([...ids])];
  }
  return [];
 };

 const upvoteHandle = async (id) => {
  try {
   let res = await upvoteStory(id);
   let result = await res.json();
   if (result.status === "success") fetch();
  } catch (error) {
   console.log(error);
  }
 };
 useEffect(() => {
  fetch();
 }, []);
 return (
  <>
   <div className="p-1.5 h-full overflow-y-scroll">
    <span className=" md:hidden lg:hidden">
     <Link to="/">
      <img className=" p-4 h-20" src={back} alt="" />
     </Link>
    </span>
    {
     // eslint-disable-next-line react/prop-types
     stories.map((story, key) => {
      return (
       <div className="mb-2" key={key}>
        <h2>
         <div className="flex rounded-t-md items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 hover:bg-gray-100 " aria-expanded="true" aria-controls="accordion-collapse-body-1">
          <span>{story.prompts}</span>
          <span data-accordion-icon className=" h-10 flex flex-col items-center justify-center">
           <button
            disabled={verifyMultipleUpvote().includes(story.id)}
            onClick={() => {
             upvoteHandle(story.id);
             preventMultipleUpvote(story.id);
            }}
           >
            <svg className="rotate-180 w-6 h-6 text-gray-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
             <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
            </svg>
           </button>
           {story.upvotes}
          </span>
         </div>
        </h2>
        <div id="accordion-collapse-body-1" className="" aria-labelledby="accordion-collapse-heading-1">
         <div className="p-5 border border-t-0 rounded-b-md   border-gray-200">
          <p className="mb-2 text-gray-500 ">{story.stories}</p>
         </div>
        </div>
       </div>
      );
     })
    }
   </div>
  </>
 );
};
export default Stories;
