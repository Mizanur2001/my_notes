console.log("This is MyNotes's Console.log()");

fetchNotes();

//Adding Notes message into Local Stroge

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function () {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addTxt.value);
    addTxt.value = "";
    localStorage.setItem('notes', JSON.stringify(notesobj));
    //console.log(notesobj);
    fetchNotes();
});

//Fatch all the notes Function

function fetchNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="card my-3 mx-3 noteCard"  style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"> Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button class="btn btn-danger" onclick=funcDelete(${index})>Delete</button>
        </div>
        </div>`;
    });

    let notesEle = document.getElementById('notes');
    if (notesobj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = ` <div class="container">
        <div class="row justify-content-center mx-5 my-5 px-4">
            <h5>No Notes Available :(</h5>
        </div>
        </div>`;
    }
}

//function to delete notes 

function funcDelete(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }

    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    fetchNotes();
}

// Search notes

let search = document.getElementById('search');
search.addEventListener('input',function(){
    let noteCard = document.getElementsByClassName('noteCard');
    let inputVal = search.value;
    Array.from(noteCard).forEach(function(element){
        let cardtext = element.getElementsByClassName('card-text')[0].innerText;
        if (cardtext.includes(inputVal)) {
           element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
});

