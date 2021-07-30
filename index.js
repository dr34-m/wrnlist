var wrnList = [
	{ "id": 1, "deviceType": "3", "content": "pressure过高", "createTime": "2020-10-20 13:34:05", "areaName": "某某区1"},
	{ "id": 2, "deviceType": "4", "content": "tds过低", "createTime": "2020-10-20 13:04:44", "areaName": "某某区2"},
	{ "id": 3, "deviceType": "4", "content": "tds过低", "createTime": "2020-10-20 13:04:44", "areaName": "某某区3"},
	{ "id": 4, "deviceType": "4", "content": "tds过低", "createTime": "2020-10-20 13:04:44", "areaName": "某某区4"},
	{ "id": 5, "deviceType": "3", "content": "pressure过高", "createTime": "2020-10-20 13:04:05", "areaName": "某某区5"},
	{ "id": 6, "deviceType": "3", "content": "pressure过低", "createTime": "2020-10-20 12:34:05", "areaName": "某某区6"}];
var timer = 0;
mouseLeave();

// 翻滚
function autoScroll() {
	var dom = $("#wrnList");
	dom.css('margin-top', '-56px');
	dom.addClass('anim');
	// 第三行变第二行
	var child3 = $(".child_3");
	// child3.removeClass('child_3');
	// child3.addClass('child_2');
	child3.css('padding', '0 40px');
	child3.css('opacity', '0.6');
	child3.css('height', '46px');
	child3.css('width', 'calc(302px - 80px)');
	child3.css('background-image', "url('./img/wrn/small.png')");
	child3.css('background-size', '302px auto');
	child3.addClass('anim');
	// 第四行变第三行
	var child4 = $(".child_4");
	// child4.removeClass('child_4');
	// child4.addClass('child_3');
	child4.css('padding', '0 50px');
	child4.css('opacity', '1');
	child4.css('height', '58px');
	child4.css('width', 'calc(416px - 100px)');
	child4.css('background-image', "url('./img/wrn/big.png')");
	child4.css('background-size', '416px auto');
	child4.addClass('anim');
	// 第五行变第四行
	var child5 = $(".child_5");
	child5.css('opacity', '0.6');
	child5.addClass('anim');
	// 第二行变第一行
	var child2 = $(".child_2");
	child2.css('opacity', '0.3');
	child2.addClass('anim');
	var that = this;
	setTimeout(function () {
		that.wrnList.push(that.wrnList[0]);
		that.wrnList.shift();
		that.insertWrn();
		dom.css('margin-top', '0px');
		dom.removeClass('anim');
		child3.removeClass('anim');
		child4.removeClass('anim');
		child5.removeClass('anim');
		child2.removeClass('anim');
	}, 400);
}

// 插数据方法
function insertWrn() {
	var hl = '';
	var wrnType = '';
	for (var i in wrnList) {
		if (i > 6) {
			break;
		}
		if (wrnList[i].deviceType == 4 || wrnList[i].deviceType == 5) {
			wrnType = '用水报警';
		} else if (wrnList[i].deviceType == 2 || wrnList[i].deviceType == 3 || wrnList[i].deviceType == 7) {
			wrnType = '管网报警';
		} else if (wrnList[i].deviceType == 6) {
			wrnType = '用电报警';
		} else if (wrnList[i].deviceType == 1) {
			wrnType = '空气报警';
		} else {
			wrnType = '未知报警';
		}
		hl += `<div class="wrnItem child_${parseInt(i) + 1}"><div class="wrnItemTime">${wrnList[i].areaName} ${wrnList[i].content} ${wrnType} ${wrnList[i].createTime}</div></div>`;
	}
	$("#wrnList").html(hl);
}

// 告警列表点击事件
function clickList(event) {
	var itemId = wrnList[2].id;
	var e = event || window.event;
	var winWidth = window.innerWidth;
	// console.log("winWidth", winWidth);
	let x = e.clientX;
	let y = e.clientY;
	// console.log("x", x);
	// console.log("y", y);
	let right_margin = winWidth - x;
	let top_margin = y;
	// console.log("right_margin",right_margin);
	// console.log("top_margin",top_margin);
	if (top_margin <= 285 && top_margin >= 256) {
		if (right_margin >= 153 && right_margin <= 223) {
			// console.log("发起工单");
			// addWorkOrder(itemId);
			alert("发起工单" + itemId);
		} else if (right_margin > 223 && right_margin <= 394) {
			// console.log("忽略");
			// ignoreWarning(itemId);
			alert("误报" + itemId);
		}
	}
	// console.log("i", i);
	// console.log("itemId", itemId);

}

// 鼠标移入
function mouseEnter() {
	// console.log("mouseEnter");
	if (timer != 0) {
		clearInterval(timer);
	}
	var child = $(".child_3");
	child.css('padding-bottom', '34px');
	child.css('background-image', "url('./img/wrn/big_on.png')");
}

// 鼠标离开
function mouseLeave() {
	insertWrn();
	if (wrnList.length > 3) {
		timer = setInterval(autoScroll, 1800);
	}
}