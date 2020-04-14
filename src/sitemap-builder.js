require("@babel/register");
const fetch = require("node-fetch");

const router = require("./Routes").default;
const Sitemap = require("react-router-sitemap").default;

const servicesArr = [
  { service: "Online Coaching" },
  { service: "Health and fitness training" },
  { service: "Yoga and Pilates" },
  { service: "Diet and nutrition" },
  { service: "Physiotherapy" },
  { service: "Other" }
];
const categoriesArr = [{ category: "OnlineTrainer" }];
const countrycitiesArr = [];

async function generateSitemap() {
  try {
    const trainers = await fetch(
      `https://87i6r1p1dc.execute-api.eu-central-1.amazonaws.com/dev/trainers`
    ).then(res => res.json());
    const countrycities = await fetch(
      `https://87i6r1p1dc.execute-api.eu-central-1.amazonaws.com/dev/countrycities`
    ).then(res => res.json());

    const countriesArr = Object.keys(countrycities).map(country => ({
      country
    }));

    const trainersIdArr = trainers.map(trainer => ({ id: trainer.url }));

    Object.keys(countrycities).forEach((country, index) => {
      countrycities[country].forEach(city => {
        countrycitiesArr.push({ country, city });
      });
    });

    const paramsConfig = {
      "/trainer-profile/:id": trainersIdArr,
      "/trainers-country/:country": countriesArr,
      "/trainers-service/:service": servicesArr,
      "/trainers-category/:category": categoriesArr,
      "/trainers-city/:country/:city": countrycitiesArr
    };

    return new Sitemap(router)
      .applyParams(paramsConfig)
      .build("https://trainers.fitforce.com/")
      .save("./sitemap.xml", "/static/");
  } catch (e) {
    console.log(e);
  }
}

generateSitemap();
