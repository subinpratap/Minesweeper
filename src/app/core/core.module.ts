import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common';
import { AppService } from "./services/app.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AppService
  ]
})
export class CoreModule {

  throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
      throw new Error(`${moduleName} has already been loaded. Import ${moduleName} modules in the AppModule only.`);
    }
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    this.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
