import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { TransactionPage } from "../pages/transaction/transaction";
import { UserPage } from '../pages/user/user';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = HomePage;
  @ViewChild('content') nav: Nav;
  public pages: Array<{ title: string, component: any, icon: string }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Registrate', component: SignupPage, icon: "person-add" },
      { title: 'Inicia Sesión', component: LoginPage, icon: "log-in" },
      { title: 'Mi Cuenta', component: UserPage, icon: "settings" },
      { title: 'Mis Publicaciones', component: SignupPage, icon: "clipboard" },
      { title: 'Publicar', component: TransactionPage, icon: "add" },
      { title: 'Cerrar Sesión', component: TransactionPage, icon: "log-out" },
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage (page, tokenSel) {
    this.nav.push(page);
  }
}
