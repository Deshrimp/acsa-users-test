import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"
import { UsersComponent } from "./components/users/users.component"
import { UserComponent } from "./components/users/user.component"

const routes: Routes = [
  { path: "users", component: UsersComponent },
  { path: "user/:id", component: UserComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
