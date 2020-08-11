/**
 * Search 
 *  for record
 */

 import * as API from './apiload.js';
 import * as Library  from './process.js';

 document.addEventListener('DOMContentLoaded',searchBooks);

 const searchField= document.querySelector('.searchField');
 const txtField =document.querySelector('.search');
 const displayMsg= document.querySelector('.display-msg');


 function searchBooks(e){
    
    searchField.addEventListener('submit',function(e){

        e.preventDefault();
       
        const searchTerms= txtField.value.trim();

         const url=`https://www.googleapis.com/books/v1/volumes?q=${searchTerms}`;
         const api = new API.API(url);
         api.processReponse();
            
    });

       
 }