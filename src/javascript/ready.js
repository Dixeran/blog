/**
 * Created by lenovo on 2017/6/25.
 */
$(document).ready(function () {
    var initList = 0;
    /*初始化视差*/
    $('.parallax').parallax();
    /*读取文章列表*/
    $.ajax({
        url:"./src/dist/passage/passageData.json",
        async:false,
        success:function (response) {
            var passageData = [];
            var JSONdata = response;
            for(var t = 0; t<JSONdata.PassageName.length; t++){
                app.passageName.push(JSONdata.PassageName[t]);
            }
            for(var k = 0; k<5 && k<JSONdata.PassageName.length; k++) {
                $.ajax({
                    url:'./src/dist/passage/' + JSONdata.PassageName[k][0] + '.md',
                    async:false,
                    success:function (data) {
                        passageData.push(markdown.toHTML(data));
                    }
                });
            }
            setTimeout(function () {
                for(var p = 0; p< 5 && p < JSONdata.PassageName.length; p++){
                    $('#' + JSONdata.PassageName[p][0] + 'conTent').html(passageData[p]);
                }
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
                $('h1').addClass('text-darken-1 blue-grey-text');
                $('.progress').remove();
            }, 1500);
        }
    });

    /*设置初始化目录*/
    $(window).scroll(function () {
        if(initList == 0){
            $('.scrollspy').scrollSpy();
            initList = 1;
        }
    });

    var elm = $('#catalog');
    var startPos = $(elm).offset().top;
    $.event.add(window, 'scroll', function () {
        var p = $(window).scrollTop();
        $(elm).css('position', ((p) > startPos) ? 'fixed' : 'static');
        $(elm).css('right', ((p) > startPos) ? '0px' : '');
        $(elm).css('top', ((p) > startPos) ? '75px' : '');
    });

    var PstartPos = $('#rePassage').offset().top;
    var Pin = 0;
    $.event.add(window, 'scroll', function () {
        var p = $(window).scrollTop();
        $('#locate').css('display', ((p) > PstartPos) ? 'inline' : 'none');
        if((p) > PstartPos && Pin == 0){
            var elm = $('#locate');
            elm.removeClass('animated flipOutX');
            elm.addClass('animated flipInX');
            Pin = 1;
        }
        if((p) < PstartPos && Pin == 1){
            var telm = $('#locate');
            telm.removeClass('animated flipInX');
            telm.addClass('animated flipOutX');
            Pin = 0;
        }
    });
});
