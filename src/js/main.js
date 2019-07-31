var _self = this;

window.addEventListener('load',function(){
	document.getElementsByTagName('button')[0].addEventListener('click',validate);
	$("#date").datepicker();
})


function checkName(name) {
	var pattern = /[a-zA-Z]/;
	return (name.match(pattern))? true:false;
}

function checkEmail(email) {
	var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
	return (email.match(pattern))?true:false;
}

function errorMessage(name,email) {
	if (!_self.checkName(name)) {
		var para = document.createElement('p');
		para.innerHTML = "No digit in Name";
		document.getElementsByClassName('nameField')[0].appendChild(para).setAttribute("class","errorMessage");
	}
	if (!_self.checkEmail(email)) {
		var para = document.createElement('p');
		para.innerHTML = "Please enter valid email address";
		document.getElementsByClassName('emailField')[0].appendChild(para).setAttribute("class","errorMessage");
	}
}

function validate(event) {
	event.preventDefault();
	var name = document.getElementById('name'),
		email = document.getElementById('email');
	(checkName(name.value) & checkEmail(email.value)) ? _self.prepareData(): _self.errorMessage(name.value,email.value);
}

function removeErrorMessage(){
	$('p').remove('.errorMessage');
}

function prepareData(){
	var errorMsg = document.getElementsByClassName('errorMessage'),
		name = document.getElementById('name').value,
		email = document.getElementById('email').value,
		gender = $("input[name='sex']:checked").val(),
		suggestion = $("textarea[name='suggestions']").val();
	if(errorMsg.length > 0) {
		_self.removeErrorMessage();
	}else {
		this.makeQueryParam(name,email,gender,suggestion);
	}
}

function makeQueryParam (name,email,gender,suggestion) {
	var data = {
		"Name" : name,
		"Email" : email,
		"Gender" : gender,
		"Suggestion" : suggestion
	};
	_self.submitData($.param(data));
}

function submitData(queryString) {
	var content,
		xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	      console.log(this.responseText);
	    }
  	};
    xhttp.open("GET", "abc.html");
  	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  	xhttp.send(queryString);
  	content = "<div class='submitMessge'>Your suggestion is received. Thank You for your time</div>"
  	$(".suggestionForm").replaceWith(content);
}

