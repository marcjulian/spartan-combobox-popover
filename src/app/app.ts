import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { ProfileForm } from './form.component';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmButtonImports],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly _hlmDialogService = inject(HlmDialogService);

  protected openProfileDialog() {
    const dialogRef = this._hlmDialogService.open(ProfileForm, {
      contentClass: 'max-w-4xl',
      autoFocus: 'dialog',
    });

    dialogRef.closed$.subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }
}
