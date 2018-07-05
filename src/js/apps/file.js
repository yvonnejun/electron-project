'use strict';

// const os = require('osenv');
const path = require("path")

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
        console.log(`${filepath}\\${file}`) // forEach遍历打印出C:\Users\user\.electron这样的路径字串
    });
}
main();






// 使用fs.stat函数判断是文件还是文件夹


// 使用async模块来处理一系列异步函数的情况并收集它们的结果


// 将文件或文件夹信息渲染到页面上，并用不同的图标表示出来