import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * Like all guards, it implements the CanActivate interface, but returns the result of the defined promises.
 * To obtain these promises you must insert them in a given object, in the parameters of the route involved.
 *
 * Example:
 * { path: 'home', component: MyComponent, canActivate: [MasterGuard], data: {customGuards: {FirstGuard, SecondGuard}}}
 * 
 * This guard, will wait for the results of all the promises assigned to it, and then restiturne the final result.
*/

@Injectable({ providedIn: 'root' })
export class MasterGuard implements CanActivate {
    constructor(
        private navigationRouter: Router
    ) { }

    async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {

        const availableParams = {
            route: route,
            state: state,
            navigationRouter: this.navigationRouter
        }
        const guardsPromises = Object.keys( route.data.customGuards ).map( guard => { return route.data.customGuards[ guard ]( availableParams ) } );
        const guardsResults = await Promise.all( guardsPromises ).then( x => x );

        return !guardsResults.some( x => x === false );

    }

}