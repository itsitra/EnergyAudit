import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-department-form",
  templateUrl: "./department-form.component.html",
  styleUrls: ["./department-form.component.scss"],
})
export class DepartmentFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<DepartmentFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
