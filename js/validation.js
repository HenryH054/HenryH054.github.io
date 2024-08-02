// This is my own code: Henry Hutchinson
const stateAbbreviations = ["UT", "CA", "CO", "ID", "AZ"];

function initValidation(formSelector) {
	const form = document.querySelector(formSelector);
	form.addEventListener('submit', function(event) {
		event.preventDefault();
		event.stopPropagation();
		if (validateForm(form)) {
			form.style.display = 'none';
			document.getElementById('thankYouMessage').style.display = 'block';
		} else {
			form.classList.add('was-validated');
		}
	});

	form.addEventListener('change', function(event) {
		validateField(event.target);
	});
}

function validateForm(form) {
	let isValid = true;
	form.querySelectorAll('input, textarea').forEach(field => {
		if (!validateField(field)) isValid = false;
	});
	const checkboxes = form.querySelectorAll('input[name="find"]');
	if (!validateCheckboxGroup(checkboxes)) isValid = false;
	return isValid;
}

function validateField(field) {
	const id = field.id;
	const value = field.value.trim();
	let valid = true, message = '';

	switch (id) {
		case 'firstName':
		case 'lastName':
		case 'address':
		case 'city':
		case 'state':
			valid = checkRequired(value);
			message = valid ? '' : 'This field is required.';
			if (id === 'state' && valid) {
				valid = validateState(value);
				message = valid ? '' : 'Invalid state abbreviation.';
			}
			break;
		case 'zip':
		case 'phone':
		case 'email':
			valid = checkFormat(id, value);
			message = valid ? '' : 'Invalid format.';
			break;
	}

	setElementValidity(field, valid, message);
	return valid;
}

function checkRequired(value) {
	return value !== '';
}

function validateState(value) {
	return stateAbbreviations.includes(value.toUpperCase());
}

function checkFormat(fieldId, value) {
	const regexes = {
		zip: /^\d{5}(-\d{4})?$/,
		phone: /^\d{10}$/,
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	};
	return regexes[fieldId].test(value);
}

function validateCheckboxGroup(checkboxes) {
	let isValid = Array.from(checkboxes).some(checkbox => checkbox.checked);
	let message = isValid ? '' : 'Please select at least one option.';
	setCheckboxGroupValidity(checkboxes, isValid, message);
	return isValid;
}

function setCheckboxGroupValidity(checkboxes, valid, message) {
	let errorDiv = document.querySelector('.checkbox-errorMsg');
	if (!errorDiv) {
		errorDiv = document.createElement('div');
		errorDiv.className = 'checkbox-errorMsg errorMsg';
		errorDiv.style.color = 'red';
		checkboxes[0].parentElement.appendChild(errorDiv);
	}
	errorDiv.textContent = message;
	errorDiv.style.display = valid ? 'none' : 'block';
}

function setElementValidity(field, valid, message) {
	let errorDiv = field.nextElementSibling;
	if (!errorDiv || !errorDiv.classList.contains('errorMsg')) {
		errorDiv = document.createElement('div');
		errorDiv.className = 'errorMsg';
		errorDiv.style.color = 'red';
		field.parentElement.insertBefore(errorDiv, field.nextSibling);
	}
	errorDiv.textContent = message;
	errorDiv.style.display = valid ? 'none' : 'block';
	field.classList.toggle('was-validated', !valid);
}

