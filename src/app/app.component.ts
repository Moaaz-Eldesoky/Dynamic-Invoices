
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hideHeaderAndFooter: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hideHeaderAndFooter = this.shouldHideHeaderAndFooter();
      }
    });
  }

  shouldHideHeaderAndFooter(): boolean {
    const currentRoute = this.router.url;

    // Add conditions for routes where you want to hide header and footer
    return currentRoute.includes('/login') || currentRoute.includes('/register');
  }
}
