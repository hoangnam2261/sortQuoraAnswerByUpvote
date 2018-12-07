function loading (loaded, total){
	if (loaded>=total){
		return 99
	} else {
		return Math.floor((loaded / total) * 100);
	}	
}

function GetAnswerBoxes()
{
    let answerBoxHolder = $(".paged_list_wrapper");
    return answerBoxHolder.children().filter(function() { return $(this).find(".Answer:not(.ActionBar)").length >= 1; }).get();
}

function ShowAllAnswers()
{	
	let totalAnswersTxt = $(".answer_count").contents().filter(function() {
							return this.nodeType == 3;
						}).text();
	let totalAnswers = parseInt($(".answer_count")[0].innerHTML);
	if (totalAnswersTxt.includes("+")){
		totalAnswers = totalAnswers*2;
	}
	let answerBoxHolder = $(".paged_list_wrapper");
	let answerBoxHolderOutter = $(".UnifiedAnswerPagedList.PagedListFoo");

	let progress = $(".answer_count").parent();
	let progressParent = $(".answer_count").parent().parent();
	
	progress.appendTo(answerBoxHolderOutter);
	let prevShownCount = 0;
	let stopCheck = 100;
	let prevLoaded =0;
	let dot = 1;
	let dotMap = {
		0:"\u00A0\u00A0\u00A0",
		1:".\u00A0\u00A0",
		2:".\u00A0\u00A0",
		3:".\u00A0\u00A0",
		4:"..\u00A0",
		5:"..\u00A0",
		6:"..\u00A0",
		7:"...",
		8:"...",
		9:"...",		
	}
	let loadingComplete = function()
	{
		$(".answer_count").contents().filter(function() {
            return this.nodeType == 3;
        }).replaceWith(totalAnswersTxt);
		return;
	};
	let nextCheck = function()
	{
		window.scrollTo(0,document.body.scrollHeight);
		let shownCount = self.GetAnswerBoxes().length;
		let loaded = loading(shownCount, totalAnswers);

		if (loaded < prevLoaded){
			loaded = prevLoaded;
		}
		prevLoaded = loaded;
		dot = (dot+1)%10;
		$(".answer_count").contents().filter(function() {
            return this.nodeType == 3;
        }).replaceWith(totalAnswersTxt + " "+ loaded.toFixed(1) +"% Loaded"+dotMap[dot]);
		
		if (prevShownCount==shownCount){
			stopCheck--;
		} else {
			stopCheck=80;
		}

		if (shownCount < totalAnswers*0.8 && (shownCount<totalAnswers*0.4||!totalAnswersTxt.includes("+"))) {
			prevShownCount = shownCount;
			setTimeout(nextCheck, 100);
		} else if (stopCheck>0){
			if (shownCount>totalAnswers*0.9 && totalAnswersTxt.includes("+")){
				totalAnswers = totalAnswers+shownCount-prevShownCount;
			}
			prevShownCount = shownCount;
			setTimeout(nextCheck, 100);
		}else
		{	
			setTimeout(loadingComplete, 1000);
			$(".answer_count").contents().filter(function() {
				return this.nodeType == 3;
			}).replaceWith(totalAnswersTxt + " 100% Loaded");
			
			//loaderDiv.appendTo(answerBoxHolderOutter);
			//tempHolder.remove();
			progress.appendTo(progressParent);
			document.getElementsByClassName('QuestionPageAnswerHeader')[0].scrollIntoView( true );
			window.scrollBy(0,-62);
			return;
		}
	};
	nextCheck();
	totalAnswers = parseInt($(".answer_count")[0].innerHTML);
	if (totalAnswersTxt.includes("+")){
		totalAnswers = totalAnswers*2;
	}
	return;
}
document.getElementsByClassName('QuestionPageAnswerHeader')[0].scrollIntoView( true );
window.scrollBy(0,-62);
ShowAllAnswers();




