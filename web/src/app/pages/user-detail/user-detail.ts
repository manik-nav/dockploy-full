import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail {
  id = input.required<string>();

  private readonly userService = inject(UserService);

  protected readonly user = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.userService.getUserById(Number(id)))
    )
  );
}
