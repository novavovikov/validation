
## Активация плагина
$('form').validation();


#### Для валидирования input необходимо вписать следующие data-атрибуты:
+ data-validation="name"
+ data-validation="email"
+ data-validation="phone"


### Опции

> email: 

Значение по умолчанию: /^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,20}\.)?[a-z]{2,20}$/i
***


> errorEmail

Значение по умолчанию: 'Неправильный формат электронной почты. E-mail адрес должен содержать символ @ и хотя бы одну точку'
***



> notificationEmail

Значение по умолчанию: 'Поле e-mail не должно быть пустым'
***


> phone

Значение по умолчанию: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i
***

> notificationPhone

Значение по умолчанию: 'Неверный формат номера телефона!'
***

> errorPhone

Значение по умолчанию: 'Поле для ввода номера телефона не должно быть пустым'
***

> name

Значение по умолчанию:
/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i
***


> notificationName

Значение по умолчанию: 'Неверный формат имени!'
***



> errorName

Значение по умолчанию: 'Поле для ввода имени не должно быть пустым'
***


> showNotice

Значение по умолчанию: true
***



> noticeClass

Значение по умолчанию: 'notice'
***


> callbackNotice

Значение по умолчанию: ''
***

> ajax

Значение по умолчанию: true
***

> messageClass

Значение по умолчанию: 'sendmessage'
***
> timeoutMessage

Значение по умолчанию: 5000
***

> callbackMessage

Значение по умолчанию: ''
***
