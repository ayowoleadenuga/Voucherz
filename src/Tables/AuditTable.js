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

import axios from "axios";
import ScaleLoader from "react-spinners/ScaleLoader";
import { CSVLink } from "react-csv";
// import UserDialogDemo from "../views/Products/UserDialog";

const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};

class AuditTable extends React.Component {
  state = {
    audit: [],
    isLoading: true,
    error: null,
    search: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:8079/api/log/audit/events", {
        responseType: "json"
      })
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
  changeHandler = e => {
    let value = e.target.value;
    this.setState({
      ...this.state,
      search: value
    });
  };
  headers = [
    { label: "Last Name", key: "lastName" },
    { label: "Role", key: "role" },
    { label: "Action", key: "Action" },
    { label: "Date", key: "date" }
  ];
  data = this.state.audit.map(item => [
    {
      lastName: item.lastName,
      role: item.role,
      action: item.action,
      date: item.date
    }
  ]);
  render() {
    let audit = this.state.audit.filter(v => {
      return (
        v.code.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    let i;
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Audit Table</CardTitle>
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
                        <th className="text-left">Last-Name</th>
                        <th className="text-left">Role</th>
                        <th className="text-left">Action</th>
                        <th className="text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {audit.map(item => (
                        <tr key={item.audit.lastName}>
                          <td>{i++}</td>
                          <td>{item.audit.lastName}</td>
                          <td>{item.audit.role}</td>
                          <td>{item.audit.action}</td>
                          <td>{item.audit.date}</td>
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
export default AuditTable;
