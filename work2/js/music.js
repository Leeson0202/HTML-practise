function isLoad() {

    // 获取cookie 信息
    let strCookie = document.cookie;
    let arrCookie = strCookie.split("; ");
    let tappId, tmsg, tnName;
    let musicdata = { code: 500 };
    //遍历cookie数组，处理每个cookie对
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        //找到名称为userId的cookie，并返回它的值
        if ("appId" == arr[0]) {
            tappId = arr[1];
        }
        if ("msg" == arr[0]) {
            tmsg = arr[1];

        }
        if ("nName" == arr[0]) {
            tnName = arr[1];

        }
    }
    user = {}
    user['appId'] = tappId;
    user['msg'] = tmsg;
    user['nName'] = tnName;


    // 判断是否登录
    if (user['msg'] != undefined && user['appId'] != undefined) {
        $.ajaxSettings.async = false;
        $.post("user/getuser", {
            appId: user['appId'],
            msg: user['msg']
        }, function (resoult) {
            if (resoult.code == 200) {

                // 将nName加入cookie
                let exp = new Date();
                exp.setTime(exp.getTime() + 30 * 60 * 1000); //过期时间 30分钟
                document.cookie = "nName=" + resoult.data.nName + ";expires=" + exp.toGMTString();


                if (window.location.pathname == "/login" || window.location.pathname == "/login.html") {
                    window.open("index", "_self");
                }
            }
            musicdata = resoult;
        });
        $.ajaxSettings.async = true;

    } else {
        $("#dropdown").click(function () {
            window.open("login", "_self");
        })

    }

    return musicdata;
}

function formatTime(time) {
    // console.log(time)
    let minite = Math.floor(time / 60)
    minite = minite > 9.5 ? minite : "0" + minite;
    let secend = Math.floor(time % 60)
    secend = secend > 9.5 ? secend : "0" + secend
    return minite + ":" + secend
}

function search_enter(e) {
    var evt = window.event || e;
    if (evt.keyCode == 13) {
        //回车事件

        showResult()
    }
}


function audioInit() {
    let audio = document.createElement("audio");
    audio.src = "http://music.163.com/song/media/outer/url?id=35678875.mp3";
    audio.preload = "auto";
    audio.style.display = "none";
    $("#player").append(audio);
    return audio;
}


