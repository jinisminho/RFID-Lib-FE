/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Container, Button} from "reactstrap";

class StudentHeader extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-white shadow pb-2 pt-7 pt-md-3" style={{position:"sticky", zIndex:"20", top:"65px"}}>
          <Container>
            <div className="header-body text-center">
              <h1>{this.props.title}</h1>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default StudentHeader;
