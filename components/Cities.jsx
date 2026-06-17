import React from "react";
import Link from "next/link";
import { getServerApiBase } from "@/lib/serverApi";

const cityImages = {
  Melbourne: "/assets/images/cities-img/Melbourne.jpg",
  Sydney: "/assets/images/cities-img/Sydney.jpg",
  Perth: "/assets/images/cities-img/Perth.jpg",
  Brisbane: "/assets/images/cities-img/Brisbane.jpg",
};

const Cities = async () => {
  let result = { data: [] };

  try {
    const res = await fetch(`${getServerApiBase()}/home-cities`, {
      cache: "no-store",
    });

    if (!res.ok) {
      result = { data: [] };
    } else {
      result = await res.json();
    }
  } catch (error) {
    result = { data: [] };
  }

  const getCity = (name) => {
    return (
      result.data?.find((city) => city.name === name) || {
        name,
        slug: name.toLowerCase(),
        listings_count: 0,
      }
    );
  };

  const melbourne = getCity("Melbourne");
  const sydney = getCity("Sydney");
  const perth = getCity("Perth");
  const brisbane = getCity("Brisbane");

  const CityCard = ({ city, normalHeight = false }) => (
    <div className={`city-grid ${normalHeight ? "city-grid-normal-height" : ""}`}>
      <div className="city-img">
        <img src={cityImages[city.name]} alt={city.name} />
      </div>

      <div className="city-title">
        <div className="listings-count">
          <span className="count-number">{city.listings_count}</span>
          <p className="count-text">Listings</p>
        </div>

        <h3>
          <Link href={`/business-listings?city=${city.slug}`}>
            {city.name}
          </Link>
        </h3>
      </div>
    </div>
  );

  return (
    <section className="cities-area">
      <div className="container">
        <div className="section-heading">
          <div className="section-icon">☆</div>
          <div>
            <h2>Explore Popular Cities</h2>
            <p>Explore top categories and find the best businesses near you.</p>
          </div>
        </div>

        <div className="row g-0 cities-row">
          <div className="col-12 col-md-6 col-lg-4 city-col city-col-large">
            <CityCard city={melbourne} />
          </div>

          <div className="col-12 col-md-6 col-lg-4 city-col city-col-middle">
            <CityCard city={sydney} normalHeight />
            <CityCard city={perth} normalHeight />
          </div>

          <div className="col-12 col-md-6 col-lg-4 city-col city-col-large">
            <CityCard city={brisbane} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cities;