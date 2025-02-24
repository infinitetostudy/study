const readline = require('readline');

// 设置控制台可交互

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

// 游戏地图的大小

const WIDTH = 20;

const HEIGHT = 10;

// 蛇的初始位置和方向

let snake = [

  { x: 5, y: 5 }

];

let direction = 'right';

// 食物的初始位置

let food = {

  x: Math.floor(Math.random() * WIDTH),

  y: Math.floor(Math.random() * HEIGHT)

};

// 处理用户输入

process.stdin.on('keypress', (str, key) => {

  if (key.ctrl && key.name === 'c') {

​    process.exit();

  } else if (key.name === 'up' && direction!== 'down') {

​    direction = 'up';

  } else if (key.name === 'down' && direction!== 'up') {

​    direction = 'down';

  } else if (key.name === 'left' && direction!== 'right') {

​    direction = 'left';

  } else if (key.name === 'right' && direction!== 'left') {

​    direction = 'right';

  }

});

// 绘制游戏地图

function drawMap() {

  // 清空控制台

  console.clear();

  for (let y = 0; y < HEIGHT; y++) {

​    let row = '';

​    for (let x = 0; x < WIDTH; x++) {

​      if (snake.some(segment => segment.x === x && segment.y === y)) {

​        row += 'O';

​      } else if (food.x === x && food.y === y) {

​        row += 'X';

​      } else {

​        row += '.';

​      }

​    }

​    console.log(row);

  }

}

// 移动蛇

function moveSnake() {

  let head = { ...snake[0] };

  switch (direction) {

​    case 'up':

​      head.y--;

​      break;

​    case 'down':

​      head.y++;

​      break;

​    case 'left':

​      head.x--;

​      break;

​    case 'right':

​      head.x++;

​      break;

  }

  // 检查是否吃到食物

  if (head.x === food.x && head.y === food.y) {

​    // 生成新的食物

​    food = {

​      x: Math.floor(Math.random() * WIDTH),

​      y: Math.floor(Math.random() * HEIGHT)

​    };

  } else {

​    // 移除蛇尾

​    snake.pop();

  }

  // 检查是否撞到墙壁或自己

  if (head.x < 0 || head.x >= WIDTH || head.y < 0 || head.y >= HEIGHT ||

​    snake.some(segment => segment.x === head.x && segment.y === head.y)) {

​    console.log('Game Over!');

​    process.exit();

  }

  // 添加新的蛇头

  snake.unshift(head);

}

// 游戏循环

function gameLoop() {

  drawMap();

  moveSnake();

}

// 每隔 200 毫秒更新一次游戏状态

setInterval(gameLoop, 200);