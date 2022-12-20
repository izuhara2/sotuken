let k = 0; //待ち人数
let M = 5;  //窓口数
let ALF = 1; //流れ密度
let DEL = 8; //平均処理時間
let SIG = .5; //処理時間のばらつき
let EPS = .000001; //log計算時のバイアス
let regi = new Array(20);
let b = new Array(200);
let ans = 0.0;
let time = 0.0;

function main() {
    let i;

    //console.log("試行回数   平均待ち時間");
    for (i = 0; i < 20; i++) {
        regi[i] = 0.0;
    }
    for (i = 0; i < 200; i++) {
        b[i] = 0.0;
    }

    for (i = 1; i <= 30000; i++) {
        time += poison(time);
        //console.log( {time} );
        console.log({ time, regi });
        ans = tim(ans, time, regi, b);
        cll(time, regi);
        sentaku(time, regi, b);



        //解答打ち出し
        if (i % 2000 == 0) {
            let answer = ans / i;
            //console.log({ i, answer });
        }
    }
    return 0;
}

function gauss() {
    let del = 0.0;

    for (let p = 0; p < 12; p++) {
        del += Math.random();
    }
    return (DEL + SIG * (del - 6.0));
}

//空き窓口ルーチン
function cll(time, regi) {
    for (let j = 0; j < M; j++) {        //jは窓口数と比較
        if (regi[j] < time) {
            regi[j] = 0.0;
            return;
        }
    }
}

//最短空き窓口
function minimum(regi) {
    let min = M;
    regi[min] = 100000.;
    for (let p = 0; p < M; p++) {
        if (regi[min] > regi[p])
            min = p;
    }
    return min;
}

//待ち解除ルーチン
function tim(ans, time, regi, b) {
    for (let j = 0; j < k; j++) {
        let min = minimum(regi);

        let dummy_a2 = regi[min];
        //console.log( {a, dummy_a2, time });
        if (regi[min] < time) {
            ans += regi[min] - b[0];
            let dummy_a = regi[min];
            let dummy_b = b[0];
            //console.log( {ans, dummy_a, dummy_b } ); //デバック用
            regi[min] += gauss();
            let aki = min
            console.log(aki + "が空き，新たに入りました");
            /* 窓口から出る＋新たに入るアニメーション */
            function moveImage() {
                let x = 0;
                let y = 0;
                 if (aki == 0) {
                    x = 60;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 1){
                    x = 170;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 2){
                    x = 280;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 3){
                    x = 390;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 4){
                    x = 500;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 5){
                    x = 610;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 6){
                    x = 720;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 7){
                    x = 830;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 8){
                    x = 940;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(aki == 9){
                    x = 1050;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }
            }
            k--;
            let l;
            for (l = 0; l < k; l++) {
                b[l] = b[l + 1];
            }
            b[l + 1] = 0.0;
        }
    }
    return ans;
}

//窓口選択ルーチン
function sentaku(t, regi, b) {
    for (let j = 0; j < M; j++) {
        if (regi[j] == 0.0) {
            ///let gg = gauss();
            //console.log( {j, gg, t}); //デバック用
            regi[j] = t + gauss();
            let enter = j;
            console.log(enter + "に入りました");
            /* 窓口に入るアニメーション */
            function enterImage() {
                let x = 0;
                let y = 0;
                if (enter == 0) {
                    x = 60;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 1){
                    x = 170;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 2){
                    x = 280;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 3){
                    x = 390;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 4){
                    x = 500;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 5){
                    x = 610;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 6){
                    x = 720;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 7){
                    x = 830;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 8){
                    x = 940;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }else if(enter == 9){
                    x = 1050;
                    y = 200;
                    document.querySelector('#customer01').style.left = x;
                    document.querySelector('#customer01').style.top = y;
                }
            }
            return;
        }
    }
    b[k] = t;
    k++;
    return;
}

function poison(t) {
    let taw = -Math.log(Math.random() + EPS) / ALF;
    return taw;
}

/* アニメーション部 */
if (typeof window === 'object') {      //document.querySelectorでエラーがでたため
    //documentを使う関数を入れる
    const anime = document.querySelector('#anime');
    const madogui = anime.getContext('2d');
    madogui.strokeRect(60, 220, 80, 80);//窓口0
    madogui.strokeRect(170, 220, 80, 80);//窓口1
    madogui.strokeRect(280, 220, 80, 80);//窓口2
    madogui.strokeRect(390, 220, 80, 80);//窓口3
    madogui.strokeRect(500, 220, 80, 80);//窓口4
    madogui.strokeRect(610, 220, 80, 80);//窓口5
    madogui.strokeRect(720, 220, 80, 80);//窓口6
    madogui.strokeRect(830, 220, 80, 80);//窓口7
    madogui.strokeRect(940, 220, 80, 80);//窓口8
    madogui.strokeRect(1050, 220, 80, 80);//窓口9

}

// window.onload = ()=>{
//     // canvas準備
//     const board = document.querySelector("#anime");  //getElementById()等でも可。オブジェクトが取れれば良い。
//     const ctx = board.getContext("2d");

//     // 画像読み込み
//     const customer = new Image();
//     customer.src = "/img/customer_woman.jpg";  // 画像のURLを指定
//     customer.onload = () => {
//       ctx.drawImage(customer, 610, 0, 120, 80);
//     };
//   };

/*スタートボタン押された時の処理*/
// str.addEventListener("click", function () { 

//   })

main();

