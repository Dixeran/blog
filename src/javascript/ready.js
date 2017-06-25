/**
 * Created by lenovo on 2017/6/25.
 */
function Editor(input, preview) {
    this.update = function () {
        preview.innerHTML = markdown.toHTML(input.value);
    };
    input.editor = this;
    this.update();
}


$(document).ready(function () {
    var initList = 0;
    $('.parallax').parallax();
    $('#cache').load('./src/dist/passage/passageData.json', function (data) {
        var passageData = [];
        var JSONdata = JSON.parse(data);
        for(var t = 0; t<JSONdata.PassageName.length; t++){
            app.passageName.push(JSONdata.PassageName[t]);
        }
        for(var k = 0; k<5 && k<JSONdata.PassageName.length; k++) {
            $('#cache').load('./src/dist/passage/' + JSONdata.PassageName[k] + '.txt', function (data) {
                passageData.push(markdown.toHTML(data));
            });
        }
        setTimeout(function () {
            for(var p = 0; p< 5 && p < JSONdata.PassageName.length; p++){
                $('#' + JSONdata.PassageName[p] + 'conTent').html(passageData[p]);
            }
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
            $('.progress').remove();
        }, 1000);
    });
    $(window).scroll(function () {
        if(initList == 0){
            $('.scrollspy').scrollSpy();
            initList = 1;
        }
    });
});

//$(JSONdata.PassageName[k] + 'conTent')