class Customer {
    constructor(number, element) { //nember:その人が列の何番目にいるか, taken_tiem:処理にかかる時間
        this.element = element;
        this.number = number;
        // this.taken_time = taken_time;
    }
}

let k = 0; //待ち人数
let M = 5;  //窓口数
let ALF = 1; //流れ密度
let DEL = 8; //平均処理時間
let SIG = .5; //処理時間のばらつき
let EPS = .000001; //log計算時のバイアス
let regi = new Array(20); //窓口の配列
let b = []; //行列の配列
let ans = 0.0; //平均待ち時間
let time = 0.0; //プログラム内の現在時刻
const regi_enter = { //客が窓口でサービスを受ける座標
    x: [60, 170, 280, 390, 500, 610, 720, 830, 940, 1050],
    y: [650, 650, 650, 650, 650, 650, 650, 650, 650]
}
const retu_location = {
    x: [610, 610, 680, 750, 820, 890, 970, 1040, 1110, 1170, 1240, 1310, 1380, 1450, 1520, 1590, 1660, 1730, 1800, 1870],
    y: [580, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500]
}

function main() {
    let elements = [];
    for (let i = 1; i <= 20; i++) {
        elements.push(document.querySelector('#customer' + i));
    }
    console.log(elements);


    //console.log("試行回数   平均待ち時間");
    for (let i = 0; i < 20; i++) {
        regi[i] = 0;
    }

    // for (i = 1; i <= 30000; i++) {
    setInterval(() => {
        time += poison();
        //console.log( {time} );
        console.log({ time, regi });
        ans = tim(ans, time, regi, b);
        cll(time, regi);
        sentaku(time, regi, b, elements);



        // //解答打ち出し
        // if (i % 2000 == 0) {
        //     let answer = ans / i;
        //     //console.log({ i, answer });
        // }
    }, 2000);
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
        if (regi[j].number < time) {
            regi[j].element.style.left = '2000px';
            regi[j].element.style.top = '2000px';
            regi[j] = 0;  // レジを終えて退場
            return;
        }
    }
}

/**
 * 最短空き窓口
 * @param {Object} regi 窓口の配列
 * @returns number 最も早く処理が終わる窓口の番号
 */
function minimum(regi) {
    let min = 0;
    for (let p = 0; p < M; p++) {
        if (regi[p].number < regi[min].number)
            min = p;
    }
    return min;
}

//待ち解除ルーチン
function tim(ans, time, regi, b) {
    for (let j of b) {
        let min = minimum(regi);

        if (regi[min].number < time) {
            ans += regi[min].number - b[0].number;
            //            regi[min].number += gauss();
            regi[min] = b.shift();
            for( let i in b) {
                b[i].element.style.left = `'${retu_location[i]}px'`;
            };
        }
    }
    return ans;
}

//窓口選択ルーチン
function sentaku(t, regi, b, elements) {
    for (let j = 0; j < M; j++) {
        if (regi[j] == 0) {
            ///let gg = gauss();
            //console.log( {j, gg, t}); //デバック用
            regi[j] = new Customer(t + gauss(), elements.shift());
            let enter = j;
            console.log(enter + "に入りました");
            /* 窓口に入るアニメーション */
            regi[j].element.style.left = `${regi_enter.x[j]}px`;
            regi[j].element.style.top = `${regi_enter.y[j]}px`;


            return;
        }
    }
    b.push(new Customer(t, elements.shift()));
    return;
}

function poison() {
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


