"use strict"
const screen = document.querySelector(".screen");
const btns = document.querySelector(".btns");
const btnNumber = document.querySelectorAll(".n");
const equally = document.querySelector(".equally");
const delNumb = document.querySelector(".delNumb");
const plusMinus = document.querySelector(".plus_minus");
const lumus = document.querySelector(".sun");
const proportion = document.querySelector(".proportion");
const operator = ["+","-","*","/"];

console.log(proportion)

screen.textContent = "0";

/* // Клик по "%"
proportion.addEventListener("click", (e) => {
	"%": function (arr, i) { return arr.splice(i-1, 3, Math.abs(arr[i-3]) / 100 * arr[i-1])},
}) */

// клик на подсветку =) 
lumus.addEventListener("click", ()=> {
	screen.classList.toggle("lumus")
})


// клики на ввод данных 
btns.addEventListener("click", e => {
	if(e.target.closest("div").classList.contains("n")) {
		if(e.target.closest("div").classList.contains("dot")) {
			if(screen.textContent[screen.textContent.length-1] === " ") {
				screen.textContent += "0";
			} else if (!isNaN(parseInt(screen.textContent[screen.textContent.length-1])) && screen.textContent.lastIndexOf(" ") >= screen.textContent.lastIndexOf(".")) {
				screen.textContent += e.target.textContent;
				return
			} else {
				return
			}
		}
		// условие на ввод числа или точки в строке, у которой последнее значение === 0. Если вводится точка, то запишется "0.", иначе "0" удаляется и вводится число
		if (screen.textContent[screen.textContent.length-1] === "0") {
			if(e.target.closest("div").classList.contains("dot")) {
				screen.textContent += e.target.textContent;
			} else {
				screen.textContent = screen.textContent.slice(0,-1) + e.target.textContent;
			}	
		} else {
			screen.textContent += e.target.textContent;
		}
	} 
	// Клик по + - * / .
	if (e.target.closest("div").classList.contains("operator")) {
		if(screen.textContent[screen.textContent.length-1] === ".") screen.textContent += `0 ${e.target.textContent} `
			screen.textContent += ` ${e.target.textContent} `;
		// условие на смену оператора вычислений если ввели не тот либо если ввели два оператора подряд, то принимается последний
		if (operator.indexOf(screen.textContent[screen.textContent.length - 5]) !== -1 && screen.textContent[screen.textContent.length - 4] === " ") {
			screen.textContent = screen.textContent.slice(0, -6) + " " + e.target.textContent + " "
		}
	} if (e.target.closest("div").classList.contains("delAll")) {
		screen.textContent = "0";
	} 
	// Клик по скобке "("
	if (e.target.closest("div").classList.contains("openHook")) {
		if (screen.textContent === "0" || screen.textContent.length === 0) {
			screen.textContent = ` ${e.target.textContent} `;
		} else {
			screen.textContent += ` ${e.target.textContent} `;
		}
	} 
	// Клик по скобке ")"
	if (e.target.closest("div").classList.contains("closeHook")) {
		if (screen.textContent === "0" || screen.textContent.length === 0) {
			screen.textContent = ` ${e.target.textContent} `;
		} else {
			screen.textContent += ` ${e.target.textContent} `;
		}
	} 
})

// клик по "=".
equally.addEventListener("click", () => {
	if (screen.textContent.length === 0) return
	if (screen.textContent[screen.textContent.length-1] === " " && screen.textContent[screen.textContent.length-2] !== ")") return
	// возвращаем такой же массив только числа уже c числовым типом данных. Массив разбивается по пробелам (" ").
	const arrayNumTest = screen.textContent.split(" ").map((el) => {
		if (isNaN(parseFloat(el))) return el 
		return parseFloat(el)
	})
	// Проверка на скобки(число открытых скобок === числу закрытых)
	let a = 0;
	arrayNumTest.forEach((e) => {
		if (e === "(") {
			a++
		}
		if (e === ")") {
			a--
		}
	})
	if (a !== 0) {
		console.log("Закройте все скобки")
		return
	}
	const arrayNum = []
	arrayNumTest.forEach(e => {
		if (e !== "") arrayNum.push(e)
	})
	console.log(arrayNum)
	calculation(arrayNum)
})

// клик по "+/-". Проверяем, если последний элемент является числом то меняем ему знак. Иначе ничего не делаем.
plusMinus.addEventListener("click", () => {
	if(!isNaN(parseInt(screen.textContent[screen.textContent.length - 1]))) {
		const arr = screen.textContent.split(" ");
		arr.splice(arr.length - 1, 1, (-arr[arr.length-1]).toString());
		console.log(arr)
		return screen.textContent = arr.join(" ");
	} 
})

// клик на удаление последнего значения. Здесь мы спрашиваем, если последний символ === " ", то удаляем за один клик по кнопке 3 последних символа(потому что, когда мы вводим символы операторов, то у нас прилетает строка === например " + "). Если же последний символ !== " ", значит последний символ - это число и нам нужно удалить за один клик 1 последний символ. Если в троке один символ - меняем его на ноль.
delNumb.addEventListener("click", () => {
	if (screen.textContent.length === 1 && screen.textContent[0] === "0") {
		return
	} else if (screen.textContent[screen.textContent.length - 1] === " ") {
		return screen.textContent = screen.textContent.slice(0, -3)
	} else {
		if(screen.textContent.length === 1) {
			return screen.textContent = "0"
		} else {
			return screen.textContent = screen.textContent.slice(0, -1)
		}
	}
}) 

const obj = {
	"(": function (arr, i) {
		let count = 0
		let close = 0
		for (let j = 0; j < arr.length; j++) {
			if (arr[j] === "(") {
				count++
				continue
			}
			if (arr[j] === ")") {
				count--
				if (count === 0) {
					close = j
					break
				}
			}
		}
		console.log(close)
		const nArr = arr.slice(i+1,close)
		console.log(nArr)
		return arr.splice(i, close + 1 - i, calculation(nArr))
	}, 
	"-": function (arr, i) { return arr.splice(i, 2, "+", (-arr[i+1])) },
	"*": function (arr, i) { return arr.splice(i-1, 3, arr[i-1] * arr[i+1]) },
	"/": function (arr, i) { return arr.splice(i-1, 3, arr[i-1] / arr[i+1]) },
	"+": function (arr, i) { return arr.splice(i-1, 3, parseFloat(arr[i-1] + arr[i+1])) },
}

// функция, которая считает выражение рекурсией до тех пор, пока в массиве не останется одно значение.
		function calculation(arr) {
			console.log(arr)
			Object.keys(obj).forEach((el)=>{
				let i = arr.indexOf(el);
				if(i !== -1) {
					obj[el](arr, i);
					return calculation(arr);
				}
			})
			return screen.textContent = +parseFloat((arr.join(""))).toFixed(8)
		}
































		/* for (let i = 0; i < arr.length; i++) {
			if(isNaN(arr[i])) {
				if (arr.indexOf("*") !== -1)  {
							let k = parseFloat(obj[arr[arr.indexOf("*")]](arr[arr.indexOf("*")-1],arr[arr.indexOf("*")+1]));
							arr.splice(arr.indexOf("*")-1,3,k)
							return calculation(arr)
				}
				if (arr.indexOf("/") !== -1)  {
					let k = parseFloat(obj[arr[arr.indexOf("/")]](arr[arr.indexOf("/")-1],arr[arr.indexOf("/")+1]));
					arr.splice(arr.indexOf("/")-1,3,k)
					return calculation(arr)
				}
				
				for (let j = 0; j < arrayObj.length; j++) {
					// условие, которое спрашивает есть ли у нас в массиве операторы и если есть то ведет расчет
					if (arrayObj[j] === arr[i]) {
						let k = parseFloat(obj[arrayObj[j]](arr[i-1],arr[i+1]));
						arr.splice(i-1,3,k)
						return calculation(arr)
					}
				}
			}
		}  */