import { Component, OnInit } from "@angular/core"
import { UsersService } from "../../services/users.service"
import { User } from "src/app/interfaces/user.interface"
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = []

  constructor(private _UsersService: UsersService) {
    this._UsersService.getUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }

  ngOnInit() {}
}
