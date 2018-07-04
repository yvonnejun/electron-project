'use strict';

const electron = require('electron');    // 加载electron模块
const app = electron.app;           // 加载electron模块的app接口
const BrowserWindow = electron.BrowserWindow;           // 加载electron模块的BrowserWindow窗口对象接口 
// const {autoUpdater} = require("electron-updater"); // 检测自动更新的模块--实测好像无效

let mainWindow = null; // 初始化应用主窗口对象

app.on('window-all-close', ()=>{
    if(process.platform !== 'darwin'){
        app.quit(); // 关闭所有窗口后关闭应用
    }
})
app.on('ready', ()=>{
    // autoUpdater.checkForUpdates();
    mainWindow = new BrowserWindow();           // 实例化窗口对象
    // mainWindow.loadURL(`file://${app.getAppPath()}/index.html`);      // 加载主入口文件index.html,测试demo用
    mainWindow.loadURL(`file://${app.getAppPath()}/src/apps/file.html`);      // 加载file.html,开发文件系统用
    mainWindow.on('close', ()=>{
        mainWindow = null;  // 当主窗口关闭时，释放主窗口对象(垃圾回收机制)
    })
})