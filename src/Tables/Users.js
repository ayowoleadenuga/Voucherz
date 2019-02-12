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

// import axios from "axios";
import { requestUsers } from "../util/APIUtils";
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
    requestUsers()
      .then(response => {
        const newUser = response;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          ...this.state,
          user: response,
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
    { label: "First-Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Active", key: "active" },
    { label: "Role", key: "role" },
    { label: "Date Created", key: "dateCreated" }
  ];
  data = this.state.user.map(item => [
    item.firstName,
    item.lastName,
    item.email,
    item.active,
    item.role,
    item.dateCreated
  ]);
  render() {
    console.log(this.data);
    let user = this.state.user.filter(v => {
      console.log(v.active);
      return (
        v.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
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
                <CardTitle tag="h4">Users</CardTitle>
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
                        <th className="text-left">First-Name</th>
                        <th className="text-left">Last-Name</th>
                        <th className="text-left">Email</th>
                        <th className="text-left">Active</th>
                        <th className="text-left">Role</th>
                        <th className="text-left">Date-Created</th>
                        <th className="text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map(item => (
                        <tr key={item.email}>
                          <td>{i++}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>{item.active.toString()}</td>
                          <td>{item.role}</td>
                          <td>{item.dateCreated}</td>
                          <td>
                            <UserDialogDemo
                              firstName={item.firstName}
                              lastName={item.lastName}
                              email={item.email}
                              active={item.active.toString()}
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
