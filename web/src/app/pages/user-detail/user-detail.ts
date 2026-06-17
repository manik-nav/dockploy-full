import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  protected readonly user = computed(() => {
    const id = Number(this.id());
    return this.userService.getUserById(id);
  });
}
