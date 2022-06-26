function timeCal() {
    player['curTime'].innerText = formatTime(player['audio'].currentTime);

    if (player['pausetag'] != 0)
        window.setTimeout(timeCal, 100);
    // console.log(barContent.style.width)
    if (player['audio'].duration)
        barContent.style.width = progressBar.offsetWidth * player['audio'].currentTime / player['audio'].duration + "px";

}


function footAction() {
    document.getElementsByTagName("title")[0].innerText = "呼吸决定"
    player['musicName'].innerText = "呼吸决定";
    // 上一首
    // 暂停
    $('#pause-btn').click(function() {
        // 判断是否有音乐
        if (player['audio'].src != "") {
            if (player['pausetag'] == 0) {
                // 没加载就--：--
                // player['allTime'].innerText = "--:--"
                // player['curTime'].innerText = "--:--"
                if (!player['audio'].duration) return;
                player['pausetag'] = 1
                $('#pause-btn').attr("src", "./img/暂停.svg")
                player['audio'].play();
                timeCal()
                player['allTime'].innerText = formatTime(player['audio'].duration);



            } else {
                player['pausetag'] = 0
                $('#pause-btn').attr("src", "./img/播放.svg")
                player['audio'].pause();
            }
        }
    });

    // 下一首

    // 图片
    // 其他
}

// 直接播放
function musicPlay(music) {
    console.log(music);
    // 1. 添加记录
    // 2. 改变player
    player['audio'].src = music.mUrl;
    player['musicName'].innerText = music['mName'];
    document.getElementsByTagName("title")[0].innerText = music['mName'];
    //监听audio是否加载完毕，如果加载完毕，则读取audio播放时间
    setTimeout(function() {
        player['audio'].addEventListener("canplay", function() {
            // console.log(formatTime(player['audio'].duration));
            player['allTime'].innerText = music['fullTime']
            $('#pause-btn').attr("src", "./img/暂停.svg")
            player['audio'].play();
            player['pausetag'] = 1
            timeCal()
            return
        });
    }, 200);
    // 没加载就--：--
    player['allTime'].innerText = "--:--"
    player['curTime'].innerText = "--:--"





}