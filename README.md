

## About Project

Using This Project You can send push notification to everyone using this website.

## ScreeenShots
![Database](https://github.com/pawanbangar/allied-analytics/blob/main/ScreenShots/Screenshot%20(103).png?raw=true)
![Screen](https://github.com/pawanbangar/allied-analytics/blob/main/ScreenShots/Screenshot%20(104).png?raw=true)
![Notification write](https://github.com/pawanbangar/allied-analytics/blob/main/ScreenShots/Screenshot%20(105).png?raw=true)
![Notification](https://github.com/pawanbangar/allied-analytics/blob/main/ScreenShots/Screenshot%20(106).png?raw=true)
![Firebase](https://github.com/pawanbangar/allied-analytics/blob/main/ScreenShots/Screenshot%20(107).png?raw=true)

## Requirements(latest xampp include everything)
- Mysql.
- php 7.4.+.
- Ctype PHP Extension.
- BCMath PHP Extension.
- Fileinfo PHP extension.
- JSON PHP Extension.
- Mbstring PHP Extension.
- OpenSSL PHP Extension.
- PDO PHP Extension.
- Tokenizer PHP Extension.
- XML PHP Extension.
- Composer v2
## Setup Project
1 install [composer](https://getcomposer.org/download/)

2 Navigate to project cloned folder

3 Run `composer install` This will install dependecies for project

4 create database and user that credentials in .env file

5 Run `npm install`.

6 now `npm run dev` this will compile js dependencies `npm run build` in case of production app

7 run `php artisan migrate` to run migrations(db contains token folder).

8 run command `php artisan serve` to start project on 8000 port. 

9.Go to the browser and please allow Notifications.

10.App Uses Inertiajs to Run React with Laravel [Link](https://inertiajs.com/)
## Folder Structure
#### app/Http/Controllers
- 01-HomeController contains Only Homepage Method for welcome page.
- 02-TokenController contains store and notify method,store stores new token and notify sends notification to all token recipients.
#### Models/Token
- Token model have token attribute which saves firebase token.
### config/firebase.php
- Firebase related configurations like project name and credentials.

### Resource/views/app.blade.php
- File is used as Root for All React-inertia Pages.

## Resource/js
- app.js contains configuration for inertia.js

## Resources/js/Pages/Welcome
- firebase.js contains methods for push notifications and index.js contains layout for main page.
