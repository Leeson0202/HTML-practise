// 改变状态栏
function headInit() {

    let info = isLoad();
    console.log(info)

    let a = $("#head-my")

    if (info['code'] == 200) {
        // console.log(nName, info['data']['nName']);
        // 登录 --》 我的
        $("#head-my").text(info['data']['nName'])
    } else {
        $(".dropdown").hover(function() {
            $(".dropdown-content").css("display", "none");
        })
        $(".dropdown").click(function() {
            window.open("login", "_self");
        })
    }
    // 事件监听
    headAction();
}

function headAction() {
    // 搜索

    $("#search-coin").click(function() {
        player['iframe'].src = "search.html"
    });
    // 历史记录

    // 信息
    // 设置

    // 退出登录
    $("#head-my-unlogin").click(function() {
        $.post("user/deleteTLoad", {
            appId: user['appId'],
            msg: user['msg']
        }, function(resoult) {
            if (resoult.code == 200) {
                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = "appId" + "=v; expires=" + date.toGMTString();
                document.cookie = "msg" + "=v; expires=" + date.toGMTString();
                document.cookie = "nName" + "=v; expires=" + date.toGMTString();
                if (window.location.pathname == "/index" || window.location.pathname == "/index.html") {
                    window.open("login", "_self");
                }
            }
        });
    });
}