function check() {
    var flag1 = checkBox("q3");
    var flag2 = checkBox("q4");
    if (!flag1 || !flag2) {
        alert("请选择复选框中的内容");
        return false;
    }
}

function checkBox(name) { //获取指定name名称的同组所有复选框元素
    var checkbox = document.getElementsByName(name);
    //遍历选项组中的所有选项
    for (var i = 0; i < checkbox.length; i++) {
        //判当前断是否有选中的选项

        if (checkbox[i].checked) {
            return true;
        }
    }
    return false;
}