import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { HttpClientModule } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { UsersComponent } from "./components/users/users.component"
import { UserComponent } from "./components/users/user.component"
import { FormsModule } from "@angular/forms"
import { UsersService } from "./services/users.service"
@NgModule({
  declarations: [AppComponent, UsersComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {}
