'use strict';

// const os = require('osenv');
const path = require("path")
const async = require('async');
const fs = require("fs")
const common = require(path.resolve(__dirname, '../js/common/common.js'));


// 把用户目录的路径写进Dom框中
const filepath = common.getUserHome();
document.querySelector('#current-filepath').innerHTML = filepath;


// 获取个人目录中的文件或文件夹信息列表
function main() {
    common.readDir(filepath, (err, files) => {
        // console.log(files); // files会以数组的形式把文件名都输出来
        if (err) {
            return alert('load user home dir faild!')
        } 
        inspectAndDescribeFiles(filepath, files, displayFiles); // 处理文件的核心函数
    })
}
function inspectAndDescribeFiles(folderPath, files, callback) {
    async.map(files, (file, asyncCallback) => {
        let resolvedFilePath = path.resolve(folderPath, file);
        inspectAndDescribeFile(resolvedFilePath, asyncCallback);
    }, callback)
}
function inspectAndDescribeFile(filepath, callback) { // 定义判断是文件还是文件夹的方法
    let result = {
        file: path.basename(filepath),
        path: filepath,
        type: ''
    }
    fs.stat(filepath, (err, stat) => {
        if (err) {
            callback(err)
        }else {
            if (stat.isFile()) {
                result.type = 'file'
            }else if (stat.isDirectory()) {
                result.type = 'directory'
            }
            callback(err, result)
        }
    })
}
function displayFiles(err, files) { // 让回调函数(即渲染函数)来显示文件列表
    files.forEach((file) => {
        console.info(file) // 能循环打印出含文件类型和路径名称的对象信息
        console.log(`${filepath}\\${file}`) // forEach遍历打印出C:\Users\user\.electron这样的路径字串
        // 获取渲染区域对象和模板对象
        const mainArea = document.getElementById('main-area');
        const template = document.getElementById('item-template');

        /**
         * document.importNode介绍--importNode() 方法把一个节点从另一个文档复制到该文档以便应用。
         * imported 节点可以试试任何节点类型。
         * 例如：把iframe窗口页面中的一个DOM节点复制到当前页面中就用这个方法
         * 复制iframe中第一个 H1 元素:
         * var frame=document.getElementsByTagName("iframe")[0]
         * var h=frame.contentWindow.document.getElementsByTagName("h1")[0];
         * var x=document.importNode(h,true);
         * 语法：document.importNode(node,deep)
         * 参数：deep	Boolean	必须。如果为 true，还要递归复制 importedNode 节点的所有子孙节点。
         * 总结：就是copy节点DOM的一个方法
         * 
         *  注意：Internet explorer 8 及 IE 更早版本不支持该方法。
        */

        // 深拷贝--clone模板
        let clone = document.importNode(template.content, true);

        // 填充clone到本页面中的节点模板的图标和文件名信息
        clone.querySelector('img').src = `../images/${file.type}.svg`;
        clone.querySelector('.filename').innerHTML = file.file;

        // 追加到main-area中显示
        mainArea.appendChild(clone);
    });
}
main();






// 使用fs.stat函数判断是文件还是文件夹


// 使用async模块来处理一系列异步函数的情况并收集它们的结果


// 将文件或文件夹信息渲染到页面上，并用不同的图标表示出来