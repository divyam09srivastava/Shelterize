import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Home = () => {
  return (
    <div>
      <Header currUser={null} />
      <section className="banner-area relative" id="home">
        <div className="container">
          <div className="overlay overlay-bg"></div>
          <div className="row fullscreen d-flex align-items-center justify-content-start">
            <div className="banner-content col-lg-8 col-md-12">
              <h1 className="text-uppercase">
                Give us Shelter. <br />
                We need your help.
              </h1>
              <p className="text-white sub-head">
                We will help you locate shelters near you.
              </p>
              <div className="row justify-content-between">
                <a
                  href="/locate"
                  className="col-10 col-md-3 primary-btn header-btn text-uppercase offset-1 mb-1"
                >
                  Need Help
                </a>
                <a
                  href="./#wanttohelp"
                  className="col-10 col-md-3 primary-btn header-btn text-uppercase offset-1 mb-1"
                  style={{ marginright: "0px", padding: "20px,20px,20px,20px" }}
                >
                  Want to Help
                </a>
                <a
                  href="/nearme"
                  className="col-10 col-md-3 primary-btn header-btn text-uppercase offset-1 mb-1"
                >
                  Shelter Near Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
    			<section className="callto-top-area section-gap">
    				<div className="container">
    					<div className="row justify-content-between callto-top-wrap pt-40 pb-40">
    						<div className="col-lg-8 callto-top-left">
    							<h1>Locate a street dog..</h1>
    						</div>
    						<div className="col-lg-4 callto-top-right">
    							<a href="/locate" className="primary-btn">Locate</a>
    						</div>
    					</div>
    				</div>
    			</section> */}

      <section className="process-area section-gap" id="wanttohelp">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="menu-content pb-60 col-lg-8">
              <div className="title text-center">
                <h1 className="mb-10">
                  Process to Register your Organisation for Help
                </h1>
                <p>who need your care and love.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-process">
                <span className="lnr lnr-license"></span>
                <a href="#">
                  <h4>Registeration Form Filling</h4>
                </a>
                <p>
                  You need to first register your organisation on our
                  application.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-process">
                <span className="lnr lnr-user"></span>
                <a href="#">
                  <h4>Selection</h4>
                </a>
                <p>
                  Select the no. of people your organisation can give shelter to
                  at the moment.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-process">
                <span className="lnr lnr-phone-handset"></span>
                <a href="#">
                  <h4>Contact them</h4>
                </a>
                <p>
                  You can get in touch with them through phone no. and enquire
                  wheather they are still in need for a shelter.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-process">
                <span className="lnr lnr-magic-wand"></span>
                <a href="#">
                  <h4>Congratulations</h4>
                </a>
                <p>Successfuly provided shelter to many people in need.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="calltoaction-area section-gap relative"
        id="volunteer"
      >
        <div className="container">
          <div className="overlay overlay-bg"></div>
          <div className="row align-items-center justify-content-center">
            <h1 className="text-white col-12">Want to help? </h1>

            <p className="text-white" style={{ fontSize: "17px" }}>
              Nothing is as satisfying as watching a homeless person having a
              shelter to live and food to eat. If you want to help us in
              providing them home, Feel free to become to register and help the
              mankind.
            </p>
            <div className="buttons d-flex flex-row">
              <a href="/volunteer" className="primary-btn text-uppercase">
                Register now
              </a>
            </div>
          </div>
        </div>
        <div></div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
