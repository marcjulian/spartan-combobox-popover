import { Component, inject, signal } from '@angular/core';
import { BrnDialogImports, BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

import { email, form, FormField, required } from '@angular/forms/signals';
import { HlmFieldImports } from '@spartan-ng/helm/field';

import { BrnPopoverContent } from '@spartan-ng/brain/popover';
import { HlmComboboxImports } from '@spartan-ng/helm/combobox';

@Component({
  selector: 'app-form',
  imports: [
    BrnDialogImports,
    HlmDialogImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmFieldImports,
    HlmComboboxImports,
    BrnPopoverContent,
    FormField,
  ],
  template: `
    <hlm-dialog-header>
      <h3 hlmDialogTitle>Edit profile</h3>
      <p hlmDialogDescription>Make changes to your profile here. Click save when you're done.</p>
    </hlm-dialog-header>

    <div
      class="flex max-h-[calc(100vh-2rem)] w-full flex-col gap-0 overflow-y-auto sm:max-h-[min(640px,80vh)]"
    >
      <form class="flex w-full flex-col gap-4 p-2" (submit)="onSubmit($event)">
        <div class="grid gap-4">
          <hlm-field>
            <hlm-field-label for="name">Name</hlm-field-label>
            <input hlmInput id="name" [formField]="profileForm.name" />
            @if (profileForm.name().touched() && profileForm.name().invalid()) {
              @for (error of profileForm.name().errors(); track error.kind) {
                @if (error.message) {
                  <hlm-field-error>{{ error.message }}</hlm-field-error>
                }
              }
            }
          </hlm-field>
          <hlm-field>
            <hlm-field-label for="email">Email</hlm-field-label>
            <input hlmInput id="email" [formField]="profileForm.email" />
            @if (profileForm.email().touched() && profileForm.email().invalid()) {
              @for (error of profileForm.email().errors(); track error.kind) {
                @if (error.message) {
                  <hlm-field-error>{{ error.message }}</hlm-field-error>
                }
              }
            }
          </hlm-field>

          <hlm-combobox [value]="countries[0]" autoFocus="first-tabbable">
            <hlm-combobox-trigger class="w-full justify-between font-normal">
              <span hlmComboboxValue></span>
            </hlm-combobox-trigger>
            <div *brnPopoverContent hlmComboboxContent>
              <hlm-combobox-input
                showTrigger="false"
                mode="popup"
                placeholder="Search"
              ></hlm-combobox-input>
              <hlm-combobox-empty>No items found.</hlm-combobox-empty>
              <div hlmComboboxList>
                @for (country of countries; track country.code) {
                  <hlm-combobox-item [value]="country">{{ country.label }}</hlm-combobox-item>
                }
              </div>
            </div>
          </hlm-combobox>
        </div>
      </form>
    </div>

    <hlm-dialog-footer>
      <button type="button" hlmBtn variant="outline" brnDialogClose>Cancel</button>
      <button type="submit" hlmBtn>Save changes</button>
    </hlm-dialog-footer>
  `,
})
export class ProfileForm {
  private readonly _dialogRef = inject<BrnDialogRef>(BrnDialogRef);

  readonly profileModel = signal({
    name: '',
    email: '',
    country: '',
  });

  public countries = [
    { code: '', value: '', continent: '', label: 'Select country' },
    { code: 'af', value: 'afghanistan', label: 'Afghanistan', continent: 'Asia' },
    { code: 'al', value: 'albania', label: 'Albania', continent: 'Europe' },
    { code: 'dz', value: 'algeria', label: 'Algeria', continent: 'Africa' },
    { code: 'ad', value: 'andorra', label: 'Andorra', continent: 'Europe' },
    { code: 'ao', value: 'angola', label: 'Angola', continent: 'Africa' },
    {
      code: 'ar',
      value: 'argentina',
      label: 'Argentina',
      continent: 'South America',
    },
  ];

  readonly profileForm = form(this.profileModel, (schema) => {
    email(schema.email, { message: 'Invalid email address' });
    required(schema.name, { message: 'Name is required' });
    required(schema.email, { message: 'Email is required' });
    required(schema.country, { message: 'Country is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted:', this.profileForm().value());
    this._dialogRef.close(this.profileForm().value());
  }
}
