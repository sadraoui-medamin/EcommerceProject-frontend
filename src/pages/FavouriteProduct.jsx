import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Button, Popover, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaPlus, FaRegHeart } from "react-icons/fa6";
import { FaBalanceScaleLeft } from "react-icons/fa";

import { ShopContext } from "./context/ShopContext";
import Emptyfavorite from "../components/Favorite/EmptyFavorite";
import { IoClose } from "react-icons/io5";
import { Commet } from "react-loading-indicators";
import apiBaseUrl from "../config/api";
const FavoritesProducts = () => {
  const { token,addToCart,fetchFavorites,favorites,fetchCompares,compares} = useContext(ShopContext);
  const navigate = useNavigate();
  const [favoritesProducts, setfavoritesProducts] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);


  //get the products in the favoritesProducts array from the array of favorites
  const fetchfavoritesProducts = async () => {

    try {
      const res = await axios.get(`${apiBaseUrl}/api/product/list`);
      const products = res.data?.products || [];
      // Filter the products based on the favorites array
      if (products.length != 0) {
        const favoritesProducts = products.filter((product) =>
          favorites?.includes(product._id)
        );
        setfavoritesProducts(favoritesProducts || []);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching favorites products", err);
    }
  }

  //disolay the spinner for 2 secounds and if favorite not loading yet
  useEffect(() => {
    if (token) {
      fetchFavorites()
      ,fetchfavoritesProducts()
      ,fetchCompares()
    }
    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [favorites]);
  // Function to handle screen size changes
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    if (screenWidth< 600) {
      setCollapsed(true);
    }else
    {
      setCollapsed(false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  const gotocart = (id) =>{
    if (!token) {
      toggleModal();
    }else{
      addToCart(id);

  }
}
  // create a fucntion ckeck if the requested product is in the favorites array or not if in the array remove it from the array and if not add it to the array
  const removeFromfavorite = async (productId) => {
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
           setReloadKey(prev => prev + 1); // changes key => remounts Login
           fetchFavorites(); // Refresh the favorites list after toggling  
           fetchfavoritesProducts(); // Refresh the favorites list after toggling
         } catch (err) {
           console.error("Toggle favorite failed", err);
         }
       }

  const toggleCompare = async (productId) => {

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/compares/toggle`,
        { productId },
        { headers: { token } }
      );
      console.log("response.data", response.data); 
      fetchCompares(); // Refresh the compares list after toggling
    } catch (err) {
      console.error("Toggle compare failed", err);
    }   
  }

  const Iscompare_methode = (productId) => {
    return compares.includes(productId);
  }
     

  return (
    <div className="py-40 px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold  text-red-900">My Favorite Products</h1>
      {favorites.length === 0 
        ?
           <Emptyfavorite /> 
        : <>
            {loading ? (
              <div className="flexCenter w-full h-[400px] text-black">
                <Commet color="#43c2d1" size="medium" text="" textColor="" />
              </div>
            ) : (
              <div 
                key={reloadKey}
                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 "
                >
                {favoritesProducts?.map((product) => (
                  <div key={product._id} className="border p-4 rounded shadow relative">
                    {/* remove from favorite btn  */}
                    <Tooltip title="Remove from favorite products" placement="top" color='red'className="absolute top-2 right-2">
                    <Button 
                      onClick={() => removeFromfavorite(product._id)}
                      icon={<IoClose className="text-red-500 text-xl" />} 
                    />
                    </Tooltip>
                    
                    {/* other details  */}
                    <div className="flex justify-center items-center py-2  w-full">
                      <img src={product.images[0]} alt={product.name} className=" h-40 w-40 object-cover" />
                    </div>
                    <h2 className="text-lg font-semibold line-clamp-1 mt-2">{product.name}</h2>
                    <h6 className="text-sm font-medium text-gray-600 mb-1">
                      {product.category} / {product.subCategory}
                      {product.subSubCategory && <span> / {product.subSubCategory}</span>}
                    </h6>
                    <p className="text-xl  text-secondary ">{product.price}$</p>
                    {/* btn section  */}
                    <div className="flex gap-x-5 items-center mt-2">
                      {/* view product btn  */}
                      <Tooltip title="View Product" placement="top" color='#101338'>
                      <Button 
                        onClick={() => navigate(`/product/${product._id}`)}
                        className="animation-btns"
                        icon={<FaEye/>}
                      />
                      </Tooltip>
                      {/* Compare btn  */}
                      <Tooltip title={!Iscompare_methode(product._id) ? '"Add to Compare Product"  ' : 'Remove from Compare Product'}  placement="top" color='#101338'>
                      <Button 
                        onClick={() => toggleCompare(product._id)}
                        className={Iscompare_methode(product._id) ? 'border-blue-700 border-1 animation-btns' : 'animation-btns'}
                        icon={Iscompare_methode(product._id) ? <FaBalanceScaleLeft className="!text-blue-700  " /> : <FaBalanceScaleLeft />}
                      />
                      </Tooltip>
                      {/* Add to cart btn  */}
                      <Tooltip title={collapsed ? 'Add to cart ' : ''} placement="top" color='#120338'>
                        <Button 
                          onClick={() => gotocart(product._id)}
                          icon={<FaPlus/>}
                          className="bg-tertiary text-white animation-btns"
                          >
                            {!collapsed && <span className="ml-4">Add to Cart</span>}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </div>
            )}
            </>
         }
    </div>
  );
};

export default FavoritesProducts;
