/**
 * Script to render ui on page they record
 */
/**
 * Decleare all your variables here
 */


 export const isbn_number= document.querySelector('.isbn_nunber');
 export const title= document.querySelector('.title');
 export const author= document.querySelector('.author');
 export const numPages= document.querySelector('.numPages');
 export const datePublished= document.querySelector('.date');
 export const readStatus= document.querySelector('.readStatus');


  export function renderNumPages(maxNumpages){

    const numPages=document.querySelector('.numPages');

    for(let i=1; i<=maxNumpages; i++){
        let options=document.createElement('option');
         options.value=i;
         options.textContent=i;
         numPages.appendChild(options);
    }
    
  }
