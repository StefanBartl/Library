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
const mainWrapperDIV = document.getElementById("IDMainWrapper");
// Add new books function
const addBooksButton = document.getElementById("addBTN");
addBooksButton.addEventListener("click", addBooks);
function addBooks (){
let saveNumber = localStorage.length +1;
// Take Input, create obj and push it to library
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const pages = document.getElementById('pages').value;
const read = document.getElementById('read').checked;
// Check for readed or not
let readed;
if (read === true){
    readed = "readed"
} else {readed = "not readed"};
// Create new book and push it to storage
const NewBook = new Book(title, author, pages, readed);
if(localStorage.getItem(`Book${saveNumber}`)){saveNumber++};
localStorage.setItem(`Book${saveNumber}`, JSON.stringify(NewBook));
// Delete old screen and show up-to-date library
const libraryDiv = document.querySelector('#library');
libraryDiv.remove()
const newlibraryDiv = document.createElement("div");
newlibraryDiv.setAttribute("id", "library");
mainWrapperDIV.appendChild(newlibraryDiv);
showLibrary();
updateBooksCounter();
}
// Main function which shows the library
function showLibrary (){
const libraryDiv = document.querySelector('#library');
// Loop trough localStorage to get the values
for (let getBookLoop in localStorage){
let book = JSON.parse(localStorage.getItem(getBookLoop))
if(book === null)return;
let title =book.title;
let author= book.author;
let pages= book.pages;
let finish = "";
if(book.read === "not readed"){finish = "If only we had the time to do it..."} else finish = "The librarian hopes you enjoyed it." ;
// Create new elements and pt the text in
const NewDivBook = document.createElement("div");
NewDivBook.setAttribute("id", "BookDivs");
let Titel = document.createElement("h3");
Titel.setAttribute("id", "booksH3");
let Text = document.createElement("p");
Text.setAttribute("id", "booksP");
// If title is not empty (as by the removed ones), go ahead. Else go get next book.
if(title != ""){ Titel.innerHTML = title} else continue;
// Put text for user information together
Text.innerHTML = `This book was written by ${author}.<br>${title} has ${pages} Pages and you've<br><br>${book.read} it.<br><br>${finish}`;
// Create toggle read button, get text content on read-state together, assign event listener
const toggleReadBtn = document.createElement("button");
let libraryBtn = JSON.parse(localStorage.getItem(getBookLoop));
let readBtn = libraryBtn.read;
let readOpposite;
if(readBtn === "readed"){readOpposite = "Don't readed it?"}else readOpposite = "Have you read it?";
toggleReadBtn.innerText = readOpposite;
toggleReadBtn.addEventListener("click", ()=> {
    let libraryBtn = JSON.parse(localStorage.getItem(getBookLoop));
    let readBtn = libraryBtn.read;
    toggleRead(readBtn);});
// Toggle-read status function
function toggleRead(state){
    let togglePushRead,btnText;
    if(state === "readed"){togglePushRead = "not readed"} else togglePushRead = "readed" ;
    if(state === "readed"){btnText = "Have you read it?"}else btnText = "Don't readed it?";
    toggleReadBtn.innerText = btnText;
    const NewBook = new Book(title, author, pages, togglePushRead);
    localStorage.removeItem(getBookLoop);
    localStorage.setItem(getBookLoop, JSON.stringify(NewBook));
    const libraryDiv = document.querySelector('#library');
    libraryDiv.remove()
    const newlibraryDiv = document.createElement("div");
    newlibraryDiv.setAttribute("id", "library");
    mainWrapperDIV.appendChild(newlibraryDiv);
    showLibrary();
    updateBooksCounter();
}
// Create remove button, assign event listener
const removeBtn = document.createElement("button");
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
const libraryDiv = document.getElementById("library");
const booksInfoWrapper = document.createElement("div");
booksInfoWrapper.setAttribute("id", "booksInfoWrapper");
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
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", ()=>{
localStorage.clear();
const libraryDiv = document.querySelector('#library');
libraryDiv.remove()
const newlibraryDiv = document.createElement("div");
newlibraryDiv.setAttribute("id", "library");
mainWrapperDIV.appendChild(newlibraryDiv);
showLibrary();
updateBooksCounter();
});
// Function to show actual Books in library
function updateBooksCounter(){
// Total books
const totalCounterP = document.getElementById("IDtotalBooks");
let actualNumber = document.getElementById("library").children.length;
totalCounterP.innerText = actualNumber;

//Books & Pages Read/Unread
document.getElementById("IDunread").innerText = 0;
document.getElementById("IDread").innerText = 0;
document.getElementById("IDpagesRead").innerText = 0;
// Loop trough localStorage to get the values
for (let getBookLoop in localStorage){
let book = JSON.parse(localStorage.getItem(getBookLoop))
if(book === null)return;
if(book.read === "")continue;
if(book.read === "not readed"){
document.getElementById("IDunread").innerText++
} else {
document.getElementById("IDread").innerText++;
document.getElementById("IDpagesRead").innerText =  parseInt(book.pages) + parseInt(document.getElementById("IDpagesRead").innerText);
}}}
// Inintialize application algorhytmus
showLibrary();
updateBooksCounter();

// Jobs:
// Possibility for user to sort books in categories
// Possibility for a liitle description and notes
// Code cleanup
// Better styling