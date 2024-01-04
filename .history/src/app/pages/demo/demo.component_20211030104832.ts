import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDialogService } from "@nebular/theme";
import { MasterTransformersComponent } from "./master-transformers/master-transformers.component";
import { TransformerFormComponent } from "./transformer-form/transformer-form.component";

@Component({
  selector: "ngx-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.scss"],
})
export class DemoComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  sixthForm: FormGroup;
  openSteps: boolean = false;
  firstLevelCount = null;
  secondLevelCount = null;
  thirdLevelCount = null;
  fourthLevel1Count = null;
  fourthLevel2Count = null;
  fifthC1LevelCount = null;
  fifthC2LevelCount = null;
  capacitor1 = null;
  capacitor2 = null;
  Feeder1 = null;
  Feeder2 = null;
  dfcapacitor1 = null;
  dfcapacitor2 = null;
  distribution1 = null;
  distribution2 = null;
  names: any;
  flowsData: any = [
    {
      id: 1,
      name: "Flow 1",
    },
    {
      id: 2,
      name: "Flow 2",
    },
    {
      id: 3,
      name: "Flow 3",
    },
    {
      id: 4,
      name: "Flow 4",
    },
  ];
  powertransformerDetails: any = [];
  powertransformerModel: any = {
    transformerName: null,
    transformerTitle: null,
    kvaRating: null,
    primaryVoltage: null,
    secondaryVoltage: null,
    fullloadCurrent: null,
    noofPhase: null,
    frequency: null,
    terminals: null,
    serialNumber: null,
    weight: null,
  };
  activeFlow: number = null;

  constructor(
    private fb: FormBuilder,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.firstForm = this.fb.group({
      "firstCtrl-0": ["", Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ["", Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ["", Validators.required],
    });

    this.fourthForm = this.fb.group({
      fourthPanel1Ctrl: ["", Validators.required],
    });

    this.fourthForm = this.fb.group({
      fourthPanel2Ctrl: ["", Validators.required],
    });

    this.fifthForm = this.fb.group({
      capacitor1Ctrl: ["", Validators.required],
    });

    this.fifthForm = this.fb.group({
      capacitor2Ctrl: ["", Validators.required],
    });

    this.fifthForm = this.fb.group({
      Feeder1Ctrl: ["", Validators.required],
    });

    this.fifthForm = this.fb.group({
      Feeder2Ctrl: ["", Validators.required],
    });

    this.sixthForm = this.fb.group({
      dfcapacitor1Ctrl: ["", Validators.required],
    });

    this.sixthForm = this.fb.group({
      dfcapacitor2Ctrl: ["", Validators.required],
    });

    this.sixthForm = this.fb.group({
      distribution1Ctrl: ["", Validators.required],
    });

    this.sixthForm = this.fb.group({
      distribution2Ctrl: ["", Validators.required],
    });
  }

  setValue(count) {
    if (count) {
      const array = this.counter(count);
      console.log(array);

      console.log(array.length);
      array.map((val, index) => {
        console.log(val);
        const key = "firstCtrl-" + index;
        console.log(key);
        this.firstForm.setValue({
          [key]: "Power Transformer" + Math.floor(index + 1),
        });
      });
      console.log(this.firstForm);
    }
  }

  open3() {
    this.dialogService
      .open(MasterTransformersComponent)
      .onClose.subscribe((name) => name && this.names.push(name));
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  onFourthSubmit() {
    this.fourthForm.markAsDirty();
  }

  onFifthSubmit() {
    this.fifthForm.markAsDirty();
  }

  onSixthSubmit() {
    this.sixthForm.markAsDirty();
  }

  counter(i: number) {
    return new Array(i);
  }

  // Open flow
  openFlow(flowId: number) {
    this.activeFlow = flowId;
    this.openSteps = true;
  }

  // Open transformers popup form
  opentransformersMaster() {
    this.dialogService.open(TransformerFormComponent, {
      context: {
        title: "This is a title passed to the dialog component",
      },
    });
  }
}
