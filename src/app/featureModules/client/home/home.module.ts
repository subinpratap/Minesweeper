import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRoutingModule } from "./home-routing.module";
import { HomeComponent } from './home.component';
import { TilesComponent } from "../../../shared/components/tiles/tiles.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";
import { ScorecardComponent } from "../../../shared/components/scorecard/scorecard.component";
import { AvatarSelectorComponent } from "../../../shared/components/avatar-selector/avatar-selector.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [
    HomeComponent,
    MinesweeperComponent,
    TilesComponent,
    ScorecardComponent,
    AvatarSelectorComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  entryComponents: [ModalComponent]
})
export class HomeModule {}
