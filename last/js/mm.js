function start() {
    $(".bodyContext").css("height", $("body").height() + "px");
    lunbo();
    fixedShow();
}

function lunbo() {
    var pos = 0;
    var len = $("#center-text img").length;
    setInterval(function() {
        $("#center-text img:eq(" + pos + ")").fadeOut(1500);
        if (pos == len - 1) {
            pos = 0;
        } else {
            pos += 1;
        }
        $("#center-text img:eq(" + pos + ")").fadeIn(1500);
    }, 5000);
}

function fixedShow() {

    $("*").unbind(); // 取消所有事件绑定
    // 添加监听事件
    $("#show > div.show-content > div").bind('click', function() {
        // console.log($(this)[0].innerHTML);

        // 获取 bodyContext 全部元素信息
        let bodyContext = $('.bodyContext')[0];
        $('.bodyContext').remove();
        // console.log(bodyContext);
        let showStr = '  <div id="fixed-show">\
            <div id="deleteDiv" style="height: 10%;">\
                <img id="cancel" draggable="false" src="img//icon/delete.png">\
            </div style="height:90%;">\
            <div id="show-img"></div>\
        </div>'

        $('body').append(showStr);
        $('body').css('background', '#ccc');


        // 复制 图片信息
        let showImg = $('#show-img')[0];
        showImg.innerHTML = $(this)[0].innerHTML;

        $("#cancel").bind("click", function() {
            console.log('cancel');
            $('#fixed-show').remove();
            $('body')[0].append(bodyContext);
            $('body').css('background', '#fff');
            fixedShow() // 重新绑定事件
        })
    });
}