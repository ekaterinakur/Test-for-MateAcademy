const form = document.querySelector('form');  

    // Создает новый елемент DOM для выведения сообщения об ошибке и добавляет соответствующей части формы класс 'error'.
  function showError(part, errorMsg) {
    part.classList.add('error');
    let msgSpan = document.createElement('span');
    msgSpan.className = 'error-message';
    msgSpan.innerHTML = errorMsg;
    part.appendChild(msgSpan);
    msgSpan.style.display = 'block';
  }

  // Удаляет елемент с сообщением об ошибке из DOM и удаляет из соответствующей части формы класс 'error'.
  function resetError(part) {
    part.classList.remove('error');

    if (part.lastChild.className == 'error-message') {
        part.removeChild(part.lastChild);
    }
  }

  // Для проверки валидности каждого елемента формы (по типу ошибки).
  function validate(form) {

    let elems = form.elements,
        errorArr = [],
        email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    for (let i = 0; i < elems.length; i++) {
        resetError(elems[i].parentNode);

        let validation1 = elems[i].dataset.validationRequired;
        let validation2 = elems[i].dataset.validationText;
        let validation3 = elems[i].dataset.validation;
        

        if (elems[i].value && validation1 === 'required') {
            resetError(elems[i].parentNode);
        } else if (!elems[i].value && validation1 === 'required') {
            showError(elems[i].parentNode, 'This field is required!');
        }
    
        if (elems[i].value && validation2 === 'symbols' && elems[i].value.indexOf('\'') === -1 && elems[i].value.indexOf('\"') === -1) {
            resetError(elems[i].parentNode);
        } else if (elems[i].value && validation2 === 'symbols') {
            showError(elems[i].parentNode, 'This field cannot contain characters \' or \"');
        }

        if (validation3 === 'gender' && !elems.male.checked && !elems.female.checked) {
            showError(elems[i].parentNode, 'This field is required!');
        } else if (validation3 === 'gender') {
            resetError(elems[i].parentNode);
        }

        if (validation3 === 'country' && elems[i].value != "0") {
            resetError(elems[i].parentNode);
        } else if (validation3 === 'country' && elems[i].value === "0") {
            showError(elems[i].parentNode, 'This field is required!');
        }

        if (elems[i].value && validation3 === 'email' && email.test(elems[i].value)) {
            resetError(elems[i].parentNode);
        } else if (elems[i].value && validation3 === 'email') {    
            showError(elems[i].parentNode, 'Email address is not valid');
        }
        
        if (elems[i].value && validation3 === 'password' && elems[i].value.length > 8) {
            resetError(elems.userPassword.parentNode);
        } else if (elems[i].value && validation3 === 'password') {
            showError(elems.userPassword.parentNode, 'Password must be at least 8 characters');
        }
    }

    // Выведение alert с сообщением о прохождении валидации:
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].parentNode.classList.contains('error')) { errorArr.push(elems[i].parentNode); }
    }

    if (errorArr.length === 0) { alert('Validation passed'); }
}
