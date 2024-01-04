import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-powerhouse-form",
  templateUrl: "./powerhouse-form.component.html",
  styleUrls: ["./powerhouse-form.component.scss"],
})
export class PowerhouseFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<PowerhouseFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
