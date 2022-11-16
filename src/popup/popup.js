/* Retrieve option settings */
let inputTitle = document.querySelector('.new-note input');
let inputBody = document.querySelector('.new-note textarea');
let noteContainer = document.querySelector('.note-container');
let saveButton = document.querySelector('.save-settings');

saveButton.addEventListener('click', saveSettings);

/* Get saved settings */
initialize();

function initialize() {
  let gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    let noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      let curValue = results[noteKey];
      displayNote(noteKey, curValue);
    }
  });
}

/* Save user settings */
function saveSettings() {
  let noteTitle = inputTitle.value;
  let noteBody = inputBody.value;
  storeNote(noteTitle, noteBody);
}

/* function to store a new note in storage */

function storeNote(title, body) {
  let storingNote = browser.storage.local.set({ [title]: body });
  storingNote.then(() => {
    displayNote(title, body);
  });
}

/* function to display a note in the note box */

function displayNote(title, body) {
  /* create note display box */
  let note = document.createElement('div');
  let noteDisplay = document.createElement('div');
  let noteH = document.createElement('h2');
  let notePara = document.createElement('p');
  let deleteBtn = document.createElement('button');
  let clearFix = document.createElement('div');

  note.setAttribute('class', 'note');

  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class', 'delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class', 'clearfix');

  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener('click', (e) => {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(
      evtTgt.parentNode.parentNode
    );
    browser.storage.local.remove(title);
  });

  /* create note edit box */
  let noteEdit = document.createElement('div');
  let noteTitleEdit = document.createElement('input');
  let noteBodyEdit = document.createElement('textarea');
  let clearFix2 = document.createElement('div');

  let updateBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class', 'update');
  updateBtn.textContent = 'Update note';
  cancelBtn.setAttribute('class', 'cancel');
  cancelBtn.textContent = 'Cancel update';

  noteEdit.appendChild(noteTitleEdit);
  noteTitleEdit.value = title;
  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = body;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class', 'clearfix');

  note.appendChild(noteEdit);

  noteContainer.appendChild(note);
  noteEdit.style.display = 'none';

  /* set up listeners for the update functionality */

  noteH.addEventListener('click', () => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  });

  notePara.addEventListener('click', () => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    noteDisplay.style.display = 'block';
    noteEdit.style.display = 'none';
    noteTitleEdit.value = title;
    noteBodyEdit.value = body;
  });

  updateBtn.addEventListener('click', () => {
    if (noteTitleEdit.value !== title || noteBodyEdit.value !== body) {
      updateNote(title, noteTitleEdit.value, noteBodyEdit.value);
      note.parentNode.removeChild(note);
    }
  });
}

/* function to update notes */

function updateNote(delNote, newTitle, newBody) {
  let storingNote = browser.storage.local.set({ [newTitle]: newBody });
  storingNote.then(() => {
    if (delNote !== newTitle) {
      let removingNote = browser.storage.local.remove(delNote);
      removingNote.then(() => {
        displayNote(newTitle, newBody);
      });
    } else {
      displayNote(newTitle, newBody);
    }
  });
}
