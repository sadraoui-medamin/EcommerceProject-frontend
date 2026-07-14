import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./context/ShopContext";
import EmptyImg from "../components/Compare/empty";
import { IoClose } from "react-icons/io5";
import { Commet } from "react-loading-indicators";
import apiBaseUrl from "../config/api";
const CompareProducts = () => {
  const { token,fetchCompares,compares,countcompare} = useContext(ShopContext);
  const [comparesProducts, setComparesProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchComparesProducts = async () => {

    try {
      const res = await axios.get(`${apiBaseUrl}/api/product/list`);
      const products = res.data?.products || [];
      // Filter the products based on the CompareProducts array
      if (products.length != 0) {
        const comparesProducts = products.filter((product) =>
          compares?.includes(product._id)
        );
        setComparesProducts(comparesProducts || []);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching compares", err);
    }
  }
    //disolay the spinner for 2 secounds
    useEffect(() => {
      if (token) {
        fetchCompares();
        fetchComparesProducts();
      }
      const timer = setTimeout(() => {
        if (loading) setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }, [compares]);

  // remove from compare list
  const removeFromCompares = async (productId) => {
         try {
          const response = await axios.post(
             `${apiBaseUrl}/api/compares/toggle`,
             { productId }
             ,{
               headers:  { token },
             }
           );
           console.log("response.data", response.data); 
           setIsIncompare((prev) => !prev);
           fetchCompares(); 
           fetchComparesProducts(); 
         } catch (err) {
           console.error("Toggle compare failed", err);
         }
       }
     
  return (
    <div className="py-40 px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold  text-red-900"> Compares List</h1>
      {countcompare === 0 
        ?
           <EmptyImg/> 
        : 
        <>
          {loading ? (
            <div className="flexCenter w-full h-[400px] text-black">
              <Commet color="#43c2d1" size="medium" text="" textColor="" />
            </div>
          ) : (
          /* Comparison Table */
            <div className="overflow-auto w-full border">
              <table className="min-w-max table-auto border-collapse border border-gray-300 text-sm text-left">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 bg-gray-200">Features</th>
                    {comparesProducts.map((product) => (
                      <th key={product._id} className="border border-gray-300 px-4 py-2 bg-gray-200 relative max-w-xs">
                        {/* Remove Button */}
                        <Tooltip title="Remove from Compare List" placement="top" color="volcano">
                          <Button 
                            className="absolute top-2 right-2 z-10"
                            onClick={() => removeFromCompares(product._id)}
                            icon={<IoClose className="text-red-500" />} 
                          />
                        </Tooltip>

                        <div className="flex flex-col items-center justify-center">
                          <img src={product.images[0]} alt={product.name} className="w-28 h-28 object-contain mb-1" />
                          <button onClick={()=>navigate(`/product/${product._id}`)} className="text-blue-600 font-semibold hover:underline text-center">{product.name}</button>
                          <p className="text-green-600 mt-1"> $ {product.price} excl tax</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Collect All Unique Detail Keys */}
                  {Array.from(
                    new Set(comparesProducts.flatMap(p => Object.keys(p.details || {})))
                  )
                    .filter(key => key !== "DescriptionSection")
                    .map((key) => (
                      <tr key={key}>
                        <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-100">{key}</td>
                        {comparesProducts.map((product) => (
                          <td key={product._id} className="border border-gray-300 px-4 py-2">
                            {typeof product.details?.[key] === "boolean"
                              ? product.details[key] ? "Yes" : "No"
                              : Array.isArray(product.details?.[key])
                              ? product.details[key].join(", ")
                              : product.details?.[key] ?? "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
              )}
        </>
      }
    </div>
  );
};

export default CompareProducts;
