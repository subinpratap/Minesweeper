import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TilesComponent } from './components/tiles/tiles.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { AvatarSelectorComponent } from './components/avatar-selector/avatar-selector.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [TilesComponent, ScorecardComponent, AvatarSelectorComponent, ModalComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
