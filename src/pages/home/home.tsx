import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "@/api-service/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const {} = props;
  const params = useParams();
  const [searchParams] = useSearchParams();

  const [searchInput, setSearchInput] = useState("");
  const [bufferSearchInput, setBufferSearchInput] = useState("");
  const [debounceSearchInput] = useDebounce(searchInput, 500);
  const [categoryId, setCategoryId] = useState();
  const productList = useQuery({
    queryKey: [debounceSearchInput],
    queryFn: async () => {
      return await getProductList({
        search: debounceSearchInput,
      });
    },
  });

  return (
    <div className="my-5">
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
            setBufferSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search?search=${bufferSearchInput}`;
            }
          }}
          onFocus={() => {}}
          value={bufferSearchInput}
        />
        <Button className="hidden cursor-pointer rounded-none md:block">
          Submit
        </Button>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
