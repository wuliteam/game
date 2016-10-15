/**
 * @author Administrator
 */
// a = [
		// [2, 2, 4, 2], 
		// [4, 32, 2, 8], 
		// [2, 4, 16, 4], 
		// [4, 2, 4, 2]
// ];

a = [
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0]
];

var score = 0;

function compress(col, UpDown, LeftRight, ckORct) {
	var ZeroNum = 0;
	for (var j = 0; j < 4; j++) {
		var num = 0;
		for (var i = 0; i < 4; i++) {
			var indexRow1 = ((2 * i - 3) * UpDown + 3 - i) * col + (1 - col) * j;
			var indexCol1 = ((2 * i - 3) * LeftRight + 3 - i) * (1 - col) + col * j;
			if (a[indexRow1][indexCol1] == 0) {
				num++;
				if (!ckORct) {
					ZeroNum++;
				}
			} else {
				if (num != 0) {
					a[indexRow1+col*num*(-2*UpDown+1)][indexCol1 + (1 - col) * num * (-2 * LeftRight + 1)] = a[indexRow1][indexCol1];
					a[indexRow1][indexCol1] = 0;
					if (ckORct && ZeroNum != -1) {
						ZeroNum = -1;
					}
				}
			}
		}
	}
	return ZeroNum;
}

//测试可用
function operation(col, UpDown, LeftRight, ckORdone) {
	var noEqual = true;
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 3; i++) {
			var indexRow1 = ((2 * i - 3) * UpDown + 3 - i) * col + (1 - col) * j;
			var indexCol1 = ((2 * i - 3) * LeftRight + 3 - i) * (1 - col) + col * j;

			var indexRow2 = ((2 * i - 1) * UpDown + 2 - i) * col + (1 - col) * j;
			var indexCol2 = ((2 * i - 1) * LeftRight + 2 - i) * (1 - col) + col * j;

			if (a[indexRow1][indexCol1] == a[indexRow2][indexCol2]) {
				if (a[indexRow1][indexCol1] == 0) {
					continue;
				}
				noEqual = false;
				if(!ckORdone){
					a[indexRow1][indexCol1] *= 2;
					a[indexRow2][indexCol2] = 0;
					score = score + a[indexRow1][indexCol1];
					if(a[indexRow1][indexCol1] == 2048){
						$(".ui-content h2").text('分数:'+score);
						$("#pop").click();
					}
					i++;
				}
			}
		}
	}
	return noEqual;
}

//测试可用
function chooseNum() {
	if (Math.random() >= 0.3) {
		return 2;
	} else {
		return 4;
	}
}

//测试可用
function choosePos(zeroNum) {
	return Math.round(Math.random() * zeroNum);
}

function randomNum(zeroNum) {
	var pos = choosePos(zeroNum-1);
	var num = chooseNum();
	var curPos = 0;
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			if (a[j][i] == 0) {
				if (curPos == pos) {
					a[j][i] = num;
				}
				curPos++;
			}
		}
	}
}

function control(col, UpDown, LeftRight) {
	if (-1 != compress(col, UpDown, LeftRight, true)) {//不能压缩
		if (operation(col, UpDown, LeftRight, false)) {//不能加和
			return;
		} else {										//能加和
			var zeroNum = compress(col, UpDown, LeftRight, false);//获取0个数
			randomNum(zeroNum);
		}
	} else {
		operation(col, UpDown, LeftRight,false);
		var zeroNum = compress(col, UpDown, LeftRight, false);
		randomNum(zeroNum);
	}
}

function showNum() {
	var index = 0;
	for (var row in a) {
		for (var col in a[row]) {
			var num = a[row][col];
			if (num == 0) {
				index++;
				continue;
			}
			$(".pane li div:eq(" + (index++) + ")").text(num).attr("id", "num"+num);
		}
	}
}

function clearNum() {
	var index = 0;
	for (var row in a) {
		for (var col in a[row]) {
			$(".pane div:eq(" + (index++) + ")").text(" ").attr("id", " ");
		}
	}
}

function start(){
	var num1 = chooseNum();
	var num2 = chooseNum();
	var pos1 = choosePos(15);
	var pos2 = choosePos(15);
	while(pos1==pos2){
		pos2 = choosePos(15);
	}
	a[Math.floor(pos1/4)][pos1-Math.floor(pos1/4)*4] = num1;
	a[Math.floor(pos2/4)][pos2-Math.floor(pos2/4)*4] = num2;
}
function haveZero(){
	for (var row in a) {
		for (var col in a[row]) {
			if (a[row][col] == 0) {
				return true;
			}
		}
	}
	return false;
}

function check(){
	if(haveZero()){
		return false;
	}else{
		if(operation(true, true, false,true)&&operation(true, false, false,true)&&operation(false, false, true,true)&&operation(false, false, false,true)){
			$(".ui-content h2").text('分数:'+score);
			$("#pop").click();
		}
	}
}
function deleteNum(){
	a = [
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0], 
		[0, 0, 0, 0]
];
}
