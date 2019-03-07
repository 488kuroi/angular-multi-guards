/**
   * 
   * @param {Object} params can contain any argument passed from the MasterGuard
   */
export const FirstGuard = ( params ) => {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        resolve( true )
      }, 500 )
    } )
  }
  
  /**
   * 
   * @param {Object} params can contain any argument passed from the MasterGuard
   * example: the angular Router object as shown below
   */
export const SecondGuard = ( params ) => {
return new Promise( ( resolve, reject ) => {
    setTimeout( () => {
    params.navigationRouter.navigate( [ '/' ] );
    resolve( false )
    }, 1500 )
} )
}