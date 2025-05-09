import React from 'react';

const Contact = () => {
    return (
        <section className="contact-page-section">
        <div className="container">
          <div className="sec-title">
            <div className="title">
              ::before
              Contact Us
            </div>
            <h2>Let’s Get in Touch.</h2>
          </div>
      
          <div className="inner-container">
            <div className="row clearfix">
              
              <div className="form-column col-md-8 col-sm-12 col-xs-12">
                <div className="inner-column">
                  
                  <div className="contact-form">
                    <form method="POST" action="/contact" id="contact-form">
                      <div className="row clearfix">
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <input type="text" name="name" value placeholder="Name" required/>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <input type="email" name="email" value placeholder="Email" required/>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <input type="text" name="subject" value placeholder="Subject" required/>
                        </div>
                        <div className="form-group col-md-6 col-sm-6 col-xs-12">
                          <input type="text" name="phone" value placeholder="Phone" required/>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <textarea name="message" placeholder="Message"></textarea>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                          <button type="submit" className="theme-btn btn-style-one">Send Now</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Contact;