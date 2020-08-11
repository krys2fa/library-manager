/**
 * Process the 
 */

const result = document.querySelector('.result');
const displayBooks=document.querySelector('.displayBooks');
let saveResult = 0;

export class Library {

    msg = "";

    isEmpty(firstRecord) {
        if (firstRecord.trim() ==="") {
            //call a display error function to show errors
            this.msg = "Oops, all the field are required.complete the field";
            return false;
        }
    }

    isValid(record) {
        const patterns = /^[A-Za-z\s\-]/g;
        const tester = patterns.test(record);
        return tester;
    }

    displayMessage(message, className) {
        if (message !== "") {
            const contentDiv = document.createElement('div');
            contentDiv.innerHTML = `${message}`;
            contentDiv.classList.add('alert', className);
            result.appendChild(contentDiv);
        }
    }

    isValidAlphaNUmberic(field){
        const patterns =  /^[a-zA-Z0-9]/gi;
        const tester = patterns.test(field.trim());
        return tester;
    }

    getData() {

        const storage = localStorage.getItem('library');
        let record = [];

        if (storage === null) {
            record = [];
        } else {
            record = JSON.parse(localStorage.getItem('library'));
        }
        return record;
    }

    saveData(author, title, datePublished, numPages,isbn_number,readStatus) {

        const getRecord = this.getData();
        const recordData=[];

        const testRecord={title:title,author:author,date:datePublished,
            numPages:numPages,isbn:isbn_number,status:readStatus};

        getRecord.push(testRecord);

        localStorage.setItem('library', JSON.stringify(getRecord));

        if (getRecord.length > 0) {
            this.msg = `${author} as the author of ${title} has been saved successfuly`;

            this.displayMessage(this.msg, 'alert-success');
            //use setTimeOut to remove displayMessage method record 

            setTimeout(function(e){
                result.querySelector('.alert-success').remove();
             },3000);



        } else {
            this.msg = `Oops, error saving data`;
            this.displayMessage(this.msg, 'alert-danger');
        }
    }

    /**
     * Delete book from the DB 
     */

     deleteBook(isbn, id){

        const getBooks= this.getData();

        console.log(getBooks);
        
        if(getBooks.length > 0){

             getBooks.forEach((values, index)=>{

                if(isbn===values.isbn || index===id){

                      getBooks.splice(index,1);
                      localStorage.setItem('library',JSON.stringify(getBooks));
                      this.displayBooks();
                  }
             });
        }
     }

    displayBooks(){

        let holdContent="";
        const books= this.getData();
       
        const images=['image-one.jpg','images-two.jpeg','image-three.webp','images-four.jpeg','images-five.jpeg'];
        const data= document.createElement('option');;
        let status=""
        
        if(books.length > 0){

            books.forEach(function(values,index){

                const random=Math.floor((Math.random() * images.length) + 0);
                  
                 holdContent+=`<div class="col-md-4" style="margin-top:2rem;">
                 <div class="card" style="width: 18rem;">
                     <img class="card-img-top" src="images/${images[random]}" alt="Card image cap">
                     <div class="card-body">
                       <h5 class="card-title title">${values.title}</h5>
                       <p class="card-text">
                         <ul>
                            <li class="author"> Author: ${values.author} </li>
                            <li class="date"> published Date: ${values.date}</li>
                            <li class="numpages"> Number of Pages: ${values.numPages} </li>
                            <li class="isbn"> ISBN: ${values.isbn}</li>
                         </ul>
                       <div class="row">
                         <a href="#" class="btn btn-primary btn-status" data-mainid="${values.isbn}" data-id="${index}" >${values.status}</a>
                         &nbsp;
                         <a href="#" class="btn btn-danger btn-delete" data-mainid="${values.isbn}" data-id="${index}">Delete</a>
                         &nbsp;
                         <a href="#" class="btn btn-success btn-add-fav" data-id="${index}">(+) favorite</a>
                       </div>
                     </div>
                   </div>
              </div>`;
            });

            displayBooks.innerHTML=holdContent;
        }

        else {
            const diplay="<p style='font-size:3rem;  margin:0 auto; font-weight:bolder;'>No Books added yet</p>";
            displayBooks.innerHTML=diplay;
        }
    }


    UpdateReadStatus(id,status){

         const books = this.getData();
         
         books.forEach(function(values, index){
          
             if(Number(id)===index){ 

            const testRecord={title:values.title,author:values.author,date:values.date,
               numPages:values.numPages,isbn:values.isbn,status:status};

               books.splice(index, 1);
               books.push(testRecord);
               
               localStorage.setItem('library',JSON.stringify(books));

               setTimeout(function(e){
                window.location.reload();
               },2000);
             }
         });
    }

    /**
     * Add book to favorite section
     */

     addBooksToFavorite(author,title, pubDate, isbn, readStatus,numPages,id){

        const getRecord= this.storeBooksFavorite();
        const  bookID=Number(id);

        const mainisbn=(isbn.split(':')[1].trim());
        const mainAuthor=(author.split(':')[1].trim());
        const mainpubDate= (pubDate.split(':')[1].trim());
        const mainnumPages= (numPages.split(':')[1].trim());

        const checkuplicate=this.isDuplicate(bookID,mainisbn);

        if(checkuplicate){

            this.msg = `${author} as the author of ${title} already exist in your favorite list `;
            this.displayMessage(this.msg, 'alert-danger');

            setTimeout(function(e){
               result.querySelector('.alert-danger').remove();
            },3000);
            return false;
        }


        const objectBooks= {title:title,author:mainAuthor,date:mainpubDate,
            numPages:mainnumPages,isbn:mainisbn,status:readStatus};

            getRecord.push(objectBooks);

            const response= localStorage.setItem('favorite',JSON.stringify(getRecord));

            if(getRecord.length > 0)
            {

                 this.msg = `${author} as the author of ${title} has been saved successfuly to your favorite list of books `;
                 this.displayMessage(this.msg, 'alert-success');

                 setTimeout(function(e){
                    result.querySelector('.alert-success').remove();
                 },3000);

            }
            else {
                console.log("Oops, something wronmg happened, try again");
            }
     }


     storeBooksFavorite(){

        const storage= localStorage.getItem('favorite');
        let record=[];

        if(storage===null)
        {
            record=[];
        }

        else {
             record=JSON.parse(localStorage.getItem('favorite'));
        }
        return record;
     }


     isDuplicate(bookID,isbn){

        const books= this.storeBooksFavorite();
        let flag=false;

        for(let i=0; i < books.length; i++){

            if (books[i].isbn===isbn){
                flag=true;
                break;
            }
        }
        return flag;
     }

     fetchFavoriteBooks(){

        const books = this.storeBooksFavorite();
        let holdContent="";
       
        const images=['image-one.jpg','images-two.jpeg','image-three.webp','images-four.jpeg','images-five.jpeg'];
        const data= document.createElement('option');;
        let status=""
        
        if(books.length > 0){

            books.forEach(function(values,index){

                const random=Math.floor((Math.random() * images.length) + 0);
                  
                 holdContent+=`<div class="col-md-4" style="margin-top:2rem;">
                 <div class="card" style="width: 18rem;">
                     <img class="card-img-top" src="images/${images[random]}" alt="Card image cap">
                     <div class="card-body">
                       <h5 class="card-title title">${values.title}</h5>
                       <p class="card-text">
                         <ul>
                            <li class="author"> Author: ${values.author} </li>
                            <li class="date"> published Date: ${values.date}</li>
                            <li class="numpages"> Number of Pages: ${values.numPages} </li>
                            <li class="isbn"> ISBN: ${values.isbn}</li>
                         </ul>
                     
                     </div>
                   </div>
              </div>`;
            });

            displayBooks.innerHTML=holdContent;
        }

        else {
            const diplay="<p style='font-size:3rem;  margin:0 auto; font-weight:bolder;'>No Books added yet</p>";
            displayBooks.innerHTML=diplay;
        }
     }
     
}