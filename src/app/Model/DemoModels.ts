// export class newFlowDataJSON {
//   static formData: any = {
//     flows: [{
//       // flowType: [
//       //     {
//             // flowname: "",
//             typeCtrlName: "",
//             flowid: "",
//             count: "",
//             list: [],
//           // },
//         // ]
//   }],
//   };
// }
export class FlowDataJSON {
  static formData: any = {
    flows: [
      {
        flowid: "",
        flowname: "",
         flowType: [
          {
           
            typeCtrlName: "",
            count: "",
          
            eCounter: "",
            list: [],
          },
        ],
     },
   
     ],
  };
}
