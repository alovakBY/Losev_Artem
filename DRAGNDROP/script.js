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
	div.style.position = "absolute"
	div.style.left = `${Math.floor(Math.random() * (container.offsetWidth - 50))}px`
	div.style.top =`${Math.floor(Math.random() * (container.offsetHeight - 50))}px`
	container.appendChild(div)
}

const balls = document.querySelectorAll(".ball")

function start(e) {
	if (e.target.classList.contains("container")) return
	e.target.style.zIndex = 10
	e.target.classList.add("activ")
	// Запоминаем разницу расстояний между курсором и началом мяча
	shiftX = e.pageX - e.target.getBoundingClientRect().x
	shiftY = e.pageY - e.target.getBoundingClientRect().y	
	e.target.ondragstart = function() {
		return false
	}
	container.addEventListener("mousemove", move)
	document.addEventListener("mouseup", end)
}

function move(e) {
	let ball = document.querySelector(".activ")
	// Правильно позиционируем мяч
	ball.style.left = `${e.pageX - container.getBoundingClientRect().x - shiftX}px`
	ball.style.top = `${e.pageY - container.getBoundingClientRect().y - shiftY}px`
}

function end(e) {
	e.target.style.zIndex = ""
	balls.forEach((e) => {
		e.className = "ball"
	})
	e.target.removeEventListener("mousedown", start)
	container.removeEventListener("mousemove", move)
	e.target.addEventListener("mousedown", start)
}

container.addEventListener("mousedown", start)




	