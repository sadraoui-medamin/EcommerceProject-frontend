import React from 'react';
import aboutImg from "../assets/image.png";
import { RiDoubleQuotesL } from "react-icons/ri";

const About = () => {
  const statistics = [
    { label: "Satisfied Customers", value: 99 },
    { label: "Exclusive Products", value: 12 },
    { label: "New Products", value: 5 },
  ];

  return (
    <section className='pt-8   bg-primary '>
      <div className="  py-10 my-8 rounded-3xl px-4  ">
        {/* Main container */}
        <div className="flex flex-col lg:flex-row gap-10 bg-white  px-4 py-8  rounded-2xl ">
          {/* Left side */}
          <div className="flex-1 relative mt-7 xs:mb-7 mb-20 flex ">
            <div className=" flex-1 bg-secondary rounded-3xl rounded-tr-[155px] w-[570px] min-w-[200px] shadow-xl h-[220px] sm:h-[360px] xs:h-[260px]   ">
              <img src={aboutImg} alt="About" className="rounded-3xl h-[220px] sm:h-[360px] min-w-[200px]  xs:h-[260px] " />
            </div>
            <div className="flex-1 bg-white absolute sm:left-8 left-4 sm:top-[300px] top-[200px] h-24  max-w-xs max-h-xs p-4  rounded-2xl flexCenter flex-col shadow-lg  ">
              <span className="relative bottom-8 p-3 text-white h-12 w-12 flex items-center justify-center rounded-full bg-secondary ">
                <RiDoubleQuotesL className="text-2xl" />
              </span>
              <p className="text-center relative bottom-5 font-medium ">
                Discover fashion that speaks to your style. Elevate your wardrobe with exclusive collections!
              </p>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 flex flex-col justify-center text-black mt-4" >
            <span className="medium-18 text-secondary">OUR VOLONTE: </span>
            <p className="py-5">
                Offer you the right products at the right prices
                (which does not prevent us from offering you promotions, exclusive offers and good deals, on the contrary) !
                Thus, our specialists carefully select our references to offer you the best quality/performance/price ratio.
                You will find on our website the biggest brands and their best products: More than 20,000 items in Stock.
                Owner of the site « www.mytek.tn » and distributor of computer equipment, smartphone, household appliances, TV | image & sound, gaming, printing, office automation, fashion | beauty & health, motorcycle | sport and leisure, home & pet store, baby, furniture & decoration..
            </p>
            {/* Statistics cards */}
            <div className="text-secondary py-4 rounded-2xl bg-white">
              <div className="flex flex-wrap gap-4">
                {statistics.map((stat, index) => (
                  <div key={index} className="bg-primary p-4 rounded-lg shadow-lg text-center w-[180px]">
                    <div className="flex items-center gap-1 justify-center">
                      <h3 className="h3">{stat.value}k</h3>
                      <h4 className="bold-28 -mt-7 -ml-1">+</h4>
                    </div>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
