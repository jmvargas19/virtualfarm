import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { NewProductPage } from "../pages/new-product/new-product";
import { TypeProductPage } from "../pages/type-product/type-product";
import { SignupPage } from "../pages/signup/signup";
import { TransactionPage } from "../pages/transaction/transaction";
import { UserPage } from "../pages/user/user";
import { TransDescriptionPage } from "../pages/trans-description/trans-description";
import { MeasurementPage } from "../pages/measurement/measurement";
import { LoginServicesProvider } from '../providers/login-services/login-services';
import { ProductServicesProvider } from '../providers/product-services/product-services';
import { CategoryServicesProvider } from '../providers/category-services/category-services';
import { DepartmentServicesProvider } from '../providers/department-services/department-services';
import { TownServicesProvider } from '../providers/town-services/town-services';
import { SignupServicesProvider } from '../providers/signup-services/signup-services';
import { TypeTransactionServicesProvider } from '../providers/type-transaction-services/type-transaction-services';
import { MeasurementServicesProvider } from '../providers/measurement-services/measurement-services';
import { StateServicesProvider } from '../providers/state-services/state-services';
import { TransactionServicesProvider } from '../providers/transaction-services/transaction-services';
import { TypeProductServicesProvider } from '../providers/type-product-services/type-product-services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    NewProductPage,
    TypeProductPage,
    SignupPage,
    TransactionPage,
    UserPage,
    TransDescriptionPage,
    MeasurementPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__dbfinca',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    NewProductPage,
    TypeProductPage,
    SignupPage,
    TransactionPage,
    UserPage,
    TransDescriptionPage,
    MeasurementPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginServicesProvider,
    ProductServicesProvider,
    CategoryServicesProvider,
    DepartmentServicesProvider,
    TownServicesProvider,
    SignupServicesProvider,
    TypeTransactionServicesProvider,
    MeasurementServicesProvider,
    StateServicesProvider,
    TransactionServicesProvider,
    TypeProductServicesProvider,
  ]
})
export class AppModule {}
