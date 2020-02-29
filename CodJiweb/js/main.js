document.addEventListener("click", function(e) {
	if (e.target.className=="drop") {
  		e = e.parentNode;
  		e.style.backgroundColor = "#0b0d0e";
	}

  	if (e.target.className=="dropdown") {
   		alert("click");
   		e.classList.remove("dropdown");
   		e.classList.add("dropdownClick");
  	}
});