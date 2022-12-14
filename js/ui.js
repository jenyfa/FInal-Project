//setup materialize components
document.addEventListener("DOMContentLoaded", function(){
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
})

const Tutors = document.querySelector(".card");
const loggedoutLinks = document.querySelectorAll ("#logged-in");
const loggedinLinks = document.querySelectorAll ("#logged-out");

const setupUI = (user) => {
  if (user){
    loggedoutLinks.forEach((stuff) => (stuff.style.display = "none"));
    loggedinLinks.forEach((stuff) => (stuff.style.display = "block"));
  }else{
    loggedoutLinks.forEach((stuff) => (stuff.style.display = "block"));
    loggedinLinks.forEach((stuff) => (stuff.style.display = "none"));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //Nav Menu
  const menus = document.querySelectorAll(".side-menu");
  M.Sidenav.init(menus, { edge: "right" });
  // Add Tasks
  const forms = document.querySelectorAll(".side-form");
  M.Sidenav.init(forms, { edge: "left" });
});

//Populate data when user is signed in
const setupTutors = (data) => {
  let html = "";
  data.forEach((doc) => {
    const Tutor = doc.data();
    const li = `<div class="col s12 m6 center">
    <div class="card" data-id = "${Tutor.id}">
      <div class="card-image">
        <img src="/images/homeworkicon512.png">
        <span class="card-title red-text"><b>${Tutor.title}</b></span>
        <a class="btn-floating halfway-fab waves-effect waves-light red right-align"><i class="material-icons">login</i></a>
      </div>
      <div class="card-content">
        <ul class="center">
          <li>${Tutor.description}</li>
        </ul>
      </div>
    </div>
  </div>
</div>`;
html += li;
  })

Tutors.innerhtml = html;
}

const renderTutors = (data, id) => {
  const html = `<div class="row">
  <div class="col s12 m6 center">
    <div class="card" data-id = "${id}">
      <div class="card-image">
        <img src="/images/homeworkicon512.png">
        <span class="card-title red-text"><b>${data.title}</b></span>
        <a class="btn-floating halfway-fab waves-effect waves-light red right-align"><i class="material-icons">login</i></a>
      </div>
      <div class="card-content">
        <ul class="center">
          <li>${data.description}</li>
        </ul>
      </div>
    </div>
  </div>
</div>`;

Tutors.innerhtml += html;
}

//remove Tutors from DOM
const removeTutors = (id) => {
  const Tutors = document.querySelector(`.Tutor[data-id = "{$id}"]`);
  //console.log(Tutors)
  Tutors.remove
};
