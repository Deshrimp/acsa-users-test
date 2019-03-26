import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { User } from "../interfaces/user.interface"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class UsersService {
  usersPostURL: string = "/api/users"

  constructor(private http: HttpClient) {}
  newUser(user: User) {
    let body = { user }
    let headers = {
      "Content-Type": "application/json"
    }
    return this.http.post(this.usersPostURL, body, { headers }).pipe(
      map(res => {
        console.log(res)
        return res
      })
    )
  }
}
