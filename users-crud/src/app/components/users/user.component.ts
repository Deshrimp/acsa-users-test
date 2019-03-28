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
  new: boolean = false
  id: string
  constructor(
    private _UsersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(parametros => {
      console.log(parametros)
      this.id = parametros["id"]
      if (this.id != "nuevo") {
        this._UsersService
          .getUser(this.id)
          .subscribe((user: User) => (this.user = user))
      }
    })
  }

  ngOnInit() {}

  guardar() {
    if (this.id == "nuevo") {
      this._UsersService.newUser(this.user).subscribe(
        (data: { userProfile: User }) => {
          this.router.navigate(["/user", data.userProfile.id])
        },
        error => console.error(error)
      )
    } else {
      this._UsersService.updateUser(this.user, this.id).subscribe(
        (data: { userProfile: User }) => {
          console.log("this is the data that I'm sending", data)
        },
        error => console.error(error)
      )
    }
  }
  addNew(forma: NgForm) {
    this.router.navigate(["/user", "nuevo"])
    forma.reset({
      age: 40
    })
  }
}
