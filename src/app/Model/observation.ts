export class ListOfInput {
  data = [
    {
      textField: true,
      name: "Name",
      type: "text",
      lable: "Name",
      placeholder: "Name",
      value: "",
      error: false,
      errorText: "Name can't be empty",
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
    // {
    //   textField: true,
    //   name: "city",
    //   type: "text",
    //   lable: "City",
    //   placeholder: "City",
    //   value: "",
    //   error: false,
    //   errorText: "City can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "state",
    //   type: "text",
    //   lable: "State",
    //   placeholder: "State",
    //   value: "",
    //   error: false,
    //   errorText: "State can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "pincode",
    //   type: "number",
    //   lable: "Pincode",
    //   placeholder: "Pincode",
    //   value: "",
    //   error: false,
    //   errorText: "Pincode can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "Email_Id",
    //   type: "email",
    //   lable: "Email ID",
    //   placeholder: "Email ID",
    //   value: "",
    //   error: false,
    //   errorText: "Email ID can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "Contact_No",
    //   type: "number",
    //   lable: "Contact No",
    //   placeholder: "Contact No",
    //   value: "",
    //   error: false,
    //   errorText: "Contact No can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "Alternate_No",
    //   type: "number",
    //   lable: "Alternate No",
    //   placeholder: "Alternate No",
    //   value: "",
    //   error: false,
    //   errorText: "Alternate No can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "Contact_Person",
    //   type: "text",
    //   lable: "Contact Person Name",
    //   placeholder: "Contact Person Name",
    //   value: "",
    //   error: false,
    //   errorText: "Contact Person Name can't be empty",
    // },
    // {
    //   textField: true,
    //   name: "Designation",
    //   type: "text",
    //   lable: "Designation",
    //   placeholder: "Designation",
    //   value: "",
    //   error: false,
    //   errorText: "Designation can't be empty",
    // },
  ];
}
export class MillModel {
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
export class SelectMill {
  public custid: string = "";
}
export class DeleteMill {
  public id: string;
  public custid: string;
}
export class GetMillInput {
  public Audit_Name: "New";
  public audit_id: "7";
  public id: "1";
  public Mill_Name: "Mill11111";
  public username: "staff";
  public password: "staff@123";
  public Reg_id: "82";
  public custid: "1000054";
  public FlowNo: "1";
  public LevelNo: "1";
  public Level_Sno: "1";
  public PT_Id: "8";
  public No_of_Mcs: "44";
  public PT_Make: "Atlas";
  public PT_Cap_MVA_Natural: "25590";
  public PT_Cap_MVA_Forced: "4321";
  public PT_EHT_Voltage: "4322";
  public PT_EHT_Current: "4323";
  public PT_HT_Voltage: "43246";
  public PT_HT_Current: "4325";
  public PT_Imp_per: "4326";
  public PT_Tap: "Off Circuit";
  public PT_No_Tap: "1";
  public PT_Cable_Material: "Al";
  public PT_Cable_Size: "20";
  public PT_LT_Cable_Material: "Sample";
  public PT_LT_Cable_Size: "80";
  public PT_Cooling_Type: "Forced";
  public PT_Indoor_outdoor: "Indoor";
  public PT_Core_Type: "EE";
  public From_Date: " ";
  public To_Date: " ";
  public Unit_Name: "Unit";
  public address: "address";
  public city: "city";
  public state: "state";
  public pincode: "888888";
  public Email_Id: "email";
  public Contact_No: "3543534";
  public Alternate_No: "24234234";
  public Contact_Person: "Contact";
  public Designation: "desig";
  public Unit_Id: "5";
}
