import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { MinesweeperComponent } from "./minesweeper/minesweeper.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "minesweeper", pathMatch: "full" },
      { path: "minesweeper", component: MinesweeperComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
