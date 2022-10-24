import React from 'react';
import { footerTags } from './tags';
export const Footer = () => {
  return (
    <div className="footer-clean" style={{ backgroundColor: 'orangered' }}>
      <div className="container text-white">
        <div className="row justify-content-center">
          <div className="col-sm-4 col-md-3 item">
            <h3>{footerTags.services}</h3>
            <ul>
              <li>{footerTags.webdesign}</li>
              <li>{footerTags.oportunities}</li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <h3>{footerTags.about}</h3>
            <ul>
              <li>{footerTags.company}</li>
              <li>{footerTags.team}</li>
              <li>{footerTags.history}</li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <h3>{footerTags.careers}</h3>
            <ul>
              <li>{footerTags.jobs}</li>
              <li>{footerTags.employers}</li>
              <li>{footerTags.employees}</li>
            </ul>
          </div>
          <div className="col-lg-3 item social">
            <p className="copyright">{footerTags.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
