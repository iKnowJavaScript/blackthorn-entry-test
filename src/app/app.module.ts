import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EventContainerComponent } from "./components/event-container/event-container.component";
import { CheckoutTicketComponent } from "./components/checkout-ticket/checkout-ticket.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { CheckoutFormComponent } from "./components/checkout-form/checkout-form.component";


@NgModule({
  declarations: [AppComponent, EventContainerComponent, CheckoutTicketComponent, LoaderComponent, CheckoutFormComponent],
  imports: [BrowserModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}