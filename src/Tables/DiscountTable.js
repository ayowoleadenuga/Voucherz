import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";

import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import MUIDataTable from "mui-datatables";
// import CustomizedDialogDemo from "./modal";

const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};
const options = {
  filterType: "checkbox"
};
class VoucherTable extends React.Component {
  state = {
    data: [],
    columns: [],
    tableData: [],
    isLoading: true,
    error: null
  };
  restP() {
    let ob = [...this.state.data];
    for (let i = 0; i < ob.length; i++) {
      delete ob[i].startDate,
        ob[i].value,
        ob[i].dateCreated,
        ob[i].dateCreated,
        ob[i].discountType,
        ob[i].value,
        ob[i].redemptionCount,
        ob[i].redeemedAmount,
        ob[i].type;
      // ob[i].zedValue =
    }
    return ob;
  }
  componentDidMount() {
    axios
      .get("https://172.20.20.23:5001/List/SHOPRITE-PROMO?Merchant=Enunwah", {
        responseType: "json"
      })
      .then(response => {
        const newUser = response.data;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          data: voucherDataArr,
          isLoading: false
        });
        // eslint-disable-next-line no-console
        console.log(voucherDataArr);
      })
      .catch(error =>
        this.setState({
          ...this.state,
          error: error,
          isLoading: false
        })
      );
  }
  data = () => {
    this.state.data.map(function(obj) {
      return Object.keys(obj)
        .sort()
        .map(function(key) {
          return obj[key];
        });
    });
  };
  column = ["Voucher-Code", "Campaign-Name", "Status", "Expiry-Date"];
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Discount Voucher Table</CardTitle>
              </CardHeader>
              <CardBody>
                {!this.state.isLoading ? (
                  <MUIDataTable
                    title={"Employee List"}
                    data={this.data}
                    columns={this.columns}
                    options={options}
                  />
                ) : (
                  <ScaleLoader
                    css={override}
                    color={"#0bf"}
                    size={300}
                    sizeUnit={"px"}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default VoucherTable;
