/**
 * Load External  book content from the Google
 * import  UI functions/componet  to render
 * 
 */

 import * as Libray  from './process.js';


 const displayBooks= document.querySelector('.displayBooks');

 export class API   {

    constructor(url){
        this.url=url;
    }

    storeData=[];


   async fetchBooks(){

         const resultProcess= await fetch(this.url);
         const response= await resultProcess.json();
         return response;
   }
   

    processReponse(){

      let holdContent="";

         this.fetchBooks().then(function(data){

            //console.log(data);
            
            // console.log(data.items[0].volumeInfo.subtitle);
            // console.log(data.items[0].volumeInfo.title);
            // console.log("Publisher" + data.items[0].volumeInfo.publisher);
            // console.log(data.items[0].volumeInfo.publishedDate);
            // console.log(data.items[0].volumeInfo.imageLinks.smallThumbnail);
            const displayBooks= document.querySelector('.displayBooks');
            let fetchData= data.items;

            fetchData.forEach(function(values){

               holdContent+=`<div class="col-md-4" style="margin-top:2rem;">
               <div class="card" style="width: 18rem;">
                   <img class="card-img-top" src="${values.volumeInfo.imageLinks.smallThumbnail}" alt="Card image cap">
                   <div class="card-body">
                     <h5 class="card-title title">${values.title}</h5>
                     <p class="card-text">
                       <ul>
                          <li class="author"> Author: </li>
                          <li class="date"> published Date: ${values.volumeInfo.publishedDate}</li>
                          <li class="numpages">Publisher: ${values.volumeInfo.publisher} </li>
                          <li class="isbn"> subtitle: ${values.volumeInfo.subtitle}</li>
                       </ul>
                   </div>
                 </div>
              </div>`;
            });

            displayBooks.innerHTML=holdContent;

         }).catch(function(err){

            displayBooks.innerHTML="<p>Searh result not found, Please try again</p>"
            console.log("Oops, somthing happened " + err);
         });
    }


 }