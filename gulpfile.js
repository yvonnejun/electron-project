'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('watch:electron', function () {
  electron.start();
  gulp.watch(['./*.js'], electron.restart); // 这指的是根目录下的js文件，main.js，gulpfile.js就是，更新后重启窗口
  gulp.watch(['./*.html'], electron.reload); // 这指的是根目录下的js文件，main.js，gulpfile.js就是，更新后重启窗口
  gulp.watch(['./*.{html,js,css}'], electron.reload); // 这指的是非根目录下的html，css，js文件，更新后刷新窗口
});
// 注册一个任务
gulp.task('say',function(){
    console.log('hello gulp')
});