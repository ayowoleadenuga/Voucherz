import React from "react";
import MUIDataTable from "mui-datatables";

class Customers extends React.Component {
  columns = ["Name", "Email", "Tel", "Gender"];

  data = [
    ["Aihe Omoede", "aihe.omoede@interswitchgroup.ng", "08123346578", "M"],
    ["Stephen Enunwah", "steve4real@gmail.com", "08033883245", "M"],
    ["Chinedu Mefendja", "mefendja.chinedu@gmail.com", "08033467632", "M"],
    ["Ayowole Adenuga", "ayowoleadenuga@gmail.com", "08102650435", "M"]
  ];
  options = {
    filterType: "checkbox"
  };

  render() {
    return (
      <div className="content">
        <MUIDataTable
          title={"Customers List"}
          data={this.data}
          columns={this.columns}
          options={this.options}
        />
      </div>
    );
  }
}

export default Customers;
