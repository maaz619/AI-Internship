import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ fetch }) => {
 return (
  <aside className="border-r hidden sm:block lg:w-3/12 md:w-2/6 h-full">
   <ul className="px-5 py-10 [&_:is(li)]:p-2 [&_:is(li)]:text-lg [&_:is(li)]:font-semibold ">
    <Link to={"/"}>
     <li>Home</li>
    </Link>
    <Link to="/leaderboard">
     <li onClick={fetch}>Leaderboard</li>
    </Link>
    <Link to="/stories">
     <li>Stories</li>
    </Link>
   </ul>
  </aside>
 );
};
export default Sidebar;
