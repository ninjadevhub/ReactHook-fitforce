import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { servicesArr } from "../constants";
import LaterAvatar from "../components/LaterAvatar";

const Trainer = ({ trainer }) => {
  const {
    first_name,
    last_name,
    city,
    country,
    services,
    avatar_url,
    business_name,
    certificates,
    url
  } = trainer;
  const [isValidUrl, setIsValidUrl] = useState(true);

  return (
    <div className="trainers__item">
      <div className="trainers__main">
        <div className="trainers__pic">
          {isValidUrl && avatar_url ? (
            <img src={avatar_url} alt="" onError={e => setIsValidUrl(false)} />
          ) : (
            <LaterAvatar first_name={first_name} last_name={last_name} />
          )}
        </div>
        <div className="trainers__bio">
          <h5>{first_name + " " + last_name}</h5>
          <h6>{business_name}</h6>
        </div>
        <p className="trainers__geo">
          {city && country ? city + ", " + country : "Online Trainer"}
        </p>
      </div>
      {certificates && certificates.length ? (
        <div className="trainers__spec">
          <span>Certifications: </span>
          <div>
            {certificates.map((certificate, index) => (
              <span className="trainers__spec_item" key={index}>
                {certificate}
                {index !== certificates.length - 1 && (
                  <i className="coma">, </i>
                )}
              </span>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="trainers__spec">
        <span className="specialities">Specialities: </span>
        <div>
          {services.map((service, index) => (
            <span className="trainers__spec_item" key={index}>
              {servicesArr[service].value}
              {index !== services.length - 1 && <i className="coma">, </i>}
            </span>
          ))}
        </div>
      </div>
      <Link
        to={`/trainer-profile/${url}`}
        className="trainers__link"
      >
        Learn more about {first_name + " " + last_name}
      </Link>
    </div>
  );
};

Trainer.propTypes = {
  trainer: PropTypes.object
};

export default Trainer;
