import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductList } from "@/api-service/main";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdOutlineClose } from "react-icons/md";
import { useDebounce } from "use-debounce";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const Search = (props: Props) => {
  const {} = props;
  const params = useParams();
  const [searchParams] = useSearchParams();
  const searchInLink = params.searchParams ?? "";
  const [searchInput, setSearchInput] = useState(searchInLink);
  const [bufferSearchInput, setBufferSearchInput] = useState(searchInLink);
  const [limit, setLimit] = useState(10);
  const [debounceSearchInput] = useDebounce(searchInput, 500);
  const [categoryId, setCategoryId] = useState("");
  const fixedTimeStamp = useRef(Date.now());

  const productList = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getProductList({
        search: debounceSearchInput,
        cursor: fixedTimeStamp.current.toString(),
      });
    },
  });

  const handleSearch = () => {
    window.location.href = `/search/${bufferSearchInput}`;
  };

  console.log("productList", productList.data);

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
              handleSearch();
            }
          }}
          value={bufferSearchInput}
        />
        <Button
          className="hidden cursor-pointer rounded-none md:block"
          onClick={handleSearch}
        >
          Submit
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3 rounded-sm p-8 shadow-md">
        {productList.isLoading &&
          Array.from({ length: limit }, (_, index) => {
            return (
              <div key={"skeleton" + index}>
                <Skeleton className="h-40 w-full" />
                <Skeleton className="mt-2 h-10 w-full" />
                <Skeleton className="mt-1 h-5 w-1/3" />
                <Skeleton className="mt-1 h-5 w-1/5" />
              </div>
            );
          })}
        {productList.data?.products &&
          productList.data?.products.map((product, index) => {
            return (
              <div key={product.id}>
                <img
                  src={
                    product.images[0].imageUrl ? product.images[0].imageUrl : ""
                  }
                  alt={"testing"}
                  className="w-full"
                />
                <p className="mt-2">{product.name}</p>
                <p className="mt-1">{product.price}</p>
                <p className="mt-1">{product.category}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
