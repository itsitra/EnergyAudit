import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-distribution-form",
  templateUrl: "./distribution-form.component.html",
  styleUrls: ["./distribution-form.component.scss"],
})
export class DistributionFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<DistributionFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
