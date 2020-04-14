import React, { useEffect, Fragment } from "react";
import Config from "../config";
import { useFetch, useQuery } from "../hooks";
import { Helmet } from "react-helmet";

// Components
import Trainer from "../components/Trainer";
import Loader from "../components/Loader";

const Trainers = ({ history, location , match}) => {
  const query = useQuery(match.params);

  const country = query.get("country");
  const city = query.get("city");
  const service = query.get("service");
  const category = query.get("category");

  const url = () => {
    if (service) {
      return `${Config.API_URL}/trainers?service=${service}`;
    } else if (category) {
      return `${Config.API_URL}/trainers?category=${category}`;
    }
    return `${Config.API_URL}/trainers?country=${country}${
      city ? `&city=${city}` : ""
    }`;
  };

  const [data, loading] = useFetch(url());

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const getParamsType = () => {
    if (service) {
      return `Service Type: ${service}`;
    } else if (country && !city) {
      return `Country: ${country}`;
    } else if (country && city) {
      return `City: ${city}`;
    } else if (category) {
      return `Category: ${category}`;
    }
  };

  const getParamsTypeTitle = () => {
    if (service) {
      return service;
    } else if (country && !city) {
      return country;
    } else if (country && city) {
      return city;
    } else if (category) {
      return "Online Trainer";
    }
  };

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Available Trainers - {getParamsTypeTitle()}</title>
        <meta
          name="keywords"
          content={
            data.length &&
            data.map(trainer => trainer.first_name + " " + trainer.last_name)
          }
        />
      </Helmet>
      <section className="trainers">
        {loading && <Loader />}
        <div className="container">
          <div className="page__back" onClick={() => history.push("/")}>
            <img src="/images/arrowBack.svg" alt="" />
            <span>Back</span>
          </div>
          {data.length ? (
            <Fragment>
              <div className="page__mainTitle">
                <h1>Available Trainers</h1>
                <div className="page__country">{getParamsType()}</div>
              </div>
              <div className="trainers__items">
                {data.map(trainer => (
                  <Trainer trainer={trainer} key={trainer.id} />
                ))}
              </div>
            </Fragment>
          ) : (
            ""
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default Trainers;
