var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

var circleArr=[[],[],[],[],[]];
var currentCat;

var paths = [[]];

function circleClicked(event){
	if(event.target.getCircleType()!=Circle.TYPE_UNSELECTED){
		return;
	}
	event.target.setCircleType(Circle.TYPE_SELECTED);
	if(currentCat.indexX == 0 || currentCat.indexX ==circleArr.length-1
			|| currentCat.indexY == 0 || currentCat.indexY == circleArr.length-1){
		alert("game over!You lose!");
		return;
	}
	
	var depth = 0;
	paths = [[]];
	findPath(currentCat,paths[0],depth);

	var str = "";
	for(var j=0;j<paths.length;j++){
		for(var i=0;i<paths[j].length;i++){
			str = str + paths[j][i].indexX+","+paths[j][i].indexY+"   "; 
		}
		str+="\n-----\n";
	}
	console.log(str);
}



function findPath(circle,path,depth){
	depth++;
	path.push(circle);
	if(circle.visited){
		paths.pop();
		return;
	}
	circle.visited = true;
	if(circle.indexX == 0 || circle.indexX ==circleArr.length-1
			|| circle.indexY == 0 || circle.indexY == circleArr.length-1){
		return;
	}
	var leftCircle = circleArr[circle.indexX-1][circle.indexY];
	var rightCircle = circleArr[circle.indexX+1][circle.indexY];
	var leftTopCircle = circleArr[circle.indexX-1][circle.indexY-1];
	var rightTopCircle = circleArr[circle.indexX][circle.indexY-1];
	var leftBottomCircle = circleArr[circle.indexX-1][circle.indexY+1];
	var rightBottomCircle = circleArr[circle.indexX][circle.indexY+1];
	if(circle.indexY%2){
		leftTopCircle = circleArr[circle.indexX][circle.indexY-1];
		rightTopCircle = circleArr[circle.indexX+1][circle.indexY-1];
		leftBottomCircle = circleArr[circle.indexX][circle.indexY+1];
		rightBottomCircle = circleArr[circle.indexX+1][circle.indexY+1];
	}
	
	if(leftCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		findPath(leftCircle,path,depth);
	}else{
		paths.pop();
	}
	
	if(leftTopCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		path = path.slice(0);
		var size = path.length;
		if(size>depth){
			for(var i=0;i<size;i++){
				path.pop();
				if(path.length == depth){break;}
			}
		}
		paths.push(path);
		findPath(leftTopCircle,path,depth);
	}else{
		paths.pop();
	}

	if(rightTopCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		path = path.slice(0);
		var size = path.length;
		if(size>depth){
			for(var i=0;i<size;i++){
				path.pop();
				if(path.length == depth){break;}
			}
		}
		paths.push(path);
		findPath(rightTopCircle,path,depth);
	}else{
		paths.pop();
	}

	if(rightCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		path = path.slice(0);
		var size = path.length;
		if(size>depth){
			for(var i=0;i<size;i++){
				path.pop();
				if(path.length == depth){break;}
			}
		}
		paths.push(path);
		findPath(rightCircle,path,depth);
	}else{
		paths.pop();
	}
	
	if(rightBottomCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		path = path.slice(0);
		var size = path.length;
		if(size>depth){
			for(var i=0;i<size;i++){
				path.pop();
				if(path.length == depth){break;}
			}
		}
		paths.push(path);
		findPath(rightBottomCircle,path,depth);
	}else{
		paths.pop();
	}
	
	if(leftBottomCircle.getCircleType()==Circle.TYPE_UNSELECTED){
		path = path.slice(0);
		var size = path.length;
		if(size>depth){
			for(var i=0;i<size;i++){
				path.pop();
				if(path.length == depth){break;}
			}
		}
		paths.push(path);
		findPath(leftBottomCircle,path,depth);
	}
	
}

function addCircles(){
	for(var indexY=0;indexY<circleArr.length;indexY++){
		for(var indexX=0;indexX<circleArr.length;indexX++){
			var c = new Circle();
			gameView.addChild(c);
			circleArr[indexX][indexY] = c;
			c.indexX = indexX;
			c.indexY = indexY;
			c.x = indexY%2?indexX*55+25:indexX*55;
			c.y = indexY*55;
			var center = parseInt(circleArr.length/2);
			console.log(center);
			if(indexX==center && indexY==center){
				c.setCircleType(Circle.TYPE_CAT);
				currentCat = c;
			}
//			else if(Math.random()<0.1){
//				c.setCircleType(Circle.TYPE_SELECTED);
//			}
			c.addEventListener("click",circleClicked);
		}
	}
	
//	circleArr[0][1].setCircleType(Circle.TYPE_SELECTED);
//	circleArr[0][2].setCircleType(Circle.TYPE_SELECTED);
}

addCircles();

