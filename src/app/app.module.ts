import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { TaskService } from './task.service';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';
import { OrderModule } from 'ngx-order-pipe';

const appRoutes: Routes = [
  { path: 'task', component: TasksComponent }
  
];
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule, 
	OrderModule,
	FormsModule,
	MyDatePickerModule,
	HttpModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskService,
  {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent,TasksComponent]
})
export class AppModule { }
