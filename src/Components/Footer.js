import React from "react";

const Footer = () => {
  return (
    <footer class="footer-area" id="end">
      <div class="container">
        <div class="row pt-120 pb-80">
          <div class="col-lg-4 col-md-6">
            <div class="single-footer-widget">
              <h6>About Us</h6>
              <p>
                We at Shelterize wish to provide every homeless person, who does
                not have a roof to live under due to a disaster or natural
                clamity, a Home. A place where they can feel at ease, where they
                can eat, sleep and experience the warmth of love and care.
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6"></div>
          <div class="col-lg-4  col-md-6">
            <div class="single-footer-widget mail-chimp">
              <h6 class="mb-20">Contact Us</h6>
              <ul class="list-contact">
                <li class="flex-row d-flex">
                  <div class="icon">
                    <span class="lnr lnr-home"></span>
                  </div>
                  <div class="detail">
                    <h4>Delhi,India</h4>

                    <p></p>
                  </div>
                </li>
                <li class="flex-row d-flex">
                  <div class="icon">
                    <span class="lnr lnr-phone-handset"></span>
                  </div>
                  <div class="detail">
                    <h4>+91 xxxxxxxxx</h4>
                    <p>Mon to Fri 9am to 6 pm</p>
                  </div>
                </li>
                <li class="flex-row d-flex">
                  <div class="icon">
                    <span class="lnr lnr-envelope"></span>
                  </div>
                  <div class="detail">
                    <h4>support@shelterize.com</h4>
                    <p>Send us your query anytime!</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
