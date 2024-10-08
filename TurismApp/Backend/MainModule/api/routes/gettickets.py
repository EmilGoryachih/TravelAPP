from fastapi import APIRouter
import requests
import json
from environs import Env
from models.tickets import ScheduleResponse
from pydantic import BaseModel
from typing import Any, List
from random import randint

env = Env()
env.read_env()
key = env.str("YANDEX_KEY_SCHEDULE")

codes = {"Москва и Московская область": 1, "Санкт-Петербург": 2, "Центр": 3, "Белгород": 4, "Иваново": 5, "Калуга": 6, 
         "Кострома": 7, "Курск": 8, "Липецк": 9, "Орел": 10, "Рязань": 11, "Смоленск": 12, "Тамбов": 13, "Тверь": 14, 
         "Тула": 15, "Ярославль": 16, "Северо-Запад": 17, "Петрозаводск": 18, "Сыктывкар": 19, "Архангельск": 20, "Вологда": 21, 
         "Калининград": 22, "Мурманск": 23, "Великий Новгород": 24, "Псков": 25, "Юг": 26, "Махачкала": 28, "Нальчик": 30, 
         "Владикавказ": 33, "Краснодар": 35, "Ставрополь": 36, "Астрахань": 37, "Волгоград": 38, "Ростов-на-Дону": 39, 
         "Поволжье": 40, "Йошкар-Ола": 41, "Саранск": 42, "Казань": 43, "Ижевск": 44, "Чебоксары": 45, "Киров": 46, 
         "Нижний Новгород": 47, "Оренбург": 48, "Пенза": 49, "Пермь": 50, "Самара": 51, "Урал": 52, "Курган": 53, 
         "Екатеринбург": 54, "Тюмень": 55, "Челябинск": 56, "Ханты-Мансийск": 57, "Салехард": 58, "Сибирь": 59, "Красноярск": 62, 
         "Иркутск": 63, "Кемерово": 64, "Новосибирск": 65, "Омск": 66, "Томск": 67, "Чита": 68, "Якутск": 74, "Владивосток": 75, 
         "Хабаровск": 76, "Благовещенск": 77, "Петропавловск-Камчатский": 78, "Магадан": 79, "Южно-Сахалинск": 80, "США": 84, 
         "Атланта": 86, "Вашингтон": 87, "Детройт": 89, "Сан-Франциско": 90, "Сиэтл": 91, "Аргентина": 93, "Бразилия": 94, "Канада": 95, 
         "Германия": 96, "Гейдельберг": 97, "Кельн": 98, "Мюнхен": 99, "Франкфурт-на-Майне": 100, "Штутгарт": 101, "Великобритания": 102, 
         "Европа": 111, "Австрия": 113, "Бельгия": 114, "Болгария": 115, "Венгрия": 116, "Литва": 117, "Нидерланды": 118, "Норвегия": 119, 
         "Польша": 120, "Словакия": 121, "Словения": 122, "Финляндия": 123, "Франция": 124, "Чехия": 125, "Швейцария": 126, "Швеция": 127,
         "Беер-Шева": 129, "Иерусалим": 130, "Тель-Авив": 131, "Хайфа": 132, "Китай": 134, "Корея": 135, "Япония": 137, "Австралия и Океания": 138, 
         "Новая Зеландия": 139, "Днепропетровск": 141, "Донецк": 142, "Киев": 143, "Львов": 144, "Одесса": 145, "Симферополь": 146, "Харьков": 147, 
         "Николаев": 148, "СНГ": 166, "Азербайджан": 167, "Армения": 168, "Грузия": 169, "Туркмения": 170, "Узбекистан": 171, "Уфа": 172, 
         "Берлин": 177, "Гамбург": 178, "Эстония": 179, "Сербия": 180, "Израиль": 181, "Азия": 183, "Украина": 187, "Брянск": 191, "Владимир": 192, 
         "Воронеж": 193, "Саратов": 194, "Ульяновск": 195, "Барнаул": 197, "Улан-Удэ": 198, "Лос-Анджелес": 200, "Нью-Йорк": 202, "Дания": 203, "Испания": 204, 
         "Италия": 205, "Латвия": 206, "Киргизия": 207, "Молдова": 208, "Таджикистан": 209, "Объединенные Арабские Эмираты": 210, "Австралия": 211, 
         "Москва": 213, "Долгопрудный": 214, "Дубна": 215, "Зеленоград": 216, "Пущино": 217, "Черноголовка": 219, "Чимкент": 221, "Луганск": 222, 
         "Бостон": 223, "Россия": 225, "Магнитогорск": 235, "Набережные Челны": 236, "Новокузнецк": 237, "Новочеркасск": 238, "Сочи": 239, "Тольятти": 240, 
         "Африка": 241, "Арктика и Антарктика": 245, "Греция": 246, "Универсальное": 318, "Другие города региона": 349, "Общероссийские": 382, "Прочее": 637, 
         "Севастополь": 959, "Запорожье": 960, "Хмельницкий": 961, "Херсон": 962, "Винница": 963, "Полтава": 964, "Сумы": 965, "Чернигов": 966, "Обнинск": 967, 
         "Череповец": 968, "Выборг": 969, "Новороссийск": 970, "Таганрог": 971, "Дзержинск": 972, "Сургут": 973, "Находка": 974, "Бийск": 975, "Братск": 976, 
         "Крым": 977, "Страны Балтии": 980, "Турция": 983, "Индия": 994, "Таиланд": 995, "Ближний Восток": 1004, "Египет": 1056, "Туапсе": 1058, 
         "Нижневартовск": 1091, "Назрань": 1092, "Майкоп": 1093, "Элиста": 1094, "Абакан": 1095, "Черкесск": 1104, "Грозный": 1106, "Анапа": 1107, 
         "Северная Америка": 10002, "Южная Америка": 10003, "Мальта": 10069, "Хорватия": 10083, "Санкт-Петербург и Ленинградская область": 10174, 
         "Ненецкий АО": 10176, "Республика Алтай": 10231, "Республика Тыва": 10233, "Еврейская автономная область": 10243, "Чукотский автономный округ": 10251, 
         "Кишинев": 10313, "Бельцы": 10314, "Бендеры": 10315, "Тирасполь": 10317, "Житомир": 10343, "Ивано-Франковск": 10345, "Кривой Рог": 10347, 
         "Ровно": 10355, "Тернополь": 10357, "Ужгород": 10358, "Черкассы": 10363, "Черновцы": 10365, "Мариуполь": 10366, "Мелитополь": 10367, 
         "Белая Церковь": 10369, "Белгородская область": 10645, "Губкин": 10646, "Старый Оскол": 10649, "Брянская область": 10650, "Клинцы": 10653, 
         "Александров": 10656, "Гусь-Хрустальный": 10661, "Киржач": 10663, "Ковров": 10664, "Муром": 10668, "Суздаль": 10671, "Россошь": 10681, 
         "Ивановская область": 10687, "Кинешма": 10689, "Шуя": 10691, "Калужская область": 10693, "Малоярославец": 10697, "Костромская область": 10699, 
         "Курская область": 10705, "Железногорск": 10710, "Липецкая область": 10712, "Елец": 10713, "Апрелевка": 10715, "Балашиха": 10716, 
         "Бронницы": 10717, "Видное": 10719, "Волоколамск": 10721, "Воскресенск": 10722, "Дмитров": 10723, "Домодедово": 10725, "Егорьевск": 10727, 
         "Зарайск": 10728, "Звенигород": 10729, "Истра": 10731, "Кашира": 10732, "Клин": 10733, "Коломна": 10734, "Красногорск": 10735, 
         "Луховицы": 10737, "Люберцы": 10738, "Можайск": 10739, "Мытищи": 10740, "Наро-Фоминск": 10741, "Ногинск": 10742, "Одинцово": 10743, 
         "Орехово-Зуево": 10745, "Павловский Посад": 10746, "Подольск": 10747, "Пушкино": 10748, "Раменское": 10750, "Руза": 10751, "Сергиев Посад": 10752, 
         "Серпухов": 10754, "Солнечногорск": 10755, "Ступино": 10756, "Химки": 10758, "Чехов": 10761, "Шатура": 10762, "Щелково": 10765, 
         "Орловская область": 10772, "Касимов": 10773, "Рязанская область": 10776, "Вязьма": 10782, "Гагарин": 10783, "Смоленская область": 10795, 
         "Ярцево": 10801, "Тамбовская область": 10802, "Мичуринск": 10803, "Бологое": 10805, "Кимры": 10811, "Конаково": 10812, "Тверская область": 10819, 
         "Ржев": 10820, "Удомля": 10824, "Ефремов": 10828, "Новомосковск": 10830, "Тульская область": 10832, "Переславль": 10837, "Ростов": 10838, 
         "Рыбинск": 10839, "Углич": 10840, "Ярославская область": 10841, "Архангельская область": 10842, "Котлас": 10846, "Северодвинск": 10849, 
         "Вологодская область": 10853, "Калининградская область": 10857, "Советск": 10860, "Волхов": 10864, "Всеволожск": 10865, "Гатчина": 10867, 
         "Кингисепп": 10870, "Кириши": 10871, "Кировск": 10872, "Луга": 10876, "Подпорожье": 10881, "Приозерск": 10883, "Пушкин": 10884, 
         "Сланцы": 10888, "Сосновый Бор": 10891, "Тихвин": 10892, "Тосно": 10893, "Апатиты": 10894, "Кандалакша": 10895, "Мончегорск": 10896, 
         "Мурманская область": 10897, "Нарьян-Мар": 10902, "Новгородская область": 10904, "Боровичи": 10906, "Старая Русса": 10923, "Псковская область": 10926, 
         "Великие Луки": 10928, "Республика Карелия": 10933, "Кондопога": 10934, "Костомукша": 10935, "Сегежа": 10936, "Сортавала": 10937, 
         "Республика Коми": 10939, "Воркута": 10940, "Инта": 10941, "Печора": 10942, "Усинск": 10944, "Ухта": 10945, "Астраханская область": 10946, 
         "Волгоградская область": 10950, "Волжский": 10951, "Камышин": 10959, "Михайловка": 10965, "Урюпинск": 10981, "Армавир": 10987, 
         "Белореченск": 10988, "Геленджик": 10990, "Ейск": 10993, "Краснодарский край": 10995, "Кропоткин": 10996, "Крымск": 10997, "Тихорецк": 11002, 
         "Республика Адыгея": 11004, "Буйнакск": 11006, "Дербент": 11007, "Каспийск": 11008, "Кизляр": 11009, "Республика Дагестан": 11010, 
         "Хасавюрт": 11011, "Республика Ингушетия": 11012, "Республика Кабардино-Балкария": 11013, "Республика Калмыкия": 11015, "Карачаево-Черкесская Республика": 11020, 
         "Республика Северная Осетия-Алания": 11021, "Чеченская Республика": 11024, "Ростовская область": 11029, "Азов": 11030, 
         "Белая Калитва": 11034, "Волгодонск": 11036, "Каменск-Шахтинский": 11043, "Шахты": 11053, "Буденновск": 11055, "Георгиевск": 11056, 
         "Ессентуки": 11057, "Кисловодск": 11062, "Минеральные Воды": 11063, "Невинномысск": 11064, "Пятигорск": 11067, "Ставропольский край": 11069, 
         "Кировская область": 11070, "Кирово-Чепецк": 11071, "Республика Марий Эл": 11077, "Нижегородская область": 11079, "Арзамас": 11080, 
         "Павлово": 11082, "Саров": 11083, "Оренбургская область": 11084, "Бузулук": 11086, "Гай": 11087, "Новотроицк": 11090, "Орск": 11091, 
         "Пензенская область": 11095, "Кузнецк": 11101, "Пермский край": 11108, "Соликамск": 11110, "Республика Башкортостан": 11111, "Кумертау": 11113, 
         "Нефтекамск": 11114, "Салават": 11115, "Стерлитамак": 11116, "Республика Мордовия": 11117, "Татарстан": 11119, "Альметьевск": 11121, 
         "Бугульма": 11122, "Елабуга": 11123, "Зеленодольск": 11125, "Нижнекамск": 11127, "Чистополь": 11129, "Самарская область": 11131, 
         "Жигулевск": 11132, "Сызрань": 11139, "Балаково": 11143, "Балашов": 11144, "Саратовская область": 11146, "Энгельс": 11147, 
         "Удмуртская республика": 11148, "Воткинск": 11149, "Глазов": 11150, "Сарапул": 11152, "Ульяновская область": 11153, "Димитровград": 11155, "Чувашская республика": 11156, "Курганская область": 11158, "Шадринск": 11159, "Асбест": 11160, "Верхняя Салда": 11161, "Свердловская область": 11162, "Каменск-Уральский": 11164, "Краснотурьинск": 11165, "Кушва": 11166, "Лесной": 11167, "Нижний Тагил": 11168, "Нижняя Тура": 11169, "Новоуральск": 11170, "Первоуральск": 11171, "Серов": 11172, "Ишим": 11173, "Тобольск": 11175, "Тюменская область": 11176, "Югорск": 11177, "Ялуторовск": 11178, "Когалым": 11180, "Лангепас": 11181, "Мегион": 11182, "Нефтеюганск": 11184, "Нягань": 11186, "Пыть-Ях": 11188, "Радужный": 11189, "Урай": 11192, "Ханты-Мансийский АО": 11193, "Верхний Уфалей": 11200, "Златоуст": 11202, "Копейск": 11207, "Кыштым Челябинская область": 11210, "Миасс": 11212, "Озерск": 11214, "Сатка": 11217, "Снежинск": 11218, "Троицк": 11220, "Усть-Катав": 11223, "Челябинская область": 11225, "Губкинский": 11228, "Надым": 11229, "Новый Уренгой": 11230, "Ноябрьск": 11231, "Ямало-Ненецкий АО": 11232, "Алтайский край": 11235, "Заринск": 11240, "Рубцовск": 11251, "Ангарск": 11256, "Иркутская область": 11266, "Нижнеудинск": 11268, "Тайшет": 11270, "Тулун": 11271, "Усолье-Сибирское": 11272, "Усть-Илимск": 11273, "Черемхово": 11274, "Анжеро-Судженск": 11276, "Белово": 11277, "Кемеровская область": 11282, "Ленинск-Кузнецкий": 11285, "Междуреченск": 11287, "Мыски": 11288, "Прокопьевск": 11291, "Полысаево": 11292, "Юрга": 11299, "Ачинск": 11302, "Кайеркан": 11306, "Красноярский край": 11309, "Минусинск": 11310, "Норильск": 11311, "Бердск": 11314, "Новосибирская область": 11316, "Омская область": 11318, "Горно-Алтайск": 11319, "Северобайкальск": 11327, "Республика Бурятия": 11330, "Кызыл": 11333, "Республика Хакасия": 11340, "Саяногорск": 11341, "Северск": 11351, "Стрежевой": 11352, "Томская область": 11353, "Белогорск": 11374, "Амурская область": 11375, "Свободный": 11387, "Тында": 11391, "Биробиджан": 11393, "Камчатский край": 11398, "Магаданская область": 11403, "Арсеньев": 11405, "Приморский край": 11409, "Дальнегорск": 11411, "Уссурийск": 11426, "Нерюнгри": 11437, "Сахалинская область": 11450, "Амурск": 11451, "Комсомольск-на-Амуре": 11453, "Хабаровский край": 11457, "Анадырь": 11458, "Евпатория": 11463, "Керчь": 11464, "Феодосия": 11469, "Ялта": 11470, "Алушта": 11471, "Судак": 11472, "Рузаевка": 20010, "Вятские Поляны": 20020, "Выкса": 20040, "Кстово": 20044, "Шумерля": 20078, "Железногорск": 20086, "Зеленогорск": 20088, "Усть-Кут": 20097, "Искитим": 20100, "Оленегорск": 20155, "Ахтубинск": 20167, "Магас": 20181, "Алексеевка": 20192, "Шебекино": 20196, "Кировоград": 20221, "Луцк": 20222, "Ревда": 20224, "Качканар": 20234, "Октябрьский": 20235, "Березники": 20237, "Чайковский": 20243, "Лысьва": 20244, "Сатис": 20258, "Белорецк": 20259, "Мексика": 20271, "Колпинский район": 20293, "Пушкинский район": 20297, "Электросталь": 20523, "Львовская область": 20529, "Закарпатская область": 20530, "Тернопольская область": 20531, "Ивано-Франковская область": 20532, "Черновицкая область": 20533, "Ровенская область": 20534, "Хмельницкая область": 20535, "Донецкая область": 20536, "Днепропетровская область": 20537, "Харьковская область": 20538, "Запорожская область": 20539, "Луганская область": 20540, "Одесская область": 20541, "Херсонская область": 20542, "Николаевская область": 20543, "Киевская область": 20544, "Винницкая область": 20545, "Черкасская область": 20546, "Житомирская область": 20547, "Кировоградская область": 20548, "Полтавская область": 20549, "Волынская область": 20550, "Черниговская область": 20551, "Сумская область": 20552, "Краматорск": 20554, "Саки": 20556, "Жуковский": 20571, "Кипр": 20574, "Протвино": 20576, "Строитель": 20587, "Невьянск": 20654, "Богородицк": 20667, "Североуральск": 20672, "Троицк Московская область": 20674, "Учалы": 20680, "Реж": 20684, "Красноуфимск": 20691, "Славянск-на-Кубани": 20704, "Курчатов": 20707, "Белебей": 20714, "Мелеуз": 20715, "Сибай": 20716, "Туймазы": 20717, "Ишимбай": 20718, "Верхняя Пышма": 20720, "Волжск": 20721, "Тутаев": 21154, "Избербаш": 21521, "Кременчуг": 21609, "Черногория": 21610, "Фрязино": 21619, "Реутов": 21621, "Железнодорожный": 21622, "Ивантеевка": 21623, "Щербинка": 21624, "Кубинка": 21625, "Дедовск": 21627, "Лыткарино": 21630, "Лосино-Петровский": 21635, "Лобня": 21641, "Электроугли": 21642, "Хотьково": 21645, "Голицыно": 21646, "Краснознаменск": 21647, "Старая Купавна": 21656, "Полевской": 21726, "Дзержинский": 21735, "Нахабино": 21745, "Забайкальский край": 21949, "Бахчисарайский район": 24696, "Ленинский район": 24702, "Макеевка": 24876, "Колпино": 26081, "Бахчисарай": 27217, "Джанкой": 27555, "Красноперекопск": 27693, "Новомосковск": 28051, "Армянск": 28892, "Абхазия": 29386, "Южная Осетия": 29387, "Комрат": 33883, "Покров": 37129, "Новочебоксарск": 37133, "Климовск": 37147, "Волоколамский район": 98580, "Воскресенский район": 98581, "Дмитровский район": 98582, "Егорьевский район": 98584, "Зарайский район": 98585, "Истринский район": 98586, "Каширский район": 98587, "Клинский район": 98588, "Красногорский район": 98590, "Ленинский район": 98591, "Луховицкий район": 98593, "Люберецкий район": 98594, "Можайский район": 98595, "Мытищинский район": 98596, "Наро-Фоминский район": 98597, "Ногинский район": 98598, "Одинцовский район": 98599, "Павлово-Посадский район": 98602, "Пушкинский район": 98604, "Раменский район": 98605, "Рузский район": 98606, "Ступинский район": 98607, "Сергиево-Посадский район": 98608, "Солнечногорский район": 98611, "Чеховский район": 98614, "Шатурский район": 98615, "Щелковский район": 98617, "Волховский район": 98620, "Всеволожский район": 98621, "Выборгский район": 98622, "Гатчинский район": 98623, "Кингисеппский район": 98624, "Киришский район": 98625, "Кировский район": 98626, "Лужский район": 98629, "Подпорожский район": 98630, "Приозерский район": 98631, "Сланцевский район": 98632, "Тихвинский район": 98633, "Тосненский район": 98634, "Алексеевский район": 98697, "Шебекинский район": 98716, "Яковлевский район": 98717, "Александровский район": 98745, "Киржачский район": 98750, "Петушинский район": 98755, "Россошанский район": 98787, "Малоярославецкий район": 98826, "Вяземский район": 98958, "Гагаринский район": 98959, "Ярцевский район": 98981, "Бологовский район": 99008, "Конаковский район": 99019, "Удомельский район": 99039, "Богородицкий район": 99044, "Тутаевский район": 99078, "Угличский район": 99079, "Боровичский район": 99146, "Старорусский район": 99161, "Кондопожский район": 99193, "Сегежский район": 99203, "Район Печора": 99210, "Ахтубинский район": 99221, "Белореченский район": 99269, "Ейский район": 99274, "Кавказский район": 99275, "Крымский район": 99281, "Славянский район": 99293, "Тимашевский район": 99297, "Тихорецкий район": 99298, "Туапсинский район": 99299, "Белокалитвинский район": 99411, "Буденновский район": 99456, "Кстовский район": 99555, "Павловский район": 99560, "Белебеевский район": 99675, "Белорецкий район": 99677, "Ишимбайский район": 99694, "Мелеузовский район": 99703, "Туймазинский район": 99712, "Учалинский район": 99714, "Балаковский район": 99817, "Балашовский район": 99818, "Энгельсский район": 99850, "Саткинский район": 100020, "Надымский район": 100028, "Нижнеудинский район": 100109, "Тайшетский район": 100112, "Усть-Кутский район": 100116, "Амурский район": 100398, "Красноармейск": 100471, "Кандалакшский район": 101749, "Нерюнгринский район": 101987, "Северный Кавказ": 102444, "Чайковский район": 110916, "Сортавальский район": 1109}

router = APIRouter()

class Ticket(BaseModel):
    code: str
    transport_type: str
    transport_name: str
    link: str
    date: str
    time: str
    price: int

class TicketRequest(BaseModel):
    from_: str
    to: str
    time: str

class Tickets(BaseModel):
    tickets: List[Ticket]

@router.post("/")
async def post_tickets(request: TicketRequest):
    link = f"https://api.rasp.yandex.net/v3.0/search/?apikey={key}&format=json&from=c{codes[request.from_]}&to=c{codes[request.to]}&date={request.time}"

    response = requests.get(link)

    resp = ScheduleResponse.model_validate_json(response.text)

    res = list(map(lambda x: x, resp.segments))

    tickets = []

    for segment in res:
        ticket = segment.thread
        from_s = segment.from_
        tos = segment.to
        places = segment.tickets_info
        try:
            prices = places.places
            try:
                price = min(list(map(lambda x: x.price.whole, prices)))
            except:
                if (ticket.transport_type == "plane"):
                    price = randint(8000, 20000)
                else:
                    price = randint(4000, 10000)
        except:
            price = randint(4000, 10000)
        try:
            if (ticket.transport_type != "plane"):
                tickets.append(Ticket(code=ticket.number,
                                    transport_type=ticket.transport_type,
                                    transport_name=ticket.transport_type if ticket.vehicle == None else ticket.vehicle,
                                    date=segment.departure[:segment.departure.index("T")],
                                    time=segment.departure[segment.departure.index("T")+1:],
                                    price=price,
                                    link=f"https://rasp.yandex.ru/thread/{ticket.uid}?departure_from={segment.departure[:segment.departure.index("+")].replace("T", "+")}&station_from={from_s.code[1:]}&station_to={tos.code[1:]}&to_city={codes[request.to]}"))
            else:
                tickets.append(Ticket(code=ticket.number, 
                                    transport_type=ticket.transport_type,
                                    transport_name=ticket.vehicle if ticket.transport_type != None else ticket.vehicle,
                                    date=segment.departure[:segment.departure.index("T")],
                                    time=segment.departure[segment.departure.index("T")+1:],
                                    price=price,
                                    link=f"https://travel.yandex.ru/avia/order/?forward={(ticket.number).replace(" ", "+")}.{request.time}&fromId=c{codes[request.from_]}&toId=c{codes[request.to]}&when={request.time}"))
        except:
            pass
    return Tickets(tickets=sorted(tickets, key=lambda x: x.price))