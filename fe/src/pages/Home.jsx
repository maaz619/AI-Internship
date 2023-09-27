import Dashboard from "../components/dashboard";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Stories from "../components/stories";
import { useState } from "react";
import { getAll } from "../service";
const Home = () => {
 const [stories, setStories] = useState([]);
 const fetchStories = async () => {
  try {
   let res = await getAll();
   let result = await res.json();
   setStories(result);
  } catch (error) {
   console.log(error);
  }
 };
 return (
  <Router>
   <div className="flex w-full items-end h-full justify-center">
    <Sidebar fetch={fetchStories} />
    <main className=" w-full h-full ">
     <Routes>
      <Route path="/" element={<Outlet />}>
       <Route index element={<Dashboard />} />
       <Route path="/stories" element={<Stories stories={stories} fetch={fetchStories} />} />
      </Route>
     </Routes>
    </main>
   </div>
  </Router>
 );
};

export default Home;
