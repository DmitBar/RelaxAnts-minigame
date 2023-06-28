var isSimulationRunning = false;
var antFarmElement;
var gridWidth = 10; // Ширина сетки
var gridHeight = 10; // Высота сетки
var grid = []; // Массив для представления сетки
var ants = []; // Массив муравьев
var foodLevel = 100; // Начальный уровень пищи

// Создание муравьиной фермы
function createAntFarm() {
  antFarmElement = document.getElementById('antFarm');

  // Создание сетки
  for (var i = 0; i < gridHeight; i++) {
    var row = [];
    for (var j = 0; j < gridWidth; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      antFarmElement.appendChild(cell);
      row.push(cell);
    }
    grid.push(row);
  }
}

function createAnts() {
    var ant1 = createAnt(getRandomInteger(0, gridWidth - 1), 0);
    var ant2 = createAnt(getRandomInteger(0, gridWidth - 1), 0);
  
    grid[0][ant1.x].classList.add('tunnel'); // Добавление класса 'tunnel' для первого муравья на первой линии
    grid[0][ant2.x].classList.add('tunnel'); // Добавление класса 'tunnel' для второго муравья на первой линии
  
    ants.push(ant1, ant2);
  }

// Создание муравья
function createAnt(x, y) {
  var ant = {
    x: x,
    y: y
  };
  return ant;
}

// Обновление позиции муравья
function updateAntPosition(ant) {
  // Рытье туннеля (случайное перемещение по двум осям)
  var dx = getRandomInteger(-1, 1);
  var dy = getRandomInteger(-1, 1);
  ant.x = (ant.x + dx + gridWidth) % gridWidth;
  ant.y = (ant.y + dy + gridHeight) % gridHeight;
}

function simulateAntBehavior() {
    // Очистка сетки от предыдущих позиций муравьев и тоннелей
    for (var i = 0; i < gridHeight; i++) {
      for (var j = 0; j < gridWidth; j++) {
        var cell = grid[i][j];
        cell.classList.remove('ant', 'tunnel');
      }
    }
  
    // Обновление позиции каждого муравья и рытье тоннелей
    for (var i = 0; i < ants.length; i++) {
      var ant = ants[i];
      var currentCell = grid[ant.y][ant.x];
      currentCell.classList.add('tunnel'); // Добавление класса 'tunnel' для текущей позиции муравья
  
      updateAntPosition(ant); // Обновление позиции муравья
    }
  
    // Отрисовка муравьев в сетке
    for (var i = 0; i < ants.length; i++) {
      var ant = ants[i];
      var cell = grid[ant.y][ant.x];
      cell.classList.add('ant');
    }
  
    if (isSimulationRunning) {
      setTimeout(simulateAntBehavior, movementInterval);
    }
  }

function feedAnts() {
  foodLevel = 100; // Установка максимального уровня пищи
}

// Получение случайного целого числа в заданном диапазоне
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Запуск симуляции
function startSimulation() {
  if (!isSimulationRunning) {
    isSimulationRunning = true;
    simulateAntBehavior();
  }
}

// Остановка симуляции
function stopSimulation() {
  isSimulationRunning = false;
}

function main() {
    createAntFarm();
    createAnts();
    
    var startButton = document.getElementById('startButton');
    var stopButton = document.getElementById('stopButton');
    var feedButton = document.getElementById('feedButton');
  
    startButton.addEventListener('click', startSimulation);
    stopButton.addEventListener('click', stopSimulation);
    feedButton.addEventListener('click', feedAnts);
  }

// Вызов главной функции при загрузке страницы
window.addEventListener('load', main);
