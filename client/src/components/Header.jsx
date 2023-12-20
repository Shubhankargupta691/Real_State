import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbHomeSearch } from "react-icons/tb";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-violet-400 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-4xl flex flex-wrap">
            <span className="text-slate-950">Real</span>
            <span className="text-slate-200">Estate</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Property"
            className="bg-transparent w-24 sm:w-64 focus:outline-none"
          />
          <TbHomeSearch size={25} className="text-slate-700 " />
        </form>
        <ul className="flex gap-5">
          <Link to="/">
            <li className="text-stone-950 text-lg font-bold">Home</li>
          </Link>
          <Link to="/about">
            <li className="text-stone-950  text-lg font-bold">About</li>
          </Link>{" "}
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="h-8 w-8 rounded-full "
              />
            ) : (
            <li className="text-stone-950  text-lg font-bold">Sign in</li>
              
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
