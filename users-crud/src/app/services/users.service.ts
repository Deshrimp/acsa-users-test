import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { User } from "../interfaces/user.interface"
import { map } from "rxjs/operators"

@Injectable({
  providedIn: "root"
})
export class UsersService {
  usersURL: string = "/api/users"

  constructor(private http: HttpClient) {}

  newUser(user: User) {
    let body = { user }
    let headers = {
      "Content-Type": "application/json"
    }
    return this.http.post(this.usersURL, body, { headers }).pipe(
      map(res => {
        console.log(res)
        return res
      })
    )
  }
  updateUser(user: User, id: string) {
    let body = { user: { ...user, id } }
    let headers = {
      "Content-Type": "application/json"
    }
    return this.http.put(this.usersURL, body, { headers }).pipe(
      map(res => {
        console.log("this comes from update user method", res)
        return res
      })
    )
  }

  getUser(key: string) {
    let url = `${this.usersURL}/${key}.json`
    return this.http.get(url).pipe(map(res => res))
  }
}
