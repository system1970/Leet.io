
function AddRatioHelper(currentTab) {
    let table = document.getElementsByClassName("wrapper__Fm3q");
    console.log(table)
    function isInt(value) {
        return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
    }
    function createRatioDiv(value){
        var Ratio = parseInt(value);
        RatioDiv = '<div class="icon-wrapper__3uKf"><svg viewBox="0 0 24 24"\
 width="1em" height="1em" class="icon__1Md2 icon__3CsQ"><path fill-rule="evenodd" d="M2 17L12 7l10 10z"></path></svg><div class="no__1erK">\
 '+Ratio+'</div></div>';
        return RatioDiv;
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
    for (var row in table) {
        if (isInt(row)){
            Ratio = RatioConverter(table[row].childNodes[1].outerText)/RatioConverter(table[row].childNodes[0].outerText)
            console.log(RatioConverter(table[row].childNodes[1].outerText),RatioConverter(table[row].childNodes[0].outerText))
            if(table[row].childNodes.length<3){
                table[row].innerHTML+=createRatioDiv(Ratio);
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
        } else{ console.log("WHAT WHY?!")}

    }
    sortRatioHelper();
}

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let currentTab = tabs[0];
    AddRatio(currentTab)
});

function AddRatio(currentTab) {
    let url = currentTab.url;
    let tabId = currentTab.id;
    console.log(currentTab)
    if(url.includes("https://leetcode.com/problems/") && url.includes("/discuss/")){
        console.log("HERE?")
        chrome.scripting.executeScript(
            {
              target: {tabId: tabId},
              func: AddRatioHelper,
              args: [currentTab]
            },
        () => {  });
    }
    console.log("??REach")
}
