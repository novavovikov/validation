

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

        name: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i,
        notificationName: 'Неверный формат имени!',
        errorName: 'Поле для ввода имени не должно быть пустым',

        showNotice: true,
        noticeClass: 'notice'
    };

    var status = {
        email: true,
        phone: true,
        name: true
    }

    var statusForm = true;

    $.fn.validation = function(options) {

        if (this.length == 0) return this;

        // support mutltiple elements
        if (this.length > 1) {
            this.each(function() { $(this).validation(options) });
            return this;
        }

        var el = this;
        var node = {};
        var notice = {};

        var settings = $.extend({}, defaults, options);

        var methods = {
            init: function() {
                node.form = el;
                node.email = node.form.find('[data-validation="email"]');
                node.phone = node.form.find('[data-validation="phone"]');
                node.name = node.form.find('[data-validation="name"]');

                //let's go
                node.form.on('submit', methods.validateForm);

            },
            validateFactory: function(type, notification, error) {
                node[type].each(function() {
                    var $this = $(this),
                        value = $this.val();

                    if (value !='') {
                        if(value.search(settings[type]) == 0) {
                            status[type] = true;
                        } else {
                            // methods.showNotice('notification', notification, $this);
                            status[type] = 'notification';
                            console.log(notification);
                        }
                    } else {
                        // methods.showNotice('error', error, $this);
                        status[type] = 'error';
                        console.log(error);
                    }
                })
            },

            validateItems: function() {
                if (node.name.length > 0) {
                    methods.validateFactory('name', settings.notificationName, settings.errorName);
                }

                if (node.email.length > 0) {
                    methods.validateFactory('email', settings.notificationEmail, settings.errorEmail);
                }

                if (node.phone.length > 0) {
                    methods.validateFactory('phone', settings.notificationPhone, settings.errorPhone);
                }
            },

            statusForm: function() {
                statusForm = [];

                for (var key in status) {
                    statusForm.push(status[key]);
                }

                statusForm = statusForm.every(function(item) {
                    return item === true;
                })

                return statusForm;
            },

            validateForm: function () {

                methods.validateItems();

                methods.statusForm();

                return statusForm;
            },

            showNotice: function(type, message, el) {
                if ($('.' + settings.noticeClass).length == 0) {
                    $('body').append('<div class=' + settings.noticeClass + '></div>');

                    notice = $('body').children('.' + settings.noticeClass);
                }

                notice.css({
                    display: 'block',
                    position: 'absolute',
                    top: el.offset().top,
                    left: el.offset().left
                });

                notice.removeClass().addClass(settings.noticeClass).addClass(settings.noticeClass + '--' + type);
                notice.text(message);
            }
        };

        methods.init();

    };

})(jQuery);