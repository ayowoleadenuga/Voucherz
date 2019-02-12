import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import { requestVoucher } from "../util/APIUtils";
// import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import CustomizedDialogDemo from "../views/voucher/modal";
import { CSVLink } from "react-csv";

const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};
class VoucherTable extends React.Component {
  state = {
    voucher: [],
    isLoading: true,
    error: null,
    search: ""
  };
  componentDidMount = () => {
    // console.log(requestVoucher());
    requestVoucher()
      .then(response => {
        const newUser = response;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          ...this.state,
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
  };
  changeHandler = e => {
    let value = e.target.value;
    this.setState({
      ...this.state,
      search: value
    });
  };
  headers = [
    { label: "Voucher", key: "voucherCode" },
    { label: "Campaign Name", key: "campaignName" },
    { label: "Voucher Type", key: "type" },
    { label: "Status", key: "status" },
    { label: "Expiry Date", key: "expiryDate" }
  ];
  data = this.state.voucher.map(item => [
    {
      voucherCode: item.voucherCode,
      campaignName: item.campaignName,
      type: item.type,
      status: item.status,
      expiryDate: item.expiryDate
    }
  ]);
  render() {
    let voucher = this.state.voucher.filter(v => {
      return (
        v.voucherCode.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    let i = 1;
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">All Voucher Table</CardTitle>
              </CardHeader>
              <Row>
                <Col xs={{ size: 10, offset: 1 }}>
                  <form>
                    <InputGroup className="no-border">
                      <Input
                        name="search"
                        value={this.state.search}
                        placeholder="Search..."
                        onChange={this.changeHandler}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="nc-icon nc-zoom-split" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </Col>
                <Col xs={{ size: 1 }}>
                  <CSVLink data={this.data} headers={this.headers}>
                    <i
                      id="sharebtn"
                      className="nc-icon nc-share-66 text-primary"
                      onClick={this.handleShare}
                    />
                  </CSVLink>
                </Col>
              </Row>
              <CardBody>
                {!this.state.isLoading ? (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-left">S/N</th>
                        <th className="text-left">Voucher-Code</th>
                        <th className="text-left">Campaign-Name</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Expiry-Date</th>
                        <th className="text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voucher.map(item => (
                        <tr key={item.voucherCode}>
                          <td>{i++}</td>
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
