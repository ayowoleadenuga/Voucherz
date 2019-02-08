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
import UserDialogDemo from "../views/Products/UserDialog";
import { CSVLink } from "react-csv";

const override = {
  display: "block",
  margin: "50px 45%",
  borderColor: "red"
};

class UsersTable extends React.Component {
  state = {
    user: [],
    isLoading: true,
    error: null,
    search: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:8085/auth/users?name", {
        responseType: "json"
      })
      .then(response => {
        const newUser = response.data;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          user: voucherDataArr,
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
      search: value
    });
  };
  headers = [
    { label: "First-Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Date Created", key: "dateCreated" }
  ];
  data = this.state.user.map(item => [
    {
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      role: item.role,
      dateCreated: item.dateCreated
    }
  ]);
  render() {
    let user = this.state.user.filter(v => {
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
                <CardTitle tag="h4">Users Table</CardTitle>
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
                        <th className="text-left">First-Name</th>
                        <th className="text-left">Last-Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left">Role</th>
                        <th className="text-left">Date-Created</th>
                        <th className="text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map(item => (
                        <tr key={item.user.email}>
                          <td>{item.user.firstName}</td>
                          <td>{item.user.lastName}</td>
                          <td>{item.user.email}</td>
                          <td>{item.user.role}</td>
                          <td>{item.dateCreated}</td>
                          <td>
                            <UserDialogDemo
                              firstName={item.firstName}
                              lastName={item.lastName}
                              email={item.email}
                              role={item.role}
                              dateCreated={item.dateCreated}
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
export default UsersTable;
