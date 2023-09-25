document.getElementById("btn-send").addEventListener("click", sending);

function sending(e) {
  var myModal = new bootstrap.Modal(document.getElementById("exampleModal"));

  if (e.target.dataset["send"] == "/close") {
    myModal.hide();
  }
  if (e.target.dataset["send"] == "/insert") {
    localStorage.setItem('user', JSON.stringify({}));
    window.location.href = e.target.dataset["send"];
  } else {
    window.location.href = e.target.dataset["send"];
  }
}