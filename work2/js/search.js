function kugouMusic(keyword, page) {
    url_head = "http://songsearch.kugou.com/song_search_v2"

    // "keyword=呼吸决定&page=1&pagesize=10";
    $.ajaxSettings.async = false;

    $.ajax({
        url: url_head,
        type: 'get',
        dataType: "jsonp", //数据类型为jsonpxhrFields:,
        jsonp: "callback",
        "Access-Control-Allow-Origin": "*",
        data: {
            keyword: keyword,
            page: page,
            pagesize: 10

        },
        success: function(data) {
            console.log(data)
            let List = data['data']['lists']
            let tempList;
            for (let t in List) {
                tempList['Name'] = t['SongName']
                tempList['Singer'] = t['SingerName']
                tempList['Name'] = t['FileName']

            }

        }
    });
    $.ajaxSettings.async = true;

}


// 163
function music(keyword, page) {
    let tempList = []
    let tempobj = {}


    $.ajaxSettings.async = false;
    url_head = "https://autumnfish.cn/search?keywords=" + keyword;
    // url_head = "http://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s={" + keyword + "}&type=1&offset=0&total=true&limit=20"
    $.ajax({
        url: url_head,
        type: 'post',
        dataType: "json",
        jsonp: "callback()",
        timeout: 5000,
        data: {
            format: "json"
        },
        success: function(data) {
            console.log(data["result"]["songs"][0])
            if (data["code"] == 200) {
                data = data["result"]["songs"]
                for (let i = 0; i < 20; i++) {
                    // console.log(data[i])
                    tempobj['id'] = data[i]['id'] // id
                    tempobj['mName'] = data[i]['name'] // name
                    tempobj['singer'] = data[i]['artists'][0]['name'] // 歌手
                    tempobj['mUrl'] = "http://music.163.com/song/media/outer/url?id=" + data[i]['id'] + ".mp3" // 歌曲
                    tempobj['gcUrl'] = "http://music.163.com/api/song/lyric?os=pc&id=" + data[i]['id'] + "&lv=-1&kv=-1&tv=-1"
                    tempobj['fullTime'] = formatTime(data[i]['duration'] / 1000)
                        // console.log(i + "个tempobj：", tempobj)
                    tempList.push(tempobj)
                    tempobj = {};

                }

            }

        },
        complete: function(XMLHttpRequest, status) { //无论如何都会执行complete
            if (status == 'timeout') { //超时,status还有success,error等值的情况
                console.log("访问超时");
            }
        }
    });
    $.ajaxSettings.async = true;
    // console.log(tempList)
    return tempList;

}


//  获取音乐
function getMusicList(keyword, type, page) {
    let musicList = [];

    if (0 == type) { //酷狗音乐

        musicList = kugouMusic(keyword, page)
    }
    if (type == 1) { //网易云
        musicList = musicList.concat(music(keyword, page))
    }
    // console.log("musicList:  ", musicList)
    return musicList;
}
// 搜索音乐
function searchMusic() {
    let keyword = ""
    return searchMusic(keyword);
}
// 搜索音乐
function searchMusic(keyword) {
    if (keyword == "")
        keyword = $("#search-input").val();
    let musicList = getMusicList(keyword, 1, 1)
    return musicList
}

// 搜索并显示音乐
function showResult() {
    let table_tag =
        "<tr id=\"table-tag\"> <th class=\"first\" > \
        歌名</th> <th>歌手</th> \
        <th>时长</th></tr>";
    let imgstr = ["<img id=\"", "\" class=\"playmusic\" src=\"img/选择播放.svg\" onclick=\"playMusic_btn(this)\"/>"];
    let str = ["<tr class=\"musicResult\"><td class=\"first\">",
        "<div class=\"mName\">",
        "</div><img class=\"tianjia\" style=\"width:14px;display:none\" src=\"img/添加.svg\"></td><td><span>",
        "</span></td><td><span>",
        "</span></td></tr>"
    ];
    let endstr = "";
    // let table = document.getElementById("search-table")
    // 1. 获取musicList
    keyword = $("#search-input-b").val();
    if (keyword == "") {
        $("#search-table").html(table_tag + str[0] + str[1] + str[2] + "未搜索到歌曲" + str[3] + str[4]);
    } else {
        // 搜索
        musicList = searchMusic(keyword);
        console.log(musicList)
            // 2. 清除并显示内容
            // 2.1 清除
        $("#search-table").html(table_tag);
        if (musicList.length == 0) {
            $("#search-table").append(str[0] + str[1] + str[2] + "未搜索到歌曲" + str[3] + str[4]);
            return
        }
        for (let i = 0; i < musicList.length; i++) {
            let newstr = str[0] + imgstr[0] + i + imgstr[1] + str[1] + musicList[i]['mName'] +
                str[2] + musicList[i]['singer'] + str[3] + musicList[i]['fullTime'] + str[4];
            $("#search-table").append(newstr)
            $("#table-tag .first").css("padding-left", "30px");
        }
        // 设置显示
        $(".tianjia").css("display", "inline-block");
        // table.innerHTML = table_tag + str + str;
    }

}


// 页面初始化
function searchInit() {
    // 1. 获取head中的input
    let keyword = parent.window.document.getElementById('search-input').value;
    $('#search-input-b').attr("value", keyword);
    // 2. 爬取数据并显示
    showResult();
}

//点击播放按钮
function playMusic_btn(watch) {
    //获取属性id的值
    var val = $(watch).attr("id");
    // console.log("imgbtn:", val, "mName:", musicList[val]["mName"])
    parent.window.musicPlay(musicList[val])


}

// search 行为函数
function searchAction() {


}