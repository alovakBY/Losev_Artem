document.querySelector(".header__nav__burger").onclick = function () {
	document.querySelector(".header__nav__burger__line").classList.toggle("activ")
	document.querySelector(".header__nav__nav").classList.toggle("activ")
	document.querySelector("body").classList.toggle("lock")
}

document.querySelector(".header__nav__nav").onclick = function () {
	document.querySelector(".header__nav__burger__line").classList.toggle("activ")
	document.querySelector(".header__nav__nav").classList.toggle("activ")
	document.querySelector("body").classList.toggle("lock")
}