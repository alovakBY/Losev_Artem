"use strict"
const container = document.querySelector(".container")
const element = document.querySelector(".elementMove")
// x,y -- это координаты изменения положения нашего элемента   
let x = 0
let y = 0
// пока direction = 0, будет работать только кнопка space. Это начало движения нашего элемента.
let direction = 0
// Пределы по X и Y, в которых будет двигаться наш элемент. Если например элемент дойдет до левой границы родителя, то limitX = "left" и по условию нажатие на левую стрелку будет игнорироваться пока мы не нажмем хоть раз стрелку вправо. 
let limitX = "neutral"
let limitY = "neutral"
// Объявление наших setInterval-ов.  
let leftSetInterval, rightSetInterval, upSetInterval, downSetInterval
// Функция, которая очищает все setInterval-ы.
function clearAllInterval() {
	clearInterval(leftSetInterval)
	clearInterval(rightSetInterval)
	clearInterval(upSetInterval)
	clearInterval(downSetInterval)
}

// Функция движения элемента вправо
function runRight() {
	limitX = "neutral"
	x += 1;
	element.style.transform = `translate(${x}px, ${y}px)`
	if (element.getBoundingClientRect().right === container.getBoundingClientRect().right) {
		clearAllInterval()
		limitX = "right"
	}
}

// Функция движения элемента влево
function runLeft() {
	limitX = "neutral"
	x -= 1;
	element.style.transform = `translate(${x}px, ${y}px)`
	if (element.getBoundingClientRect().left === container.getBoundingClientRect().left) {
		clearAllInterval()
		limitX = "left"
	} 
}

// Функция движения элемента вверх
function runUp() {
	limitY = "neutral"
	y -= 1;
	element.style.transform = `translate(${x}px, ${y}px)`
	if (element.getBoundingClientRect().top === container.getBoundingClientRect().top) {
		clearAllInterval()
		limitY = "up"
	}
}

// Функция движения элемента вниз
function runDown() {
	limitY = "neutral"
	y += 1;
	element.style.transform = `translate(${x}px, ${y}px)`
	if (element.getBoundingClientRect().bottom === container.getBoundingClientRect().bottom) {
		clearAllInterval()
		limitY = "down"
	}
}

// Клик по клавиатуре
document.addEventListener("keyup", (e) => {
// Клик по пробелу. Кликается один раз в самом начале и запускает движение элемента вправо.
	if (e.code === "Space") {
		if (direction !== 0) return
		else {
			rightSetInterval = setInterval(runRight,5)
			direction = "right"
		}
	}
// Клик по кнопке "←". 
	if (e.code === "ArrowLeft") {
		if (direction === "left" || direction === 0) return
		if(limitX === "left") return
		else {
			clearAllInterval() 
			leftSetInterval = setInterval(runLeft,5)
			direction = "left"
		}
	}
// Клик по кнопке "→". 
	if (e.code === "ArrowRight") {
		if (direction === "right" || direction === 0) return
		if(limitX === "right") return
		else {
			clearAllInterval() 
			rightSetInterval = setInterval(runRight,5)
			direction = "right"
		}
	}
// Клик по кнопке "↑". 
	if (e.code === "ArrowUp") {
		if (direction === "up" || direction === 0) return
		if(limitY === "up") return
		else {
			clearAllInterval() 
			upSetInterval = setInterval(runUp,5)
			direction = "up"
		}
	}
	// Клик по кнопке "↓". 
	if (e.code === "ArrowDown") {
		if (direction === "down" || direction === 0) return
		if(limitY === "down") return
		else {
			clearAllInterval() 
			upSetInterval = setInterval(runDown,5)
			direction = "down"
		}
	}
})


