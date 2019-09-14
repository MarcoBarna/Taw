import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { TableHttpService } from "src/app/services/table-http.service";
import { UserHttpService } from "src/app/services/user-http.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gesttable",
  templateUrl: "./gesttable.page.html",
  styleUrls: ["./gesttable.page.scss"]
})
export class GesttablePage implements OnInit {
  tableNumber: string;
  seatsNumber: string;

  constructor(
    private router: Router,
    public menuCtrl: MenuController,
    private table: TableHttpService,
    private us: UserHttpService,
    private toast: ToastrService
  ) {
    this.menuCtrl.enable(true);
  }

  addTable(tableNumber: number, seats: number) {
    this.table
      .addTable(tableNumber, seats)
      .toPromise()
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        this.toast.error(err.error);
      });
    this.tableNumber = "";
    this.seatsNumber = "";
    this.toast.success('Table added successfully');
  }

  ngOnInit() {
    if (
      this.us.get_token() === undefined ||
      this.us.get_token() === "" ||
      this.us.get_role() !== 1
    ) {
      console.log("Acces Denided");
      this.us.logout();
    }
  }
}
