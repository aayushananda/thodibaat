import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Product = () => {
  const carouselRef = useRef(null);
  const [carouselState, setCarouselState] = useState({
    showDetail: false,
    direction: "",
    isAnimating: false,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      title: "Pharmaceutical",
      topic: "Surveal",
      description:
        "High-quality pharmaceutical product designed for optimal health outcomes. Manufactured under strict quality control standards.",
      image: "/images/Surveal.png",
    },
    {
      id: 2,
      title: "Essential",
      topic: "Thea",
      description:
        "Advanced formulation providing targeted support. Clinically tested for effectiveness and safety.",
      image: "/images/Thea.png",
    },
    {
      id: 3,
      title: "Premium",
      topic: "SNH",
      description:
        "Innovative product developed with cutting-edge technology. Meets the highest industry standards for quality and efficacy.",
      image: "/images/SNH.png",
    },
    {
      id: 4,
      title: "Natural",
      topic: "Product 4",
      description:
        "Naturally derived solution for everyday wellness. Created with carefully selected ingredients for maximum benefit.",
      image: "/images/logo.png",
    },
    {
      id: 5,
      title: "Professional",
      topic: "Product 5",
      description:
        "Professional-grade pharmaceutical formulation. Trusted by healthcare providers worldwide.",
      image: "/images/logo.png",
    },
  ];

  // Order products based on current index for carousel display
  const getOrderedProducts = () => {
    const ordered = [];
    for (let i = 0; i < products.length; i++) {
      ordered.push(products[(currentIndex + i) % products.length]);
    }
    return ordered;
  };

  const handleNext = () => {
    if (carouselState.isAnimating || carouselState.showDetail) return;

    setCarouselState({
      ...carouselState,
      direction: "next",
      isAnimating: true,
    });

    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % products.length);

      // Allow a short delay before resetting the animation state
      setTimeout(() => {
        setCarouselState({
          ...carouselState,
          direction: "",
          isAnimating: false,
        });
      }, 100);
    }, 1100);
  };

  const handlePrev = () => {
    if (carouselState.isAnimating || carouselState.showDetail) return;

    setCarouselState({
      ...carouselState,
      direction: "prev",
      isAnimating: true,
    });

    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + products.length) % products.length);

      // Allow a short delay before resetting the animation state
      setTimeout(() => {
        setCarouselState({
          ...carouselState,
          direction: "",
          isAnimating: false,
        });
      }, 100);
    }, 1100);
  };

  const toggleDetail = () => {
    setCarouselState({
      ...carouselState,
      showDetail: !carouselState.showDetail,
      direction: "",
      isAnimating: false,
    });
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      const timeouts = setTimeout(() => {}, 0);
      for (let i = 0; i < timeouts; i++) {
        clearTimeout(i);
      }
    };
  }, []);

  return (
    <div className="min-h-screen py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-300 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Brands</h1>
        <p className="text-lg text-center mb-12">
          Discover our range of pharmaceutical products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{
              backgroundImage: "url('/images/Surveal.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "200px",
            }}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{
              backgroundImage: "url('/images/Thea.png')",
              backgroundSize: "contain", // Changed to contain
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "200px",
              backgroundColor: "white", // Added fallback color
            }}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{
              backgroundImage: "url('/images/SNH.png')",
              backgroundSize: "contain", // Changed to contain
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "200px",
              backgroundColor: "Black", // Added fallback color
            }}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{
              backgroundImage: "url('/images/Thea.png')",
              backgroundSize: "contain", // Changed to contain
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "200px",
              backgroundColor: "White", // Added fallback color
            }}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{
              backgroundImage: "url('/images/SNH.png')",
              backgroundSize: "contain", // Changed to contain
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "200px",
              backgroundColor: "Black", // Added fallback color
            }}
          ></div>
        </div>

        {/* Carousel Section */}
        <div className="mt-32 relative">
          <h2 className="text-3xl font-bold text-center mb-5">
            Featured Products
          </h2>

          {/* Navigation Buttons Container */}
          <div className="carousel-navigation">
            <button
              id="prev"
              onClick={handlePrev}
              className={carouselState.showDetail ? "hidden" : ""}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              id="next"
              onClick={handleNext}
              className={carouselState.showDetail ? "hidden" : ""}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div
            ref={carouselRef}
            className={`carousel ${carouselState.direction} ${
              carouselState.showDetail ? "showDetail" : ""
            }`}
          >
            <div className="list">
              {getOrderedProducts().map((product, index) => (
                <div
                  className={`item item-${index + 1}`}
                  key={`carousel-${product.id}-${index}`}
                >
                  <img src={product.image} alt={product.topic} />
                  <div className="introduce">
                    <div className="title">{product.title}</div>
                    <div className="topic">{product.topic}</div>
                    <div className="des">{product.description}</div>
                    <button
                      className="custom-btn seeMore"
                      onClick={toggleDetail}
                    >
                      SEE MORE
                    </button>
                  </div>
                  <div className="detail">
                    <div className="title">{product.topic}</div>
                    <div className="des text-xl">
                      {product.description}
                      <br />
                      Our pharmaceutical products are developed with the latest
                      technology and undergo rigorous testing to ensure safety
                      and effectiveness.
                    </div>
                    <div className="specifications">
                      <div>
                        <p>Dosage</p>
                        <p>Varies</p>
                      </div>
                      <div>
                        <p>Form</p>
                        <p>Tablet</p>
                      </div>
                      <div>
                        <p>Storage</p>
                        <p>Cool & Dry</p>
                      </div>
                      <div>
                        <p>Usage</p>
                        <p>Daily</p>
                      </div>
                      <div>
                        <p>Prescription</p>
                        <p>Required</p>
                      </div>
                    </div>
                    <div className="checkout">
                      <button>INQUIRE</button>
                      <button>LEARN MORE</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button id="back" className="custom-btn" onClick={toggleDetail}>
              SEE ALL
            </button>
          </div>
        </div>

        {/* CSS for Carousel */}
        <style jsx="true">{`
          :root {
            --item1-transform: translateX(-100%) translateY(-5%) scale(1.5);
            --item1-filter: blur(30px);
            --item1-zIndex: 11;
            --item1-opacity: 0;

            --item2-transform: translateX(0);
            --item2-filter: blur(0px);
            --item2-zIndex: 10;
            --item2-opacity: 1;

            --item3-transform: translate(50%, 10%) scale(0.8);
            --item3-filter: blur(10px);
            --item3-zIndex: 9;
            --item3-opacity: 1;

            --item4-transform: translate(90%, 20%) scale(0.5);
            --item4-filter: blur(30px);
            --item4-zIndex: 8;
            --item4-opacity: 1;

            --item5-transform: translate(120%, 30%) scale(0.3);
            --item5-filter: blur(40px);
            --item5-zIndex: 7;
            --item5-opacity: 0;
          }

          /* carousel */
          .carousel {
            position: relative;
            height: 800px;
            overflow: hidden;
            margin-top: 9px;
            width: 100%;
          }
          .carousel .list {
            position: absolute;
            width: 100%;
            max-width: 90%;
            height: 80%;
            left: 50%;
            transform: translateX(-50%);
          }
          .carousel .list .item {
            position: absolute;
            left: 0%;
            width: 75%;
            height: 100%;
            font-size: 15px;
            transition: transform 0.5s, filter 0.5s, opacity 0.5s, width 0.5s,
              left 0.5s;
            will-change: transform, filter, opacity;
          }
          .carousel .list .item:nth-child(n + 6) {
            opacity: 0;
          }
          .carousel .list .item:nth-child(2) {
            z-index: var(--item2-zIndex);
            transform: var(--item2-transform);
            filter: var(--item2-filter);
            opacity: var(--item2-opacity);
          }
          .carousel .list .item img {
            width: 50%;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            transition: right 1.5s;
            object-fit: contain;
            max-height: 90%;
          }

          .carousel .list .item .introduce {
            opacity: 0;
            pointer-events: none;
            font-family: "Poppins", sans-serif;
            width: 40%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 5%;
            max-width: 360px;
          }
          .carousel .list .item:nth-child(2) .introduce {
            opacity: 1;
            pointer-events: auto;
            transition: opacity 0.5s;
          }
          .carousel .list .item .introduce .title {
            font-size: 1.5em;
            font-weight: 500;
            line-height: 1.2;
            margin-bottom: 0.3em;
            color: #333;
          }
          .carousel .list .item .introduce .topic {
            font-size: 3em;
            font-weight: 600;
            line-height: 1.1;
            margin-bottom: 0.5em;
            color: #222;
          }
          .carousel .list .item .introduce .des {
            font-family: "Poppins", sans-serif;
            font-size: 0.9em;
            line-height: 1.6;
            color: #555;
            margin-bottom: 1.5em;
            max-height: 150px;
            overflow-y: auto;
          }
          .carousel .list .item .introduce .seeMore {
            margin-top: 1.2em;
            font-size: 0.9rem;
            height: 40px;
            display: inline-block;
            padding: 0 1.5em;
          }
          .carousel .list .item:nth-child(1) {
            transform: var(--item1-transform);
            filter: var(--item1-filter);
            z-index: var(--item1-zIndex);
            opacity: var(--item1-opacity);
            pointer-events: none;
          }
          .carousel .list .item:nth-child(3) {
            transform: var(--item3-transform);
            filter: var(--item3-filter);
            z-index: var(--item3-zIndex);
            opacity: var(--item3-opacity);
          }
          .carousel .list .item:nth-child(4) {
            transform: var(--item4-transform);
            filter: var(--item4-filter);
            z-index: var(--item4-zIndex);
            opacity: var(--item4-opacity);
          }
          .carousel .list .item:nth-child(5) {
            transform: var(--item5-transform);
            filter: var(--item5-filter);
            z-index: var(--item5-zIndex);
            opacity: var(--item5-opacity);
            pointer-events: none;
          }

          /* animation text in item2 */
          .carousel .list .item:nth-child(2) .introduce .title,
          .carousel .list .item:nth-child(2) .introduce .topic,
          .carousel .list .item:nth-child(2) .introduce .des,
          .carousel .list .item:nth-child(2) .introduce .seeMore {
            opacity: 0;
            animation: showContent 0.5s 1s ease-in-out 1 forwards;
          }
          @keyframes showContent {
            from {
              transform: translateY(-30px);
              filter: blur(10px);
            }
            to {
              transform: translateY(0);
              opacity: 1;
              filter: blur(0px);
            }
          }
          .carousel .list .item:nth-child(2) .introduce .topic {
            animation-delay: 1.2s;
          }
          .carousel .list .item:nth-child(2) .introduce .des {
            animation-delay: 1.4s;
          }
          .carousel .list .item:nth-child(2) .introduce .seeMore {
            animation-delay: 1.6s;
          }

          /* next click */
          .carousel.next .item:nth-child(1) {
            animation: moveToPosition0 0.5s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition0 {
            to {
              transform: translateX(-150%) translateY(-10%) scale(2);
              filter: blur(50px);
              opacity: 0;
            }
          }
          .carousel.next .item:nth-child(2) {
            animation: moveToPosition1 0.5s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition1 {
            to {
              transform: var(--item1-transform);
              filter: var(--item1-filter);
              opacity: var(--item1-opacity);
            }
          }
          .carousel.next .item:nth-child(3) {
            animation: moveToPosition2 0.7s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition2 {
            to {
              transform: var(--item2-transform);
              filter: var(--item2-filter);
              opacity: var(--item2-opacity);
            }
          }
          .carousel.next .item:nth-child(4) {
            animation: moveToPosition3 0.9s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition3 {
            to {
              transform: var(--item3-transform);
              filter: var(--item3-filter);
              opacity: var(--item3-opacity);
            }
          }
          .carousel.next .item:nth-child(5) {
            animation: moveToPosition4 1.1s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition4 {
            to {
              transform: var(--item4-transform);
              filter: var(--item4-filter);
              opacity: var(--item4-opacity);
            }
          }

          /* previous */
          .carousel.prev .item:nth-child(5) {
            animation: moveToPosition4Back 0.5s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition4Back {
            to {
              transform: translateX(150%) translateY(40%) scale(0.1);
              filter: blur(50px);
              opacity: 0;
            }
          }
          .carousel.prev .item:nth-child(4) {
            animation: moveToPosition5 0.7s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition5 {
            to {
              transform: var(--item5-transform);
              filter: var(--item5-filter);
              opacity: var(--item5-opacity);
            }
          }
          .carousel.prev .item:nth-child(3) {
            animation: moveToPosition4Prev 0.9s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition4Prev {
            to {
              transform: var(--item4-transform);
              filter: var(--item4-filter);
              opacity: var(--item4-opacity);
            }
          }
          .carousel.prev .item:nth-child(2) {
            animation: moveToPosition3Prev 1.1s ease-in-out 1 forwards;
          }
          @keyframes moveToPosition3Prev {
            to {
              transform: var(--item3-transform);
              filter: var(--item3-filter);
              opacity: var(--item3-opacity);
            }
          }
          .carousel.prev .item:nth-child(1) {
            animation: moveFromPosition0 0.5s ease-in-out 1 forwards;
          }
          @keyframes moveFromPosition0 {
            from {
              transform: translateX(-150%) translateY(-10%) scale(2);
              filter: blur(50px);
              opacity: 0;
            }
            to {
              transform: var(--item5-transform);
              filter: var(--item5-filter);
              opacity: var(--item5-opacity);
            }
          }

          /* Detail view styling - FIXED */
          .carousel .list .item .detail {
            display: none !important;
            position: absolute;
            opacity: 0;
            visibility: hidden;
            width: 0;
            height: 0;
            right: -9999px; /* Move completely off-screen */
            overflow: hidden;
            pointer-events: none;
          }

          /* showDetail styling - FIXED */
          .carousel.showDetail .list .item-3,
          .carousel.showDetail .list .item-4,
          .carousel.showDetail .list .item-5 {
            left: 100%;
            opacity: 0;
            pointer-events: none;
          }

          .carousel.showDetail .list .item-1 {
            opacity: 0;
            pointer-events: none;
          }

          .carousel.showDetail .list .item-2 {
            width: 100%;
          }

          .carousel.showDetail .list .item-2 .introduce {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }

          .carousel.showDetail .list .item-2 img {
            right: 50%;
          }

          .carousel.showDetail .list .item-2 .detail {
            display: block !important;
            opacity: 1;
            visibility: visible;
            width: 45%;
            height: auto;
            right: 5%;
            top: 50%;
            transform: translateY(-50%);
            text-align: left;
            pointer-events: auto;
            overflow: visible;
            z-index: 5;
            padding-left: 30px;
          }

          .carousel.showDetail .list .item-2 .detail .title {
            font-size: 3em;
            line-height: 1.2;
            margin-bottom: 0.5em;
            color: #222;
            text-align: left;
          }

          .carousel.showDetail .list .item-2 .detail .des {
            font-size: 0.95em;
            line-height: 1.6;
            color: #444;
            margin-bottom: 2em;
            max-height: 200px;
            overflow-y: auto;
            padding-left: 0;
            padding-right: 10%;
            text-align: left;
          }

          .carousel.showDetail .list .item-2 .detail .specifications {
            display: flex;
            gap: 15px;
            width: 100%;
            border-top: 1px solid #5553;
            margin-top: 20px;
            padding-top: 15px;
            overflow-x: auto;
            justify-content: flex-start;
          }

          .carousel.showDetail .list .item-2 .detail .specifications div {
            width: 90px;
            text-align: center;
            flex-shrink: 0;
          }

          .carousel.showDetail
            .list
            .item-2
            .detail
            .specifications
            div
            p:nth-child(1) {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
          }

          .carousel.showDetail
            .list
            .item-2
            .detail
            .specifications
            div
            p:nth-child(2) {
            color: #666;
          }

          .carousel.showDetail .list .item-2 .checkout {
            margin-top: 2em;
          }

          .carousel.showDetail .list .item-2 .checkout button {
            font-family: "Poppins", sans-serif;
            background-color: transparent;
            border: 1px solid #5555;
            margin-left: 12px;
            padding: 8px 15px;
            letter-spacing: 2px;
            font-weight: 500;
            cursor: pointer;
          }

          .carousel.showDetail .list .item-2 .checkout button:nth-child(2) {
            background-color: #693eff;
            color: #eee;
            font-family: "Poppins", sans-serif;
          }

          .carousel.showDetail .list .item-2 .detail .title,
          .carousel.showDetail .list .item-2 .detail .des,
          .carousel.showDetail .list .item-2 .detail .specifications,
          .carousel.showDetail .list .item-2 .detail .checkout {
            opacity: 0;
            animation: showContent 0.5s 1s ease-in-out 1 forwards;
          }

          .carousel.showDetail .list .item-2 .detail .des {
            animation-delay: 1.2s;
          }

          .carousel.showDetail .list .item-2 .detail .specifications {
            animation-delay: 1.4s;
          }

          .carousel.showDetail .list .item-2 .detail .checkout {
            animation-delay: 1.6s;
          }

          .carousel::before {
            width: 500px;
            height: 300px;
            content: "";
            background-image: linear-gradient(
              70deg,
              rgba(105, 62, 255, 0.1),
              rgba(60, 120, 200, 0.1)
            );
            position: absolute;
            z-index: -1;
            border-radius: 20% 30% 80% 10%;
            filter: blur(150px);
            top: 50%;
            left: 50%;
            transform: translate(-10%, -50%);
            transition: 1s;
          }
          .carousel.showDetail::before {
            transform: translate(-100%, -50%) rotate(90deg);
            filter: blur(130px);
          }

          /* New Button Styles */
          .custom-btn {
            background: #1aab8a;
            color: #fff;
            border: none;
            position: relative;
            height: 60px;
            font-size: 1.6em;
            padding: 0 2em;
            cursor: pointer;
            transition: 800ms ease all;
            outline: none;
            font-family: "Poppins", sans-serif;
            letter-spacing: 2px;
          }

          .custom-btn:hover {
            background: #fff;
            color: #1aab8a;
          }

          .custom-btn:before,
          .custom-btn:after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            height: 2px;
            width: 0;
            background: #1aab8a;
            transition: 400ms ease all;
          }

          .custom-btn:after {
            right: inherit;
            top: inherit;
            left: 0;
            bottom: 0;
          }

          .custom-btn:hover:before,
          .custom-btn:hover:after {
            width: 100%;
            transition: 800ms ease all;
          }

          /* Custom adjustments for See All button */
          #back {
            position: absolute;
            z-index: 100;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: opacity 0.5s, transform 0.3s, background-color 0.8s,
              color 0.8s;
            font-size: 1.2rem;
            height: 50px;
          }

          #back:hover {
            transform: translateX(-50%) translateY(-3px);
          }

          .carousel.showDetail #back {
            opacity: 1;
          }

          @media screen and (max-width: 1200px) {
            .carousel .list {
              max-width: 95%;
            }
            .carousel .list .item {
              width: 80%;
            }
            .carousel-navigation {
              width: 108%;
              left: -4%;
            }
            .carousel .list .item .introduce {
              width: 45%;
            }
            .carousel .list .item .introduce .topic {
              font-size: 2.5em;
            }
          }

          @media screen and (max-width: 991px) {
            .carousel .list .item {
              width: 90%;
            }
            .carousel.showDetail .list .item-2 .detail .specifications {
              overflow: auto;
            }
            .carousel.showDetail .list .item-2 .detail .title {
              font-size: 2.2em;
            }
            #prev,
            #next {
              width: 50px;
              height: 50px;
              font-size: 1.2rem;
            }
            .carousel-navigation {
              width: 106%;
              left: -3%;
            }
            .carousel .list .item .introduce {
              width: 50%;
              left: 3%;
            }
            .carousel .list .item .introduce .topic {
              font-size: 2.2em;
            }
            .carousel .list .item .introduce .des {
              max-height: 120px;
            }
            .carousel.showDetail .list .item-2 .detail {
              width: 48%;
              right: 3%;
            }
          }

          @media (min-width: 200px) and (max-width: 872px) {
            .carousel {
              height: 600px;
            }
            .carousel .list .item {
              width: 100%;
              font-size: 10px;
              height: 80vh;
              margin-left: 0;
            }
            .carousel .list {
              height: 40%;
              max-width: 100%;
            }
            #prev,
            #next {
              width: 40px;
              height: 40px;
              font-size: 1rem;
            }
            .carousel-navigation {
              width: 104%;
              left: -2%;
            }
            .carousel .list .item .introduce {
              width: 60%;
              left: 2%;
              max-width: none;
            }
            .carousel .list .item .introduce .title {
              font-size: 1.3em;
            }
            .carousel .list .item .introduce .topic {
              font-size: 1.8em;
              margin-bottom: 0.3em;
            }
            .carousel .list .item .introduce .des {
              font-size: 0.85em;
              max-height: 100px;
              margin-bottom: 1em;
            }
            .carousel .list .item-2 .introduce .seeMore {
              font-size: 0.8rem;
              height: 36px;
              padding: 0 1.2em;
            }
            .carousel.showDetail .list .item-2 .detail {
              width: 55%;
              right: 2%;
              text-align: right;
            }
            .carousel.showDetail .list .item-2 .detail .title {
              font-size: 1.8em;
            }
            .carousel.showDetail .list .item-2 .detail .des {
              font-size: 0.85em;
              max-height: 120px;
              padding-left: 5%;
            }
            .carousel.showDetail .list .item-2 .detail .specifications {
              gap: 8px;
            }
            .carousel.showDetail .list .item-2 .detail .specifications div {
              width: 70px;
            }
            .carousel.showDetail .list .item-2 .checkout button {
              padding: 6px 10px;
              font-size: 0.85em;
              margin-left: 8px;
            }
          }

          /* Navigation styles */
          .carousel-navigation {
            position: absolute;
            top: 50%;
            width: 110%;
            left: -5%;
            transform: translateY(-50%);
            display: flex;
            justify-content: space-between;
            z-index: 20;
            pointer-events: none;
          }

          #prev,
          #next {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: rgba(255, 255, 255, 0.85);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            color: #333;
            border: none;
            font-size: 1.5rem;
            pointer-events: auto;
          }

          #prev:hover,
          #next:hover {
            background: white;
            transform: scale(1.1);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
            color: #693eff;
          }

          #prev:active,
          #next:active {
            transform: scale(0.95);
          }

          #prev.hidden,
          #next.hidden {
            opacity: 0;
            pointer-events: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Product;
