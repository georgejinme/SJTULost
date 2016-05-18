# SJTU Lost

专用于上海交通大学学生的失物招领平台

##Requirements
####用户:

- 任意一款浏览器

####开发者:

- Django: 1.8.6
- react: 0.13.3
- react-dom: 0.14.0
- react-datetime: 2.1.0
- jsx-loader: ^0.13.2
- babel-loader: ~5.3.2
- webpack: ^1.11.0
- object-assign: ^4.0.1

##Feature

1. 发布遗失信息 (丢失)
2. 发布拾物信息 (拾物)
3. 查看用户拾物数量排行

## Framework
#### UI
Bootstrap

####前端
React + Flux + jQuery

包管理使用npm

####后台
Django

#### 数据库
MySQL

##Note
1. 用户需要登录后并且填写正确的手机号码才能发布信息
2. 只有信息的发布者才有权限修改信息
3. 用户自动登录，时限为两周
4. 遗失信息和拾物信息默认以丢失和拾起的时间排序