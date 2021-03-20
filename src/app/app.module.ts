import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule,],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}