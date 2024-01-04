import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "ngx-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})
export class ViewComponent implements OnInit {
  // constructor(@Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit(): void {
    console.log("ok im here!!!!!!!!!!!");
  }
}
