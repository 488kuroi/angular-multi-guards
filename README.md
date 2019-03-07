# Angular Multi Guards
Helper snippet for multi guards implementation in Angular TS

In order to manage multiple routing rules within the same guard, without risking repetitions in your code, this snippet provides a simple method to handle this eventuality.

The use is simple, just include in their guards a "MasterGuard" that will manage the others as promises instead that real guard, in order to solve the requirements defined in order of invocation.

The promises must be specified within the data object, which is passed by default within the canAcivate function via the <ActivatedRouteSnapshot> object, this case, the object placed inside the date was called "customGuards", but it can be defined at will.
  

```javascript

import { NgModule } from '@angular/core';
import { ActivatedRoutesGuard, MasterGuard, FirstGuard, SecondGuard, ThirdGuard, FourthGuard } from '@guards';
import { MyFirstComponent, MySecondComponent } from '@your_modules';

const appRoutes: Routes = [
  { path: '', component: MyFirstComponent, canActivate: [ MasterGuard ], data: { customGuards: { FirstGuard, SecondGuard } } },
  { path: 'your_other_path', component: MySecondComponent , canActivate: [ MasterGuard ], data: { customGuards: { ThirdGuard, FourthGuard } } },
  // otherwise redirect to home
  { path: '**', redirectTo: '/' }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot( appRoutes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```


The MasterGuard as previously mentioned, requires promises to perform its functionality, an example of it is found in the file available.guards.ts where the constants are served, accept free parameters at the input, to be used during their execution.
For example, you can pass as a parameter the angular Route object to perform a forced routing to another path, if the user can not access:

```javascript
export const SecondGuard = ( params ) => {
  return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
      params.navigationRouter.navigate( [ '/' ] );
      resolve( false )
    }, 1500 )
  } )
}
```

I hope this snippet will come in handy, and happy coding to everyone! 🍕


