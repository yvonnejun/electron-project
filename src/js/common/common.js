'use strict'

const os = require('osenv');
const async = require('async');
const path = require("path")
const fs = require("fs")

const commmon = {
    /**
     * get user homedir
     * @os --osenv module
     */
    getUserHome: function () {
        return os.home();
    },
    /**
     * 根据文件路径读取目录信息
     * @os --osenv module
     */
    readDir: function (folderPath, callback) {
        fs.readdir(folderPath, callback);
    },
    // 清除文件列表显示内容
    clearView: function (id) { // js原生清空子元素的方法
        const mainArea = document.getElementById(id);
        let firstChild = mainArea.firstChild;
        while (firstChild) { // 当存在第一个子元素时删除之，再赋值第一个子元素给firstChild变量(通过第一子元素删除法清空子元素)
            mainArea.removeChild(firstChild);
            firstChild = mainArea.firstChild;
        }
    },
    /**
     * 根据文件路径判断是文件夹还是文件，并封装相关信息到一个对象中
     * @filepath --依据的文件路径
     */
    inspectAndDescribeFile: function (filepath, callback) { // 定义判断是文件还是文件夹的方法
        let result = {
            file: path.basename(filepath), // 取filepath的文件名部分
            path: filepath, // path得到整个文件路径名
            type: ''  // type分类标识是文件还是文件夹
        }
        // 使用fs.stat函数判断是文件还是文件夹
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
    },
    /**
     * 根据文件路径判断是文件夹还是文件，并封装相关信息到一个对象中
     * @filepath --依据的文件路径
     */
    inspectAndDescribeFiles: function (folderPath, files, callback) {
        // 使用async模块来处理一系列异步函数的情况并收集它们的结果
        async.map(files, (file, asyncCallback) => { // 这map中的第一个方法的第二个参数其实整个map的第三个参数回掉函数，也就是说callback其实就是赋值给asyncCallback参数的回调函数。而第二个函数中的处理结果会全部返回到第三个函数中进行处理
            let resolvedFilePath = path.resolve(folderPath, file);
            this.inspectAndDescribeFile(resolvedFilePath, asyncCallback);
        }, callback)
    }
};

module.exports = commmon  // 把module.exports看做一个可以导出去让require接收的对象而已