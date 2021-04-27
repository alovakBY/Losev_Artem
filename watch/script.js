const watch = document.querySelector(".watch")
const watchCenterX = watch.offsetLeft + watch.offsetWidth/2
const watchCenterY = watch.offsetTop + watch.offsetHeight/2
const radius= watch.offsetWidth/2 - 35

const arrowHour = document.createElement("div")
const arrowMinute = document.createElement("div")
const arrowSecond = document.createElement("div")

const electroWatch = document.createElement("div")


// Добавляем блоки-стрелки
watch.appendChild(arrowHour)
watch.appendChild(arrowMinute)
watch.appendChild(arrowSecond)
// Добавляем блок-электронные часы
watch.appendChild(electroWatch)

// Функция, которая добавляет ноли если в часах, минутах или секундах одно число (09:21:05, а не 9:21:5)
function getTime() {
	const date = new Date()
	let h 
	let m 
	let s 
	if (date.getHours().toString().length !== 1) {
		h = date.getHours().toString()
	} else {
		h = `0${date.getHours().toString()}`
	}
	if (date.getMinutes().toString().length !== 1) {
		m = date.getMinutes().toString()
	} else {
		m = `0${date.getMinutes().toString()}`
	}
	if (date.getSeconds().toString().length !== 1) {
		s = date.getSeconds().toString()
	} else {
		s = `0${date.getSeconds().toString()}`
	}
	return `${h}:${m}:${s}`
}

// Стили для электрочасов
function setElectroWatchStyles(electroWatch) {
	electroWatch.style.width = `300px`
	electroWatch.style.height = `100px`
	electroWatch.style.display = `flex`
	electroWatch.style.justifyContent = `center`
	electroWatch.style.alignItems = `center`
	electroWatch.style.position = `absolute`
	electroWatch.style.left = `${watchCenterX - parseFloat(electroWatch.style.width)/2}px`
	electroWatch.style.top = `${watchCenterY}px`
	electroWatch.style.fontSize = `36px`
}
// стили для блоков циферблата
function setNumberStyles(hour) {
	hour.style.width = `50px`
	hour.style.height = `50px`
	hour.style.borderRadius = `50%`
	hour.style.backgroundColor = `rgb(201, 176, 230)`
	hour.style.display = `flex`
	hour.style.justifyContent = `center`
	hour.style.alignItems = `center`
	hour.style.position = `absolute`
	hour.style.fontSize = `24px`
}

// стили для блоков-стрелок
function setArrowsStyles(arrow,width,height,color) {
	arrow.style.backgroundColor = `${color}`
	arrow.style.height = `${height}px`
	arrow.style.width = `${width}px`
	arrow.style.position = `absolute`
	arrow.style.left = `${watchCenterX - parseFloat(arrow.style.width)/2}px`
	arrow.style.top = `${watchCenterY - parseFloat(arrow.style.height) + 15}px`
	arrow.style.transformOrigin = `center ${parseFloat(arrow.style.height) - 15}px`
	arrow.style.zIndex = `10`
}

// создаем блоки циферблата
for (let i = 0; i < 12; i++) {
	const hour = document.createElement("div")
	hour.textContent = i+1
	setNumberStyles(hour)
	const angle= 30 * (i + 1)/180*Math.PI
	const hourCenterX=watchCenterX+radius*Math.sin(angle)
	const hourCenterY=watchCenterY-radius*Math.cos(angle)
	hour.style.left=Math.round(hourCenterX-parseFloat(hour.style.width)/2)+'px'
   hour.style.top=Math.round(hourCenterY-parseFloat(hour.style.height)/2)+'px'
	watch.appendChild(hour)
}

setElectroWatchStyles(electroWatch)
setArrowsStyles(arrowHour,10,140,"rgb(158, 223, 203)")
setArrowsStyles(arrowMinute,5,190,"rgb(255, 243, 139)")
setArrowsStyles(arrowSecond,3,240,"rgb(166, 88, 255)")


function getWatch() {
	const time = new Date()
	electroWatch.textContent = getTime()
	arrowSecond.style.transform = `rotate(${time.getSeconds()*6}deg)`
	arrowMinute.style.transform = `rotate(${time.getMinutes()*6}deg)`
	arrowHour.style.transform = `rotate(${time.getHours()*30 + 30*time.getMinutes()/60}deg)`
	console.log(time.getHours())
}

let interval = setInterval(getWatch,1000)

getWatch()



