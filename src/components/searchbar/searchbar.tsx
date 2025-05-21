import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";

type Props = {};

const SearchBar = (props: Props) => {
  const params = useParams();
  const searchInLink = params.searchParams ?? "";
  const [searchInput, setSearchInput] = useState(searchInLink);
  const [debounceSearchInput] = useDebounce(searchInput, 500);

  const handleSearch = () => {
    window.location.href = `/search/${searchInput}`;
  };

  return (
    <div className="relative flex">
      <CiSearch
        size={20}
        className="absolute top-1/2 left-3 -translate-y-1/2"
      />
      {searchInput && (
        <div className="bg-accent absolute top-1/2 right-5 hidden -translate-y-1/2 cursor-pointer rounded-full p-1 md:right-[90px] md:block">
          <MdOutlineClose
            className=""
            size={12}
            onClick={() => {
              setSearchInput("");
            }}
          />
        </div>
      )}
      <Input
        className="rounded-none pl-10 md:pr-10"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        value={searchInput}
      />
      <Button
        className="hidden cursor-pointer rounded-none md:block"
        onClick={handleSearch}
      >
        Submit
      </Button>
    </div>
  );
};

export default SearchBar;
