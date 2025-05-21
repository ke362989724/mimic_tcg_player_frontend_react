import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "@/api-service/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SearchBar from "@/components/searchbar/searchbar";

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
      <SearchBar />
      <div></div>
    </div>
  );
};

export default Home;
