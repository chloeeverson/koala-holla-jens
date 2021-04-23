console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  
  
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', function () {
    console.log('in addButton on click');
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
  $('#viewKoalas').on('click', '.readyButton', readyKoalaHandler);

  $('#viewKoalas').on('click', '.deleteButton', deleteKoalaHandler);

}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $('#viewKoalas').empty();
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function (response) {
    console.log('Getting response', response);
    renderKoalas(response);
  })
} // end getKoalas

function renderKoalas(response) {
  for (let i = 0; i < response.length; i++) {
    if (response[i].ready_to_transfer == true) {
      $('#viewKoalas').append(`
      <tr>
        <td>${response[i].name}</td>
        <td>${response[i].age}</td>
        <td>${response[i].gender}</td>
        <td>${response[i].ready_to_transfer}</td>
        <td>${response[i].notes}</td>
        <td> </td>
        <td><button class="deleteButton" data-id=${response[i].id}>Delete</button></td>
      </tr>
      `);
    } else {
       $('#viewKoalas').append(`
       <tr>
         <td>${response[i].name}</td>
         <td>${response[i].age}</td>
         <td>${response[i].gender}</td>
         <td>${response[i].ready_to_transfer}</td>
         <td>${response[i].notes}</td>
         <td><button class="readyButton" data-id=${response[i].id}>Mark As Ready</button></td>
         <td><button class="deleteButton" data-id=${response[i].id}>Delete</button></td>
       </tr>
       `);
   }
   
  }
}//end renderKoalas


function saveKoala(newKoala) {
  console.log('in saveKoala', newKoala);
  // ajax call to server to POST koalas
  let koalaToSend = {
    name: $('#nameIn').val(),
    age: $('#ageIn').val(),
    gender: $('#genderIn').val(),
    readyForTransfer: $('#readyForTransferIn').val(),
    notes: $('#notesIn').val(),
  }
  $.ajax({
    type: 'POST',
    url: '/koalas',
    data: koalaToSend
  }).then(function (response) {
    $('#nameIn').val(''),
      $('#ageIn').val(''),
      $('#genderIn').val(''),
      $('#readyForTransferIn').val(''),
      $('#notesIn').val(''),
      getKoalas();
  });

}

function readyKoalaHandler() {

  console.log('clicked');
  readyKoalas($(this).data("id"));
}

function readyKoalas(readyId) {
  $.ajax({
    method: 'PUT',
    url: `/koalas/${readyId}`,
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function (error) {
      alert('error on put route client', error);
    })
}

function deleteKoalaHandler() {
  deleteKoala($(this).data("id"))
}

function deleteKoala(koalaId) {
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`,
  })
    .then(function (response) {
      getKoalas();
    })
    .catch(function (error) {
      alert('Error on deleting song.', error);
    });
}