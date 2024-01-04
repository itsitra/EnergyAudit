import { Component, OnInit, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "ngx-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"],
})
export class BoardFormComponent implements OnInit {
  @Input() title: string;

  constructor(protected ref: NbDialogRef<BoardFormComponent>) {}

  ngOnInit(): void {}

  dismiss() {
    this.ref.close();
  }
}
