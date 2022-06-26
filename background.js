
function AddRatioHelper(currentTab,key) {

    let utilityMap = {
        "Discuss": discussRatio,
        "ProblemStats": likeDislikeRatio
    }[key]();
    
    // ----------------------------Utils---------------------------------

    function isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
    }

    function RatioConverter(value){
        let multi = 1;
        if(value.includes("K")){
            multi = 1000;
        }
        let numberPart = "";
        for(let i = 0;i<value.length;i++){
            if(isInt(value[i]) || value[i] == "."){
                numberPart+=value[i]
            }else{ break; }
        }
        return parseFloat(numberPart) * multi;
    }

    function calculateRatio(val1,val2){
        let ratio = val1/val2
        return ratio;
    }

    function calculatePercentage(val1,val2){
        return val1/(val1+val2) * 100;
    }

    function createRatioDiv(divTemplate,value,float=false){
        var Ratio = (float)? value:parseInt(value);
        RatioDiv = divTemplate[0]+Ratio+divTemplate[1];
        return RatioDiv;
    }

    function createClass(name,rules){
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        if(!(style.sheet||{}).insertRule) 
            (style.styleSheet || style.sheet).addRule(name, rules);
        else
            style.sheet.insertRule(name+"{"+rules+"}",0);
    }

    function applyClass(name,element,doRemove){
        if(typeof element.valueOf() == "string"){
            element = document.getElementById(element);
        }
        if(!element) return;
        if(doRemove){
            element.className = element.className.replace(new RegExp("\\b" + name + "\\b","g"));
        }else{      
            element.className = element.className + " " + name;
        }
    }

    //  ----------------------------------------------------------------

    //                      Discuss Page Ratio

    //  ----------------------------------------------------------------

    function discussRatio(){
        let table = document.getElementsByClassName("wrapper__Fm3q");

        let discussRatioDivTemplate = ['<div class="icon-wrapper__3uKf"><svg viewBox="0 0 24 24"\
        width="1em" height="1em" class="icon__1Md2 icon__3CsQ"><path fill-rule="evenodd" d="M2 17L12 7l10 10z"></path></svg><div class="no__1erK">\
        ','</div></div>']

        for (var row in table) {
            if (isInt(row)){
                Ratio = calculateRatio(
                    RatioConverter(table[row].childNodes[1].outerText),
                    RatioConverter(table[row].childNodes[0].outerText)
                )
                if(table[row].childNodes.length<3){
                    table[row].innerHTML+=createRatioDiv(discussRatioDivTemplate,Ratio);
                }else{
                    table[row].childNodes[2].textContent = parseInt(Ratio);
                }
                console.log(table[row])
            }
            else{
                break;
            }
        }

        function sortRatioHelper(){
            let arrange = document.getElementsByClassName("css-4gtjqr-RadioWrapper e5i1odf1");

            const nullthrows = (v) => {
                if (v == null) throw new Error("it's a null");
                return v;
            }
            
            function injectCode(src) {
                const script = document.createElement('script');
                script.src = src;
                script.onload = function() {
                    console.log("script injected");
                    this.remove();
                };
                nullthrows(document.head || document.documentElement).appendChild(script);
            }

            injectCode(chrome.runtime.getURL('/clickLogic.js'));
            
            let url = currentTab.url;
            let orderByIndex = url.indexOf('orderBy');
            let afterStartIndex = -1;
            for(let i=orderByIndex+8;i<url.length;i++){
                if(url[i]=="&"){afterStartIndex = i}
            }
            let beforeUrl = url.slice(0,orderByIndex+8);afterUrl = url.slice(afterStartIndex,url.length);

            console.log(beforeUrl,afterUrl);

            if(arrange[0].childNodes.length<4 || arrange[0].childNodes.length<(4 +((arrange[0].childNodes[3].outerText == "Most Relevant")? 1:0))){
                arrange[0].innerHTML+='<label class="css-92dq4s" onclick="clickLogic()">\
    <input type="checkbox" class="css-o6r3zy-Input e5i1odf0" checked="">\
    Best Ratio</label>'

                arrange[0].childNodes[0].onclick = function () {
                    location.href = beforeUrl + "hot" + afterUrl;
                };
                arrange[0].childNodes[1].onclick = function () {
                    location.href = beforeUrl + "newest_to_oldest" + afterUrl;
                };
                arrange[0].childNodes[2].onclick = function () {
                    location.href = beforeUrl + "most_votes" + afterUrl;
                };

                if(arrange[0].childNodes[3].outerText == "Most Relevant"){
                    arrange[0].childNodes[3].onclick = function () {
                        location.href = beforeUrl + "most_relevant" + afterUrl;
                    };
                }
            }

        }

        sortRatioHelper();
    }

    //  ----------------------------------------------------------------

    //      Problem Page Like:Dislike Ratio and Like Percentage

    //  ----------------------------------------------------------------
    
    function likeDislikeRatio(){
        let problemStats = document.getElementsByClassName("css-10o4wqw")[0]
        let submissionStats = document.getElementsByClassName("css-jkjiwi")

        if(!problemStats || !submissionStats){ return; }

        let likeCount = parseInt(document.getElementsByClassName("btn__r7r7")[0].innerText)
        let dislikeCount = parseInt(document.getElementsByClassName("btn__r7r7")[1].innerText)

        let accepted = parseInt((submissionStats[0].innerText).replace(/,/g,""))
        let submissions = parseInt((submissionStats[1].innerText).replace(/,/g,""))

        let calculatedAcceptanceRate = (accepted/submissions * 100).toFixed(1)
        let calculatedPercentage = calculatePercentage(likeCount,dislikeCount).toFixed(1)

        let acceptancePosition = 1; let likePercentagePostion = 4;

        let AcceptanceRatioDivTemplate = ARdivTemplate = [
            "<div id=\"ratio\" class=\"css-1rdgofi\">",
            "</div>"
        ]
        let likePercentageDivTemplate = LPdivTemplate = [
            "<div id=\"percentage\" class=\"css-1rdgofi\">",
            " %</div>"
        ]

        createClass(
            ".goodFont",
            "font-weight: bold;"
        )

        let colorMap = [
            {key: 20,value: [".dri-color","color: #e62d2d;"]},
            {key: 40,value: [".lri-color","color: #e25b00;"]},
            {key: 60,value: [".oi-color","color: #d18100;"]},
            {key: 80,value: [".yi-color","color: #b3a300;"]},
            {key: 90,value: [".lgi-color","color: #85c000;"]},
            {key: 100,value: [".bgi-color","color: #21da29;"]}
        ]
        
        function addStats(){
            const acceptanceRateDiv = document.createElement("div")
            acceptanceRateDiv.id = "acceptance"
            acceptanceRateDiv.classList.add("css-dcmtd5")
            acceptanceRateDiv.innerHTML = calculatedAcceptanceRate+ " %"
            problemStats.insertBefore(acceptanceRateDiv, problemStats.children[acceptancePosition]) 
            
            const likePercentageDiv = document.createElement("div")
            likePercentageDiv.id = "like-percentage"
            likePercentageDiv.classList.add("css-dcmtd5")
            likePercentageDiv.innerHTML = calculatedPercentage+ " %"
            problemStats.insertBefore(likePercentageDiv, problemStats.children[likePercentagePostion]) 
        }

        function editStats(){
            problemStats.childNodes[1].innerHTML = (accepted/submissions * 100).toFixed(1) + " %"
            problemStats.childNodes[4].innerHTML = calculatePercentage(likeCount,dislikeCount).toFixed(1) + " %"
        }

        if(accepted>=100 && likeCount>=100){
            if(problemStats.childNodes.length<7){ addStats(); } else { editStats(); }
        }

        for (let entry of colorMap) {
            if (calculatedAcceptanceRate < (entry["key"]-1)){
                if(!(document.getElementById("acceptance").classList.contains(entry["value"][0]))){
                    createClass(...entry["value"])
                    applyClass(entry["value"][0].slice(1), "acceptance")
                    applyClass("goodFont", "acceptance")
                }
                break;
            }
        }

        for (let entry of colorMap) {
            if (calculatedPercentage < (entry["key"]-1)){
                if(!(document.getElementById("like-percentage").classList.contains(entry["value"][0]))){
                    createClass(...entry["value"])
                    applyClass(entry["value"][0].slice(1), "like-percentage")
                    applyClass("goodFont", "like-percentage")
                }
                break;
            }
        }

    }

}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let currentTab = tabs[0];
    AddRatio(currentTab)
});

function AddRatio(currentTab) {
    let url = currentTab.url;
    let tabId = currentTab.id;
    console.log(currentTab)
    if(url.includes("https://leetcode.com")){
        if(url.includes("/problems/")){
            if(url.includes("/discuss")){
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tabId},
                      func: AddRatioHelper,
                      args: [currentTab,"Discuss"]
                    },
                () => {  });
            }
            else{
                chrome.scripting.executeScript(
                    {
                      target: {tabId: tabId},
                      func: AddRatioHelper,
                      args: [currentTab,"ProblemStats"]
                    },
                () => {  });
            }
        }
    }
}

// 0-20 - dark red - worst pls skip
// 20-40 - reddish-orange - bad
// 40-60 - orange - not good 
// 60-80 - yellow - average
// 80-90 - l green - good
// 90-100 - green - very good