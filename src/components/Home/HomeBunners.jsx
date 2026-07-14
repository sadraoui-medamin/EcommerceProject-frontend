import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFire } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import apiBaseUrl from "../../config/api";


const HomeBannerCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [productData,setproductData ] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/api/homebunner/list`);
        setBanners(res.data?.HomeBanners || []);
        const productRes = await axios.get(`${apiBaseUrl}/api/product/list`);
        setproductData(productRes.data?.products || []);
      } catch (error) {
        console.error("Error fetching banners or product:", error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <Carousel
      animation="fade"
      autoPlay
      stopAutoPlayOnHover
      className="w-full h-full mt-28 mb-4"
      navButtonsAlwaysVisible
      indicators
      swipe
      cycleNavigation
      interval={3500}
      timeout={1000}
    >
      {banners.map((banner) => {
        const product = productData?.find((prod) => prod._id === banner.productId);
  
        return (
          <div key={banner._id} className="relative w-full h-full">
            {/* Background Image with Navigation */}
            <div className="cursor-pointer" onClick={() => navigate(`/product/${banner.productId}`)}>
              <img
                src={banner.image}
                alt="Home Banner"
                className="w-full h-screen object-cover"
              />
            </div>
  
            {/* Overlay Content */}
            <div className="absolute max-w-[666px]  mt-7 md:top-52 top-40 md:left-32 left-16 z-10">
              <h4 className="flex items-baseline gap-x-2 uppercase text-secondary medium-18">
                Modern collection <BsFire />
              </h4>
              <h2 className="md:h1 h5 capitalize text-secondaryWhite">
                Grab Up to 20% Off On {product?.brand} {product?.subSubCategory ? `${product?.subSubCategory}`:`${product?.subCategory}`}
              </h2>
              <p className="border-l-4 border-secondary pl-3 my-2">
                {product?.name} 
              </p>
              {/* Buttons */}
              <div className="flex items-center gap-x-4">
                <button
                  onClick={() => navigate(`/product/${banner.productId}`)}
                  className="btn-secondary rounded-full flexCenter gap-x-2 cursor-pointer hover:shadow-lg hover:shadow-gray-20"
                >
                  Check It Out
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}  

export default HomeBannerCarousel;
