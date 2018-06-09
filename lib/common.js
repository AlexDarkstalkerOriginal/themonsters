var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://mainnet.nebulas.io"));

var NebPay = require("nebpay");   
var nebPay = new NebPay();
var dappAddress = "n1jrcnp3DwmyBzT72t66R2MxZbaK3JiBJwX";

var hash_value = '';

var vm = new Vue({
  el: '.app',
  data: {      
    market: false,
    lab: true,    
    battleground: false,
    rank: false,
    lab_monsters: true,
    lab_gift: false,
    congrat: false, 
    versus: false,
    lab_nav: true,
    monster_page: false,
    no_monsters: false,  
    congrat_name: '',
    monsters: [],
    my_monsters: [],
    monsters_gift: [],  
    monsters_market: [],  
  },
})  

// монстер маркет
    Vue.component('monster-market', {
    props: ['name','id'],
    template: '<div class="monster">\
                <h3> МАРКЕТ {{name}} {{id}}</h3>\
                <img src="img/chicken.png" alt="">\
                <span class="prize">100</span><a href="#" class="info"><img src="img/info.png" alt=""></a>\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">13</span></span>\
                  <span class="agility">agility: <span class="value">13</span></span>\
                  <span class="power">power: <span class="value">13</span></span>\
                </div>\
                <span class="owner">owner <span class="value">n1UKWyKoDtMdmsomgQmsDa2rPMWLKVfEYp1</span></span>\
                <span class="weight">6.8 kg</span>\
                <button class="buy">Buy</button>\
              </div>',
  })

// монстер маркет

// мои монстры лаб
  Vue.component('my-monster-lab', {
    props: ['speed','name', 'flex', 'power', 'weight', 'src'],           
    template: '<div class="monster">\
                <div class="name"><h3>{{name}}</h3><a href="#" class="edit"><img src="img/edit.png" alt=""></a></div>\
                <img src={{src}}  .png alt="">\
                <a href="#" class="info"><img src="img/info.png" alt=""></a>\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">{{speed}}</span></span>\
                  <span class="agility">agility: <span class="value">{{flex}}</span></span>\
                  <span class="power">power: <span class="value">{{power}}</span></span>\
                </div>\
                <span class="weight">{{weight}} kg</span>\
                <button class="sell">Sell</button>\
              </div>',
  })
// мои монстры лаб

// монстр из коробки
  var gift_monster_component = Vue.component('monster-gift', {
    props: ['speed','name', 'flex', 'power', 'weight'],           
    template: '<div class="monster">\
                <div class="name"><h3>{{name}}</h3><a href="#" class="edit"><img src="img/edit.png" alt=""></a></div>\
                <img src="img/{{name}}.png" alt="">\
                <a href="#" class="info"><img src="img/info.png" alt=""></a>\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">{{ speed }}</span></span>\
                  <span class="agility">agility: <span class="value">{{ flex }}</span></span>\
                  <span class="power">power: <span class="value">{{ power }}</span></span>\
                </div>\
                <span class="weight">{{weight}} kg</span>\
                <button class="sell">Sell</button>\
              </div>',
  })

  // var gift_vm = new Vue({ 
  //   el: '#monster-gift',
  //   data: {    
  //       monsters: [
  //           { speed: '228', name: 'Pinky' },
  //           { speed: '1488', name: 'Hui' },        
  //         ],  
  //    } 
  // })  
// монстр из коробки

// монстр батлграунд

  new Vue({ 
    el: '#monster-bg',
    data: {
      monsters: [
        { id: 1, name: 'Pinky' },
        { id: 2, name: 'Yooo' },
        { id: 3, name: 'Mooo' }
      ]  
    }
  })

  Vue.component('monster-bg', {
    props: ['name','id'],
    template: '<div class="monster">\
                <h3>БАТЛ {{name}} {{id}}</h3>\
                <img src="img/chicken.png" alt="">\
                <a href="#" class="info"><img src="img/info.png" alt=""></a>\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">13</span></span>\
                  <span class="agility">agility: <span class="value">13</span></span>\
                  <span class="power">power: <span class="value">13</span></span>\
                </div>\
                <span class="owner">owner <span class="value">n1UKWyKoDtMdmsomgQmsDa2rPMWLKVfEYp1</span></span>\
                <span class="weight">6.8 kg</span>\
                <a href="#my_monsters_popup" class="popup"><button class="attack">Attack</button></a>\
              </div>  ',
              // <button class="freeze">Freeze</button>         
  })
// монстр батлграунд

// монстр ранкед
  new Vue({ 
    el: '#monster-ranked',
    data: {
      monsters: [
        { id: 1, name: 'Pinky' },
        { id: 2, name: 'Yooo' },
        { id: 3, name: 'Mooo' }
      ]  
    }
  })

  Vue.component('monster-ranked', {
    props: ['name','id'],
    template: '<div class="monster">\
                <div class="name">\
                  <span class="place">1</span>\
                  <h3>Chicken</h3>\
                </div>\
                <img src="img/chicken.png" alt="">\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">13</span></span>\
                  <span class="agility">agility: <span class="value">13</span></span>\
                  <span class="power">power: <span class="value">13</span></span>\
                </div>\
                <span class="owner">owner <span class="value">n1UKWyKoDtMdmsomgQmsDa2rPMWLKVfEYp1</span></span>\
                <span class="weight">6.8 kg</span>\
              </div>',
  })
// монстр ранкед

// мои монстры лаб попап
  new Vue({ 
    el: '#my-monster-lab-popup',
    data: {
      monsters: [
        { id: 1, name: 'Pinky' },
        { id: 2, name: 'Yooo' },
        { id: 3, name: 'Mooo' }
      ]  
    }
  })

  Vue.component('my-monster-lab-popup', {
    props: ['name','id'],
    template: '<div class="monster">\
                <div class="name"><h3>ЛАБ {{name}} {{id}}</h3><a href="#" class="edit"><img src="img/edit.png" alt=""></a></div>\
                <img src="img/pink.png" alt="">\
                <a href="#" class="info"><img src="img/info.png" alt=""></a>\
                <div class="stats">\
                  <span class="speed">speed: <span class="value">13</span></span>\
                  <span class="agility">agility: <span class="value">13</span></span>\
                  <span class="power">power: <span class="value">13</span></span>\
                </div>\
                <span class="weight">6.8 kg</span>\
                <button class="pick">Pick</button>\
              </div>',
  })
// мои монстры лаб попап



// переключение табов
  $('.nav button').click(function(){

    if ($(this).hasClass('market')) {
        vm.market = true;      
        vm.lab = false;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('lab')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = true;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('battleground')) {
        vm.market = false;      
        vm.lab = false;
        vm.battleground = true;
        vm.rank = false;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('rank')) {
        vm.market = false;      
        vm.lab = false;
        vm.battleground = false;
        vm.rank = true;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.no_monsters = false;
        vm.congrat = false;
    }

    $('.lab_nav').hide();
    
    if ($(this).hasClass('lab')) {
      $('.lab_nav').show();
    };

    if ($(this).hasClass('active')) {
      return false;
    };    

    $('.nav button').removeClass('active');
    $(this).addClass('active');
  })


  $('.lab_nav button').click(function(){

    if ($(this).hasClass('lab_monsters')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = true;
        vm.lab_gift = false;
        vm.no_monsters = false;
        vm.congrat = false;
    } else if ($(this).hasClass('lab_gift')) {
        vm.market = false;      
        vm.lab = true;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = true;
        vm.lab_monsters = false;
        vm.lab_gift = true;
        vm.no_monsters = false;
        vm.congrat = false;
      };
    if ($(this).hasClass('active')) {
      return false;
    }
    $('.lab_nav button').removeClass('active');
    $(this).addClass('active');
  })
// переключение табов

// попапы
  $('.popup').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   

  $('.transaction').magnificPopup({
    type:'inline',
    fixedContentPos: true, 
    mainClass: 'mfp-fade',      
    showCloseBtn: true,
    closeOnBgClick: false
  });   
// попапы

// онлоад
  window.onload = function(){         
    if(typeof(webExtensionWallet) === "undefined"){     
          $(".noExtension").show();   
          $(".content").hide();
      }else{
      }
  };  
// онлоад

// страница монстра и боя

  $('.monster .info').click(function(){
    vm.market = false;      
    vm.lab = false;
    vm.battleground = false;
    vm.rank = false;
    vm.lab_nav = false;
    vm.lab_monsters = false;
    vm.lab_gift = false;
    vm.monster_page = true;
    vm.versus = false;
    vm.congrat = false;
  })

  $('.history .info').click(function(){
    vm.market = false;      
    vm.lab = false;
    vm.battleground = false;
    vm.rank = false;
    vm.lab_nav = false;
    vm.lab_monsters = false;
    vm.lab_gift = false;
    vm.monster_page = false;
    vm.versus = true;
    vm.congrat = false;
  })

// страница монстра и боя


// нет монстра 
  $('.fake_gift').click(function(){
    $('.lab_gift').trigger('click');    
  })

  $('.fake_market').click(function(){
    $('.nav .market').trigger('click');    
  })
// нет монстра

// гет гифт монстра
  $('.get_free_monster').click(function(){
    var to = dappAddress;
    var value = 0;
    var callFunction = 'buyFreeBox';
    var callArgs = "[]";        
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
      listener: cbBuyFreeСheck            
    });
  })

  function cbBuyFreeСheck(resp) {        
    if (resp.result == 'true') {      
        $('.gift_box .error h1').html('');
        var to = dappAddress;
        var value = 0;
        var callFunction = 'buyFreeBox';
        var callArgs = "[]";        
        nebPay.call(to, value, callFunction, callArgs, { 
          listener: cbTransactionGetBox           
        });
    } else {
      $('.gift_box .error h1').html(resp.result);
    }
  }

  function cbCongrat(resp) {
    var gift_monster = JSON.parse(resp.result);    
    gift_monster[gift_monster.length - 1].flex = Math.round(gift_monster[gift_monster.length - 1].flex);
    gift_monster[gift_monster.length - 1].power = Math.round(gift_monster[gift_monster.length - 1].power);
    vm.monsters_gift.push(gift_monster[gift_monster.length - 1]);
    vm.congrat_name = gift_monster[gift_monster.length - 1].name;
   } 
// гет гифт монстра

// гет мои монстров
  $(document).ready(function(){
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getMyMonsters';
      var callArgs = "[]";    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbMyMonsters              
      });    
  })

  $('.lab_monsters').click(function(){
      var to = dappAddress;
      var value = 0;
      var callFunction = 'getMyMonsters';
      var callArgs = "[]";    
      nebPay.simulateCall(to, value, callFunction, callArgs, { 
        listener: cbMyMonsters              
      });    
  })

  function cbMyMonsters(resp) {        
    if (resp.result == '[]') {      
      vm.market = false;      
      vm.lab = false;
      vm.battleground = false;
      vm.rank = false;
      vm.lab_nav = true;
      vm.lab_monsters = false;
      vm.lab_gift = false;
      vm.no_monsters = true;
    } else {
      console.log('mymonsters ' + JSON.stringify(resp)); 
      var mymonsters_arr = JSON.parse(resp.result);
      console.log('mymonsters_arr ' + mymonsters_arr);
      $.each(mymonsters_arr,function(index,value){    
        mymonsters_arr[index].flex = Math.round(mymonsters_arr[index].flex);
        mymonsters_arr[index].power = Math.round(mymonsters_arr[index].power);
        vm.my_monsters.push(mymonsters_arr[index]);
      });
    }


  }
// гет мои монстров

// обработчик транзакций
  function cbTransactionGetBox(resp) {    
    hash_value = resp.txhash;    
    if (resp.txhash == undefined) {
     } else {
      $('.transaction').trigger('click');
      $('.hash').html('txHash: <p>' + hash_value + '</p>');           
    } 

    var reload_trans = setInterval(function(){
      neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
        result_trans = receipt.status;        
      if (result_trans == 1) {
        $('#transaction .status_trans').html('<p style="color: green"> sucess </p>');                                  
        setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);                            
        vm.market = false;      
        vm.lab = false;
        vm.battleground = false;
        vm.rank = false;
        vm.lab_nav = false;
        vm.lab_monsters = false;
        vm.lab_gift = false;
        vm.monster_page = false;
        vm.versus = false;
        vm.congrat = true;
        var to = dappAddress;
        var value = 0;
        var callFunction = 'getMyMonsters';
        var callArgs = "[]";        
        nebPay.simulateCall(to, value, callFunction, callArgs, { 
          listener: cbCongrat            
        });

        clearInterval(reload_trans);                          
      } else if (result_trans == 2) {
        $('#transaction .status_trans').html('<p style="color: orange"> pending </p>');
      } else {
        $('#transaction .status_trans').html('<p style="color: red"> fail </p>');                        
        setTimeout(function(){ $('#transaction button').trigger('click') } , 1500);          
        clearInterval(reload_trans);          
      }
    })}, 1000);  
  } 
// обработчик транзакций