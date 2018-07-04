'use strict';

var gulp = require('gulp');
var electron = require('electron-connect').server.create();

gulp.task('watch:electron', function () {
  electron.start();
  gulp.watch(['./main.js'], electron.restart); // 这指的是根目录下的main.js，gulpfile.js更新后重启窗口(因为这两个文件更新后页面是不会刷新的，必须重启)
  //gulp.watch(['./*.html'], electron.reload); 
  //gulp.watch(['./*.{html,js,css}'], electron.reload); // 这指的是非根目录下的html，css，js文件，更新后刷新窗口
});
// 注册一个任务
gulp.task('say',function(){
    console.log('hello gulp')
});