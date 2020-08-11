
/**
 * load favorite books record
 */

 import * as Libray from './process.js';

 const lib = new Libray.Library();

 document.addEventListener('DOMContentLoaded',fetchFavorite);

 function fetchFavorite(e){
    console.log("yes");
 }



 lib.fetchFavoriteBooks();



