$(function () {
    getUserInfo()
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置信息
        // headers: {
        //     // 通过localStorage.getItem、获取键值   //localStorage.getItem(key):获取指定key本地存储的值
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染头像函数
            renderAvatar(res.data)
        },
        // 请求成功还是失败都会调用complete函数
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status !== 0 && res.responseJSON.message !== '获取用户基本信息成功！') {
                // 清空token
                localStorage.removeItem('token')
                // 跳转到登录界面
                location.href = '/login.html'
            }
        }
    })

}
// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染头像
    if (user.user_pic != null) {
        // 3.1图片头像
        // attr() 方法设置或返回被选元素的属性值。
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        // 3.2文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}
// 实现退出功能
$('#btnLogout').on('click', function () {
    // 1.弹出提示框
    layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
        // 1.清空本地存储token
        localStorage.removeItem('token')
        // 2.跳转到登录页面
        location.href = '/login.html'
        // 关闭confirm询问框
        layer.close(index);
    });
})