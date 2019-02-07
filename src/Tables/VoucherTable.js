import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import { requestVoucher } from "../util/APIUtils";
// import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import CustomizedDialogDemo from "../views/voucher/modal";

const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};
class VoucherTable extends React.Component {
  state = {
    voucher: [],
    isLoading: true,
    error: null
  };
  componentDidMount() {
    requestVoucher("all")
      .then(response => {
        const newUser = response.data;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          voucher: voucherDataArr,
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
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Voucher Table</CardTitle>
              </CardHeader>
              <CardBody>
                {!this.state.isLoading ? (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-left">Voucher-Code</th>
                        <th className="text-left">Campaign-Name</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Expiry-Date</th>
                        <th className="text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.voucher.map(item => (
                        <tr key={item.voucherCode}>
                          <td>{item.voucherCode}</td>
                          <td>{item.campaignName}</td>
                          <td>{item.type}</td>
                          <td>{item.status}</td>
                          <td>{item.expiryDate}</td>
                          <td>
                            <CustomizedDialogDemo
                              title={item.voucherCode}
                              campaignName={item.campaignName}
                              voucherType={item.type}
                              status={item.status}
                              redemptionStatus={item.redemptionStatus}
                              value={item.value}
                              dateCreated={item.dateCreated}
                              expiryDate={item.expiryDate}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
