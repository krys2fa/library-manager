/**
 * Load the initails record
 */

import * as  Library from './process.js';
import * as  render  from './renderui.js';

const lib =  new Library.Library();
let message="";
const btnFormSubmit = document.querySelector(".savelib");
const btnDelbooks= document.querySelector('.displayBooks');
const addFavorite=document.querySelector('.btn-add-fav');


document.addEventListener('DOMContentLoaded',function(e){

    render.renderNumPages(500);
    lib.displayBooks();
});

btnFormSubmit.addEventListener('submit', function(e) {
    e.preventDefault();

    let flag=true;

    const isbn_number = render.isbn_number.value;
    const title= render.title.value;
    const author= render.author.value;
    const numPages= Number(render.numPages.value);
    const date= render.datePublished.value;
    const readStatus= render.readStatus.value;

     if(!lib.isValidAlphaNUmberic(isbn_number)){
         flag=false;
         message="Valid ALphanumeric data for isbn number is required ";
         lib.displayMessage(message,'alert-danger ');
     }

     if(!lib.isValid(title.trim())){
         flag=false;
         message="Valid Book title is required";
         lib.displayMessage(message, 'alert-danger');
     }

     if(!lib.isValid(author.trim())){
         flag=false;
         message="Valid Author name of the book is required";
         lib.displayMessage(message, 'alert-danger');
     }

     if(numPages===0){
         flag=false;
         message="Select the required number of pages in the page";
         lib.displayMessage(message, 'alert-danger');
     }

     if(readStatus===""){

        flag=false;
        message="Select read status for the book ";
        lib.displayMessage(message, 'alert-danger');
     }

     if(flag){
         const flag = lib.saveData(author, title,date,numPages,isbn_number,readStatus);
         btnFormSubmit.reset();
         lib.displayBooks();
     }

     else{
         return false;
     }
});


/**
 * delete event delegation routine
 */

btnDelbooks.addEventListener('click',deleteBooks);
btnDelbooks.addEventListener('click',updateReadStatus);
btnDelbooks.addEventListener('click',addFavoriteBooks);

function deleteBooks(e){

    e.preventDefault();
     
     let isbn, id ="";

     if(e.target.classList.contains('btn-delete')){

          isbn=e.target.getAttribute("data-mainid");
          id=e.target.getAttribute('data-id');

          if(confirm("Do you you want to delete this Book ?")){
               lib.deleteBook(isbn,id);
          }
     }
}

function updateReadStatus(e){

    e.preventDefault();
    let id = "";
  
    if(e.target.classList.contains('btn-status')){

         id=e.target.getAttribute('data-id');

         let status= e.target.textContent;
    
         if(status==="read")
         {
            status="unread";
         }
         else {
             status="read";
         }

         lib.UpdateReadStatus(id,status);
    }
}

function addFavoriteBooks(e){
    e.preventDefault();

    let id="";
    
    if(e.target.classList.contains('btn-add-fav')){

        const parentDiv= e. target.parentElement.parentElement;
        const title=parentDiv.querySelector('.title').textContent;
        const author=parentDiv.querySelector('.author').textContent;
        const datePub=parentDiv.querySelector('.date').textContent;
        const numPages= parentDiv.querySelector('.numpages').textContent;
        const isbn= parentDiv.querySelector('.isbn').textContent;
        const status= e.target.textContent;
        const id=e.target.getAttribute('data-id');
        
        lib.addBooksToFavorite(author,title,datePub,isbn,status,numPages,id);

    }
}

