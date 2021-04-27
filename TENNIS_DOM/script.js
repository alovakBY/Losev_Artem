// Основные величины для расчета будут браться с объекта element.getBoundingClientRect(). Мне показалось это удобным.
const startBtn = document.querySelector("button") // кнопка старт
const scoreboard = document.querySelector(".scoreboard") // табло
const ball = document.querySelector(".ball") // мяч
const field = document.querySelector(".field") //поле
const racketLeft = document.querySelector(".racketLeft") //Левая ракетка
const racketRight = document.querySelector(".racketRight") // Правая ракетка
const score = {
	left: 0,
	right: 0,
} // счет 
const arrRandom = [-1 , 1] // Случайное направление 
const speedBall = 6 // "скорость" мяча 
const speedRacket = 3 // "скорость" ракетки 
let start = false // Проверка на старт
const pressKeys = {
	"Shift": false,
	"Control":false,
	"ArrowUp": false,
	"ArrowDown": false,
} // Состояние кнопок(нажата или нет)
const valuesKeys = {
	"Shift": [ -1 , racketLeft,"top"],
	"Control":[1 , racketLeft,"bottom"],
	"ArrowUp": [  -1 , racketRight,"top"],
	"ArrowDown": [ 1 , racketRight,"bottom"],
} // Какие данные передавать в функцию движения ракеток

// Начальное положение мяча и случайное положение ракеток по оси Y
function ballPositionCenterField() {
	//Позиционирование мяча
	ball.style.left = `${field.offsetWidth/2 - ball.offsetWidth/2}px`
	ball.style.top = `${field.offsetHeight/2  - ball.offsetHeight/2}px`
	
 	//Позиционирование ракеток 
	racketLeft.style.top = `${Math.abs(Math.floor(Math.random()*field.offsetHeight - racketLeft.offsetHeight))}px`
	racketRight.style.top = `${Math.abs(Math.floor(Math.random()*field.offsetHeight - racketRight.offsetHeight))}px`
	
	// Табло 
	scoreboard.textContent = `${score.left}:${score.right}`
}
ballPositionCenterField()

startBtn.addEventListener("click", startGame)

// Клик по кнопке "Старт" и начало игры
function startGame() {
	if (start === true) return 
	start = true
	let directionX = arrRandom[Math.floor(Math.random()*2)] //Направление мяча (-1 или 1) по X
	let directionY = arrRandom[Math.floor(Math.random()*2)] //Направление мяча (-1 или 1) по Y	
	function run() {
		// Если мяч ударяется о верхнюю стену то летит вниз
		if(ball.getBoundingClientRect().top <= field.getBoundingClientRect().top) directionY = -directionY 

		// Если мяч ударяется о нижнюю стену то летит вверх
		if(ball.getBoundingClientRect().bottom >= field.getBoundingClientRect().bottom) directionY = -directionY 

		// Если мяч ударяется о левую стену то даем очко левому игроку, мяч на центр и ждем нажатие кнопки старт  
		if(ball.getBoundingClientRect().left <= field.getBoundingClientRect().left) {
			score.right++
			ballPositionCenterField()
			start = false
			return
		} 

		// Если мяч ударяется о правую стену то даем очко левому игроку, мяч на центр и ждем нажатие кнопки старт 
		if(ball.getBoundingClientRect().right >= field.getBoundingClientRect().right) {
			score.left++
			ballPositionCenterField()
			start = false
			return
		}	

		// Если мяч ударяется центром о левую ракетку то летит вправо 
		if (ball.getBoundingClientRect().left <= racketLeft.getBoundingClientRect().right) {
			if(racketLeft.getBoundingClientRect().top <= (ball.getBoundingClientRect().top + ball.getBoundingClientRect().height/2) && 
				racketLeft.getBoundingClientRect().bottom >= (ball.getBoundingClientRect().top + ball.getBoundingClientRect().height/2)) {
				directionX = -directionX
			}
		} 

		// Если мяч ударяется центром о левую ракетку то летит влево 
		if (ball.getBoundingClientRect().right >= racketRight.getBoundingClientRect().left) {
			if(racketRight.getBoundingClientRect().top <= (ball.getBoundingClientRect().top + ball.getBoundingClientRect().height/2) && 
				racketRight.getBoundingClientRect().bottom >= (ball.getBoundingClientRect().top + ball.getBoundingClientRect().height/2)) {
				directionX = -directionX
			}
		} 

		ball.style.left = `${parseFloat(ball.style.left) + speedBall*directionX}px`
		ball.style.top = `${parseFloat(ball.style.top) + speedBall*directionY}px`
		requestAnimationFrame(run)
	}
	run()
}


// Функция движения ракеток
function racketGo(e) {
	// Берем данные из объекта valuesKeys в зависимости от того, какая кнопка нажата и деструктурируем массив
	const [direction, racket,position] =  valuesKeys[e]
	// Функция анимации ракетки
	function runRacket() {
		// Если кнопка отжимается(keyup), то останавилваем анимацию
		if (pressKeys[e] === false) {
			cancelAnimationFrame(runRacket)
			return
		}
		// Условия на остановку ракеток в пределах нашего поля
		if (direction < 0) {
			if(racket.getBoundingClientRect()[position] <= field.getBoundingClientRect()[position]) {
				racket.style.top = field.getBoundingClientRect()[position]
				cancelAnimationFrame(runRacket)
				return
			}
		}
		if (direction > 0) {
			if(racket.getBoundingClientRect()[position] >= field.getBoundingClientRect()[position]) {
				racket.style.top = field.getBoundingClientRect()[position] - racket.getBoundingClientRect().height
				cancelAnimationFrame(runRacket)
				return
			}
		}
		racket.style.top = `${parseFloat(racket.style.top) + speedRacket*direction}px`
		requestAnimationFrame(runRacket)
	}
	runRacket()
}


document.addEventListener("keydown", (e) =>  {
	if (e.key === "Shift") {
		if (pressKeys[e.key] === true) return // Если кнопка зажата, то анимация не будет увеличиваться
		pressKeys[e.key] = true
		racketGo("Shift") 
	}
	if (e.key === "Control") {
		if (pressKeys[e.key] === true) return // Если кнопка зажата, то анимация не будет увеличиваться
		pressKeys[e.key] = true
		racketGo("Control") 
	}
	if (e.key === "ArrowUp") {
		if (pressKeys[e.key] === true) return // Если кнопка зажата, то анимация не будет увеличиваться
		pressKeys[e.key] = true
		racketGo("ArrowUp")
	}
	if (e.key === "ArrowDown") {
		if (pressKeys[e.key] === true) return // Если кнопка зажата, то анимация не будет увеличиваться
		pressKeys[e.key] = true
		racketGo("ArrowDown")
	}
})

document.addEventListener("keyup", (e) => {
	if (e.key === "Shift") {
		pressKeys[e.key] = false
		racketGo("Shift") 
	}
	if (e.key === "Control") {
		pressKeys[e.key] = false
		racketGo("Control") 
	}
	if (e.key === "ArrowUp") {
		pressKeys[e.key] = false
		racketGo("ArrowUp") 
	}
	if (e.key === "ArrowDown") {
		pressKeys[e.key] = false
		racketGo("ArrowDown") 
	}
}) 









