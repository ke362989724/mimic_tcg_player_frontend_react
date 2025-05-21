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
import SearchBar from "@/components/searchbar/searchbar";
import ProductCard from "@/components/product-card/product-card";

type Props = {};

const Search = (props: Props) => {
  const {} = props;
  const params = useParams();
  const searchInLink = params.searchParams ?? "";
  const [limit, setLimit] = useState(10);
  const [categoryId, setCategoryId] = useState("");
  const fixedTimeStamp = useRef(Date.now());

  const productList = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getProductList({
        search: searchInLink,
        cursor: fixedTimeStamp.current.toString(),
      });
    },
  });

  return (
    <div className="my-5">
      <SearchBar />
      <div className="mt-4 grid grid-cols-3 gap-2 rounded-sm p-4 shadow-md md:grid-cols-4 md:gap-3 md:p-8">
        {productList.data?.products &&
          productList.data?.products.map((product) => {
            return (
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                coverImage={product.images[0].imageUrl}
                cardCondition={product.cardCondition.name}
                createdAt={product.createdAt}
                nickname={product.seller.nickname}
                currencySymbol={product.seller.country.currency.symbol}
                currencyCode={product.seller.country.currency.currencyCode}
                productId={product.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Search;
