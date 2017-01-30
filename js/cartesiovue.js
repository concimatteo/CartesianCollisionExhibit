var app = new Vue({
  el: '#main',
  data: {
    v1: 20,
    v2: 0,
    m1: 20,
    m2: 20,
    s: 20,
    fisica: 'cartesio',
    soluzione: 0,
    preset:1,
    vi1:0,
    vi2:0,
    vf1:0,
    vf2:0
  },
  computed: {
    cl1: function () {
      if(this.v1 < 0) {
        return parseInt(98 + parseInt(this.v1));
      } else {
        return 98;
      }
    },
    cl2: function () {
      if(this.v2 < 0) {
        return parseInt(98 + parseInt(this.v2));
      } else {
        return 98;
      }
    },
    cm1: function() {
      return 'rgba(0,0,0,' + (this.m1/100) + ')';
    },
    cm2: function() {
      return 'rgba(0,0,0,' + (this.m2/100) + ')';
    },
    cisV1: function () {
      if (this.v1>0){
        return true;
      } else return false;
    },
    cisV2:function(){
      if (this.v2>0){
        return true;
      } else return false;
    },
    csoluzione: function() {
      return "soluzione"+this.soluzione;
    },
    ctestosoluzione: function() {
      if (this.soluzione == 0 ){
        return "Nessuna soluzione trovata"
      } else if (this.soluzione < 7 ) {
        return "Caso " + this.soluzione;
      } else if (this.soluzione == 7 ){
        return "Caso 7a";
      } else if (this.soluzione == 8 ){
        return "Caso 7b";
      } else if (this.soluzione == 9 ){
        return "Caso 7c";
      }  else if (this.soluzione == 10 ){
        return "Urti elastici";
      }  else if (this.soluzione == 11 ){
        return "Urti anaelastici";
      }  else if (this.soluzione == 12 ){
        return "Altri casi";
      }
    }
  },
  methods: {
    changepreset: function (event) {
      set = new Array();

      set[1]= new Array(40,60,-40,60);
      set[2]= new Array(40,80,-40,60);
      set[3]= new Array(60,60,-30,60);
      set[4]= new Array(50,30,0,70);
      set[5]= new Array(50,70,0,30);
      set[6]= new Array(59,60,0,60);
      set[7]= new Array(40,80,15,20);
      set[8]= new Array(40,20,15,80);
      set[9]= new Array(60,20,20,60);


      this.v1 = set[this.preset][0];
      this.vi1 = set[this.preset][0];
      this.m1 = set[this.preset][1];
      this.v2 = set[this.preset][2];
      this.vi2 = set[this.preset][2];
      this.m2 = set[this.preset][3];

    },
    speedmodify: function(){
      this.vi1=this.v1;
      this.vi2=this.v2;
    }
  }
});

Vue.filter('decimal', function (value) {
  return  parseInt(value * 10)/10;
})
