import React, { useState } from "react";

const Header = () => {

  const [isOpened, setOpened] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrap">
          <div className="header__logoBox">
            <img src="/images/logo.svg" alt="Fitforce" className="header__logo" onClick={() => window.location = "https://fitforce.com/"} />
            <img
              src="/images/logo_small.svg"
              alt="Fitforce"
              className="header__logo_small"
              onClick={() => window.location = "https://fitforce.com/"} 
            />
          </div>
          <div className="header__burger" onClick={() => setOpened(!isOpened)}>
            {isOpened ? "close Menu" : "Menu"}
          </div>
          <div className="header__linksBox">
            <div className={`header__links ${isOpened ? "opened" : ""}`}>
              <a href="https://fitforce.com" className="header__link">
                Fitness App
              </a>
              <a href="https://fitforce.zendesk.com" className="header__link">
                Support
              </a>
              <a href="https://fitforce.com/magazine" className="header__link">
                Magazine
              </a>
              <a href="https://fitforce.com/trainer" className="header__link">
                For Trainers
              </a>
            </div>
            <div className="header__cloud">
              <img src="/images/cloud.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
