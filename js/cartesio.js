//UTILITY
function getCssProperty(elmId, property){
   var elem = document.getElementById(elmId);
   return window.getComputedStyle(elem,null).getPropertyValue(property);
}






//MOVIMENTO


var requestId;
var c1xf, x2xf, provvisorio, impatto;

function loop() {
    var c1 = document.getElementById('c1');
    var c2 = document.getElementById('c2');

    c1xf = c1xf + (app.v1/100*app.s);
    c2xf = c2xf + (app.v2/100*app.s);

    if (Math.abs(c1xf - c2xf)<=200 && !impatto) {
      impatto=true;
      console.log('sbang!!');
      sbang();
      app.vf1=app.v1;
      app.vf2=app.v2;
    }

    c1.style.left = parseInt(c1xf) +'px';
    c2.style.left = parseInt(c2xf) +'px';

    requestId = window.requestAnimationFrame(loop);
}

function start() {
    c1xf = parseInt(getCssProperty("c1", "left"));
    c2xf = parseInt(getCssProperty("c2", "left"));
    impatto = false;
    app.vi1=app.v1;
    app.vi2=app.v2;

    if (!requestId) {
       loop();
    }
}

function stop() {
    if (requestId) {
       window.cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}

function reset() {
   c1.style.left = '100px';
   c2.style.left = '500px';
   app.v1 = app.vi1;
   app.v2 = app.vi2;

}

//funzione per meccanica dopo l'urto

function sbang () {
  if (app.fisica == 'cartesio') {

    if((app.v1>0 && app.v2<0 )||(app.v1<0 && app.v2>0)) {// nel caso le direzioni siano opposte:
      if (app.v1 == -app.v2 && app.m1 == app.m2){
        app.v1=-app.v1;
        app.v2=-app.v2;
        app.soluzione=1;

      } else if (app.v1 == -app.v2 && app.m1 > app.m2){
        if (app.v1>0){
          app.v1=((app.v1*app.v1 + app.v2*app.v2)/(parseInt(app.m1)+parseInt(app.m2)));
          app.v2=app.v1;
        }
        if (app.v1<0){
          app.v1=-((app.v1*app.v1 + app.v2*app.v2)/(parseInt(app.m1)+parseInt(app.m2)));
          app.v2=app.v1;
        }
        app.soluzione=2;

      } else if (app.v1 == -app.v2 && app.m2 > app.m1){
        if (app.v2>0){
          app.v1=((app.v1*app.v1 + app.v2*app.v2)/(parseInt(app.m1)+parseInt(app.m2)))/100;
          app.v2=app.v1;
        }
        if (app.v2<0){
          app.v1=-((app.v1*app.v1 + app.v2*app.v2)/(parseInt(app.m1)+parseInt(app.m2)))/100;
          app.v2=app.v1;
        }
        app.soluzione=2;
      } else if (Math.abs(app.v1) > Math.abs(app.v2) && app.m1 == app.m2) {
        if (app.v1>0){
        app.v1 = (Math.abs(app.v1) + Math.abs(app.v2) )/2;
        } else {
        app.v1 = -(Math.abs(app.v1) + Math.abs(app.v2) )/2;
        }
        app.v2 = app.v1;
        app.soluzione=3;
      } else if (Math.abs(app.v2) > Math.abs(app.v1) && app.m1 == app.m2) {
        if (app.v2>0){
        app.v2 = (Math.abs(app.v1) + Math.abs(app.v2) )/2;
        } else {
        app.v2 = -(Math.abs(app.v1) + Math.abs(app.v2) )/2;
        }
        app.v1 = app.v2;
        app.soluzione=3;
      }
    } else if (app.v1==0 || app.v2==0) {
      if (app.m1 < app.m2 && Math.abs(app.v1)>0){
        app.v1=-app.v1;
        app.soluzione=4;
      } else if (app.m2 < app.m1 && Math.abs(app.v2)>0){
        app.v2=-app.v2;
        app.soluzione=4;
      }
      if (app.m2 > app.m1 && Math.abs(app.v2)>0){
        app.v2=app.v2*app.m2/(parseInt(app.m1)+parseInt(app.m2));
        app.v1=app.v2;
        app.soluzione=5;
      } else if (app.m1 > app.m2 && Math.abs(app.v1)>0){
        app.v1=app.v1*app.m1/(parseInt(app.m1)+parseInt(app.m2));
        app.v2=app.v1;
        app.soluzione=5;
      }
      if(app.m1 == app.m2 && Math.abs(app.v1)>0){
        provvisorio = app.v1;
        app.v1 = 0 - (provvisorio * 3 / 4);
        app.v2 = (provvisorio / 4);
        app.soluzione=6;
      } else if(app.m1 == app.m2 && Math.abs(app.v2)>0){
        provvisorio = - app.v2;
        app.v2 = - provvisorio * 3 / 4;
        app.v1 = provvisorio / 4;
        app.soluzione=6;

      } else {
        app.soluzione=12;
      }

    } else if ((app.v1>0 && app.v2>0) || (app.v1<0 && app.v2 <0) ){

      if (Math.abs(app.v1) > Math.abs(app.v2)  && app.m1 > app.m2) {
        app.v1=(app.m1*app.v1 + app.m2*app.v2)/(parseInt(app.m1) + parseInt(app.m2));
        app.v2=app.v1;
        app.soluzione=7;
      } else if ((app.m1 < app.m2 && ((app.m2/app.m1)>(app.v1/app.v2))) || (app.m1 > app.m2 && ((app.m2/app.m1)<(app.v1/app.v2))) ){
        if (Math.abs(app.v2) < Math.abs(app.v1)) {
          app.v1=-app.v1;
        } else if (Math.abs(app.v2) > Math.abs(app.v1)) {
          app.v2=-app.v2;
        }
        app.soluzione=8;
      } else if ((app.m1 < app.m2 && ((app.m2/app.m1)==(app.v1/app.v2))) || (app.m1 > app.m2 && ((app.m2/app.m1)==(app.v1/app.v2))) ){
        app.soluzione=9;
        if (Math.abs(app.v2) < Math.abs(app.v1)) {
          if (app.v1 > 0) {
            app.v1 = -app.v1-3;
            app.v2 = app.v2+3;
          } else {
            app.v1 = -app.v1+3;
            app.v2 = app.v2-3;
          }
        } else if (Math.abs(app.v2) > Math.abs(app.v1)) {
          if (app.v2 > 0) {
            app.v2 = -app.v2-3;
            app.v1 = app.v1+3;
          } else {
            app.v2 = -app.v2+3;
            app.v1 = app.v1-3;
          }
        }
      }
    }
  } else if (app.fisica == 'newton1'){
    var v1, v2;
    v1 = app.v1;
    v2 = app.v2;

    console.log(((app.m1 - app.m2) * v1 ) + (2 * app.m2 * v2 ));

    app.v1 = ( (app.m1 - app.m2) * v1 + 2 * app.m2 * v2 ) / ( parseInt(app.m1) + parseInt(app.m2) );
    app.v2 = ( (app.m2 - app.m1) * v2 + 2 * app.m1 * v1 ) / ( parseInt(app.m1) + parseInt(app.m2) );

    app.soluzione=10;

  } else if (app.fisica == 'newton2'){
      app.v1 = (app.v1*app.m1 + app.v2*app.m2) / (parseInt(app.m1) + parseInt(app.m2))
      app.v2 = app.v1;

    app.soluzione=11;

  }



}
