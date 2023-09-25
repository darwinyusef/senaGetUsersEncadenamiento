import { supabase } from '../supabase';
import validator from 'validator';

let objUser = JSON.parse(localStorage.getItem('user'));
document.getElementById("hidden1").classList.add("hidden");
document.getElementById("hidden2").classList.add("hidden");



document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();


    let name = document.getElementById("name").value;
    let last = document.getElementById("last").value;
    let omeDocument = document.getElementById("omeDocument").value;
    let typedocument = (
        document.getElementById("typedocument")).value;
    let phone = document.getElementById("phone").value;
    let phone_attendant = document.getElementById("phone_attendant").value;
    let email = document.getElementById("email").value;
    let ie = document.getElementById("ie").value;
    let accept = document.querySelector(".checkbox").checked;

    // Si User existe no es necesario modificar datos
    if (objUser.actual_status == "INICIAL" &&
        objUser.ie == null &&
        objUser.accept == null &&
        objUser.phone == null &&
        objUser.phone_attendant == null) {
        name = objUser.name;
        last = objUser.last;
        omeDocument = objUser.document;
        typedocument = objUser.typedocument;
    }

    let final = {
        name,
        last,
        phone,
        phone_attendant,
        email,
        omeDocument,
        typedocument,
        ie,
    };

    let listValidations = [];
    Object.keys(final).forEach((el, index) => {
        Object.values(final).forEach((val, idx) => {
            if (index == idx) {
                document.getElementById(`error-${el}`).innerText = '';
                if (validations(val, el) != null) {
                    document.getElementById(`error-${el}`).innerText = validations(val, el)[0];
                    if (validations(val, el)[1]) {
                        listValidations.push(true);
                    }
                }
            }
        });
    });

    if (checkedVal(accept) == false) {
        listValidations.push(true);
    }

    if (listValidations.length == 0) {
        if (objUser.register == false, objUser.actual_status == "INICIAL" &&
            objUser.document != null) {
            let sendObjFinal = {
                phone,
                phone_attendant,
                email,
                document: omeDocument,
                typedocument,
                ie,
                accept,
                update_at: finalDate,
                register: true
            }
            console.log(sendObjFinal);
            const { students, error } = await supabase
                .from('students')
                .update(sendObjFinal)
                .eq('document', omeDocument)
                .select()

            console.log(students, error);
        }
    }
});

function validations(data, el) {
    if (data == null) {
        return ['Este campo es requerido', true];
    }

    if (data == '') {
        return ['Este campo es requerido', true];
    }

    if (el == 'email') {
        if (!validator.isEmail(data)) {
            return ['El campo no se reconoce correctamente como un Email', true]
        }
    }

    const vals = ['name', 'last'];
    if (vals.includes(el)) {
        if (!validator.isAlpha(data, 'es-ES', { 'ignore': " " })) {
            return ['El campo no se reconoce correctamente como un Texto A-Z', true]
        }
    }

    const nums = ['phone', 'phone_attendant'];
    if (nums.includes(el)) {
        if (!validator.isInt(data, { min: 3000000000, max: 9999999999 })) {
            return ['El campo no se reconoce correctamente como un Número Celular', true]
        }
    }
    return null;

}

function checkedVal(accept) {
    document.getElementById(`error-accept`).innerText = '';
    if (accept == false) {
        document.getElementById(`error-accept`).innerText = 'Este campo debe ser Aceptado';
        return false;
    } else {
        return null;
    }
}