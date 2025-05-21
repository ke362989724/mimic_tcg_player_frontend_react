import React, { useState, useEffect, useRef, useMemo } from "react";
import { ProductProps } from "@/interface/product-list";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { numberWithCommas } from "@/utils/thousand-separator";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

type Props = {
  title: string;
  price: string;
  coverImage: string;
  cardCondition: string;
  createdAt: Date;
  nickname: string;
  currencySymbol: string;
  currencyCode: string;
  productId: string;
};

const ProductCard = ({
  title,
  price,
  coverImage,
  createdAt,
  nickname,
  currencyCode,
  cardCondition,
  productId,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const relativeTime = useMemo(() => {
    return formatDistanceToNow(createdAt, { addSuffix: true }).replace(
      "about",
      "",
    );
  }, [createdAt]);

  const formattedPrice = useMemo(() => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) return "Invalid price";

    // Determine if the price is a whole number
    const isWholeNumber = Number.isInteger(numericPrice);

    // Use a generic locale (e.g., "en-US") or dynamically select based on currency
    // For simplicity, use "en-US" as a fallback and let currencyCode drive the currency
    try {
      return numberWithCommas(
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currencyCode, // Dynamically use the provided currency code
          minimumFractionDigits: isWholeNumber ? 0 : 2, // No decimals for whole numbers
          maximumFractionDigits: isWholeNumber ? 0 : 2, // Up to 2 decimals for non-whole numbers
        }).format(numericPrice),
      );
    } catch (error) {
      console.error(`Invalid currency code: ${currencyCode}`, error);
      return "Invalid currency";
    }
  }, [price, currencyCode]);

  return (
    <div
      className="cursor-pointer rounded-sm p-3 hover:shadow-2xl"
      onClick={() => {
        window.location.href = `/product/${productId}`;
      }}
    >
      <div
        className={cn("", {
          hidden: !isImageLoaded,
          block: isImageLoaded,
        })}
      >
        <div className="mb-3 flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src="" />
            <AvatarFallback className="font-semibold">
              {nickname.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mb-1 flex-1">
            <div className="p4 line-clamp-1 font-semibold">{nickname}</div>
            <div className="p5 text-muted-foreground line-clamp-1">
              {relativeTime}
            </div>
          </div>
        </div>
        <img
          src={coverImage}
          alt={title}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          className="mb-2 aspect-square w-full rounded-sm object-cover"
        />
        <div className="mb-1">
          <div className="line-clamp-2">{title}</div>
          <div className="p4 font-bold">{formattedPrice}</div>
          <div>{cardCondition}</div>
        </div>
        <div
          onClick={(e) => {
            setIsLiked(!isLiked);
            e.preventDefault();
          }}
        >
          {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>
      </div>
      <div
        className={cn("space-y-2", {
          block: !isImageLoaded,
          hidden: isImageLoaded,
        })}
      >
        <div className="mb-1 flex gap-1">
          <Skeleton className="size-8 rounded-full" />
          <div className="mb-1 flex-1">
            <Skeleton className="mb-1 h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
