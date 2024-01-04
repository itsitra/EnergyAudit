export class UnitModel {
  public id!: string;
  public custid: string;
  public Mill_Name: string;
  public address: string = "";
  public city: string = "";
  public state: string = "";
  public pincode: string = "";
  public Email_Id: string = "";
  public Contact_No: string = "";
  public Alternate_No: string = "";
  public Contact_Person: string = "";
  public Designation: string = "";
}
export class DeleteUnit {
  public id: string;
  public custid: string;
}
export class SelectUnit {
  public custid: string = "";
}

export class ListOfInput {
  data = [
    {
      textField: true,
      name: "custid",
      type: "number",
      lable: "Customer_id",
      placeholder: "Cust_id",
      value: "",
      error: false,
      errorText: "Customer_id can't be empty",
    },
    {
      textField: true,
      name: "Mill_Name",
      type: "text",
      lable: "Mill Name",
      placeholder: "Mill Name",
      value: "",
      error: false,
      errorText: "Mill Name can't be empty",
    },
    {
      textField: true,
      name: "Unit_Name",
      type: "text",
      lable: "Unit Name",
      placeholder: "Unit Name",
      value: "",
      error: false,
      errorText: "Unit Name can't be empty",
    },
    {
      textField: true,
      name: "address",
      type: "text",
      lable: "Address",
      placeholder: "Address",
      value: "",
      error: false,
      errorText: "Address can't be empty",
    },
    {
      textField: true,
      name: "city",
      type: "text",
      lable: "City",
      placeholder: "City",
      value: "",
      error: false,
      errorText: "City can't be empty",
    },
    {
      textField: true,
      name: "state",
      type: "text",
      lable: "State",
      placeholder: "State",
      value: "",
      error: false,
      errorText: "State can't be empty",
    },
    {
      textField: true,
      name: "pincode",
      type: "number",
      lable: "Pincode",
      placeholder: "Pincode",
      value: "",
      error: false,
      errorText: "Pincode can't be empty",
    },
    {
      textField: true,
      name: "Email_Id",
      type: "email",
      lable: "Email ID",
      placeholder: "Email ID",
      value: "",
      error: false,
      errorText: "Email ID can't be empty",
    },
    {
      textField: true,
      name: "Contact_No",
      type: "number",
      lable: "Contact No",
      placeholder: "Contact No",
      value: "",
      error: false,
      errorText: "Contact No can't be empty",
    },
    {
      textField: true,
      name: "Alternate_No",
      type: "number",
      lable: "Alternate No",
      placeholder: "Alternate No",
      value: "",
      error: false,
      errorText: "Alternate No can't be empty",
    },
    {
      textField: true,
      name: "Contact_Person",
      type: "text",
      lable: "Contact Person Name",
      placeholder: "Contact Person Name",
      value: "",
      error: false,
      errorText: "Contact Person Name can't be empty",
    },
    {
      textField: true,
      name: "Designation",
      type: "text",
      lable: "Designation",
      placeholder: "Designation",
      value: "",
      error: false,
      errorText: "Designation can't be empty",
    },
  ];
}
