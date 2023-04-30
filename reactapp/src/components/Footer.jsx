import React from 'react'


function Footer() {
  return (
    <div className="main-footer bg-dark variant-dark">
        <div className="container text-white" >
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <h4>Contact Us</h4>
                    <ul className="list-unstyled">
                        <li>Uganda</li>
                        <li>M: +(12) 1234567890</li>
                        <li>E: <a href = "mailto: ReactApp@example.com">ReactApp@example.com</a></li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6">
                    <h4>Yeah Buddy!!!</h4>
                    <ul className="list-unstyled">
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-6">
                    <h4 >Yeah Buddy!!!</h4>
                    <ul className="list-unstyled">
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="footer-bottom">
                <p className="text-xs-bottom">
                    &copy;{new Date().getFullYear()} TB & JRB Website
                </p>
            </div>
        </div>
    </div>
  )
}
export default Footer;