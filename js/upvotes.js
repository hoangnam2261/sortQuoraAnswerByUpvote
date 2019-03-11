function removeK(num){
	if (typeof num != "string"){
		return num
	}
	if (num.includes("k")){
		return parseFloat(num.replace("k",""))*1000;
	} else if (num.includes("m")){
		return parseFloat(num.replace("m",""))*1000000;
	} else {
		return parseFloat(num);
	}	
}
function removePlus(num){
	if (num==null){
		return 0;
	}
	if (num.includes("+")){
		return removeK(num.replace("+",""));
	} else {
		return removeK(num);
	}	
}

function getAnswerCount(answer) {
	var upvoteBar = $(answer).find('.ui_button_label_count_wrapper')[0];
	if (upvoteBar == null) {
		return -1
	}
	if ($(upvoteBar).find('.ui_button_count_inner')[0] != null) {
		return $(upvoteBar).find('.ui_button_count_inner')[0].innerHTML;
	} else if ($(upvoteBar).find('.ui_button_count_optimistic_count:not(.hidden)')[0] != null){
		return $(upvoteBar).find('.ui_button_count_optimistic_count:not(.hidden)')[0].innerHTML;
	} else {
		return -1;
	}
}


var answerListOutter = document.getElementsByClassName('UnifiedAnswerPagedList PagedListFoo unified')[1];
var answerList = answerListOutter.getElementsByClassName('paged_list_wrapper')[0];

//removed collapsed answers
var collapsedList;
if (typeof(answerList.getElementsByClassName('CollapsedAnswersSectionCollapsed')[0]) != 'undefined')
{
	collapsedList = answerList.getElementsByClassName('CollapsedAnswersSectionCollapsed')[0].parentNode.parentNode.parentNode;
	collapsedList.parentNode.removeChild(collapsedList);
}
//main

var answers = Array.prototype.slice.call(answerList.children,0);

//remove all advertising
answers = answers.reduce((p, c) => (removeK(getAnswerCount(c)) >= 0 && p.push(c),p),[]);

//sorted by upvotes
var sortedList = answers.sort(function(a,b){
	if ((a.getElementsByClassName('ui_button_count')[0] != null
			&& b.getElementsByClassName('ui_button_count')[0] != null
			&& (removeK(getAnswerCount(a)) > removeK(getAnswerCount(b)))
		)
	){
		return -1;
	} else {
		return 1;
	}	
});

answerList.innerHTML = "";

//by upvotes: REMOVED DUE TO QUORA REMOVAL OF PAGE LIST HIDDEN ITEMS
 for (var i=0;i<sortedList.length;i++){
 	answerList.appendChild(sortedList[i]);
 }

 if (collapsedList!=null){
	answerList.appendChild(collapsedList);
}

window.scrollBy(0,-62);