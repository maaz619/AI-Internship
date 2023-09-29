import { useState } from "react";
import sendImg from "../assets/send.svg";
import { generateStory } from "../service";
import storyImage from "../assets/story.svg";
import leaderboard from "../assets/leaderboard.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
 const [prompt, setPrompt] = useState("");
 const [story, setStory] = useState("");
 const [loading, setLoading] = useState(false);
 const generate = async (prompt) => {
  setLoading(true);
  try {
   let res = await generateStory(prompt);
   let result = await res.json();
   setStory(result.result);
  } catch (error) {
   console.log(error);
  } finally {
   setLoading(false);
  }
 };
 return (
  <>
   <section className=" flex m-auto flex-col h-full sm:w-3/6 md:4/6 w-5/6">
    <header className="text w-full flex items-center justify-between px-2">
     <h1 className=" font-extrabold text-4xl pt-6">Story</h1>
     <div className="flex gap-x-5">
      <Link className="" to="/stories">
       <img className=" pt-6 h-16 md:hidden lg:hidden" src={storyImage} alt="" srcSet="" />
      </Link>
      <Link to="/leaderboard">
       <img className=" pt-6 h-16 md:hidden lg:hidden" src={leaderboard} alt="" srcSet="" />
      </Link>
     </div>
    </header>
    {loading && (
     <div className=" justify-center items-center flex w-full my-10 h-5/6">
      <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-blue-600 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
       />
       <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
       />
      </svg>
      generating...
     </div>
    )}
    {!loading && story && <article className="rounded-lg p-0 sm:p-10 w-full my-10 h-5/6 overflow-y-scroll">{story}</article>}
    {!loading && !story && <div className=" justify-center items-center flex w-full my-10 text-xl h-5/6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">Enter something to generate story</div>}
    <form className="flex flex-col mb-8 justify-center flex-grow relative rounded-xl shadow-xs bg-white">
     <input
      value={prompt}
      disabled={loading}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Enter story prompt"
      type="text"
      id="base-input"
      className="bg-gray-50 border placeholder:text-gray-500 pr-16 border-gray-400 outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-black text-black "
     />
     <button
      onClick={(e) => {
       e.preventDefault();
       generate(prompt);
      }}
      className="absolute p-1 rounded-md md:p-2 md:right-3 right-2"
     >
      <img className=" h-8" src={sendImg} alt="" srcSet="" />
     </button>
    </form>
   </section>
  </>
 );
};

export default Dashboard;
