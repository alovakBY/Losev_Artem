"use strict"
const container = document.querySelector(".container")
// Если startMove === false, то обработчик событий mousemove работать не будет

// Задаем разницу расстояний между курсором и началом мяча в глобальной области видимости.
let shiftX = 0
let shiftY = 0

// Создаем 10 мячей
for (let i = 0; i < 10; i++) {
	const div = document.createElement("div");
	div.className = "ball"
	container.appendChild(div)
}

const balls = document.querySelectorAll(".ball")

function start(e) {
	e.target.style.position = "absolute"
	e.target.style.zIndex = 10
	// Запоминаем разницу расстояний между курсором и началом мяча
	shiftX = e.pageX - e.target.getBoundingClientRect().x
	shiftY = e.pageY - e.target.getBoundingClientRect().y	
	e.target.style.left = `${e.pageX - container.getBoundingClientRect().x - shiftX}px`;
	e.target.style.top = `${e.pageY - container.getBoundingClientRect().y - shiftY}px`;
	document.addEventListener("mousemove", move)
}

function move(e) {
	if (e.target.classList.contains("container")) return
	// Правильно позиционируем мяч
	e.target.style.left = `${e.pageX - container.getBoundingClientRect().x - shiftX}px`;
	e.target.style.top = `${e.pageY - container.getBoundingClientRect().y - shiftY}px`;
}

function end(e) {
	e.target.style.zIndex = ""
	e.target.removeEventListener("mousedown", start)
	document.removeEventListener("mousemove", move)
	e.target.addEventListener("mousedown", start)
}

balls.forEach((el) => {
	el.addEventListener("mousedown", start)
	el.addEventListener("mouseup", end)
})

	