# RNMap
// action
第一步 
react-native init MyTaxi --version 0.44.0
第二步
package.json
     主要测试redux 能看到home首页
第三步
配置地图环境
cocoapods
native base 
google maps api key
icon  需要link
  运行
/Users/rogerluo/Desktop/RN/MyTaxi/node_modules/react-native/Libraries/NativeAnimation/RCTNativeAnimatedModule.m
      文件 RCTAnimatedNodesManager.h
      #import <RCTAnimation/RCTValueAnimatedNode.h>    
   改为
      #import <RCTValueAnimatedNode.h>  

第四步
getAutocompletePredictions is not function
googleplaces link





（2）
boost_1_63_0/boost/spirit/home/qi/nonterminal/debug_handler_state.hpp: (Empty error message)

tar: Error exit delayed from previous errors.

(3)
Lexical or Preprocessor Issue
config.h file not found

 sudo  yarn  cache clean  清除  /Users/rogerluo/Library/Caches/   
 sudo  yarn install
ls node_modules/react-native/

Xcode build fails:'config.h' file not found

node_modules/react-native/ios-install-third-party.sh
third-party  在目录下demoTest

编译成功
(4)
Module does not exist in the module map or in these directories

npm 缓存目录     
npm config get cache
ls ~/.npm 
 npm cache ls
npm cache clean
/Users/rogerluo/.npm

watchman watch-list
watchman watch-del-all

 1. Clear watchman watches: `watchman watch-del-all`.
  2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.
  3. Reset packager cache: `rm -fr $TMPDIR/react-*` or `npm start -- --reset-cache`.

ls $TMPDIR
react-native start
 lsof -i :8081 
 kill -9 <PID> 



(5)
react-native-router-flux/src/navigationStore.js: Unexpected token 
Using the @autobind decorator

npm install --save babel-plugin-transform-decorators-legacy

Actions.create is not a function

npm install react-native-router-flux@3.40.1 —save

(5) unrecognized font familay fontAwesome
npm install react-native-vector-icons@4.1.1—save

(6)

Showing Recent Messages
ld: warning: directory not found for option '-L/Users/rogerluo/Library/Developer/Xcode/DerivedData/demoTest-csdzlczuavchefapscwtmaefawqs/Build/Products/Debug-iphonesimulator/Yoga'

$PODS_CONFIGURATION_BUILD_DIR

${PODS_ROOT}

react-native link react-native-maps

react-native link react-native-vector-icons

(7)
Unable to retrieve location. 定不了位
  KLCC  —  Selangor 
  fare 300
(8)
socket.io.js:4948 GET http://localhost:3000/socket.io/?EIO=3&transport=polling&t=Lqd5LsF 404 (Not Found)

io.listen(app.listen(port, function(){
    console.log("Server running on port", port);
}));
(9)
npm install --save redux-socket.io
找不到 模块
npm cache clean
watchman watch-del-all
rm -rf node_modules && npm install
rm -fr $TMPDIR/react-*
react-native run-ios
还是不行
UnableToResolveError: Unable to resolve module `react-native/Libraries/Renderer/shims/ReactNativePropRegistry` from `/Users/rogerluo/Desktop/RN/MyTaxi/node_modules/native-base/dist/src/Utils/computeProps.js`: Module does not exist in the module map or in these directories:
