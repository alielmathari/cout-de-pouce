import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'admin' , loadChildren:()=>import('./adminmodule/adminmodule.module').then(m=>m.AdminmoduleModule)},

  {path:'home' , component : HomeComponent},
  {path:'' , redirectTo:'home',pathMatch:'full' },
  {path:'**' , redirectTo:'home' }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }