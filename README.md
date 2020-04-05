# messenger

## Описание

Простой мессенджер с ограниченным функционалом. SPA с бэкэндом на Node и фронтендом на React. Создавался исключительно в развлекательных целях, тк что содержит различного рода баги

## Установка

В конcоли перейдите в папку с проектом. Установите пакеты для бэкэнда командой npm install.
Далее необходимо устанвить пакеты для клиента. Клиент находится в корневой папке в папке client. Перейдите в неё и так же введите команду npm install.
Для запуска необходимо запустить сервер из корнейвой папки, командой npm start, и клиентскую часть той же командой из папки client.
Приложение запустится по адресу localhost:3000

## Технологии

| front-end     | back-end              |
| ------------- |-----------------------|
| HTML          | Nodejs                |
| CSS           | Express               |
| javascript    | Passportjs            |
| React         | Mongo db              |
|               | Socket io             |

Для повторной аутентификации исользуются токены.

## Пример изспользования

Авторизируйтесь или зарегистрируйтесь в форме, введя логин\пароль

<img src='https://i.ibb.co/sqKWTC8/image.png' alt='login'>

После этого вы попадаете на главную страницу, нажмите кнопку "settings" в левом верхнем углу и добавьте пользователя для общения,
нажав на "create new chat" и введя его username

<img src='https://i.ibb.co/GVKh01G/image.png' alt='create chat'>

Будет создан новый чат, где вы сможете отправить первое сообщение

<img src='https://i.ibb.co/pLrpq2X/image.png' alt='start of communication'>

Ваш собеседеник мнгновенно получит своё сообщение.

<img src='https://i.ibb.co/3kyTm43/image.png' alt='dialog'>

Создавайте чаты и общайтесь

<img src='https://i.ibb.co/LrRDVQK/image.png' alt='messenger'>

