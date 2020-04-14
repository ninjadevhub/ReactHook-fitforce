import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Config from "../config";
import { useFetch } from "../hooks";
import { servicesArr } from "../constants";
import { Helmet } from "react-helmet";

// Componenst
import Loader from "../components/Loader";
import LaterAvatar from "../components/LaterAvatar";

const Trainer = ({ match, history }) => {
  const [data, loading] = useFetch(
    `${Config.API_URL}/trainer_profile/${match.params.id}`
  );

  const [isValidUrl, setIsValidUrl] = useState(true);
  useEffect(() => {
    window.scroll(0, 0);
  }, [data]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {data.length && data[0].first_name + " " + data[0].last_name}
        </title>
        <meta
          name="keywords"
          content={
            data.length &&
            data[0].services &&
            data[0].services.map(service => servicesArr[service].value)
          }
        />
        <meta name="description" content={data.length && data[0].about} />
      </Helmet>
      <section className="trainer">
        {loading && <Loader />}

        <div className="container">
          <div className="page__back" onClick={() => history.goBack()}>
            <img src="/images/arrowBack.svg" alt="" />
            <span>Back</span>
          </div>
          {data.length ? (
            <div className="trainer__wrap">
              <div className="trainer__main">
                <h1>
                  {data[0].first_name + " " + data[0].last_name}{" "}
                  {data[0].business_name && "/ " + data[0].business_name}
                </h1>
                <p className="d-none d-md-block">
                  {(!data[0].city || !data[0].country) && (
                    <Link to={`/trainers-category/OnlineTrainer/`}>
                      Online Trainer
                    </Link>
                  )}

                  {data[0].city && data[0].country && (
                    <Link
                      to={`/trainers-city/${data[0].country}/${data[0].city}`}
                    >
                      {data[0].city}
                    </Link>
                  )}
                  {data[0].country && data[0].city && (
                    <Link to={`/trainers-country/${data[0].country}`}>
                      <i className="coma">, </i>
                      {data[0].country}
                    </Link>
                  )}
                </p>
                {data[0].certificates && data[0].certificates.length && (
                  <div className="trainer__certs">
                    <img src="/images/quality.svg" alt="" />
                    <p>{data[0].certificates.length} Certificates</p>
                  </div>
                )}
              </div>
              <div className="trainer__pic">
                {isValidUrl && data[0].avatar_url ? (
                  <img
                    src={data[0].avatar_url}
                    alt=""
                    onError={e => setIsValidUrl(false)}
                  />
                ) : (
                  <LaterAvatar
                    first_name={data[0].first_name}
                    last_name={data[0].last_name}
                  />
                )}
              </div>
              <div className="trainer__about">
                <div className="trainer__item trainer__item_mob">
                  <h6>City</h6>
                  <p>
                    {(!data[0].city || !data[0].country) && (
                      <Link to={`/trainers-category/OnlineTrainer/`}>
                        Online Trainer
                      </Link>
                    )}

                    {data[0].city && data[0].country && (
                      <Link
                        to={`/trainers-city/${data[0].country}/${data[0].city}`}
                      >
                        {data[0].city} <i className="coma">, </i>
                      </Link>
                    )}
                    {data[0].country && data[0].city && (
                      <Link to={`/trainers-country/${data[0].country}`}>
                        {data[0].country}
                      </Link>
                    )}
                  </p>
                </div>
                {data[0].certificates && data[0].certificates.length ? (
                  <div className="trainer__item trainer__item_desktop">
                    <h6>Certifications</h6>
                    <p>
                      {data[0].certificates.map((certificate, index) => (
                        <span className="trainers__spec_item" key={index}>
                          {certificate}
                          {index !== data[0].certificates.length - 1 && (
                            <i className="coma">, </i>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                ) : (
                  ""
                )}
                <div className="trainer__item">
                  <h6>Services</h6>
                  <p>
                    {data[0].services.map((service, index) => (
                      <Link
                        key={index}
                        to={`/trainers-service/${servicesArr[service].value}/`}
                      >
                        {servicesArr[service].value}
                        {index !== data[0].services.length - 1 && (
                          <i className="coma">, </i>
                        )}
                      </Link>
                    ))}
                  </p>
                </div>
                <div className="trainer__item">
                  <h6>About</h6>
                  <p>{data[0].about}</p>
                </div>
                <div className="trainer__socials">
                  {data[0].facebook_url && (
                    <a
                      target="_target"
                      href={`https://www.facebook.com/${data[0].facebook_url}`}
                      className="trainer__social"
                    >
                      <img src="/images/ff.svg" alt="" />
                    </a>
                  )}
                  {data[0].instagram_url && (
                    <a
                      target="_target"
                      href={`https://www.instagram.com/${data[0].instagram_url}`}
                      className="trainer__social"
                    >
                      <img src="/images/ii.svg" alt="" />
                    </a>
                  )}
                  {data[0].twitter_url && (
                    <a
                      target="_target"
                      href={`https://www.twitter.com/${data[0].twitter_url}`}
                      className="trainer__social"
                    >
                      <img src="/images/tt.svg" alt="" />
                    </a>
                  )}
                </div>
                <div className="trainer__download">
                  <p>
                    Download <span>FitForce.com</span> Personal Fitness app and
                    connect with <span>{data[0].first_name}</span>.
                  </p>
                  <div className="trainer__btns">
                    <a
                      href="https://itunes.apple.com/us/app/fitforce-com/id1419933665"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/Appstorebtn.svg" alt="" />
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.fitforce.client"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/images/Google play btn.svg" alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Trainer;
