function clickLogic(){
    let elem = document.getElementsByClassName('css-4gtjqr-RadioWrapper e5i1odf1')[0];
    for(var i=0;i<elem.childNodes.length-1;i++){
        elem.childNodes[i].className = 'css-92dq4s'
    };
    elem.childNodes[elem.childNodes.length-1].className = 'css-os8bm0';

    function sortLogic(){
        var table = document.getElementsByClassName("topic-list-content__3Win")[0].childNodes[1];
        function exchangeElements(element1, element2)
        {
            var clonedElement1 = element1.cloneNode(true);
            var clonedElement2 = element2.cloneNode(true);

            element2.parentNode.replaceChild(clonedElement1, element2);
            element1.parentNode.replaceChild(clonedElement2, element1);

            return clonedElement1;
        }
        function isInt(value) {
            return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value));
        }
        function bblSort(){
            for(var i=0;i<table.childNodes.length;i++){
                for(var j=0;j<=table.childNodes.length-2;j++){
                    let var1 = table.childNodes[j]
                    let var2 = table.childNodes[j+1]
                    let val1 = parseInt(var1.childNodes[0].childNodes[2].childNodes[2].childNodes[1].outerText) || Infinity;
                    let val2 = parseInt(var2.childNodes[0].childNodes[2].childNodes[2].childNodes[1].outerText) || Infinity;
                    if(val1 > val2){
                        exchangeElements(var1,var2)
                    }
                }
            }
        }

        bblSort();
    }
    sortLogic();
}
