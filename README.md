                                                      
## 🏹 概述
  相芯科技react前端中后台项目积累的组件与antd二次封装的组件集合

## 📦 安装
```javascript
    npm i
```

## ✒ 实例
```javascript
    console.log('haha')
```

## 👩‍❤️‍👩参与人员
  [![](https://avatars2.githubusercontent.com/u/22650901?s=60&v=4)](https://github.com/HuiGeGeGitHub)


## 🎭 git commit 规范
    使用git cz 替换git commitb

## 🔧 开发须知
### 1. 样式使用原理:  
    需要全局安装ruby等环境 [sass](https://www.sass.hk/install/) 
    执行 sass --update ./src:./src --sourcemap=none --no-cache --style compressed
    build的时候 通过脚本替换scss为css
### 2. ts使用
    npm i -g typescript
    利用typescript tsx 编译
## 3. .scss babel转成.css后缀
    babel 中 --extensions默认没有ts tsx需要加入 babel ./src -d ./src --extensions .tsx,.js,.jsx --keep-file-extension
    也可以加 @babel/preset-typescript