/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer pt-50">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 footer_logo">

            <Link to="/" style={{ textDecoration: "none" }}>
              <div>
                <h2
                  style={{
                    color: "#4CAF50",
                    fontWeight: "bold",
                    marginBottom: "0px",
                    letterSpacing: "1px"
                  }}
                >
                  SERVICE HUB
                </h2>

                <span
                  style={{
                    color: "#ddd",
                    fontSize: "12px",
                    letterSpacing: "1px"
                  }}
                >
                  Home Services Marketplace
                </span>
              </div>
            </Link>

            <p>
              Lorem ipsum dolor amet natum latine copiosa at quo, suas labore saperet has there any quote for write lorem percit latineu suas dummy.
            </p>

            <ul>
              <li>
                <a href="#">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-dribbble" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-vimeo" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-2 mt-xs-30 link_footer">
            <h4>Information</h4>
            <ul>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Service</a>
              </li>
              <li>
                <a href="#">Project</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-3 mt-sm-30 mt-xs-30 footer-latest-news">
            <h4>Latest News</h4>
            <div className="single-news">
              <h5>
                <a href="#">How can be successfull in market place..</a>
              </h5>
              <span>13 Nov, 2018 / Business</span>
            </div>
            <div className="single-news">
              <h5>
                <a href="#">How can be successfull in market place..</a>
              </h5>
              <span>13 Nov, 2018 / Business</span>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mt-sm-30 mt-xs-30 footer-subscribe">
            <h4>Subscribe Us</h4>
            <p>
              Lorem ipsum dolor amet natum latine copiosa at quo, suas labore saperet has there any quote.
            </p>
            <form>
              <input type="text" placeholder="Enter your e-mail" />
              <button type="button" className="btn-text">
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bottom-footer text-center">
        <div className="container">
          <div className="bor_top clearfix">
            <p>
              <a
                href="https://www.templateshub.net"
                target="_blank"
                rel="noreferrer"
              >
                Templates Hub
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;