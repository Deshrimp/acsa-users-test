import { Component, OnInit } from "@angular/core"
import { NgForm, FormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { User } from "../../interfaces/user.interface"

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styles: []
})
export class UserComponent implements OnInit {
  user: User = {
    name: "",
    age: 0,
    gender: "",
    password: "",
    code: "",
    role: "",
    id: 0
  }
  constructor() {}

  ngOnInit() {}

  guardar() {
    console.log(this.user)
  }
}
