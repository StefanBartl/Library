// Initialize objects
function Book (title, author, pages, read) {
this.title = title;
this.author = author;
this.pages = pages;
this.read = read;
}
Book.prototype.info = function(){
return this.title + " by " + this.author +", " + this.pages + " pages, " + this.read + " yet";
}
const mainWrapperDIV = document.getElementById("ID_MainWrapper");
// Add new books function
const addBooksButton = document.getElementById("ID_AddButton");
addBooksButton.addEventListener("click", addBooks);
function addBooks (){
let saveNumber = localStorage.length +1;
// Take Input, create obj and push it to library
let title, author, pages, read;
if(document.getElementById('ID_Title').value != "") title = document.getElementById('ID_Title').value; else return;
if(document.getElementById('ID_Author').value != "") author = document.getElementById('ID_Author').value; else return;
if(document.getElementById('ID_Pages').value != 0) pages = document.getElementById('ID_Pages').value; else return;
if(document.getElementById('ID_Read').value != "") read = document.getElementById('ID_Read').value; else return;
// Check for readed or not
let readed;
if (read === "Yes"){
readed = "readed"
} else if (read === "Started"){
readed = "started"
} else {readed = "not readed"};
// Create new book and push it to storage
const NewBook = new Book(title, author, pages, readed);
if(localStorage.getItem(`Book${saveNumber}`)){saveNumber++};
localStorage.setItem(`Book${saveNumber}`, JSON.stringify(NewBook));
// Delete old screen and show up-to-date library
const libraryDiv = document.querySelector('#ID_Library');
libraryDiv.remove()
const newlibraryDiv = document.createElement("div");
newlibraryDiv.setAttribute("id", "ID_Library");
mainWrapperDIV.appendChild(newlibraryDiv);
showLibrary();
updateBooksCounter();
}
// Main function which shows the library
function showLibrary (){
const libraryDiv = document.querySelector('#ID_Library');
// Loop trough localStorage to get the values
for (let getBookLoop in localStorage){
let book = JSON.parse(localStorage.getItem(getBookLoop))
if(book === null)return;
let title =book.title;
let author= book.author;
let pages= book.pages;
let finish = "";
if(book.read === "not readed"){finish = "The librarian says that owning books already feels good."};
if(book.read === "started"){finish = "The librarian says getting things done doesn't just take perseverance."};
if(book.read === "readed"){finish = "The librarian hopes you enjoyed reading this book."};
// Create new elements and pt the text in
const NewDivBook = document.createElement("div");
NewDivBook.setAttribute("id", "ID_BookDivs");
let Titel = document.createElement("h3");
Titel.setAttribute("id", "ID_BooksH3");
let Text = document.createElement("p");
Text.setAttribute("id", "ID_BooksP");
// Animation effect for the titel of the book when hovering over the book div
NewDivBook.addEventListener("mouseover", ()=>{Titel.classList.add("Class_BooksH3Animation");})
NewDivBook.addEventListener("mouseleave", ()=>{Titel.classList.remove("Class_BooksH3Animation");})
// If title is not empty (as by the removed ones), go ahead. Else go get next book.
if(title != ""){ Titel.innerHTML = title} else continue;
// Put text for user information together
Text.innerHTML = `This book was written by <br> ${author}.<br>${title} has ${pages} Pages and you've<br><br>${book.read} it.<br><br>${finish}`;
// Create toggle read button, get text content on read-state together, assign event listener
const toggleReadBtn = document.createElement("button");
toggleReadBtn.classList.add("Class_BookButtons");
let actualBook = JSON.parse(localStorage.getItem(getBookLoop));
let readStatus = actualBook.read;
if(readStatus === "readed"){btnStatus = "Don't readed it?"}else if (readStatus === "not readed") {btnStatus = "Have you started it?"} else if (readStatus === "started"){btnStatus = "Finished it?"};
toggleReadBtn.innerText = btnStatus;
toggleReadBtn.addEventListener("click", ()=> {
let btnBook = JSON.parse(localStorage.getItem(getBookLoop));
let readStatus = btnBook.read;
toggleRead(readStatus);});
// Toggle-read status function
function toggleRead(readStatus){
let pushNewReadStatus, btnNewText;
if(readStatus === "readed"){pushNewReadStatus = "not readed"} else if(readStatus === "not readed"){pushNewReadStatus = "started"}else if(readStatus === "started"){pushNewReadStatus = "readed"};
if(readStatus === "readed"){btnNewText = "Don't readed it?"}else if (readStatus === "not readed") {btnNewText = "Have you started it?"} else if (readStatus === "started"){btnNewText = "Finished it?"};
toggleReadBtn.innerText = btnNewText;
const NewBook = new Book(title, author, pages, pushNewReadStatus);
localStorage.removeItem(getBookLoop);
localStorage.setItem(getBookLoop, JSON.stringify(NewBook));
const libraryDiv = document.querySelector('#ID_Library');
libraryDiv.remove()
const newlibraryDiv = document.createElement("div");
newlibraryDiv.setAttribute("id", "ID_Library");
mainWrapperDIV.appendChild(newlibraryDiv);
showLibrary();
updateBooksCounter();
}
// Create remove button, assign event listener
const removeBtn = document.createElement("button");
removeBtn.classList.add("Class_BookButtons");
removeBtn.innerText = "Remove Book";
removeBtn.addEventListener("click", ()=>{
let rem = JSON.parse(localStorage.getItem(getBookLoop));
rem.title = "";
rem.author = "";
rem.pages = "";
rem.read = "";
rem.info = "";
localStorage.setItem(getBookLoop, JSON.stringify(rem));
NewDivBook.remove();
updateBooksCounter();
});
// Push it to DOM
const libraryDiv = document.getElementById("ID_Library");
const booksInfoWrapper = document.createElement("div");
booksInfoWrapper.setAttribute("id", "ID_BooksInfoWrapper");
libraryDiv.appendChild(NewDivBook);
NewDivBook.appendChild(Titel);
NewDivBook.appendChild(booksInfoWrapper);
booksInfoWrapper.appendChild(Text);
booksInfoWrapper.appendChild(toggleReadBtn);
booksInfoWrapper.appendChild(removeBtn);
}
// Loop ends
updateBooksCounter();
}
// Clear library
const clearBtn = document.getElementById("ID_ClearButton");
clearBtn.addEventListener("click", ()=>{
let confirmBox = confirm(`The librarian asks if you really want to delete the library? 
It removes all book informations from your Browsers storage. 
This cannot be undone! 

Click "confirm" to delete or "cancel" to go back to the library.`)
if(confirmBox === true){
localStorage.clear();
const libraryDiv = document.querySelector('#ID_Library');
libraryDiv.remove()
const newlibraryDiv = document.createElement("div");
newlibraryDiv.setAttribute("id", "ID_Library");
mainWrapperDIV.appendChild(newlibraryDiv);
showLibrary();
updateBooksCounter();
alert(`Ỳou deleted the Online-Library.

The librarian thanks you for using it.
If you would like to give feedback, you can find the contact by clicking on the librarian lettering in the 'Add-Books-Box'.`);
}
});
// Function to show actual Books in library
function updateBooksCounter(){
// Total books
const totalCounterP = document.getElementById("ID_TotalBooks");
let actualNumber = document.getElementById("ID_Library").children.length;
totalCounterP.innerText = actualNumber;
//Books & Pages Read/Unread
document.getElementById("ID_Unread").innerText = 0;
document.getElementById("ID_Readed").innerText = 0;
document.getElementById("ID_PagesRead").innerText = 0;
document.getElementById("ID_Started").innerText = 0;
// Loop trough localStorage to get the values
for (let getBookLoop in localStorage){
let book = JSON.parse(localStorage.getItem(getBookLoop))
if(book === null)return;
if(book.read === "")continue;
if(book.read === "not readed"){
document.getElementById("ID_Unread").innerText++
} else if(book.read === "started"){
document.getElementById("ID_Started").innerText++}
else if (book.read === "readed"){
document.getElementById("ID_Readed").innerText++;
document.getElementById("ID_PagesRead").innerText =  parseInt(book.pages) + parseInt(document.getElementById("ID_PagesRead").innerText);
}}
}
// Inintialize application algorhytmus
showLibrary();
updateBooksCounter();

// Jobs:
// Possibility for user to sort books in categories
// Possibility for a liitle description and notes
// Better styling is ever possible.
// Code cleanup - same here ! :-)