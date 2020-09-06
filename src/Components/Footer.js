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

          {/* <div class="col-lg-4 col-md-4">
            <div class="single-footer-widget">
              <ul>
                <h6>Team Members</h6>

                <li>
                  <h4 style={{ color: "white" }}>Tanya Pandhi</h4>
                </li>
                <li>
                  <h4 style={{ color: "white" }}>Teghdeep Kapoor</h4>
                </li>
              </ul>
            </div>
          </div> */}

          <div class="col-lg-4  col-md-6">
            <div class="single-footer-widget mail-chimp">
              <h6 class="mb-20">Contact Us</h6>
              <ul class="list-contact">
                <li class="flex-row d-flex">
                  {/* <div class="icon">
                    <span class="lnr lnr-home"></span>
                  </div> */}
                  <div class="detail">
                    <h4>Tanya Pandhi</h4>

                    <p>
                      <div class="icon">
                        <span class="lnr lnr-pointer-right"></span>
                        <a href="https://github.com/tpandhi">Github</a>
                      </div>
                    </p>
                    <p>
                      <div class="icon">
                        <span class="lnr lnr-pointer-right"></span>
                        <a href="https://www.linkedin.com/in/tanya-pandhi-ba89481b3/">
                          Linkedin
                        </a>
                      </div>
                    </p>
                    <p></p>
                  </div>
                </li>
                <li class="flex-row d-flex">
                  {/* <div class="icon">
                    <span class="lnr lnr-phone-handset"></span>
                  </div> */}
                  <div class="detail">
                    <h4>Teghdeep Kapoor</h4>
                    {/* <p>Mon to Fri 9am to 6 pm</p> */}
                    <p>
                      <div class="icon">
                        <span class="lnr lnr-pointer-right"></span>
                        <a href="https://github.com/teghdeep">Github</a>
                      </div>
                    </p>
                    <p>
                      <div class="icon">
                        <span class="lnr lnr-pointer-right"></span>

                        <a href="https://www.linkedin.com/in/teghdeep-kapoor-8ab2961aa/">
                          Linkedin
                        </a>
                      </div>
                    </p>
                  </div>
                </li>
                {/* <li class="flex-row d-flex">
                  <div class="icon">
                    <span class="lnr lnr-envelope"></span>
                  </div>
                  <div class="detail">
                    <h4>support@shelterize.com</h4>
                    <p>Send us your query anytime!</p>
                  </div>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
