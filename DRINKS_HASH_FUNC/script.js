"use strict"
// создаем класс HashStorageFunc и добавляем туда методы
class HashStorageFunc {
	constructor() {}

	setValue(key, value) {
		this[key] = value;
	}

	getValue(key) {
		alert(`Напиток: ${key}
Алкогольный: ${this[key]["алкогольный"]}
Рецепт: ${this[key]["рецепт"]}
`)
	}

	deleteValue(key) {
			delete this[key]
	}

	getKeys() {
		if (Object.keys(this).length === 0) {
			alert("В хранилище нет напитков");
		} else {
			alert(Object.keys(this));
		}
	}
}

// создаем объект drinkStorage класса HashStorageFunc и добавляем сразу туда несколько рецептов
const drinkStorage = new HashStorageFunc();
drinkStorage.setValue("Лимонад", { "алкогольный": "нет", "рецепт": "Разрезать лимоны и положить в блендер. Добавить сахар, холодную воду и лед. Перемешивать 1 минуту. Процедить через мелкое сито.Украсить дольками лимона." });
drinkStorage.setValue("Тропический", { "алкогольный": "нет", "рецепт": "молоко, бананы, апельсиновый сок, сахар. Всё взбить блендером или миксером. После того, как взбили, добавить кусочки льда и продолжить дальше взбивать до тех пор, пока лёд не станет крошкой. " });
drinkStorage.setValue("Маргарита", { "алкогольный": "да", "рецепт": "Наполнить шейкер льдом, добавить текилу, апельсиновый ликер, сок лайма (можно заменить лимонным). Встряхнуть." });
console.log(drinkStorage)
// Переменные на кнопки

const setInfo = document.querySelector(".setInfo");
const getInfo = document.querySelector(".getInfo");
const deleteInfo = document.querySelector(".deleteInfo");
const menuDrink = document.querySelector(".menuDrink");


// Клик по кнопке "Ввод информации о напитке"

setInfo.addEventListener("click", () => {
	const name = prompt("Введите название напитка");
	const alcohol = prompt("Это алкогольный напиток");
	const recept = prompt("Введите рецепт напитка");
	const value = {
		"алкогольный": alcohol,
		"рецепт": recept,
	}
	drinkStorage.setValue(name, value)
})

// Клик по кнопке "Получение информации о напитке"

getInfo.addEventListener("click", () => {
	const name = prompt("Введите название напитка");
	if (drinkStorage[name]) {
		drinkStorage.getValue(name)
	} else {
		alert("Такого напитка нет в хранилище")
	}
})

// Клик по кнопке "Удаление информации о напитке"

deleteInfo.addEventListener("click", () => {
	const name = prompt("Введите название напитка");
	if (drinkStorage[name]) {
		drinkStorage.deleteValue(name)
		alert("Напиток удален из хранилища")
	} else {
		alert("Такого напитка нет в хранилище")
	}
})

// Клик по кнопке "Перечень всех напитков"

menuDrink.addEventListener("click", () => {
	drinkStorage.getKeys()
})



