import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { UserHttpService } from './services/user-http.service';
import { TableHttpService } from './services/table-http.service';
import { OrderHttpService } from './services/order-http.service';
import { ItemHttpService } from './services/item-http.service';
import { SocketioService } from './services/socketio.service';
import { CommonModule } from '@angular/common';
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { PayPal } from '@ionic-native/paypal/ngx';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // tosUrl: 'terms',
  // privacyPolicyUrl: 'privacy',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: UserHttpService, useClass: UserHttpService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: TableHttpService, useClass: TableHttpService},
    { provide: OrderHttpService, useClass: OrderHttpService},
    { provide: ItemHttpService, useClass: ItemHttpService},
    { provide: SocketioService, useClass: SocketioService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
