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
    localStorage.setItem("Book" + saveNumber, JSON.stringify(NewBook));
    // Delete old screen and show up-to-date library
    const libraryDiv = document.querySelector('#library');
    libraryDiv.remove()
    const newlibraryDiv = document.createElement("div");
    newlibraryDiv.setAttribute("id", "library");
    document.body.appendChild(newlibraryDiv);
    showLibrary();
}
// Main function which shows the library
function showLibrary (){
    // Variables for loop
    let counter = 1;
    let getBook = `Book${counter}`;
    let libraryNumber = localStorage.length;
    const libraryDiv = document.querySelector('#library');
    // Loop trough localStorage to get the values
    for (let element = 0; element < localStorage.length; element++){
    let getBookLoop = `Book${element + 1}`;
    let library = JSON.parse(localStorage.getItem(getBookLoop));
    let title = library.title;
    let author= library.author;
    let pages= library.pages;
    let read = library.read;
    let finish = "";
    if(read === "not readed"){finish = "Let's do it!"} else finish = "Congratulations!" ;
    // Create new elements and pt the text in
    const NewDivBook = document.createElement("div");
    NewDivBook.setAttribute("id", "BookDivs");
    let Titel = document.createElement("h3");
    let Text = document.createElement("p");
    // If title is not empty (as by the removed ones), go ahead. Else go get next book.
    if(title != ""){ Titel.innerHTML = title} else continue;
    // Put text for user information together
    Text.innerHTML = `This book was written by ${author}.<br>${title} have ${pages} Pages and you've<br><br>${read} it.<br><br>${finish}`;
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
        document.body.appendChild(newlibraryDiv);
        showLibrary();
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
    });
    // Push it to DOM
    const libraryDiv = document.getElementById("library");
    libraryDiv.appendChild(NewDivBook);
    NewDivBook.appendChild(Titel);
    NewDivBook.appendChild(Text);
    NewDivBook.appendChild(toggleReadBtn);
    NewDivBook.appendChild(removeBtn);
    }
    // Loop ends
}
// Clear library
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", ()=>{
    localStorage.clear();
    const libraryDiv = document.querySelector('#library');
    libraryDiv.remove()
    const newlibraryDiv = document.createElement("div");
    newlibraryDiv.setAttribute("id", "library");
    document.body.appendChild(newlibraryDiv);
    showLibrary();
});
// Inintialize application algorhytmus
showLibrary();