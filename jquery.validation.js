

//validation plugin

/*
__________________________________________________

Created by NovaVovikov

github: https://github.com/novavovikov/
e-mail: novavovikov@gmail.com
__________________________________________________

*/

(function($) {

    var defaults = {

        email: /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,20}\.)?[a-z]{2,20}$/i,
        notificationEmail: 'Неправильный формат электронной почты. E-mail адрес должен содержать символ @ и хотя бы одну точку',
        errorEmail: 'Поле e-mail не должно быть пустым',

        phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
        notificationPhone: 'Неверный формат номера телефона!',
        errorPhone: 'Поле для ввода номера телефона не должно быть пустым',

        name: /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z0-9-_\.]{1,20}$/i,
        notificationName: 'Неверный формат имени!',
        errorName: 'Поле для ввода имени не должно быть пустым',

        showNotice: true,
        noticeClass: 'notice',
        callbackNotice: function() {

        },

        ajax: true,
        messageClass: 'sendmessage',
        timeoutMessage: 5000,
        callbackMessage: function() {
            
        }

    };

    $.fn.validation = function(options) {

        var status = {
            email: true,
            phone: true,
            name: true
        };

        var _statusForm = true;

        if (this.length == 0) return this;

        // support mutltiple elements
        if (this.length > 1) {
            this.each(function() {
                $(this).validation(options);
            });
            return this;
        }

        var el = this;
        var node = {};

        var settings = $.extend({}, defaults, options);

        var methods = {
            init: function init() {
                node.form = el;
                node.email = node.form.find('[data-validation="email"]');
                node.phone = node.form.find('[data-validation="phone"]');
                node.name = node.form.find('[data-validation="name"]');

                //let's go
                node.form.on('submit', methods.validateForm);
            },
            validateFactory: function validateFactory(type, notification, error) {
                node[type].each(function() {
                    var $this = $(this),
                    value = $this.val();

                    if (value != '') {
                        if (value.search(settings[type]) == 0) {
                            status[type] = true;
                        } else {
                            methods.showNotice('notification', notification, $this);
                            status[type] = 'notification';
                        }
                    } else {
                        methods.showNotice('error', error, $this);
                        status[type] = 'error';
                    }
                });
            },

            validateItems: function validateItems() {

                if (node.phone.length > 0) {
                    methods.validateFactory('phone', settings.notificationPhone, settings.errorPhone);
                }
                if (node.email.length > 0) {
                    methods.validateFactory('email', settings.notificationEmail, settings.errorEmail);
                }
                if (node.name.length > 0) {
                    methods.validateFactory('name', settings.notificationName, settings.errorName);
                }
            },

            statusForm: function statusForm() {
                _statusForm = [];

                for (var key in status) {
                    _statusForm.push(status[key]);
                }

                _statusForm = _statusForm.every(function(item) {
                    return item === true;
                });

                return _statusForm;
            },

            validateForm: function validateForm() {

                methods.validateItems();

                methods.statusForm();

                if (settings.ajax === true) {
                    if (_statusForm === true) {
                        methods.sendRequest();
                    }

                    return false;
                } else {
                    return _statusForm;
                }
            },

            showNotice: function showNotice(type, message, el) {
                if ($('.' + settings.noticeClass).length == 0) {
                    $('body').append('<div class=' + settings.noticeClass + '></div>');

                    node.notice = $('body').children('.' + settings.noticeClass);
                } else {
                    node.notice = $('body').children('.' + settings.noticeClass);
                }

                node.notice.css({
                    display: 'block',
                    position: 'absolute',
                    top: el.offset().top + el.height(),
                    left: el.offset().left
                });

                node.notice.removeClass().addClass(settings.noticeClass).addClass(settings.noticeClass + '--' + type);
                node.notice.text(message);
                el.focus();

                $(window).click(methods.hideNotice);
                settings.callbackNotice();
            },
            hideNotice: function hideNotice() {
                node.notice.remove();
            },
            sendRequest: function() {
                $.ajax({
                    url: node.form.attr('action'),
                    method: 'POST',
                    data: node.form.serialize(),
                    success: function (answer) {
                        methods.showMessage(answer);
                    }, error: function() {
                        methods.showMessage('Ошибка, повторите запрос позже!');
                    }
                });
            },
            showMessage: function(text) {
                if ($('.' + settings.messageClass).length == 0) {
                    $('body').append('<div class=' + settings.messageClass + '></div>');

                    node.message = $('body').children('.' + settings.messageClass);
                } else {
                    node.message = $('body').children('.' + settings.messageClass);
                }

                node.message.html(text);
                node.message.show();

                methods.hideMessage();
            },
            hideMessage: function() {
                setTimeout(function() {node.message.remove()}, settings.timeoutMessage);
                node.form.trigger('reset');

                settings.callbackMessage();
            }
        };

        methods.init();
    };
})(jQuery);