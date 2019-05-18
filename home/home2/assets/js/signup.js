$(document).ready(function() {

    var apiHost = "https://api.yidpu.com";

    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }

    function guid() {
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    var codeFormValidator = function() {
        $('#codeForm').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                yzmcode: {
                    message: '请输入验证码',
                    threshold: 4,
                    validators: {
                        notEmpty: {
                            message: '验证码不能为空'
                        },                    
                        remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
                            url: apiHost + '/api/web/checkCode',//验证地址
                            message: '验证码错误',//提示消息
                            delay :  0,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                            type: 'POST',//请求方式
                            /**自定义提交数据，默认值提交当前input value*/
                            data: function(validator) {
                                return {
                                    code: $('[name="yzmcode"]').val(),
                                    time: time
                                };
                            }
                        },
                    }
                }
            }
        });
    }

    codeFormValidator();

    var time = null;
    $('#modal-code').on('shown.bs.modal', function (e) {
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $(this).css('display', 'block');
        var modalHeight=$(window).height() / 2 - $('#modal-code .modal-dialog').height() / 2;
        $(this).find('.modal-dialog').css({
            'margin-top': modalHeight
        });
    });

    $('#agreeCB').on("change", function(){
        if($(this).is(":checked")){
            //选中
            $('#registerBtn').attr('disabled', false);
        } else {
            //取消选中
            $('#registerBtn').attr('disabled', true);
        }
    });

    $('#codeBtn').on('click', function(){
        codeBtnFunction(); 
    });

    var codeBtnFunction = function() {
        $('#registerForm').data('bootstrapValidator').validateField('phone');
        if($('#registerForm').data('bootstrapValidator').isValidField('phone')) {
            $('#modal-code').modal();
            time = guid();
            $('#codeImg').attr('src', apiHost + "/api/validateCode?time=" + time);
        }
    }

    $('#codeImg').on('click', function(){
        time = guid();
        $(this).attr('src', apiHost + "/api/validateCode?time=" + time);
    })

    $("#modal-code").on("hidden.bs.modal", function(e){
        $('[name="yzmcode"]').val("");
        $('#codeForm').data('bootstrapValidator').destroy();
        $('#codeForm').data('bootstrapValidator', null);
        codeFormValidator();
    });

    $('#getPhoneCodeBtn').on('click', function(){
        $('#codeForm').data('bootstrapValidator').validate();
        var flag = $('#codeForm').data("bootstrapValidator").isValid();
        if(flag) {
            $.ajax({
                url: apiHost + "/api/web/generatePhoneCode",
                type: "post",
                data: 'phone=' + $('[name="phone"]').val() + '&code=' + $('[name="yzmcode"]').val() + '&time=' + time,
                contentType:"application/x-www-form-urlencoded;charset=utf-8"
            });
            $('#modal-code').modal("hide");            
            var num = 59;
            var inter = window.setInterval(function() {
                $('#codeDiv').html("手机验证码已发送," + num + "秒后重新获取");
                num--;
                if(num == -1) {
                    window.clearInterval(inter);
                    $('#codeDiv').html('<a href="javascript:void(0)" class="login-link" id="codeBtn">获取手机验证码</a>');
                    $('#codeBtn').on('click', function(){
                        codeBtnFunction(); 
                    });
                }
            }, 1000);            
        }
    })

    $('#registerBtn').on('click', function(){
        $('#registerForm').data('bootstrapValidator').validate();
        var flag = $('#registerForm').data("bootstrapValidator").isValid();
        if(flag) {
            var data = 'phone=' + $('[name="phone"]').val() + '&pwd=' + $('[name="password"]').val() 
                + '&confirmpwd=' + $('[name="confirmPassword"]').val() + '&code=' + $('[name="code"]').val();
            $.ajax({
                url: apiHost + "/api/web/register",
                type: "post",
                data: data,
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                success:function(data) {
                    window.location.href = "signup-success.html";
                },
            });
        }
    });

    $('#registerForm').bootstrapValidator({
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
                    remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
                        url: apiHost + '/api/web/checkPhone',//验证地址
                        message: '手机号码已在一点谱注册',//提示消息
                        delay :  0,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                        type: 'POST',//请求方式
                         /**自定义提交数据，默认值提交当前input value*/
                        data: function(validator) {
                            return {
                                phone: $('[name="phone"]').val()
                            };
                        }
                    }
                }
            },
            password: {
                message: '登录密码验证失败',
                validators: {
                    notEmpty: {
                        message: '登录密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '登录密码长度必须在6到18位之间'
                    },
                    identical: {
                        field: 'confirmPassword',
                        message: '两次密码不一致'
                    },
                    different: {
                        field: 'phone',
                        message: '登录密码不能与手机号码相同'
                    }
                }
            },
            confirmPassword: {
                message: '确认登录密码验证失败',
                validators: {
                    notEmpty: {
                        message: '确认登录密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '确认登录密码长度必须在6到18位之间'
                    },
                    identical: {
                        field: 'password',
                        message: '两次密码不一致'
                    },
                    different: {
                        field: 'phone',
                        message: '登录密码不能与手机号码相同'
                    }
                }
            },
            code: {
                message: '手机验证码验证失败',
                threshold: 4,
                validators: {
                    notEmpty: {
                        message: '手机验证码不能为空'
                    },
                    digits: {
                        message: '手机验证码为4位纯数字'
                    },          
                    remote: {//ajax验证。server result:{"valid",true or false} 向服务发送当前input name值，获得一个json数据。例表示正确：{"valid",true}  
                        url: apiHost + '/api/web/checkPhoneCode',//验证地址
                        message: '手机验证码错误',//提示消息
                        delay :  0,//每输入一个字符，就发ajax请求，服务器压力还是太大，设置2秒发送一次ajax（默认输入一个字符，提交一次，服务器压力太大）
                        type: 'POST',//请求方式
                         /**自定义提交数据，默认值提交当前input value*/
                        data: function(validator) {
                            return {
                                code: $('[name="code"]').val(),
                                phone: $('[name="phone"]').val()
                            };
                        }
                    }
                }
            }
        }
    })

});