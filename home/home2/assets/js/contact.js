$(document).ready(function() {

    var apiHost = "https://api.yidpu.com";

    $('#messageForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            phone: {
                message: '手机号码验证失败',
                threshold: 11,
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    regexp  : {
                        regexp: /^1[34578]\d{9}$/,
                        message: '请输入有效的手机号码'
                    },
                }
            },
            name: {
                message: '姓名验证失败',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                }
            },
            messageContent: {
                message: '留言内容验证失败',
                validators: {
                    stringLength: {
                        max: 200,
                        message: '留言内容必须是200字以内'
                    }
                }
            }
        }
    });

    $('#commitBtn').on('click', function(){
        $('#messageForm').data('bootstrapValidator').validate();
        var flag = $('#messageForm').data("bootstrapValidator").isValid();
        if(flag) {
            var data = {
                phone: $('[name="phone"]').val(),
                name: $('[name="name"]').val(),
                message: $('[name="messageContent"]').val()
            };
            $.ajax({
                url: apiHost + "/api/web/saveMessageBook",
                type: "post",
                data: JSON.stringify(data),
                contentType : 'application/json',
                success:function(data) {
                    $("#success").show();
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseJSON.message);
                }
            });
        }
    });

});