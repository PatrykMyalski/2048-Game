// Pobieramy wszystkie kwadraty z html
let x1y1 = document.getElementById('x1y1');
let x2y1 = document.getElementById('x2y1');
let x3y1 = document.getElementById('x3y1');
let x4y1 = document.getElementById('x4y1');
let x1y2 = document.getElementById('x1y2');
let x2y2 = document.getElementById('x2y2');
let x3y2 = document.getElementById('x3y2');
let x4y2 = document.getElementById('x4y2');
let x1y3 = document.getElementById('x1y3');
let x2y3 = document.getElementById('x2y3');
let x3y3 = document.getElementById('x3y3');
let x4y3 = document.getElementById('x4y3');
let x1y4 = document.getElementById('x1y4');
let x2y4 = document.getElementById('x2y4');
let x3y4 = document.getElementById('x3y4');
let x4y4 = document.getElementById('x4y4');

// zapisujemy je do array z podziałem na kolumny i rzędy 
// arrs of columns Y
let allColumns = [firstColumn = [x1y1, x1y2, x1y3, x1y4],
secondColumn = [x2y1, x2y2, x2y3, x2y4],
thirdColumn = [x3y1, x3y2, x3y3, x3y4],
fourthColumn = [x4y1, x4y2, x4y3, x4y4]];

// arrs of rows X
let allRows = [firstRow = [x1y1, x2y1, x3y1, x4y1],
secondRow = [x1y2, x2y2, x3y2, x4y2],
thirdRow = [x1y3, x2y3, x3y3, x4y3],
fourthRow = [x1y4, x2y4, x3y4, x4y4]];

// Uruchamia się po kliknięciu "w"
function upMoveOrAdd(elem) {    // funkcja która decyduje co robić z przesłanym elementem, dodać do istniejącego, przesunąć na puste pole, czy nie ruszać bo nie ma możliwości ruchu
    for (i in allRows) {
        for (k in allRows[i]) {  // allRows[i][k] po kolei są porównywane do elementu
            if (elem.id.charAt(1) == allRows[i][k].id.charAt(1) && elem.id !== allRows[i][k].id && elem.id[3] > allRows[i][k].id[3]) {   // sprawdzam czy element i allRows[i][k] znajdują się w tym samym rzędzie, czy nie są to te same elementy, oraz czy element jest niżej od allRows[i][k]
                if (allRows[i][k].firstElementChild == null) {   // jeżeli allRows[i][k] nie ma dzieciaka to dzieciak od elementu jest przenoszony w miejsce allRows[i][k]
                    allRows[i][k].appendChild(elem.firstElementChild);
                    moved = 1;// moved ma na celu wskazanie czy ma zostać wygenerowana nowa liczba
                    return;
                }// poniżej sytuacja, gdy porównywana allRows[i][k] do elementu ma dzieciaka
                else if (allRows[i][k].firstElementChild.innerHTML == elem.firstElementChild.innerHTML &&   //porównujem czy wartości dzieciaków są takie same, oraz sprawdzam czy pomiędzy elementem a allRows[i][k] znajdują się inne dzieciaki
                    (allColumns[elem.id[1] - 1][elem.id[3] - 2].firstElementChild == null || allRows[i][k] == allColumns[elem.id[1] - 1][elem.id[3] - 2]) &&
                    (allRows[i][k].added !== 1)) { // sprawdzamy czy element do którego chcemy dodadać nie był wcześniej dodawany 
                    if (allRows[i][k].id.charAt(3) == 1 && elem.id.charAt(3) == 4) {         // jeżeli elementy znajdują się w pierwszym i ostatnim rzędzie to sprawdzamy czy pomiędzy nimi coś jest
                        if (allColumns[elem.id[1] - 1][2].firstElementChild == null && allColumns[elem.id[1] - 1][1].firstElementChild == null) { // jeżeli nic nie ma to wywoływana jest funkcja dodawania
                            adding(elem, allRows[i][k]);
                            moved = 1;
                            return;
                        }
                    } else {
                        adding(elem, allRows[i][k]); // jeżeli element i allRows[i][k] nie znajdują się w pierwszym i ostatnim rzędzie to wtedy po prostu jest wywoływana funkcja dodawania                       
                        moved = 1;
                        return;
                    };
                };
            };
        };
    };
};
function onPressUp() {
    // zaczynam od i = 1 dlatego że skoro wszystkie elementy mają iść najwyżej, to zignoruję cały najwyższy rząd
    for (let i = 1; i <= 3; i++) {
        for (k in allRows[i]) { // wchodzimy w array zawarte w allRows i wyciągamy każdy element 
            if (allRows[i][k].firstElementChild !== null) {
                upMoveOrAdd(allRows[i][k]);   //przesyłamy dalej do funkcji elementy które mają w sobie dzieciaka
            };
        };
    };
};// wszystkie fucnkcje poniżej odnoszące się do poruszania numerami, są zrobione na wzór tych powyżej

// uruchamiają się po klknięciu "s"
function downMoveOrAdd(elem) {
    for (let i = 3; i >= 0; i--) {
        for (k in allRows[i]) {
            if (elem.id.charAt(1) == allRows[i][k].id.charAt(1) && elem.id !== allRows[i][k].id && elem.id[3] < allRows[i][k].id[3]) {
                if (allRows[i][k].firstElementChild == null) {
                    allRows[i][k].appendChild(elem.firstElementChild);
                    moved = 1;
                    return;
                }
                else if (allRows[i][k].firstElementChild.innerHTML == elem.firstElementChild.innerHTML &&
                    (allColumns[elem.id[1] - 1][elem.id[3]].firstElementChild == null || allRows[i][k] == allColumns[elem.id[1] - 1][elem.id[3]]) && (allRows[i][k].added !== 1)) {
                    if (allRows[i][k].id.charAt(3) == 4 && elem.id.charAt(3) == 1) {
                        if (allColumns[elem.id[1] - 1][2].firstElementChild == null && allColumns[elem.id[1] - 1][1].firstElementChild == null) {
                            adding(elem, allRows[i][k]);
                            moved = 1;
                            return;
                        };
                    } else {
                        adding(elem, allRows[i][k]);
                        moved = 1;
                        return;
                    };
                };
            };
        };
    };
};
function onPressDown() {
    for (let i = 2; i >= 0; i--) {
        for (k in allRows[i]) {
            if (allRows[i][k].firstElementChild !== null) {
                downMoveOrAdd(allRows[i][k]);
            };
        };
    };
};

//uruchamia się po klknięciu "a"
function leftMoveOrAdd(elem) {
    for (let i = 0; i <= 3; i++) {
        for (k in allColumns) {
            if (elem.id.charAt(3) == allColumns[i][k].id.charAt(3) && elem.id !== allColumns[i][k].id && elem.id[1] > allColumns[i][k].id[1]) {
                if (allColumns[i][k].firstElementChild == null) {
                    allColumns[i][k].appendChild(elem.firstElementChild);
                    moved = 1;
                    return;
                }
                else if (allColumns[i][k].firstElementChild.innerHTML == elem.firstElementChild.innerHTML &&
                    (allRows[elem.id[3] - 1][elem.id[1] - 2].firstElementChild == null || allColumns[i][k] == allRows[elem.id[3] - 1][elem.id[1] - 2]) && (allColumns[i][k].added !== 1)) {
                    if (allColumns[i][k].id.charAt(1) == 1 && elem.id.charAt(1) == 4) {
                        if (allRows[elem.id[3] - 1][2].firstElementChild == null && allRows[elem.id[3] - 1][1].firstElementChild == null) {
                            adding(elem, allColumns[i][k]);
                            moved = 1;
                            return;
                        };
                    } else {
                        adding(elem, allColumns[i][k]);
                        moved = 1;
                        return;
                    };
                };
            };
        };
    };
};
function onPressLeft() {
    for (let i = 1; i <= 3; i++) {
        for (k in allColumns) {
            if (allColumns[i][k].firstElementChild !== null) {
                leftMoveOrAdd(allColumns[i][k]);
            };
        };
    };
};

// Uruchamia się po kliknięciu "d"
function rigthMoveOrAdd(elem) {
    for (let i = 3; i >= 0; i--) {
        for (k in allColumns[i]) {
            if (elem.id.charAt(3) == allColumns[i][k].id.charAt(3) && elem.id !== allColumns[i][k].id && elem.id[1] < allColumns[i][k].id[1]) {
                if (allColumns[i][k].firstElementChild == null) {
                    allColumns[i][k].appendChild(elem.firstElementChild);
                    moved = 1;
                    return;
                }
                else if (allColumns[i][k].firstElementChild.innerHTML == elem.firstElementChild.innerHTML &&
                    (allRows[elem.id[3] - 1][elem.id[1]].firstElementChild == null || allColumns[i][k] == allRows[elem.id[3] - 1][elem.id[1]]) && (allColumns[i][k].added !== 1)) {
                    if (allColumns[i][k].id.charAt(1) == 4 && elem.id.charAt(1) == 1) {
                        if (allRows[elem.id[3] - 1][2].firstElementChild == null && allRows[elem.id[3] - 1][1].firstElementChild == null) {
                            adding(elem, allColumns[i][k]);
                            moved = 1;
                            return;
                        };
                    } else {
                        adding(elem, allColumns[i][k]);
                        moved = 1;
                        return;
                    };
                };
            };
        };
    };
};
function onPressRight() {
    for (let i = 2; i >= 0; i--) {
        for (k in allColumns[i]) {
            if (allColumns[i][k].firstElementChild !== null) {
                rigthMoveOrAdd(allColumns[i][k]);
            };
        };
    };
};

function adding(elemToDelete, elemToAdd) {  // funkcja stworzona do dodawania dwóch elementów do siebie
    elemToAdd.firstElementChild.classList.remove('a' + elemToAdd.firstElementChild.innerHTML);
    elemToAdd.firstElementChild.innerHTML *= 2; // z racji tego że dodajemy dwa takie same numery to tylko mnożymy pierwszą 
    elemToAdd.firstElementChild.classList.add('a' + elemToAdd.firstElementChild.innerHTML);
    elemToDelete.removeChild(elemToDelete.firstElementChild); // i usuwamy drugą 
    elemToAdd.added = 1; // ustalamy wartość added, aby uniknąć ponownego dodania 
    score += parseInt(elemToAdd.firstElementChild.innerHTML); // score sumuje wszystkie wyniki dodawania
    document.getElementById('score-board').innerHTML = score; // podaje aktualny wynik
};

function clearningAllAdded() { // funkcja mająca na celu wyzerowanie wszystkich added
    for (i in allRows) {
        for (k in allRows[i]) {
            if (allRows[i][k].added == 1) {
                delete allRows[i][k].added;
            };
        };
    };
};
function checkIfLose() {
    if (allRows[0][0].firstElementChild.innerHTML == allRows[0][1].firstElementChild.innerHTML ||
        allRows[0][0].firstElementChild.innerHTML == allRows[1][0].firstElementChild.innerHTML ||
        allRows[0][1].firstElementChild.innerHTML == allRows[0][2].firstElementChild.innerHTML || // generalnie sprawdzam czy istnieje możliwość dodania numeru 
        allRows[0][1].firstElementChild.innerHTML == allRows[1][1].firstElementChild.innerHTML || // do jakiegokoliwek sąsiadującego go numeru
        allRows[0][2].firstElementChild.innerHTML == allRows[0][3].firstElementChild.innerHTML ||
        allRows[0][2].firstElementChild.innerHTML == allRows[1][2].firstElementChild.innerHTML || // używane tylko w sytuacji gdy po dodaniu nowego numeru
        allRows[0][3].firstElementChild.innerHTML == allRows[1][3].firstElementChild.innerHTML || // nie ma żadnego wolnego pola 
        allRows[1][0].firstElementChild.innerHTML == allRows[1][1].firstElementChild.innerHTML ||
        allRows[1][1].firstElementChild.innerHTML == allRows[1][2].firstElementChild.innerHTML ||
        allRows[1][2].firstElementChild.innerHTML == allRows[1][3].firstElementChild.innerHTML ||
        allRows[2][0].firstElementChild.innerHTML == allRows[1][0].firstElementChild.innerHTML ||
        allRows[2][0].firstElementChild.innerHTML == allRows[2][1].firstElementChild.innerHTML ||
        allRows[2][0].firstElementChild.innerHTML == allRows[3][0].firstElementChild.innerHTML ||
        allRows[2][1].firstElementChild.innerHTML == allRows[1][1].firstElementChild.innerHTML ||
        allRows[2][1].firstElementChild.innerHTML == allRows[2][2].firstElementChild.innerHTML ||
        allRows[2][1].firstElementChild.innerHTML == allRows[3][1].firstElementChild.innerHTML ||
        allRows[2][2].firstElementChild.innerHTML == allRows[1][2].firstElementChild.innerHTML ||
        allRows[2][2].firstElementChild.innerHTML == allRows[2][3].firstElementChild.innerHTML ||
        allRows[2][2].firstElementChild.innerHTML == allRows[3][2].firstElementChild.innerHTML ||
        allRows[2][3].firstElementChild.innerHTML == allRows[1][3].firstElementChild.innerHTML ||
        allRows[2][3].firstElementChild.innerHTML == allRows[3][3].firstElementChild.innerHTML ||
        allRows[3][0].firstElementChild.innerHTML == allRows[3][1].firstElementChild.innerHTML ||
        allRows[3][1].firstElementChild.innerHTML == allRows[3][2].firstElementChild.innerHTML ||
        allRows[3][2].firstElementChild.innerHTML == allRows[3][3].firstElementChild.innerHTML) {
        return true; // jeżeli chociaż jeden element pasuje do sąsiadującego zwraca true
    } else {
        return false; // jeżeli nie ma możliwości dodania żadnych elementów do siebie zwraca false 
    };
};

function getRandomInt(max) { // funkcja zwracająca randomową liczbę 
    return Math.floor(Math.random() * max);
};

function addingNewNumber() {    // funkcja mająca na celu stworzenie nowego elementu 
    let emptyCards = [];
    for (i in allRows) {
        for (k in allRows[i]) {
            if (allRows[i][k].firstElementChild == null) {  // tworzymy nowy array z elementami nie zawierającymi żadnego numeru 
                emptyCards.push(allRows[i][k]);
            };
        };
    };
    randomEmptyCard = getRandomInt(emptyCards.length); // wybiera index w której pustej karcie ma zostać stworzony nowy element   
    childToAdd = document.createElement('div'); // tworzymy element który ma zostać dodany
    childToAdd.classList.add('box');

    if (getRandomInt(5) == 3) { // wybieramy w sposób randomowy jaki numer ma zostać dodany z mniejszą szansą na 4 
        childToAdd.innerHTML = 4;
    } else {
        childToAdd.innerHTML = 2;
    };
    childToAdd.classList.add('a' + childToAdd.innerHTML);
    emptyCards[randomEmptyCard].appendChild(childToAdd); // dodajemy numer na plansze 
    moved = 0; // zerujemy moved
    clearningAllAdded(); // zerujemy wszystkie elementy ze statusem added
    if (emptyCards.length == 1) { // Gdy wszyskie pola są zajęte sprawdzamy czy jest możliwość dodania jakiegokoliwek 
        if (checkIfLose() == false) { // jeżeli nie ma możliwości ruchu to uruchamia się poniższa funkcja
            document.querySelector('.lose-screen').style.opacity = 0.8;
            document.getElementById('ending-score').innerHTML = score;
            document.getElementById('restart').style.visibility = 'visible';
            document.getElementById('restart').addEventListener("click", function () { // eventListener który uruchomi się gdy user będzie chciał rozpocząć grę od nowa
                document.querySelector('.lose-screen').style.opacity = 0;
                for (i in allRows) {
                    for (k in allRows[i]) {
                        allRows[i][k].removeChild(allRows[i][k].firstElementChild); // usuwamy wszystkie numery
                    };
                };
                document.getElementById('restart').style.visibility = 'hidden';
                score = 0;
                document.getElementById("score-board").innerHTML = score; // zerujemy wynik
                addingNewNumber();   //dodajemy nowy numer tak samo jak przy otwieraniu strony
            });
        };
    };
};

var score = 0; // podliczanie sumy wszystkich dodawań 
var moved = 0; // ma na celu sprawdzenie czy numery zostały poruszone i czy ma nastąpić dodanie nowego numeru 
addingNewNumber(); // po uruchumieniu gry tworzymy pierwszy element w randomowy sposób
document.getElementById('hint-button').addEventListener("click", function () {
    document.querySelector('.hint').style.visibility = 'hidden' // po kliknięciu "OK" hint znika 
});
document.addEventListener("keyup", (klawisz) => {
    if (document.querySelector('.hint').style.visibility = 'visible' && klawisz.key == "w" || klawisz.key == "ArrowUp" || // jeżeli hint jest widoczne, a user kliknie jakikolwiek klawisz odpowiedzialny za grę to hint znika
        klawisz.key == "s" || klawisz.key == "ArrowDown" || klawisz.key == "a" || klawisz.key == "ArrowLeft" ||
        klawisz.key == "d" || klawisz.key == "ArrowRight") {
        document.querySelector('.hint').style.visibility = 'hidden';
    }
    if (klawisz.key == "w" || klawisz.key == "ArrowUp") {
        onPressUp(); // cała logika poruszania się przycisków jest umieszona w tej funkcji 
        if (moved == 1) {
            addingNewNumber(); // jeżeli jakikolwiek element zmienił swoją pozycje to nowy numer zostaje dodany i wszystkie added zostają wyzerowane
        };
    }
    else if (klawisz.key == "s" || klawisz.key == "ArrowDown") {
        onPressDown();
        if (moved == 1) {
            addingNewNumber();
        };
    }
    else if (klawisz.key == "a" || klawisz.key == "ArrowLeft") {
        onPressLeft();
        if (moved == 1) {
            addingNewNumber();
        };
    }
    else if (klawisz.key == "d" || klawisz.key == "ArrowRight") {
        onPressRight();
        if (moved == 1) {
            addingNewNumber();
        };
    };
});