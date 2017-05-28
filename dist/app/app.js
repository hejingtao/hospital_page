
angular.module('hospital.directive',[])


// pdf显示 弹出层
// .directive("pdf", function() {
//     return {
//         restrict : "EA",
//         replace: true,
//         scope: {
//           url: "@",  //要展示的pdf地址
//           close: "&"  // 隐藏pdf显示插件的方法
//         },
//         templateUrl :  'user/template/pdf-viewer.html',
//         link: function (scope, element, attrs) {
//        		DEFAULT_URL =	attrs.url;
//         }
//     };
// });
//
//
//
//




var app = angular.module('hospital', [
  // 'ngAnimate', //动画
  'ngStorage', //本地存储
  'hospital.router', //路由定义
  // 'hospital.partials', //页面组件
  'hospital.service',  // 服务
  // 'hospital.directive' // 指令（pdf）
  ])
    .config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}]);


app.run(
  function($rootScope, $state, $http,  $localStorage, ENV, tools) {

    console.log( $localStorage.userData);
    $rootScope.userData = $localStorage.userData;

    // // 是否保存登录状态 初始化
    // $rootScope.isKeep ={};
    // $rootScope.isKeep.state = false;
    // // 绑定$localStorage服务至$storage变量中
    // $rootScope.$storage = $localStorage;
    // // 初始化时判断是否有token存在，设置登录状态
    // if($localStorage.isAuth == true){
    //   if(!$localStorage.USER_ID){
    //     // 如果userId不存在
    //     $state.go('login');
    //     $rootScope.loginState = false;
    //   }
    //   // 设置登录状态
    //   $rootScope.loginState = true;
    //   // 设置authtoken
    //   $rootScope.authtoken = $localStorage.authtoken;
    //   // 设置用户角色 admin or ordinary 
    //   $rootScope.role = $localStorage.role;
    //   // 设置用户信息
    //   $rootScope.USER_ID = $localStorage.USER_ID;
    //   $rootScope.USER_NAME = $localStorage.USER_NAME;
    //   $rootScope.USER_JOB = $localStorage.USER_JOB;
    //   $rootScope.USER_STRUCTURE = $localStorage.USER_STRUCTURE;
    //   $rootScope.USER_PHONE = $localStorage.USER_PHONE;
    //   $rootScope.USER_EMAIL = $localStorage.USER_EMAIL; 
    //   $rootScope.mainOrganizationId = $localStorage.mainOrganizationId;
    //   // 记住登录状态
    //   $rootScope.isKeep.state = $localStorage.isKeep;
    //   // 最后操作时间戳
    //   $rootScope.lastOperate = $localStorage.lastOperate;

    //   $rootScope.identityList = $localStorage.identityList;

    //   $rootScope.userData = $localStorage.userData;

      // 判断登录状态是否超时
      // if($rootScope.isKeep.state == false){
      //   var tempTime = new Date();
      //   var tempResult = (tempTime.getTime())- $rootScope.lastOperate;
      //    if(tempResult > ENV.overtime){
      //       // 超时1个钟头
      //       $rootScope.isAuth = $localStorage.isAuth = false;
      //       $rootScope.loginState = false;
      //       tools.alert('登录超时！请重新登录');
      //       $state.go('login');
      //    }
      // }




    // 监听路由变化，判断是否有权限登录
    // $rootScope.$on('$stateChangeStart', 
    // function(event, toState, toParams, fromState, fromParams, options){ 
    //     // 登录页、忘记密码相关页无需检测
    //     if(toState.name == 'login'){
    //       return null;
    //     }else if(toState.name.indexOf('forgetPassword') > -1){
    //       return null;
    //     }
    //     if($rootScope.loginState == false){
    //       event.preventDefault();
    //       tools.alert('您尚未登录')
    //       $state.go('login'); 

    //     }else if($rootScope.role == 'admin' && (toState.name.indexOf('admin') == -1)){
    //       event.preventDefault();
    //       tools.alert('当前身份为管理员！')
    //       $state.go('admin'); 

    //     }else if($rootScope.role == 'employee' && (toState.name.indexOf('user') == -1)){
    //       event.preventDefault();
    //       tools.alert('当前身份为用户！')
    //       $state.go('user'); 
    //     }else if($rootScope.isKeep.state == false){
    //       // 判断登录状态是否超时
    //       var tempTime = new Date();
    //       var tempResult = (tempTime.getTime())- $rootScope.lastOperate;
    //        if(tempResult > ENV.overtime){
    //           // 超时1个钟头
    //           event.preventDefault();
    //           $localStorage.isAuth = false;
    //           $rootScope.loginState = false;
    //           tools.alert('登录超时！请重新登录');
    //           $state.go('login'); 
    //        }else{
    //         $localStorage.lastOperate = $rootScope.lastOperate = tempTime.getTime();
    //        }
    //     }
        
        
        // console.log(fromState);
        // console.log(toState);
    // })


  }
);


// 管理员、用户通用部分
app.controller('main', function($scope, $rootScope) {


})





/**
 * ------------------------------------------------------------------
 * app 路由模块，前端路由定义，使用uiRouter
 * ------------------------------------------------------------------
 */

angular.module('hospital.router',['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        /**
         * 登录模块
         * ------------------------------------------------------------------
         */
        // 登录界面
            .state('login', {
                url: '/login',
                views: {
                    "main": {
                        templateUrl: 'login/login.html',
                        controller: 'login'
                    }
                }
            })

            
            .state('index', {
                url: '/',
                views: {
                    "main": {
                        templateUrl: 'index/index.html',
                        // controller: 'login'
                    }
                }
            })

        /**
         * 药品模块
         * ------------------------------------------------------------------
         */
            // 药品分类列表
            .state('index.drugTypeList', {
                url: 'drug/drugTypeList',
                views: {
                    "content": {
                        templateUrl: 'drug/drugTypeList.html',
                        controller: 'drug_type_list'
                    }
                }
            })
            // 添加药品分类
            .state('index.addDrugType', {
                url: 'drug/addDrugType',
                views: {
                    "content": {
                        templateUrl: 'drug/addDrugType.html',
                        controller: 'add_drug_type'
                    }
                }
            })
            // 药品入库
            .state('index.addDrug', {
                url: 'drug/addDrug',
                views: {
                    "content": {
                        templateUrl: 'drug/addDrug.html',
                        controller: 'add_drug'
                    }
                }
            })
            // 药品入库历史记录
            .state('index.drugStockHistory', {
                url: 'drug/drugStockHistory/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'drug/drugStockHistory.html',
                        controller: 'drug_stock_history'
                    }
                }
            })
            // 新建药品
            .state('index.createDrug', {
                url: 'drug/createDrug',
                views: {
                    "content": {
                        templateUrl: 'drug/createDrug.html',
                        controller: 'create_drug'
                    }
                }
            })
            // 药品自用登记
            .state('index.consumeDrug', {
                url: 'drug/consumeDrug',
                views: {
                    "content": {
                        templateUrl: 'drug/consumeDrug.html',
                        controller: 'consume_drug'
                    }
                }
            })
            // 药品自用登记
            .state('index.consumeDrugList', {
                url: 'drug/consumeDrugList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'drug/consumeDrugList.html',
                        controller: 'consume_drug_list'
                    }
                }
            })
            // 药品列表
            .state('index.drugList', {
                url: 'drug/drugList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'drug/drugList.html',
                        controller: 'drug_list'
                    }
                }
            })
            // 药品列表
            .state('index.drugDetails', {
                url: 'drug/drugDetails/:drugId',
                views: {
                    "content": {
                        templateUrl: 'drug/drugDetails.html',
                        controller: 'drug_details'
                    }
                }
            })
            // 药品报损
            .state('index.drugLoss', {
                url: 'drug/drugLoss',
                views: {
                    "content": {
                        templateUrl: 'drug/drugLoss.html',
                        controller: 'drug_loss'
                    }
                }
            })
            // 药品报损列表
            .state('index.drugLossList', {
                url: 'drug/drugLossList',
                views: {
                    "content": {
                        templateUrl: 'drug/drugLossList.html',
                        controller: 'drug_loss_list'
                    }
                }
            })
            // 药品拆零
            .state('index.drugDetach', {
                url: 'drug/drugDetach',
                views: {
                    "content": {
                        templateUrl: 'drug/drugDetach.html',
                        controller: 'drug_detach'
                    }
                }
            })
            // 药品拆零列表
            .state('index.drugDetachList', {
                url: 'drug/drugDetachList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'drug/drugDetachList.html',
                        controller: 'drug_detach_list'
                    }
                }
            })
        /**
         * 用户模块（超级管理员）
         * ------------------------------------------------------------------
         */
            //用户列表
            .state('index.userList', {
                url: 'user/userList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'user/userList.html',
                        controller: 'user_list'
                    }
                }
            })
            //添加用户
            .state('index.addUser', {
                url: 'user/addUser',
                views: {
                    "content": {
                        templateUrl: 'user/addUser.html',
                        controller: 'add_user'
                    }
                }
            })
            //修改用户
            .state('index.userDetails', {
                url: 'user/userDetails/:userId',
                views: {
                    "content": {
                        templateUrl: 'user/userDetails.html',
                        controller: 'user_details'
                    }
                }
            })

        /**
         * 个人模块
         * ------------------------------------------------------------------
         */
            //修改用户
            .state('index.changeUserInfo', {
                url: 'me/changeUserInfo',
                views: {
                    "content": {
                        templateUrl: 'me/changeUserInfo.html',
                        controller: 'change_user_info'
                    }
                }
            })
            //修改用户
            .state('index.changeUserPassword', {
                url: 'me/changeUserPassword',
                views: {
                    "content": {
                        templateUrl: 'me/changeUserPassword.html',
                        controller: 'change_user_password'
                    }
                }
            })

            /**
             * 患者模块
             * ------------------------------------------------------------------
             */
            //患者列表
            .state('index.patientList', {
                url: 'patient/patientList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'patient/patientList.html',
                        controller: 'patient_list'
                    }
                }
            })
            //患者用户
            .state('index.addPatient', {
                url: 'patient/addPatient',
                views: {
                    "content": {
                        templateUrl: 'patient/addPatient.html',
                        controller: 'add_patient'
                    }
                }
            })
            //修改患者信息
            .state('index.patientDetails', {
                url: 'patient/patientDetails/:patientId',
                views: {
                    "content": {
                        templateUrl: 'patient/patientDetails.html',
                        controller: 'patient_details'
                    }
                }
            })
            //修改患者卡号
            .state('index.resetPatientCard', {
                url: 'patient/resetPatientCard/:patientId',
                views: {
                    "content": {
                        templateUrl: 'patient/resetPatientCard.html',
                        controller: 'reset_patient_card'
                    }
                }
            })
            //患者挂号
            .state('index.patientRegister', {
                url: 'patient/patientRegister',
                views: {
                    "content": {
                        templateUrl: 'patient/patientRegister.html',
                        controller: 'patient_register'
                    }
                }
            })
            //患者挂号
            .state('index.patientRegisterList', {
                url: 'patient/patientRegisterList',
                views: {
                    "content": {
                        templateUrl: 'patient/patientRegisterList.html',
                        controller: 'patient_register_list'
                    }
                }
            })
        /**
         * 体格诊断模块
         * ------------------------------------------------------------------
         */
            //体格诊断模块列表
            .state('index.signList', {
                url: 'sign/signList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'sign/signList.html',
                        controller: 'sign_list'
                    }
                }
            })
            //添加体格诊断
            .state('index.addSign', {
                url: 'sign/addSign',
                views: {
                    "content": {
                        templateUrl: 'sign/addSign.html',
                        controller: 'add_sign'
                    }
                }
            })
            //修改体格诊断信息
            .state('index.signDetails', {
                url: 'sign/signDetails/:signId',
                views: {
                    "content": {
                        templateUrl: 'sign/signDetails.html',
                        controller: 'sign_details'
                    }
                }
            })

            /**
             * 诊断模块
             * ------------------------------------------------------------------
             */
            //诊断列表
            .state('index.diagnosisList', {
                url: 'diagnosis/diagnosisList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'diagnosis/diagnosisList.html',
                        controller: 'diagnosis_list'
                    }
                }
            })
            //添加诊断
            .state('index.addDiagnosis', {
                url: 'diagnosis/addDiagnosis',
                views: {
                    "content": {
                        templateUrl: 'diagnosis/addDiagnosis.html',
                        controller: 'add_diagnosis'
                    }
                }
            })
            //修改诊断信息
            .state('index.diagnosisDetails', {
                url: 'diagnosis/diagnosisDetails/:diagnosisId',
                views: {
                    "content": {
                        templateUrl: 'diagnosis/diagnosisDetails.html',
                        controller: 'diagnosis_details'
                    }
                }
            })

            /**
             * 治疗项目模块
             * ------------------------------------------------------------------
             */
            //治疗项目列表
            .state('index.itemList', {
                url: 'item/itemList/:pageNum',
                views: {
                    "content": {
                        templateUrl: 'item/itemList.html',
                        controller: 'item_list'
                    }
                }
            })
            //添加治疗项目
            .state('index.addItem', {
                url: 'item/addItem',
                views: {
                    "content": {
                        templateUrl: 'item/addItem.html',
                        controller: 'add_item'
                    }
                }
            })
            //修改治疗项目信息
            .state('index.itemDetails', {
                url: 'item/itemDetails/:itemId',
                views: {
                    "content": {
                        templateUrl: 'item/itemDetails.html',
                        controller: 'item_details'
                    }
                }
            })
        // 默认跳转到user主界面，如果为管理员或者未登录时会自动跳转回对应页面
        $urlRouterProvider.otherwise('/');

    })












/**
 * ------------------------------------------------------------------
 * app service模块
 * ------------------------------------------------------------------
 */
angular.module('hospital.service',[ ])

    /**
     * 环境常量定义
     *
     * ------------------------------------------------------------------
     */
    .service('ENV', function() {
      return{
        // api根地址 注意：后缀到.com为止，不带/
        baseUrl: 'http://119.29.209.29:8080/hospital',
        // 登录超时时间 1s = 1000
        overtime: 3600000
      }
    })

    /**
     * tools 工具service，封装layer插件，提供常用操作方法
     *
     * layer官网：http://layer.layui.com/
     * ------------------------------------------------------------------
     */
    .service('tools', function($state,$rootScope) {

      return {
        /**
         * 显示加载状态条
         *
         * 0为hover头像姓名，展示用户信息；1为hover用户信息栏，消除定时器；-1为mouseleave，添加定时器（0.5s）
         *
         */
        load: function(time,error) {

          var loading = layer.load(2, {

          });

          var temp;
          $rootScope.loading = temp = Date.now();
          var timeout  = setTimeout(function() {

            if($rootScope.loading == temp){
              layer.closeAll('loading');
              layer.msg(error);
              // layer.alert(error, {
              //   skin: 'layui-layer-lan'
              //   ,closeBtn: 1
              //   ,shift: 5 //动画类型
              // });
            }
          }, time);
        },
        /**
         * 隐藏加载状态条
         *
         * 隐藏加载状态条，修改加载状态
         *
         */
        hide: function() {

          layer.closeAll('loading');
          $rootScope.loading = false;
        },

        // 分页方法，传入当前页数与总页数，即可得到一个分页数组。
        splitPage :function(nowPage,totalPage) {

          var resultArr = new Array();
          var tempLeftArr = new Array();
          var tempRightArr = new Array();
          var tempMin = 0;
          var tempMax =0;
          var lastPage = null;
          var nextPage = null;
          for(var i = 1;i<4;i++){
            tempMin = nowPage-i;
            tempMax = nowPage+i;
            if(tempMin>-1){
              tempLeftArr.push(tempMin);
            }
            if(tempMax<totalPage){
              tempRightArr.push(tempMax);
            }
          }
          if((nowPage-1)>=0){
            lastPage = nowPage -1;
          }
          if((nowPage+1)<totalPage){
            nextPage = nowPage +1;
          }
          tempLeftArr.sort();
          resultArr[0] = lastPage;  // 上一页
          resultArr[1] = tempLeftArr;  // 前5页
          resultArr[2] = nowPage;  // 当前页
          resultArr[3] = tempRightArr; // 后5页
          resultArr[4] = nextPage; // 下一页
          return resultArr;
        },
        /**
         * 显示提示框（需要确认）
         */
        alert: function(message) {

          layer.alert(message, {
            skin: 'layui-layer-lan'
            ,closeBtn: 0
            ,shift: 0 //动画类型
          });
        },
        /**
         * 显示提示框（无需确认）
         */
        msg: function(message){

          layer.msg(message);
        },
        /**
         * 显示提示框（需要输入内容并确认）
         */
        prompt: function(message,text,func){

          layer.prompt({
            title: message,
            value: text,
            formType: 2 //prompt风格，支持0-2
          }, function(content){

            func(content);
          });
        },

        /**
         * 显示提示框
         */
        confirm: function(title,func){

          layer.confirm(title, {
            btn: ['确认','取消'] //按钮
          }, function(){
            func();
          }, function(){

          });
        }


      }
    })




// // http拦截
// .factory('httpInterceptor', [ '$q', '$injector','$rootScope',function($q, $injector, $rootScope) {
//         var httpInterceptor = {
//             request: function (config) {
//
//               // if($rootScope.$storage.authtoken != undefined){
//               //      config.headers['Authorization'] = 'token '+$rootScope.$storage.authtoken +'';
//               // }
//               config.headers['Content-Type'] = 'application/json';
//               config.headers['Accept'] = 'application/json';
//               config.requestTimestamp = new Date().getTime();
//               return config;
//             },
//             'responseError' : function(response) {
//
//                 alert(response.data.error);
//                 layer.closeAll('loading');
//                 $rootScope.loading = false;
//
//                 return $q.reject(response);
//             },
//             'response' : function(response) {
//
//                 return response;
//             }
//         }
//         // 封装layer.alert方便使用
//         var alert = function(message) {
//
//             layer.alert(message, {
//               skin: 'layui-layer-lan'
//               ,closeBtn: 0
//               ,shift: 0 //动画类型
//             });
//         }
//         return httpInterceptor;
//     }
// ])
//
//
// .config(function($stateProvider, $httpProvider) {
//   // https必须的配置
//   $httpProvider.defaults.withCredentials = true;
//   // 注入配置
//   $httpProvider.interceptors.push('httpInterceptor')
// })



/**
 * ------------------------------------------------------------------
 * 诊断模块 控制器
 * ------------------------------------------------------------------
 */

// 添加体格诊断
var add_diagnosis = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelDiagnosisId: '',
        secondLevelDiagnosisId: '',
        parentId: ''
    };
    $scope.getLevel = function(level,diagnosisId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelDiagnosisList = data.data;
                    }else{
                        tools.alert('获取一级诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/findAllByParentId',
                params:{
                    parentId: diagnosisId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelDiagnosisList = data.data;
                    }else{
                        tools.alert('获取二级诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);


    $scope.addDiagnosis = function(isValid){

        if($scope.form.level == 1){
            $scope.form.parentId = ' ';
        }else if($scope.form.level == 2){
            $scope.form.parentId = $scope.form.firstLevelDiagnosisId;
        }else{
            $scope.form.parentId = $scope.form.secondLevelDiagnosisId;
        }

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            console.log($scope.form.parentId)
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/add',
                params: {
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form.name = '';
                        tools.alert('添加诊断成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加诊断失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 体格诊断列表
var diagnosis_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getDiagnosisList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/diagnosis/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'diagnosisId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.diagnosisList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取诊断列表失败，请稍后重试。');
                }
            })
    }
    $scope.getDiagnosisList();

}


// 体格诊断详情
var diagnosis_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelDiagnosisId: '',
        secondLevelDiagnosisId: '',
        parentId: '',
        isChangeLevel: 0
    };
    $scope.getLevel = function(level,diagnosisId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelDiagnosisList = data.data;
                    }else{
                        tools.alert('获取一级诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/findAllByParentId',
                params:{
                    parentId: diagnosisId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelDiagnosisList = data.data;
                    }else{
                        tools.alert('获取二级诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);

    if($stateParams.diagnosisId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/diagnosis/findById',
            params: {
                diagnosisId: $stateParams.diagnosisId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.diagnosisDetails = data.data;
                    $scope.form.name =  $scope.diagnosisDetails.name;
                    $scope.form.parentId =  $scope.diagnosisDetails.parentId;
                }else{
                    tools.alert('获取诊断详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.diagnosisList');
    }


    // 修改患者详情
    $scope.changeDiagnosisDetails = function(isValid){

        if($scope.form.isChangeLevel == 1){
            if($scope.form.level == 1){
                $scope.form.parentId = ' ';
            }else if($scope.form.level == 2){
                $scope.form.parentId = $scope.form.firstLevelDiagnosisId;
            }else{
                $scope.form.parentId = $scope.form.secondLevelDiagnosisId;
            }
        }

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/diagnosis/update',
                params: {
                    diagnosisId: $stateParams.diagnosisId,
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改诊断详情成功');
                    }else{
                        tools.alert('修改诊断详情失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}


/**
 * ------------------------------------------------------------------
 * 药品模块 控制器
 * ------------------------------------------------------------------
 */

// 药品分类列表
var drug_type_list = function($scope, $rootScope,$state, $http,tools, ENV) {

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findLevel1',
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugTypeList = data.data;
            }else{
                tools.alert('获取药品分类失败，请稍后重试。');
            }
        })
}


// 添加药品分类
var add_drug_type = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={ drugTypeName: ''};

    $scope.addDrugType = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/addClassification',
                params: {
                    'no': 'testhjt',
                    'level': 1,
                    'price': 0,
                    'parentId': 1,
                    'cost': 0,
                    'batch': 0,
                    'expDate': '2017-10-10',
                    'validDate': '2017-10-10',
                    'mnemonic': 'test',
                    'type': 'test',
                    'standard': 'test',
                    'producter': 'test',
                    'approval': 'test',
                    'barCode': 'test',
                    'name': $scope.form.drugTypeName
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('添加分类成功');
                        $scope.form ={ drugTypeName: ''};
                    }else{
                        tools.alert('添加分类失败');
                    }

                })
        }
    }
}


// 编辑药品分类
var edit_drug_type = function($scope, $rootScope,$state, $http,tools, ENV) {

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findById',
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugTypeData = data.data;
            }else{
                tools.alert('获取药品分类失败，请稍后重试。');
            }
        })
}


// 药品入库
var add_drug = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.drug ={ 
        drugId: '', 
        cost: '', 
        batch: '', 
        expDate: '', 
        validDate: '',
        seller: '',
        remark: '',
        count: ''
    };


// 获取药品分类
    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findLevel1',
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugTypeList = data.data;
            }else{
                tools.alert('获取药品分类失败，请稍后重试。');
            }
        })

    // $scope.drug ={ drugId: 1, cost: 10, batch: 10000, expDate: '2019-10-10', validDate: '2017-10-10', seller: 'test-seller', remark: 'test-remark', count: 10};

    // 药品入库
    $scope.addDrug = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/stock',
                params: {
                    drugId: $scope.form.drugId,
                    cost:  $scope.form.cost,
                    batch:  $scope.form.batch,
                    expDate:  $scope.form.expDate,
                    validDate:  $scope.form.validDate,
                    seller:  $scope.form.seller,
                    remark:  $scope.form.remark,
                    count:  $scope.form.count
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.drug ={
                            drugId: '',
                            cost: '',
                            batch: '',
                            expDate: '',
                            validDate: '',
                            seller: '',
                            remark: '',
                            count: ''
                        };
                        tools.alert('添加成功');
                    }else{
                        tools.alert('添加失败');
                    }

                })
        }
        

    }
}

// 药品入库历史记录
var drug_stock_history = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {


    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/stock/findAll',
        params: {
            page: $scope.pageNum,
            size:  5,
            sort:  'createTime,desc'
        }
    })
        .success(function(data) {
            if(data.state == true){
                $scope.historyList = data.data;
                $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
            }else{
                tools.alert('获取药品入库历史记录失败，请稍后重试。');
            }
        })
}

// 新建药品
var create_drug = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form = {
        'no':  '',
        'level':  2,
        'price':  '',
        'parentId':  '',
        'cost':  '',
        'batch':  '',
        'expDate':  '',
        'validDate':  '',
        'mnemonic':  '',
        'type': '',
        'standard':  '',
        'producter':  '',
        'approval':  '',
        'barCode':  '',
        'name': ''
    };


    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findLevel1',
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugTypeList = data.data;
            }else{
                tools.alert('获取药品分类失败，请稍后重试。');
            }
        })

    // 新建药品
    $scope.createDrug = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/addClassification',
                params: {
                    'no':  $scope.form.no,
                    'level':  2,
                    'price':  $scope.form.price,
                    'parentId':  $scope.form.parentId,
                    'cost':  $scope.form.cost,
                    'batch':  $scope.form.batch,
                    'expDate':  $scope.form.expDate,
                    'validDate':  $scope.form.validDate,
                    'mnemonic':  $scope.form.mnemonic,
                    'type':  $scope.form.type,
                    'standard':  $scope.form.standard,
                    'producter':  $scope.form.producter,
                    'approval':  $scope.form.approval,
                    'barCode':  $scope.form.barCode,
                    'name': $scope.form.name
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form = {
                            'no':  '',
                            'level':  2,
                            'price':  '',
                            'parentId':  '',
                            'cost':  '',
                            'batch':  '',
                            'expDate':  '',
                            'validDate':  '',
                            'mnemonic':  '',
                            'type': '',
                            'standard':  '',
                            'producter':  '',
                            'approval':  '',
                            'barCode':  '',
                            'name': ''
                        };
                        tools.alert('新建药品成功');
                    }else{
                        tools.alert('新建药品失败');
                    }

                })
        }

    }
}


// 药品自用登记
var consume_drug = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        drugId: '',
        userId: '',
        remark: '',
        count: ''
    };

    // 药品自用登记
    $scope.consumeDrug = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/consume',
                params: {
                    drugId: $scope.form.drugId,
                    userId:  $scope.form.userId,
                    remark:  $scope.form.remark,
                    count:  $scope.form.count
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            drugId: '',
                            userId: '',
                            remark: '',
                            count: ''
                        };
                        tools.alert('登记成功');
                    }else{
                        tools.alert('登记失败,原因是：'+data.message);
                    }

                })
        }
    }
}

// 药品自用历史记录
var consume_drug_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/consume/findAll',
        params: {
            page: $scope.pageNum,
            size:  5,
            sort:  'createTime,desc'
        }
    })
        .success(function(data) {
            if(data.state == true){
                $scope.historyList = data.data;
                $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
            }else{
                tools.alert('获取药品自用历史记录失败，请稍后重试。');
            }
        })
}

// 药品列表
var drug_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findAll',
        params: {
            page: $scope.pageNum,
            size:  5,
            sort:  'createTime,desc'
        }
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugList = data.data;
                $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
            }else{
                tools.alert('获取药品列表失败，请稍后重试。');
            }
        })
}


// 药品详情
var drug_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {
    
    $scope.form = {
        'no':  '',
        'level':  2,
        'price':  '',
        'parentId':  '',
        'cost':  '',
        'batch':  '',
        'expDate':  '',
        'validDate':  '',
        'mnemonic':  '',
        'type': '',
        'standard':  '',
        'producter':  '',
        'approval':  '',
        'barCode':  '',
        'name': ''
    };

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/drug/findLevel1',
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugTypeList = data.data;
            }else{
                tools.alert('获取药品分类失败，请稍后重试。');
            }
        })
    
    if($stateParams.drugId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/drug/findById',
            params: {
                drugId: $stateParams.drugId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.drugDetails = data.data;
                    $scope.form = $scope.drugDetails;
                }else{
                    tools.alert('获取药品详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.drugList');
    }

    // 修改药品
    $scope.changeDrug = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/update',
                params: {
                    'drugId': $stateParams.drugId,
                    'count': $scope.drugDetails.count,
                    'no':  $scope.form.no,
                    'level':  2,
                    'price':  $scope.form.price,
                    'parentId':  $scope.form.parentId,
                    'cost':  $scope.form.cost,
                    'batch':  $scope.form.batch,
                    'expDate':  $scope.form.expDate,
                    'validDate':  $scope.form.validDate,
                    'mnemonic':  $scope.form.mnemonic,
                    'type':  $scope.form.type,
                    'standard':  $scope.form.standard,
                    'producter':  $scope.form.producter,
                    'approval':  $scope.form.approval,
                    'barCode':  $scope.form.barCode,
                    'name': $scope.form.name
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改药品详情成功');
                    }else{
                        tools.alert('修改药品详情失败');
                    }

                })
        }

    }
}

// 药品报损
var drug_loss = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        drugId: '',
        count: '',
        remark: ''
    };

    $scope.drugLoss = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/loss',
                params: {
                    drugId:  $scope.form.drugId,
                    count:  $scope.form.count,
                    remark:  $scope.form.remark
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            drugId: '',
                            count: '',
                            remark: ''
                        };
                        tools.alert('药品报损成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('药品报损失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 药品报损列表
var drug_loss_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/loss/findAll',
        params: {
            page: $scope.pageNum,
            size:  5,
            sort:  'createTime,desc'
        }
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugList = data.data;
                $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
            }else{
                tools.alert('获取药品列表失败，请稍后重试。');
            }
        })
}

// 药品拆零
var drug_detach = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        oldDrugId: '',
        oldCount: '',
        newCount: '',
        newType: '',
        remark: ''
    };

    $scope.drugDetach = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/drug/detach',
                params: {
                    oldDrugId: $scope.form.oldDrugId ,
                    oldCount: $scope.form.oldCount ,
                    newCount: $scope.form.newCount ,
                    newType: $scope.form.newType ,
                    remark: $scope.form.remark
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            oldDrugId: '',
                            oldCount: '',
                            newCount: '',
                            newType: '',
                            remark: ''
                        };
                        tools.alert('药品拆零成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('药品拆零失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 药品拆零列表
var drug_detach_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $http({
        method: 'GET',
        url: ENV.baseUrl + '/detach/findAll',
        params: {
            page: $scope.pageNum,
            size:  5,
            sort:  'createTime,desc'
        }
    })
        .success(function(data) {
            if(data.state == true){
                $scope.drugList = data.data;
                $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
            }else{
                tools.alert('获取药品列表失败，请稍后重试。');
            }
        })
}


/**
 * ------------------------------------------------------------------
 * 治疗项目模块 控制器
 * ------------------------------------------------------------------
 */

// 添加治疗项目
var add_item = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        price: '',
        level: '',
        firstLevelItemId: '',
        parentId: ''
    };
    $scope.getLevel = function(level,itemId){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/item/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelItemList = data.data;
                    }else{
                        tools.alert('获取一级治疗项目列表失败，请稍后重试。');
                    }
                })

    }
    $scope.getLevel(1);


    $scope.addItem = function(isValid){

        if($scope.form.level == 1){
            $scope.form.parentId = ' ';
        }else if($scope.form.level == 2){
            $scope.form.parentId = $scope.form.firstLevelItemId;
        }

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            console.log($scope.form.parentId)
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/item/add',
                params: {
                    name: $scope.form.name ,
                    price: $scope.form.price,
                    level: $scope.form.level,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form.name = '';
                        tools.alert('添加治疗项目成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加治疗项目失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 治疗项目列表
var item_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getItemList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/item/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'itemId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.itemList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取治疗项目列表失败，请稍后重试。');
                }
            })
    }
    $scope.getItemList();

}


// 治疗项目详情
var item_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        price: '',
        firstLevelItemId: '',
        parentId: '',
        isChangeLevel: 0
    };
    $scope.getLevel = function(level,itemId){
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/item/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelItemList = data.data;
                    }else{
                        tools.alert('获取一级治疗项目列表失败，请稍后重试。');
                    }
                })
    }
    $scope.getLevel(1);

    if($stateParams.itemId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/item/findById',
            params: {
                itemId: $stateParams.itemId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.itemDetails = data.data;
                    $scope.form.name =  $scope.itemDetails.name;
                    $scope.form.parentId =  $scope.itemDetails.parentId;
                    $scope.form.price =  $scope.itemDetails.price;
                }else{
                    tools.alert('获取治疗项目详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.itemList');
    }


    // 修改详情
    $scope.changeItemDetails = function(isValid){

        if($scope.form.isChangeLevel == 1){
            if($scope.form.level == 1){
                $scope.form.parentId = ' ';
            }else if($scope.form.level == 2){
                $scope.form.parentId = $scope.form.firstLevelItemId;
            }
        }

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/item/update',
                params: {
                    itemId: $stateParams.itemId,
                    name: $scope.form.name ,
                    price: $scope.form.price,
                    level: $scope.form.level,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改治疗项目详情成功');
                    }else{
                        tools.alert('修改治疗项目详情失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}


/**
 * ------------------------------------------------------------------
 * 登录模块 控制器
 * ------------------------------------------------------------------
 */

var login = function($scope, $rootScope,$state, $http,tools,$localStorage, ENV) {


  // 登录
  $scope.login = function(isValid){

      $scope.submitted = true;
      if(!isValid){
          tools.alert('表单未填写正确！请确认填写完毕后再提交。');
      }else{
          $http({
              method: 'GET',
              url: ENV.baseUrl + '/common/login',
              params: {
                  'phone': $scope.phone,
                  'password': $scope.password
              }
          })
              .success(function(data) {
                  if(data.state == true){
                      tools.alert('登录成功');
                      $rootScope.userData = $localStorage.userData = data.data;
                      console.log( $localStorage.userData);
                      $state.go('index');
                  }else{
                      tools.alert('登录失败，请检查手机号码或密码是否正确。');
                  }

              })
      }

  }
}

/**
 * ------------------------------------------------------------------
 * 用户模块 控制器
 * ------------------------------------------------------------------
 */



// 修改个人详情
var change_user_info = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        userId: '',
        userName: '',
        sex: '',
        birthday: '',
        phone: '',
        roleId: '',
        payment: ''
    };

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/user/findById',
            params:{
                userId: $rootScope.userData.userId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.userDetails = data.data;
                    console.log($scope.userDetails);
                    $scope.form ={
                        userId: $scope.userDetails.userId ,
                        userName: $scope.userDetails.username ,
                        sex: $scope.userDetails.sex ,
                        birthday: $scope.userDetails.birthday ,
                        phone: $scope.userDetails.phone ,
                        roleId: $scope.userDetails.roleId ,
                        payment: $scope.userDetails.payment
                    };
                }else{
                    tools.alert('获取用户详情失败，请稍后重试。');
                }
            })



    // 修改用户详情
    $scope.changeUserInfo = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/updateByCurrentUser',
                params: {
                    username: $scope.form.userName ,
                    sex: $scope.form.sex ,
                    birthday: $scope.form.birthday ,
                    phone: $scope.form.phone ,
                    roleId: $scope.form.roleId ,
                    payment: $scope.form.payment
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改用户详情成功');
                    }else{
                        tools.alert('修改用户详情失败');
                    }

                })
        }

    }
}

// 修改个人密码
var change_user_password = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        oldPassword: '',
        newPassword: '',
        confirmPassword : ''
    };

    // 修改个人密码
    $scope.changeUserPassword = function(isValid){

        if($scope.form.newPassword !== $scope.form.confirmPassword){

            tools.alert('两次输入的密码不一致！');
            return false;
        }
        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/updatePasswordByCurrentUser',
                params: {
                    oldPassword: $scope.form.oldPassword ,
                    newPassword: $scope.form.newPassword

                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword : ''
                        };
                        tools.alert('修改个人密码成功');
                    }else{
                        tools.alert('修改个人密码失败,原因可能是：'+data.message);
                    }

                })
        }

    }
}



/**
 * ------------------------------------------------------------------
 * 用户模块 控制器
 * ------------------------------------------------------------------
 */

// 患者开卡
var add_patient = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        name: '',
        sex: '男',
        birthday: '',
        phone: '',
        cardId: '',
        native: '',
        idCardNo: '',
        address : ''
    };

    $scope.addPatient = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/patient/add',
                params: {
                    name: $scope.form.name ,
                    sex: $scope.form.sex ,
                    birthday: $scope.form.birthday ,
                    phone: $scope.form.phone ,
                    cardId: $scope.form.cardId ,
                    native_: $scope.form.native ,
                    idCardNo: $scope.form.idCardNo ,
                    address : $scope.form.address
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            name: '',
                            sex: '',
                            birthday: '',
                            phone: '',
                            cardId: '',
                            native: '',
                            idCardNo: '',
                            address : ''
                        };
                        tools.alert('添加患者成功');
                        $state.go('index.patientList');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加患者失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 患者列表
var patient_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getPatientList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/patient/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'createTime,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.patientList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取用户列表失败，请稍后重试。');
                }
            })
    }
    $scope.getPatientList();

}


// 患者详情
var patient_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        name: '',
        sex: '',
        birthday: '',
        phone: '',
        cardId: '',
        native: '',
        idCardNo: '',
        address : ''
    };

    if($stateParams.patientId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/patient/findById',
            params: {
                patientId: $stateParams.patientId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.patientDetails = data.data;
                    $scope.form ={
                        name:  $scope.patientDetails.name ,
                        sex:  $scope.patientDetails.sex ,
                        birthday:  $scope.patientDetails.birthday ,
                        phone:  $scope.patientDetails.phone ,
                        cardId:  $scope.patientDetails.cardId ,
                        native_:  $scope.patientDetails.native ,
                        idCardNo:  $scope.patientDetails.idCardNo ,
                        address :  $scope.patientDetails.address
                    };
                }else{
                    tools.alert('获取患者详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.userList');
    }


    // 修改患者详情
    $scope.changePatientDetails = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/patient/update',
                params: {
                    patientId: $stateParams.patientId,
                    name: $scope.form.name ,
                    sex: $scope.form.sex ,
                    birthday: $scope.form.birthday ,
                    phone: $scope.form.phone ,
                    native_: $scope.form.native ,
                    address : $scope.form.address
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改患者详情成功');
                    }else{
                        tools.alert('修改患者详情失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}


// 重置患者卡号
var reset_patient_card = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        newCardId : ''
    };

    if($stateParams.patientId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/patient/findById',
            params: {
                patientId: $stateParams.patientId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.patientDetails = data.data;
                }else{
                    tools.alert('获取患者详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.userList');
    }


    // 重置患者卡号
    $scope.resetPatientCard = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/patient/reset',
                params: {
                    patientId: $stateParams.patientId,
                    cardId: $scope.form.newCardId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('重置患者卡号成功');
                    }else{
                        tools.alert('重置患者卡号失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}

// 患者挂号
var patient_register = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        patientId: '',
        type: '',
        userId: '',
        payment: ''
    };

    $scope.patientRegister = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/patient/register',
                params: {
                    patientId: $scope.form.patientId ,
                    type: $scope.form.type ,
                    userId: $scope.form.userId ,
                    payment: $scope.form.payment
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            patientId: '',
                            type: '',
                            userId: '',
                            payment: ''
                        };

                        tools.alert('患者挂号成功');
                        $state.go('index.patientRegisterList');
                        $scope.submitted = false;
                    }else{
                        tools.alert('患者挂号失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 患者挂号列表
var patient_register_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;

    $scope.typeList = {
        1: '普通挂号',
        2: '职工挂号',
        3: '运动员挂号',
    }

    $scope.getPatientList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/register/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'registerId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.registerList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取用户列表失败，请稍后重试。');
                }
            })
    }
    $scope.getPatientList();

}


/**
 * ------------------------------------------------------------------
 * 体格诊断模块 控制器
 * ------------------------------------------------------------------
 */

// 添加体格诊断
var add_sign = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelSignId: '',
        secondLevelSignId: '',
        parentId: ''
    };
    $scope.getLevel = function(level,signId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelSignList = data.data;
                    }else{
                        tools.alert('获取一级体格诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findAllByParentId',
                params:{
                    parentId: signId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelSignList = data.data;
                    }else{
                        tools.alert('获取二级体格诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);


    $scope.addSign = function(isValid){

        if($scope.form.level == 1){
            $scope.form.parentId = ' ';
        }else if($scope.form.level == 2){
            $scope.form.parentId = $scope.form.firstLevelSignId;
        }else{
            $scope.form.parentId = $scope.form.secondLevelSignId;
        }

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            console.log($scope.form.parentId)
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/add',
                params: {
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form.name = '';
                        tools.alert('添加体格诊断成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加体格诊断失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 体格诊断列表
var sign_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getSignList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/sign/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'signId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.signList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取体格诊断列表失败，请稍后重试。');
                }
            })
    }
    $scope.getSignList();

}


// 体格诊断详情
var sign_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelSignId: '',
        secondLevelSignId: '',
        parentId: '',
        isChangeLevel: 0
    };
    $scope.getLevel = function(level,signId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelSignList = data.data;
                    }else{
                        tools.alert('获取一级体格诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findAllByParentId',
                params:{
                    parentId: signId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelSignList = data.data;
                    }else{
                        tools.alert('获取二级体格诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);

    if($stateParams.signId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/sign/findById',
            params: {
                signId: $stateParams.signId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.signDetails = data.data;
                    $scope.form.name =  $scope.signDetails.name;
                    $scope.form.parentId =  $scope.signDetails.parentId;
                }else{
                    tools.alert('获取体格诊断详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.signList');
    }


    // 修改患者详情
    $scope.changeSignDetails = function(isValid){

        if($scope.form.isChangeLevel == 1){
            if($scope.form.level == 1){
                $scope.form.parentId = ' ';
            }else if($scope.form.level == 2){
                $scope.form.parentId = $scope.form.firstLevelSignId;
            }else{
                $scope.form.parentId = $scope.form.secondLevelSignId;
            }
        }

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/update',
                params: {
                    signId: $stateParams.signId,
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改体格诊断详情成功');
                    }else{
                        tools.alert('修改体格诊断详情失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}


/**
 * ------------------------------------------------------------------
 * 体格诊断模块 控制器
 * ------------------------------------------------------------------
 */

// 添加体格诊断
var add_sign = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelSignId: '',
        secondLevelSignId: '',
        parentId: ''
    };
    $scope.getLevel = function(level,signId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelSignList = data.data;
                    }else{
                        tools.alert('获取一级体格诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findAllByParentId',
                params:{
                    parentId: signId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelSignList = data.data;
                    }else{
                        tools.alert('获取二级体格诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);


    $scope.addSign = function(isValid){

        if($scope.form.level == 1){
            $scope.form.parentId = ' ';
        }else if($scope.form.level == 2){
            $scope.form.parentId = $scope.form.firstLevelSignId;
        }else{
            $scope.form.parentId = $scope.form.secondLevelSignId;
        }

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            console.log($scope.form.parentId)
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/add',
                params: {
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form.name = '';
                        tools.alert('添加体格诊断成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加体格诊断失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 体格诊断列表
var sign_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getSignList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/sign/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'signId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.signList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取体格诊断列表失败，请稍后重试。');
                }
            })
    }
    $scope.getSignList();

}


// 体格诊断详情
var sign_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        level: 1,
        name: '',
        firstLevelSignId: '',
        secondLevelSignId: '',
        parentId: '',
        isChangeLevel: 0
    };
    $scope.getLevel = function(level,signId){
        if(level == 1){

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findByLevel1',
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.firstLevelSignList = data.data;
                    }else{
                        tools.alert('获取一级体格诊断列表失败，请稍后重试。');
                    }
                })
        }else{

            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/findAllByParentId',
                params:{
                    parentId: signId,
                    page: 0,
                    size: 100,
                    sort: 'name,desc'
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.secondLevelSignList = data.data;
                    }else{
                        tools.alert('获取二级体格诊断列表失败，请稍后重试。');
                    }
                })
        }
    }
    $scope.getLevel(1);

    if($stateParams.signId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/sign/findById',
            params: {
                signId: $stateParams.signId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.signDetails = data.data;
                    $scope.form.name =  $scope.signDetails.name;
                    $scope.form.parentId =  $scope.signDetails.parentId;
                }else{
                    tools.alert('获取体格诊断详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.signList');
    }


    // 修改患者详情
    $scope.changeSignDetails = function(isValid){

        if($scope.form.isChangeLevel == 1){
            if($scope.form.level == 1){
                $scope.form.parentId = ' ';
            }else if($scope.form.level == 2){
                $scope.form.parentId = $scope.form.firstLevelSignId;
            }else{
                $scope.form.parentId = $scope.form.secondLevelSignId;
            }
        }

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/sign/update',
                params: {
                    signId: $stateParams.signId,
                    name: $scope.form.name ,
                    parentId: $scope.form.parentId
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改体格诊断详情成功');
                    }else{
                        tools.alert('修改体格诊断详情失败，原因可能是：'+ data.message);
                    }

                })
        }

    }
}


/**
 * ------------------------------------------------------------------
 * 用户模块 控制器
 * ------------------------------------------------------------------
 */

// 添加用户
var add_user = function($scope, $rootScope,$state, $http,tools, ENV) {

    $scope.form ={
        userName: '',
        sex: '',
        birthday: '',
        phone: '',
        roleId: '',
        password: '',
        payment: ''
    };

    $scope.addUser = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            console.info(isValid);
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/add',
                params: {
                    username: $scope.form.userName,
                    sex: $scope.form.sex,
                    birthday: $scope.form.birthday,
                    phone: $scope.form.phone,
                    roleId: $scope.form.roleId,
                    password: $scope.form.password,
                    payment: $scope.form.payment
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        $scope.form ={
                            userName: '',
                            sex: '',
                            birthday: '',
                            phone: '',
                            roleId: '',
                            password: '',
                            payment: ''
                        };
                        tools.alert('添加用户成功');
                        $scope.submitted = false;
                    }else{
                        tools.alert('添加用户失败，原因可能是：'+data.message);
                    }

                })
        }
    }
}

// 用户列表
var user_list = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.pageNum = $stateParams.pageNum ? $stateParams.pageNum: 0;


    $scope.getUserList = function(){
        $http({
            method: 'GET',
            url: ENV.baseUrl + '/user/findAll',
            params: {
                page: $scope.pageNum,
                size:  5,
                sort:  'userId,desc'
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.userList = data.data;
                    $scope.pageList = tools.splitPage(data.page.number, data.page.totalPages);
                }else{
                    tools.alert('获取用户列表失败，请稍后重试。');
                }
            })
    }
    $scope.getUserList();


    $scope.disableUser = function(userId){

        tools.confirm('请确认是否要禁用该用户？',function(){
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/disable',
                params: {
                    userId: userId,
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('禁止用户成功');
                        $scope.getUserList();
                    }else{
                        tools.alert('禁止用户失败');
                    }

                })
        })
    }

    $scope.enableUser = function(userId){

        tools.confirm('请确认是否要恢复该用户？',function(){
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/enable',
                params: {
                    userId: userId,
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('恢复用户成功');
                        $scope.getUserList();
                    }else{
                        tools.alert('恢复用户失败');
                    }

                })
        })
    }
}


// 用户详情
var user_details = function($scope, $rootScope,$state,$stateParams, $http,tools, ENV) {

    $scope.form ={
        userId : '',
        userName: '',
        sex: '',
        birthday: '',
        phone: '',
        roleId: '',
        password: '',
        payment: ''
    };

    if($stateParams.userId){

        $http({
            method: 'GET',
            url: ENV.baseUrl + '/user/findById',
            params: {
                userId: $stateParams.userId
            }
        })
            .success(function(data) {
                if(data.state == true){
                    $scope.userDetails = data.data;
                    $scope.form ={
                        userId : $scope.userDetails.userId ,
                        userName: $scope.userDetails.username ,
                        sex: $scope.userDetails.sex ,
                        birthday: $scope.userDetails.birthday ,
                        phone: $scope.userDetails.phone ,
                        roleId: $scope.userDetails.roleId ,
                        password: '',
                        payment: $scope.userDetails.payment
                    };
                }else{
                    tools.alert('获取用户详情失败，请稍后重试。');
                }
            })
    }else{
        tools.alert('非法操作！');
        $state.go('index.userList');
    }


    // 修改用户详情
    $scope.changeUserDetails = function(isValid){

        $scope.submitted = true;
        if(!isValid){
            tools.alert('表单未填写正确！请确认填写完毕后再提交。');
        }else{
            $http({
                method: 'GET',
                url: ENV.baseUrl + '/user/update',
                params: {
                    userId: $stateParams.userId,
                    username: $scope.form.userName ,
                    sex: $scope.form.sex ,
                    birthday: $scope.form.birthday ,
                    phone: $scope.form.phone ,
                    roleId: $scope.form.roleId ,
                    password: $scope.form.password ,
                    payment: $scope.form.payment
                }
            })
                .success(function(data) {
                    if(data.state == true){
                        tools.alert('修改用户详情成功');
                    }else{
                        tools.alert('修改用户详情失败');
                    }

                })
        }

    }
}

