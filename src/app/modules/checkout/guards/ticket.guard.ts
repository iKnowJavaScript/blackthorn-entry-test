import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CheckoutService } from '../services/checkout.service';

@Injectable({ providedIn: 'root' })
export class OrderExistGuard implements CanActivate {
  constructor(private checkoutService: CheckoutService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const orderSummary = this.checkoutService.orderSummary$.value;
    if (!orderSummary || !orderSummary.length) {
      this.router.navigate(['events'])
      return false;
    }

    return true;
  }
}
