// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    // console.log(options.url);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // 统一为有权限的接口，设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            // 通过localStorage.getItem、获取键值   //localStorage.getItem(key):获取指定key本地存储的值
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂在complete函数
    options.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status !== 0 && res.responseJSON.message !== '获取用户基本信息成功！') {
            // 清空token
            localStorage.removeItem('token')
            // 跳转到登录界面
            location.href = '/login.html'
        }
    }
})