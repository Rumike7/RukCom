import { NgModule } from '@angular/core';
/* Importing the CommonModule from the Angular Common library. */
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [MatProgressBarModule, MatSliderModule, MatIconModule],
  exports: [MatProgressBarModule, MatSliderModule, MatIconModule]
})


export class MaterialModule{}