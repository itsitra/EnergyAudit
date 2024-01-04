import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-mvpannel-form",
  templateUrl: "./mvpannel-form.component.html",
  styleUrls: ["./mvpannel-form.component.scss"],
})
export class MvpannelFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<MvpannelFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
