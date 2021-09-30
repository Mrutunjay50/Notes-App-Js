console.log("hello world");
showcase();
let addBtn = document.getElementById('addBtn');
// after clicking the btn the title and notes should get stored in tthe localstorage
addBtn.addEventListener('click', function (e) {
    let addTitle = document.getElementById('addTit');
    let addText = document.getElementById('addTxt');
    if (addTitle.value == "" || addText.value == "") {
        return alert("Please add Note Title and Details")
    }
    let notesId = localStorage.getItem('notes');
    if (notesId == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesId);
    }
    let anObj = {
        title: addTitle.value,
        text: addText.value
    };
    notesObj.push(anObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value = "";
    showcase();
});

// function for showing the notes in the web app
function showcase() {
    let notesId = localStorage.getItem('notes');
    if (notesId == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notesId);
    }
    let html = '';
    notesObj.forEach((element, index) => {
        html += `
            <div class="note mx-2 my-2">
                <h3 class="note-title"> ${element.title} </h3>
                <p class="note-text"> ${element.text}</p>
                <button id="${index}"onclick="deleteNote(this.id)" class="my-2 btn btn-primary">Delete Note</button>
                <button id="${index}"onclick="editNote(this.id)" class=" my-2 btn btn-primary edit-btn">Edit Note</button>
            </div>
                `;
    });
    let anElmNote = document.getElementById('notes');
    if (notesObj.length != 0) {
        anElmNote.innerHTML = html;
    }
    else {
        anElmNote.innerHTML = `Notes are yet to be added || please write first`;
    }
}

// a function to delete the note
function deleteNote(index) {
    let confirmDl = confirm("Do you really want to delete this?")
    if (confirmDl == true) {
        let notesId = localStorage.getItem('notes');
        if (notesId == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notesId);
        }

        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showcase();
    }
}


// Function to edit an existing note
function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("addTit");
    let addText = document.getElementById("addTxt");

    if (addTitle.value !== "" || addText.value !== "") {
        return alert("Please clear the form before editing a note")
    }

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    console.log(notesObj);

    notesObj.findIndex((element, index) => {
        addTitle.value = element.title;
        addTxt.value = element.text;
    })
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 