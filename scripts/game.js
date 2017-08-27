
var Game = function Game(level, ctx, canvas) {
    this.ball = new Ball(ctx, canvas, level);
    this.paddleL = new Paddle(ctx, canvas, 'left');
    this.paddleR = new Paddle(ctx, canvas, 'right');

    this.canvas = canvas;
    this.reset();
};

Game.prototype.reset = function(level) {
    this.level = level;
    var that = this;
    this.interval = setInterval( function() {
        that.canvas.width = that.canvas.width;
        that.ball.frame();
        that.paddleR.frame(that.ball.position()[1]);
        that.paddleL.frame(that.ball.position()[1]);
    }, 20);
};


var Paddle = function Paddle(ctx, canvas, side) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.w = canvas.width;
    this.h = canvas.height;
    this.paddleWidth = parseInt(this.w/100, 10);
    this.paddleHeight = parseInt(this.h/8, 10);
    if (side === 'left') {
        this.x = 0;
    } else {
        this.x = this.w-this.paddleWidth;
    }
    this.y = this.h/2-this.paddleHeight/2;
    this.draw();
};

Paddle.prototype.frame = function(y) {
    if (y) { this.y = y-this.paddleHeight/2; }
    this.draw();
};

Paddle.prototype.draw = function() {
    this.ctx.fillStyle = 'rgb(200,200,200)';
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.paddleWidth, this.paddleHeight);
    this.ctx.fill();
};


var Ball = function Ball(ctx, canvas, level) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.w = canvas.width;
    this.h = canvas.height;
    this.vx = 1;
    this.vy = 0.5;
    this.x = 0;
    this.y = 0;
    this.r = 4;
    this.level = level || 1;
    this.interval = null;
    this.reset(this.level);
};

Ball.prototype.position = function() {
    return [ this.x, this.y ];
};

Ball.prototype.frame = function() {
    var newX = this.x + this.vx;
    if (newX > this.w-this.r || newX < this.r) {
        this.vx *= -1;
        this.vy = 8*(Math.random()-0.5);
        newX = this.x + this.vx;
    }

    var newY = this.y + this.vy;
    if (newY > this.h-this.r || newY < this.r) {
        this.vy *= -1;
        newY = this.y + this.vy;
    }
    this.x = newX;
    this.y = newY;
    this.draw();
};

Ball.prototype.reset = function(level) {
    this.x = this.w/2;
    this.y = this.h/2;
    this.vx = (Math.random() > 0.5) ? 1*this.level : -1*this.level;
    this.vy = (Math.random()-0.5);
};

Ball.prototype.draw = function() {
    // Draw center line
    this.ctx.strokeStyle = 'rgb(50, 50, 50)';
    this.ctx.beginPath();
    this.ctx.moveTo(this.w/2, 0);
    this.ctx.lineTo(this.w/2, this.h);
    this.ctx.stroke();

    // Draw ball
    this.ctx.fillStyle = 'rgb(200,200,200)';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0 , 2 * Math.PI, false);
    this.ctx.fill();
};
