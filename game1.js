var myGamePiece;
var mywidth=1024;
var myheight=768;

function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    mycenter = new center(30, 30, "red", 225, 225);
    myGameArea.start();
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = mywidth;
        this.canvas.height = myheight;
        this.mouse=[]
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('mousemove', function (e) {
            
            myGameArea.mouse[0] = e.offsetX;
            myGameArea.mouse[1] = e.offsetY;
        })
        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    tempp=.5 * Math.PI
    this.size=1
    this.update = function() {
        ctx = myGameArea.context;
        //ctx.save();
        //ctx.translate(this.x, this.y);
        //ctx.rotate(this.angle);
        //ctx.fillStyle = color;
        //ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        //ctx.restore();

        ctx.save();
        ctx.beginPath();
        distanceCenterX=this.x-mywidth/2
        distanceCenterY=this.y-myheight/2
        myAngle=Math.atan2(distanceCenterX,distanceCenterY)*-1
        myAngle=myAngle+Math.PI/2
        ctx.arc(mywidth/2, myheight/2, 100, myAngle-this.size/2, myAngle+this.size/2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.restore();
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
        this.x = myGameArea.mouse[0];
        this.y = myGameArea.mouse[1];
    }
}

function center(width, height, color, x, y, type) {
    console.log("entrei")
    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "rgb(255 255 255 / 100%)";
        ctx.arc(mywidth/2, myheight/2, 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -1; }
    myGamePiece.newPos();
    myGamePiece.update();
    mycenter.update();
}
