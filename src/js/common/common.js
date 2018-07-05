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
};

module.exports = commmon  // 把module.exports看做一个可以导出去让require接收的对象而已