import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/shared/shared.module';
import { MaterialModule } from 'src/material/material.module';
import { HttpClientModule } from  '@angular/common/http';
import { StudentFormComponent } from './student-form/student-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppMainComponent } from './app-main/app-main.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppContentComponent } from './app-content/app-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MarkComponent } from './mark/mark.component';
import { AddstudentComponent } from './addstudent/addstudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { EditattendanceComponent } from './editattendance/editattendance.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    SidebarComponent,
    AppMainComponent,
    AppNavbarComponent,
    AppContentComponent,
    DashboardComponent,
    MarkComponent,
    AddstudentComponent,
    EditstudentComponent,
    EditattendanceComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
