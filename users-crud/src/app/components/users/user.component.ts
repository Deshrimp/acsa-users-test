import { Component, OnInit } from "@angular/core"
import { NgForm, FormsModule } from "@angular/forms"
import { Router, ActivatedRoute } from "@angular/router"
import { UsersService } from "../../services/users.service"
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
  constructor(private _UsersService: UsersService) {}

  ngOnInit() {}

  guardar() {
    console.log(this.user)
    this._UsersService.newUser(this.user).subscribe(data => {})
  }
}
