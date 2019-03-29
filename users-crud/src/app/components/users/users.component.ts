import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from 'src/app/interfaces/user.interface';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  constructor(private _UsersService: UsersService) {
    this._UsersService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.loading = false;
    });
  }

  ngOnInit() {}
  deleteUser(id: string) {
    this._UsersService.deleteUser(id).subscribe(res => {
      const indexOfId = this.users.findIndex((user: User) => (user.id === parseInt(id, 10) ? true : false));
      if (indexOfId === -1) {
        console.log("No matching id found, state out of sync (shouldn't happen)");
      }
      this.users = [...this.users.slice(0, indexOfId), ...this.users.slice(indexOfId + 1, this.users.length)];
      //this.users.splice(indexOfId, 1)
    });
  }
}
