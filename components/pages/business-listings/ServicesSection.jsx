"use client";

import React from "react";

const ServicesSection = ({ listing }) => {
  const services = listing?.services || [];

  const filteredServices = services.filter(
    (service) => service?.name?.trim()
  );

  if (!filteredServices.length) return null;

  return (
    <>
      <div className="listing-services-show">
        <h2 className="heading-title">Our Services</h2>

        <div className="services-list">
          <ul>
            {filteredServices.map((service, index) => {
              const priceNumber = Number(service.price);
              const hasPrice =
                service.price !== null &&
                service.price !== "" &&
                !Number.isNaN(priceNumber) &&
                priceNumber > 0;

              return (
                <li key={service.id || index}>
                  <div className="services-name">
                    {service.name}
                  </div>

                  {hasPrice && (
                    <div className="services-price">
                      {service.currency || "$"}
                      {priceNumber.toFixed(2)}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ServicesSection;