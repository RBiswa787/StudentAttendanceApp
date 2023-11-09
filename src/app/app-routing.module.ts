import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarkComponent } from './mark/mark.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { EditattendanceComponent } from './editattendance/editattendance.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path : 'dashboard', component: DashboardComponent},
  {path : 'mark', component : MarkComponent},
  {path : 'addstudent', component : AddstudentComponent},
  {path : 'editstudent', component : EditstudentComponent},
  {path : 'editattendance', component : EditattendanceComponent},
  {path: 'detail', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
