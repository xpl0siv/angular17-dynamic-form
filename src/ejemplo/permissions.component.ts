import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

export interface Tipo {
  item: FormControl<string | null>;
  id: FormControl<number | null>;
}

/**
 * Define la 'key' del formGroup que contiene un FormArray.
 */
export interface ItemsFormArray<T extends { [K in keyof T]: AbstractControl<any, any> }> {
  items: FormArray<FormGroup<T>>;
}

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  template: `
    <!-- ACCEDE AL FORM GROUP -->
    <form [formGroup]="form" (ngSubmit)="submit()">
      <!-- ACCEDE AL FORM ARRAY -->
      <div formArrayName="items">
        <!-- ITERA ITEMS DEL ARRAY -->
        @for(group of items.controls; track group;){
        <!-- ACCEDE POR INDICE, se puede usar directamente, $index sin asignar a let i -->
        <div [formGroupName]="$index">
          <!-- ESTABLE EL FORM CONTROL NAME A LOS VALORES -->
          <input type="text" [formControlName]="'item'" />
          <input type="number" [formControlName]="'id'" />
        </div>
        }
      </div>
      <button class="btn btn-sm btn-success mt-2">Mostrar raw value</button>
    </form>
    <div>
      <pre>{{json|json}}</pre>
    </div>
  `,
})
export class PermissionsComponent implements OnInit {
  public json?: string;
  #formBuilder: FormBuilder = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit() {
    this.form = this.#formBuilder.group<ItemsFormArray<Tipo>>({
      items: this.#formBuilder.array<FormGroup>([
        this.#formBuilder.group<Tipo>({
          item: this.#formBuilder.control('A'),
          id: this.#formBuilder.control(0),
        }),
        this.#formBuilder.group<Tipo>({
          item: this.#formBuilder.control('B'),
          id: this.#formBuilder.control(1),
        }),
        this.#formBuilder.group<Tipo>({
          item: this.#formBuilder.control('C'),
          id: this.#formBuilder.control(2),
        }),
        this.#formBuilder.group<Tipo>({
          item: this.#formBuilder.control('D'),
          id: this.#formBuilder.control(3),
        }),
      ]),
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  submit() {
    this.json = this.form.getRawValue();
  }
}
