$(function () {
    var form = layui.form
    var layer = layui.layer
    // 验证表单规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return "新旧密码不能一致!"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return "两次输入密码不一致！"
            }
        }

    })
    // 实现重置密码规则
    $('.layui-form').on('submit', function (e) {
        // 组织表单默认提交行为
        e.preventDefault()
        // console.log("111");
        // 发起Ajax请求    ===bug===怀疑端口路径出错
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                // console.log("111");
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！')
                }
                layer.msg('更新密码成功！')
                // console.log(res.data);
                // 重置表单  先通过$()[0]转换为DOM元素
                $('.layui-form')[0].reset()
            }
        })
    })
})