export class AuditModel {
  public id: string;
  public custid: string;
  public Audit_Name: string;
  public From_Date: Date;
  public To_Date: Date;
}
export class DeleteAudit {
  public id: string;
  public custid: string;
}
export class SelectAudit {
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
      name: "Audit_Name",
      type: "text",
      lable: "Audit Name",
      placeholder: "Audit Name",
      value: "",
      error: false,
      errorText: "Audit Name can't be empty",
    },
    {
      textField: true,
      name: "From_Date",
      type: "datetime-local",
      lable: "From Date",
      placeholder: "From Date",
      value: "",
      error: false,
      errorText: "From Date can't be empty",
    },
    {
      textField: true,
      name: "To_Date",
      type: "datetime-local",
      lable: "To Date",
      placeholder: "To Date",
      value: "",
      error: false,
      errorText: "To Date can't be empty",
    },
  ];
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
