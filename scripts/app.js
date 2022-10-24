const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 15),
	new Result("Ваш уровень выше среднего", 20),
	new Result("Вы в совершенстве знаете тему", 30)
];

//Массив с вопросами
const questions = 
[
	new Question("Как назывался первый поэтический сборник Есенина?", 
	[
		new Answer("Радуница", 1),
		new Answer("Преображение", 0),
		new Answer("Москва кабацкая", 0)
	]),

	new Question("Чем жил Бобыль в рассказе «Бобыль и Дружок»?", 
	[
		new Answer("Побирался по дворам", 1),
		new Answer("Работал лесничим", 0),
		new Answer("Был рыбаком ", 0)
	]),

	new Question("Как называется последнее стихотворение поэта?", 
	[
		new Answer("До свидания, друг мой, до свидания ", 1),
		new Answer("Дорогая, сядем рядом", 0),
		new Answer("Клён ты мой опавший, клен заледенелый", 0)
	]),

	new Question("Не жалею, не зову, не плачу…", 
	[
		new Answer("Прислонясь к дверному косяку", 0),
		new Answer("Все пройдет, как с белых яблонь дым", 1),
		new Answer("Лучшее, конечно, впереди", 0),
	]),

	new Question("Грубым дается радость…", 
	[
		new Answer("В сердце — насмешки и яд", 0),
		new Answer("Там, за спиной, нет огня", 0),
		new Answer("Нежным дается печаль", 1)
	]),

	new Question("Ты жива еще, моя старушка?", 
	[
		new Answer("Хорошо и беззаботно мне", 0),
		new Answer("Расцветай наперекор судьбе", 0),
		new Answer("Жив и я. Привет тебе, привет", 1)
	]),

	new Question("Пой же, пой. На проклятой гитаре…", 
	[
	new Answer("И тебя не любить мне позволь", 0),
	new Answer("И пускай не светает подольше", 0),
	new Answer("Пальцы пляшут твои вполукруг", 1),
	]),

	new Question("Ты меня не любишь, не жалеешь…", 
	[
	new Answer("Разве я немного не красив? ", 1),
	new Answer("Я брожу, как охладелый труп", 0),
	new Answer("Есть на свете поважней дела", 0),
	]),

	new Question("Друг мой, друг мой…", 
	[
	new Answer("Я больше ее не люблю", 0),
	new Answer("Какая холодная осень", 0),
	new Answer("Я очень и очень болен", 1),
	]),

	new Question("Отговорила роща золотая…", 
	[
	new Answer("В его поместьях темные леса", 0),
	new Answer("Березовым, веселым языком", 1),
	new Answer("Меж нив златых и пажитей зеленых", 0),
	]),

	new Question("Какая ночь! Я не могу.", 
	[
	new Answer("Не спится мне. Такая лунность", 1),
	new Answer("Со вздохом закрываю окна", 0),
	new Answer("Нам звезды видны даже днем", 0),
	]),

	new Question("О ком написана поэма «О 36»?", 
	[
	new Answer("О заключенных ", 1),
	new Answer("О шахтерах ", 0),
	new Answer("О моряках ", 0),
	]),

	new Question("Низкий дом с голубыми ставнями…", 
	[
	new Answer("Затихал пред твоими дверьми", 0),
	new Answer("Резво ласточки реют кругом", 0),
	new Answer("Не забыть мне тебя никогда", 1),
	]),

	new Question("Мы теперь уходим понемногу…", 
	[
	new Answer("Как любовь, как солнце, как весна", 0),
	new Answer("В ту страну, где тишь и благодать", 1),
	new Answer("С чашкой сядь под ивовый плетень", 0),
	]),

	new Question("Как назывался цикл стихотворений, написанных поэтом в 1924—1925 годах?", 
	[
	new Answer("Персидские мотивы ", 1),
	new Answer("Рязанские мотивы ", 0),
	new Answer("Московские кабаки ", 0),
	]),

	new Question("Вы помните, Вы всё, конечно, помните...", 
	[
	new Answer("Как я стоял, приблизившись к стене", 1),
	new Answer("Как я мечтал быть с вами навсегда", 0),
	new Answer("Что вы клялись без памяти в любви", 0),
	]),

	new Question("Взволнованно ходили вы по комнате И что-то резкое...", 
	[
	new Answer("Наигранно кричали мне", 0),
	new Answer("В лицо бросали мне", 1),
	new Answer("Пытались объяснить мне", 0),
	]),

	new Question("Не знали вы, Что я...", 
	[
	new Answer("Готов для вас на все", 0),
	new Answer("Не вижу ничего", 0),
	new Answer("В сплошном дыму", 1),
	]),

	new Question("Как звали собаку из стихотворения «Собаке Качалова»?", 
	[
	new Answer("Бим ", 0),
	new Answer("Джим ", 1),
	new Answer("Друг ", 0),
	]),

	new Question("С того и мучаюсь, что не пойму...", 
	[
	new Answer("Куда несет нас рок событий", 1),
	new Answer("Нужна ли вам моя обитель", 0),
	new Answer("Ты скажешь да иль вон прикажешь выйти", 0),
	]),

	new Question("Кто был главным героем поэмы «Страна негодяев»?", 
	[
	new Answer("Монах Номах ", 0),
	new Answer("Учитель Номах ", 0),
	new Answer("Бандит Номах ", 1),
	]),

	new Question("Лицом к лицу Лица не увидать...", 
	[
	new Answer("Сказать по правде, я в незнании", 0),
	new Answer("Не верно выбрал я дистанцию", 0),
	new Answer("Большое видится на расстоянье", 1),
	]),

	new Question("Кем был Черный человек из одноименной поэмы?", 
	[
	new Answer("Призраком ", 0),
	new Answer("Отражением в зеркале ", 1),
	new Answer("Галлюцинацией ", 0),
	]),

	new Question("Теперь года прошли...", 
	[
	new Answer("Мы старше стали оба", 0),
	new Answer("Я в возрасте ином", 1),
	new Answer("Я жизнь познал, и вы ее узнали", 0),
	]),

	new Question("Что случилось с мужем Анны Снегиной из одноименной поэмы?", 
	[
	new Answer("Погиб на войне ", 1),
	new Answer("Ушел к другой ", 0),
	new Answer("Сошел с ума ", 0),
	]),

	new Question("Любимая! Сказать приятно мне...", 
	[
	new Answer("Я избежал паденья с кручи", 1),
	new Answer("Я устоял на этой шаткой круче", 0),
	new Answer("Я забежал назад, я вновь стою на круче", 0),
	]),

	new Question("Я стал не тем, Кем был тогда. Не мучил бы я вас...", 
	[
	new Answer("Когда в дни, когда мы были вместе", 0),
	new Answer("Как в эти годы страсти", 0),
	new Answer("Как это было раньше", 1),
	]),

	new Question("О каком историческом лице была написана поэма?", 
	[
	new Answer("О Петре I ", 0),
	new Answer("О Пугачеве ", 1),
	new Answer("О Пушкине ", 0),
	]),

	new Question("Простите мне... Я знаю: вы не та...", 
	[
	new Answer("Живете вы С серьезным, умным мужем", 1),
	new Answer("Вы стали властны, у вас родились дети", 0),
	new Answer("Мечтал о вас, а встретил я совсем другую леди", 0),
	]),

	new Question("Живите так, Как вас ведет звезда, Под кущей обновленной сени...", 
	[
	new Answer("До новых встреч, я буду помнить вас всегда... ", 0),
	new Answer("Я буду помнить вас всегда... ", 0),
	new Answer("С приветствием, Вас помнящий всегда... ", 1),
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}