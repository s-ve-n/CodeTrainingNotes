let titles = [];
let notes = [];
let titles_trash = [];
let notes_trash = [];
load();

function reload_page() {
  location.reload();
  return false;
}

function auto_height(elem) {
  elem.style.height = '37px';
  elem.style.height = elem.scrollHeight + 'px';
}

function render() {
  document.getElementById('bulb').style.backgroundColor = '#feefc3';
  container_html();
  render_for_loop();
}

//prettier-ignore
function container_html() {
  document.getElementById('container').innerHTML = '';
  document.getElementById('container').innerHTML += `
  <div class="notes-container-1">
    <form onsubmit="addNote(); return false;">
      <input autocomplete="off" class="title" type="text" placeholder="Title" id="title-input" minlength="3" maxlength="17" required/>
      <textarea placeholder="Take a note..." class="auto-height" oninput="auto_height(this)" id="note-input" minlength="3" maxlength="500" required></textarea>
      <button class="add">+</button>
    </form>
  </div>
  <div id="wrap-notes" class="wrap-notes"></div>`;
}

//prettier-ignore
function render_for_loop() {
  for (let i = 0; i < titles.length; i++) {
    document.getElementById('wrap-notes').innerHTML += `
      <div class="notes-container-2">
        <div id="title-notes-${i}" class="title">${titles[i].replaceAll(/(<([^>]+)>)/gi,'')}</div>
        <div id="note-notes-${i}" class="note-text">${notes[i].replaceAll(/(<([^>]+)>)/gi,'')}</div>
        <button class="delete" onclick="deleteNoteToTrash(${i})">-</button>
      </div>`;
  }
}

//prettier-ignore
function render_trash() {
  document.getElementById('container').innerHTML = '';
  document.getElementById('container').innerHTML += 
  `<div id="wrap-notes" class="wrap-notes"></div>`;
  for (let i = 0; i < titles_trash.length; i++) {
    document.getElementById('wrap-notes').innerHTML += `
    <div class="notes-container-2">
      <div id="title-trash-${i}" class="title">${titles_trash[i]}</div>
      <div id="note-trash-${i}" class="note-text">${notes_trash[i]}</div>
      <button class="delete" onclick="deleteNote(${i})">-</button>
      <button class="add-from-trash" onclick="addNoteFromTrash(${i})">+</button>
    </div>`;
  }
}

function addNote() {
  titles.push(document.getElementById('title-input').value);
  notes.push(document.getElementById('note-input').value);
  render();
  save();
}

function addNoteFromTrash(i) {
  titles.push(document.getElementById(`title-trash-${i}`).innerHTML);
  notes.push(document.getElementById('note-trash-' + i).innerHTML);
  titles_trash.splice(i, 1);
  notes_trash.splice(i, 1);
  render_trash();
  save();
  saveTrash();
}

function deleteNoteToTrash(i) {
  titles_trash.push(document.getElementById(`title-notes-${i}`).innerHTML);
  notes_trash.push(document.getElementById('note-notes-' + i).innerHTML);
  titles.splice(i, 1);
  notes.splice(i, 1);
  render();
  save();
  saveTrash();
}

function deleteNote(i) {
  titles_trash.splice(i, 1);
  notes_trash.splice(i, 1);
  render_trash();
  saveTrash();
}

function clickBulb() {
  document.getElementById('bulb').style.backgroundColor = '#feefc3';
  document.getElementById('trash').style.backgroundColor = '';
  render();
}

function clickTrash() {
  document.getElementById('trash').style.backgroundColor = '#feefc3';
  document.getElementById('bulb').style.backgroundColor = '';
  render_trash();
}

function save() {
  let titlesAsText = JSON.stringify(titles);
  localStorage.setItem('titles', titlesAsText);
  let notesAsText = JSON.stringify(notes);
  localStorage.setItem('notes', notesAsText);
}

function saveTrash() {
  let titles_trashAsText = JSON.stringify(titles_trash);
  localStorage.setItem('titles_trash', titles_trashAsText);
  let notes_trashAsText = JSON.stringify(notes_trash);
  localStorage.setItem('notes_trash', notes_trashAsText);
}

function load() {
  let titlesAsText = localStorage.getItem('titles');
  let notesAsText = localStorage.getItem('notes');
  if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
  }
  let titles_trashAsText = localStorage.getItem('titles_trash');
  let notes_trashAsText = localStorage.getItem('notes_trash');
  if (titles_trashAsText && notes_trashAsText) {
    titles_trash = JSON.parse(titles_trashAsText);
    notes_trash = JSON.parse(notes_trashAsText);
  }
}
