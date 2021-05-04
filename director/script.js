"use strict"
const directorButtons = {
	director: document.querySelector(".director"), // Кнопка меню директора
	hr: document.querySelector(".director-hr"), // Кнопка HR директора
	content: document.querySelector(".director-content"),  // Кнопка Content директора
	logistic: document.querySelector(".director-logistic"), // Кнопка Logistic директора
}

const directorContainers = {
	mainMenu: document.querySelector(".director-menu"), // Контейнер меню директора
	menuInfo: document.querySelector(".director-info"), // Информация о персонале, контенте или логистике
}


const forms = {
	hr: document.querySelector(".menu-hr-form"), // форма заполнения HR
	content: document.querySelector(".menu-content-form"), // форма заполнения content
	logistic: document.querySelector(".menu-logistic-form"), // форма заполнения logistic
}


const hrBtn = document.querySelector(".menu-hr-title") // Кнопка HR
const contentBtn = document.querySelector(".menu-content-title") // Кнопка Content
const logisticBtn = document.querySelector(".menu-logistic-title") // Кнопка Logistic
const btnAddShop = document.querySelector(".shops") // Кнопка добавления магазинов в Content -> "Магазины" -> "Добавить"
const btnAddCharacteristics= document.querySelector(".characteristics") // Кнопка добавления характеристик в Content -> "Характеристики" -> "Добавить"



const getdirectorMenuHeight = directorContainers.mainMenu.offsetHeight
const getFormsHeight = forms.hr.offsetHeight

forms.hr.style.height = `0px`
forms.hr.style.padding = `0px`
forms.content.style.height = `0px`
forms.content.style.padding = `0px`
forms.logistic.style.height = `0px`
forms.logistic.style.padding = `0px`
directorContainers.mainMenu.style.height = `0px`

// Клик по кнопке "DIRECTOR"
directorButtons.director.addEventListener("click", (e) => {
	directorContainers.mainMenu.style.transition =  `height 0.5s`
	e.target.classList.toggle("activ")
	if (e.target.classList.contains("activ")) {
		directorContainers.mainMenu.style.height = `${getdirectorMenuHeight}px`
		directorContainers.mainMenu.style.marginBottom = `10px`
	} else {
		directorContainers.mainMenu.style.height = `0px`
		directorContainers.mainMenu.style.marginBottom = `0px`
		directorContainers.menuInfo.style.padding = `0px`
		directorContainers.menuInfo.style.border = ``
		directorContainers.menuInfo.style.marginBottom = `0px`
		directorContainers.menuInfo.style.height = `0px`
		directorButtons.hr.classList.remove("activ")
	}
})


// Клик по кнопке "DIRECTOR -> HR"
directorButtons.hr.addEventListener("click", (e) => {
	directorButtons.content.classList.remove("activ")
	directorButtons.logistic.classList.remove("activ")
	directorButtons.hr.classList.toggle("activ")
	directorContainers.menuInfo.innerHTML = ''
	if (e.target.classList.contains("activ")) {
		directorContainers.menuInfo.style.height = `auto`
		directorContainers.menuInfo.style.padding = `5px`
		directorContainers.menuInfo.style.border = `1px solid black`
		directorContainers.menuInfo.style.marginBottom = `10px`
		directorContainers.mainMenu.style.marginBottom = `0px`
	} else {
		directorContainers.menuInfo.style.padding = `0px`
		directorContainers.menuInfo.style.border = ``
		directorContainers.menuInfo.style.marginBottom = `0px`
		directorContainers.menuInfo.style.height = `0px`
		directorContainers.mainMenu.style.marginBottom = `10px`
	}
	
	if (Object.keys(objDirHR).length === 0) {
		directorContainers.menuInfo.textContent = `Кандидатов нет`
	} else {
		Object.keys(objDirHR).forEach((person) => {
			const div = document.createElement("div")
			Object.keys(objDirHR[person]).forEach((el) => {
				div.innerHTML += `${el}: ${objDirHR[person][el]} <br>`
			})
			directorContainers.menuInfo.appendChild(div)
		})
	}
})

// Клик по кнопке "DIRECTOR -> Content"
directorButtons.content.addEventListener("click", (e) => {
	directorButtons.hr.classList.remove("activ")
	directorButtons.logistic.classList.remove("activ")
	directorButtons.content.classList.toggle("activ")
	directorContainers.menuInfo.innerHTML = ''
	if (e.target.classList.contains("activ")) {
		directorContainers.menuInfo.style.height = `auto`
		directorContainers.menuInfo.style.padding = `5px`
		directorContainers.menuInfo.style.border = `1px solid black`
		directorContainers.menuInfo.style.marginBottom = `10px`
		directorContainers.mainMenu.style.marginBottom = `0px`
	} else {
		directorContainers.menuInfo.style.padding = `0px`
		directorContainers.menuInfo.style.border = ``
		directorContainers.menuInfo.style.marginBottom = `0px`
		directorContainers.menuInfo.style.height = `0px`
		directorContainers.mainMenu.style.marginBottom = `10px`
	}
	
	if (Object.keys(objDirContent).length === 0) {
		directorContainers.menuInfo.textContent = `Товаров нет`
	} else {
		Object.keys(objDirContent).forEach((product) => {
			const div = document.createElement("div")
			Object.keys(objDirContent[product]).forEach((el) => {
				if (typeof(objDirContent[product][el]) === "object" && !Array.isArray(objDirContent[product][el])) {
					div.innerHTML += `${el}: `
					Object.keys(objDirContent[product][el]).forEach((elem, ind) => {
						if (ind === Object.keys(objDirContent[product][el]).length - 1) {
							div.innerHTML += `${elem} - ${objDirContent[product][el][elem]}. <br>`
						} else {
							div.innerHTML += `${elem} - ${objDirContent[product][el][elem]}, `
						}
					})
				} else {
					div.innerHTML += `${el}: ${objDirContent[product][el]} <br>`
				}
			})
			directorContainers.menuInfo.appendChild(div)
		})
	}
}) 

// Клик по кнопке "DIRECTOR -> Logistic"
directorButtons.logistic.addEventListener("click", (e) => {
	directorButtons.hr.classList.remove("activ")
	directorButtons.content.classList.remove("activ")
	directorButtons.logistic.classList.toggle("activ")
	directorContainers.menuInfo.innerHTML = ''
	if (e.target.classList.contains("activ")) {
		directorContainers.menuInfo.style.height = `auto`
		directorContainers.menuInfo.style.padding = `5px`
		directorContainers.menuInfo.style.border = `1px solid black`
		directorContainers.menuInfo.style.marginBottom = `10px`
		directorContainers.mainMenu.style.marginBottom = `0px`
	} else {
		directorContainers.menuInfo.style.padding = `0px`
		directorContainers.menuInfo.style.border = ``
		directorContainers.menuInfo.style.marginBottom = `0px`
		directorContainers.menuInfo.style.height = `0px`
		directorContainers.mainMenu.style.marginBottom = `10px`
	}
	
	if (Object.keys(objDirLogistic).length === 0) {
		directorContainers.menuInfo.textContent = `Перевозимые товары отсутствуют`
	} else {
		Object.keys(objDirLogistic).forEach((product) => {
			const div = document.createElement("div")
			Object.keys(objDirLogistic[product]).forEach((el) => {
				div.innerHTML += `${el}: ${objDirLogistic[product][el]} <br>`
			})
			directorContainers.menuInfo.appendChild(div)
		})
	}
}) 



// Клик по кнопке HR
hrBtn.addEventListener("click", (e) => {
	forms.hr.style.transition =  `height 0.5s`
	e.target.classList.toggle("activ")
	if (e.target.classList.contains("activ")) {
		forms.hr.style.height = `${getFormsHeight}px`
		forms.hr.style.padding = `10px`
	} else {
		forms.hr.style.height = `0px`
		forms.hr.style.padding = `0px`
	}
})


// Клик по кнопке CONTENT
contentBtn.addEventListener("click", (e) => {
	forms.content.style.transition =  `height 0.5s`
	e.target.classList.toggle("activ")
	if (e.target.classList.contains("activ")) {
		forms.content.style.height = `${getFormsHeight}px`
		forms.content.style.padding = `10px`
	} else {
		forms.content.style.height = `0px`
		forms.content.style.padding = `0px`
	}
})

		// Дабавление магазинов в Content -> Магазины -> Добавить
		btnAddShop.addEventListener("click", () => {
	btnAddShop.insertAdjacentHTML('beforebegin', '<input type="text" name="shops" placeholder="Магазин" required>')
})

		// Дабавление магазинов в Content -> Характеристики -> Добавить
		btnAddCharacteristics.addEventListener("click", () => {
	btnAddCharacteristics.insertAdjacentHTML('afterend', '<p><input type="text" name="value" placeholder="Значение" required></p>')
	btnAddCharacteristics.insertAdjacentHTML('afterend', '<p><input type="text" name="characteristic" placeholder="Характеристика" required></p>')
})

// Клик по кнопке LOGISTIC
logisticBtn.addEventListener("click", (e) => {
	forms.logistic.style.transition =  `height 0.5s`
	e.target.classList.toggle("activ")
	if (e.target.classList.contains("activ")) {
		forms.logistic.style.height = `${getFormsHeight}px`
		forms.logistic.style.padding = `10px`
	} else {
		forms.logistic.style.height = `0px`
		forms.logistic.style.padding = `0px`
	}
})

// Работа с формой HR. Здесь мы создаем класс HR, берем все данные с формы(все поля должны быть заполнены, либо в консоли об этом напишет), делаем одну персону и отправляем на рассмотрение Директора(В DIRECTOR -> HR появится один кандидат). 
const dataFormHR = document.forms.hr;
const getDataFormHr = document.querySelector(".buttonHR")
const objDirHR = {}
class HR {
	constructor(option) {
		this.firstname = option.firstname
		this.secondname = option.secondname
		this.position = option.position
		this.salary = option.salary
		this.nationality = option.nationality
		this.residence = option.residence
		this.education = option.education
		this.gender = option.gender 
		this.family = option.family 
		this.birthday = option.birthday
	}
	sayName () {
		return `${this.firstname} ${this.secondname}`
	}
}

getDataFormHr.addEventListener("click", (e)=> {
	let clearStroke = false
	e.preventDefault();
	const objHR = [...dataFormHR.elements].reduce((acc,el) => {
		if (el.value === "") clearStroke = true
		if (el.type === "radio") {
			if (el.checked) {
				acc[el.name] = el.value
			}
		} else {
			acc[el.name] = el.value
		}
		return acc
	},{})
	if (clearStroke) {
		console.log("Введите все значения")
		return
	}
	const user = new HR(objHR)
	objDirHR[user.sayName ()] = user
	localStorage[user.sayName ()] = JSON.stringify(user)
})  

// Работа с формой CONTENT. Здесь мы создаем класс CONTENT, берем все данные с формы(все поля должны быть заполнены, либо в консоли об этом напишет), делаем один товар и отправляем на рассмотрение Директора(В DIRECTOR -> CONTENT появится один товар). 
const dataFormContent = document.forms.content;
const getDataFormContent = document.querySelector(".buttonContent")
const objDirContent = {}
class Content {
	constructor(option) {
		this.product = option.product
		this.manufacturer = option.manufacturer
		this.shops = option.shops
		this.release = option.release
		this.guarantee = option.guarantee
		this.sale = option.sale
		this.characteristics = option.characteristics
		this.added = option.added
	}
	sayProduct () {
		return `${this.product}`
	}
}

getDataFormContent.addEventListener("click", (e)=> {
	let clearStroke = false
	const arrShops = []
	let arrCharacteristics = []
	const objCharacteristics = {}
	e.preventDefault();
	const objContent = [...dataFormContent.elements].reduce((acc,el) => {
		if (el.value === "" && el.type !== "button") {
			clearStroke = true
		}
		if (el.type === "radio") {
			if (el.checked) {
				acc[el.name] = el.value
			}
		} else if (el.name === "shops") {
			arrShops.push(el.value)
		} else if (el.name === "characteristic") {
			arrCharacteristics.push(el.value)
		} else if (el.name === "value") {
			arrCharacteristics.push(el.value)
		} else {
			acc[el.name] = el.value
		}
		if (arrCharacteristics.length === 2) {
			objCharacteristics[arrCharacteristics[0]] = arrCharacteristics[1]
			arrCharacteristics = []
		}
		acc["characteristics"] = objCharacteristics
		acc["shops"] = arrShops
		return acc
	},{})
	if (clearStroke) {
		console.log("Введите все значения")
		return
	}
	const product = new Content(objContent)
	objDirContent[product.sayProduct ()] = product
	localStorage[product.sayProduct ()] = JSON.stringify(product)
})   


// Работа с формой LOGISTIC. Здесь мы создаем класс LOGISTIC, берем все данные с формы(все поля должны быть заполнены, либо в консоли об этом напишет), делаем одну "перевозку" и отправляем на рассмотрение Директора(В DIRECTOR -> LOGISTIC появится одна перевозка). 
const dataFormLogistic = document.forms.logistic;
const getDataFormLogistic = document.querySelector(".buttonLogistic")
const objDirLogistic = {}
class Logistic {
	constructor(option) {
		this.name = option.name
		this.width = option.width
		this.length = option.length
		this.height = option.height
		this.amount = option.amount
		this.transportation = option.transportation
		this.custom = option.custom
		this.dateOfTransportation = option.dateOfTransportation
		this.amountOfCargo = option.amountOfCargo
		this.insurance = option.insurance
		this.status = option.status
	}
	getName () {
		return this.name
	}
}


getDataFormLogistic.addEventListener("click", (e)=> {
	let clearStroke = false
	e.preventDefault();
	const objLogistic = [...dataFormLogistic.elements].reduce((acc,el) => {
		if (el.value === "") {
			clearStroke = true
		}
		if (el.type === "radio") {
			if (el.checked) {
				acc[el.name] = el.value
			}
		} else {
			acc[el.name] = el.value
		}
		return acc
	},{})
	if (clearStroke) {
		console.log("Введите все значения")
		return
	}
	const logistic = new Logistic(objLogistic)
	objDirLogistic[logistic.getName()] = logistic
	localStorage[logistic.getName()] = JSON.stringify(logistic)
	console.log(objDirLogistic)
})

//Выводим сохраненные в localStorage объекты
for ( let i=0; i<localStorage.length; i++ ) {
	let k = localStorage.key(i)
	let obj = JSON.parse (localStorage.getItem (k));
	console.log(`${k}:`,obj)
 }


