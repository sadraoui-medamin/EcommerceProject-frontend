import { FaHeart, FaRegHeart } from "react-icons/fa";
import React,{ useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../../pages/context/ShopContext";
import { Button, Tooltip } from "antd";
import apiBaseUrl from "../../config/api";

const FavoriteButton = ({ productId,toggleModal }) => {
  const { token,fetchFavorites,favorites} = useContext(ShopContext);
  const [isFavorite, setIsFavorite] = useState(false);

 
  useEffect(() => {
    if (token) fetchFavorites() ;
    const isFav = favorites?.includes(productId);
    setIsFavorite(isFav);
  }, [fetchFavorites]);

  const toggleFavorite = async () => {
    if (!token) {
      toggleModal();
      return;
    }
    try {
     const response = await axios.post(
        `${apiBaseUrl}/api/favorites/toggle`,
        { productId }
        ,{
          headers:  { token },
        }
      );
      console.log("response.data", response.data); 
      setIsFavorite((prev) => !prev);
      fetchFavorites(); // Refresh the favorites list after toggling
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
  };

  return (
    <Tooltip
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      placement="top"
      >
      <button 
        onClick={()=>toggleFavorite()} 
        className={`rounded-md !h-12 !w-12 animation-btns border-1 flex items-center justify-center border-2 hover:!border-blue-600
          ${isFavorite ? "!border-red-400 !text-red-500" : "border-blue-400 text-blue-400  hover:!text-blue-600  "}
          hover:scale-105`}
          >
          {isFavorite ? <FaHeart className="text-xl  "/> : <FaRegHeart className="text-xl " />} 
      </button>
    </Tooltip>
  );
};

export default FavoriteButton;
