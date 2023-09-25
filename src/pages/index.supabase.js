import { supabase } from './supabase';
import validator from 'validator';

document.getElementById("search-button").addEventListener("click", searchEstudents, false);

async function searchEstudents(e) {
  e.preventDefault();
  let inSearch = document.getElementById('input-search').value;
  let valInSearch = validator.isNumeric(inSearch, { no_symbols: true });
  if (valInSearch) {

    let { data: students, error } = await supabase
      .from('students')
      .select('*')
      .eq('document', String(inSearch))

    if (await students.length == 0 && error == null) {
      var myModal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      myModal.show();
      document.getElementById("openModal").addEventListener("click", openModal);
    } else {
      localStorage.setItem('user', JSON.stringify(students[0])); 
      window.location.href = '/insert'; 
    }
  }

}


function openModal() {
  var myModal = new bootstrap.Modal(
    document.getElementById("exampleModal")
  );
  myModal.show();
}
document.getElementById("openModal").addEventListener("click", openModal);