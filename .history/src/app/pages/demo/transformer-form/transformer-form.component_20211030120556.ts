import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-transformer-form",
  templateUrl: "./transformer-form.component.html",
  styleUrls: ["./transformer-form.component.scss"],
})
export class TransformerFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<TransformerFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
