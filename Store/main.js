"use strict"
// Блоки для записи сведений о новом продукте
const imageProduct = document.querySelector("input[name=image]");
const priceProduct = document.querySelector("input[name=price]");
const descriptionProduct = document.querySelector("input[name=description]");
const idProduct = document.querySelector("select[name=id]");
// Кнопка для создания нового продукта
const pushProduct = document.querySelector(".pushProduct");
// Кнопка для отображения продуктов в каталоге
const showProduct = document.querySelector(".showProduct");
// Кнопка сортировки продуктов по цене
const sortPrice = document.querySelector(".sortPrice");
// Блок, в котором будут отрисованы продукты(каталог)
const catalog = document.querySelector(".catalog");
// Блок чекбоксов
const chekbox = document.querySelector(".type");
// Чекбоксы для сортировки продуктов по типу
const sortProduct = document.querySelectorAll(".type input[type=checkbox]");
// Кнопки "В корзину"
const basketBtn = document.querySelectorAll(".basketBtn");
// Корзина
const basket = document.querySelector(".basket");
// Счетчик товаров в корзине
const basketCount = document.querySelector(".count");
// Кнопки удаления продуктов из корзины
const deleteItemBasket = document.querySelectorAll(".deleteItemBasket");

const arr = [];
// Делаем счетчик корзины === 0
basketCount.textContent = basket.children.length - 1;


// Создаем парочку продуктов сразу, чтобы в каталоге было что-нибудь 
const products = {
	"Холодильник": {
		image: "img/holodos.jpg",
		price: 600,
		description: "Холодильник 'Атлант' модель 'стабильность' по ощущэниям очень хороший. Ну купитя холодильник. Акция!!!! При покупке холодильника - батон колбасы 'Слуцкой' в подарок. Успей купить пока у колбасы не истек срок годности!!!",
		id: "holod",
		display: "flex",
	},
	"Телевизор": {
		image: "img/televizor.jpg",
		price: 800,
		description: "Телевизор 'Атлант' еще лучше чем холодильник той же фирмы и при этом дешевле!!! И если в своем холодильнике вы не видите хавчика, то вы можете включить по телевизору 'БТ' и увидеть хавчик в холодильнике там!!!",
		id: "tv",
		display: "flex",
	},
	"Телефон": {
		image: "img/telephon.png" ,
		price: 150,
		description: "Это телефон какой-то китайской фирмы 'HZ-chto', потому что завод 'Атлант' еще не освоил производство телефонов(это очэнь сложный процэс). Телефон в первую очередь для тех, кто не хочет ежедневно его заряжать, ведь в нем нету батареи! По части автономности смартфон великолепен благодаря вилке в 220V. Хотя на этом его достоинства не заканчиваются. И если умные люди давно уже ищут кнопочные телефоны, то китайцы пошли еще дальше!!! Они впиндюрили туда барабан набора номера!!! Теперь ни один американец не будет знать где вы! Внутри установлено достаточное для любых повседневных задач железо и если у Вас закончатся деньги, то вы сможете найти в нем пару сотен граммов меди, сдать ее и на эти деньги купить ну хоть что-нибудь и положить в Ваш холодильник 'Атлант' модель 'стабильность'!!! ",
		id: "tel",
		display: "flex",
	},
	"Стиральная машина": {
		image: "img/stMach.jpg" ,
		price: 300,
		description: "Стиральная машина сами знаете какой фирмы. Будьте аккуратны, при отжиме в 1000 об/мин может попытаться бежать из страны(честно говоря, мы ее понимаем). Есть функция callcenter - при стирке бело-красно-белого белья может позвонить в милицию и слить Ваш адрес вместе с грязной водой. Есть 6 дюймовый экран, который показывает программу стирки, скорость отжима, время до окончания стирки и телеканал 'ОНТ'",
		id: "stm",
		display: "flex",
	},
	"Микроволновая печь": {
		image: "img/microp.jpg" ,
		price: 200,
		description: "Микроволновая печь 'Атлант' модель 'независимая'. Может работать как от электричества, так и на газу или дровах(смотря, что дешевле). Ионное покрытие внутри убивает все бактерии и микроорганизмы(только те, которые видит). Пока работает, то шумит так, будто кто-то лязгает гусеницами. Это чтобы вы помнили, что живете на островке стабильности и безопасности.",
		id: "microp",
		display: "flex",
	}
}

// Пушим продукты, создынные выше в наш массив 
Object.values(products).forEach((e) => {
	arr.push(e)
})

// Клик, чтобы оправить новый продукт в массив продуктов
pushProduct.addEventListener("click", function pushPr() {
	const product = {};
	const nArr = [];
	product[imageProduct.name] = imageProduct.value;
	product[priceProduct.name] = priceProduct.value;
	product[descriptionProduct.name] = descriptionProduct.value;
	product[idProduct.name] = idProduct.value;
	product.display = "flex";
	Object.values(product).forEach((e) => {
		nArr.push(e)
	})
	if (nArr.indexOf("") !== -1) {
		console.log("Заполните все поля!!!")
	} else {
		arr.push(product)
		showProduct.style.display = "block"
	}
})

// Клик, чтобы показать все продукты
showProduct.addEventListener("click", (e) => {
	catalog.innerHTML = ""
	arr.forEach((e) => {
		addProduct(e)
	})
	e.target.style.display = "none"
	chekbox.style.display = "block"
	sortPrice.style.display = "block"
})

// Функция для создания карточки продукта
function addProduct(product) {
	const card = document.createElement("div")
	card.className = "card"
	card.id = product.id
	card.style.display = product.display
	const img = document.createElement("div")
	img.className = "img"
	const imgTag = document.createElement("img")
	imgTag.src = product.image
	const price = document.createElement("div")
	price.className = "price"
	price.textContent = product.price + "$"
	const description = document.createElement("div")
	description.className = "description"
	description.textContent = product.description
	const basketBtn = document.createElement("div")
	basketBtn.className = "btn basketBtn"
	basketBtn.textContent = "В корзину"
	img.append(imgTag)
	card.append(img)
	card.append(price)
	card.append(description)
	card.append(basketBtn)
	catalog.append(card)
}

// Клик по кнопке "Сортировать по цене". Здесь мы полностью чистим наш каталог, затем сортируем наш массив и запускаем функцию выше для отсортированного массива.
sortPrice.addEventListener("click", () => {
	catalog.innerHTML = ""
	arr.sort((a,b) => {
		return a.price - b.price
	})
	arr.forEach((e) => {
		addProduct(e)
	})
}) 

// Клик по чекбоксам продуктов. Здесь у нас по дефолту у всех чекбоксов checked = true. При клике на чекбокс мы чистим наш каталог и если checked !== true , то в нашем массиве объектов ставим свойству display: "none" и запускаем нашу функцию addProduct(element) для каждого елемента массива. Иначе делаем то же самое только display: "flex" 
chekbox.addEventListener("click", (e) => {
	if(e.target.closest("input")) {
		catalog.innerHTML = ""
		sortProduct.forEach((e) => {
			if (e.checked !== true) {
				arr.forEach (el => {
					if (el.id === e.name) {
						el.display = "none"
						addProduct(el)
					} 
				})
			} else {
				arr.forEach (el => {
					if (el.id === e.name) {
						el.display = "flex"
						addProduct(el)
					} 
				})
			}
		}) 
	} else {
		return
	}
})


// Клик чтобы добавить продукт в корзину и меняем классы элементам чтобы более-менее смотрелись элементы в корзине. Здесь еще мы изменяем количество продуктов в корзине.
catalog.addEventListener("click", (e) => {
	if (e.target.classList.contains("basketBtn")) {
		const copyCard = e.target.closest(".card").cloneNode(true);
		copyCard.className = "cardBasket"
		copyCard.style.display = ""
		copyCard.children[0].className = "imgBasket"
		copyCard.children[1].className = "priceBasket"
		copyCard.children[2].className = "descriptionBasket"
		copyCard.children[3].className = "deleteItemBasket"
		copyCard.children[3].textContent = "+"
		basket.append(copyCard)
		basketCount.textContent = basket.children.length - 1;
	} else {
		return
	}
})


// Клик на удаление продукта из корзины. Здесь еще мы изменяем количество продуктов в корзине.
basket.addEventListener("click" , (e) => {
	if (e.target.className === "deleteItemBasket") {
			basket.removeChild(e.target.closest(".cardBasket"))
			basketCount.textContent = basket.children.length - 1;
	} else {
		return
	}
})

