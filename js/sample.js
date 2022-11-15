/**
 * スライダとその値を表示する領域を制御するクラス
 */
class slider_parameter{
    /**
     * コンストラクタ
     * @param {HTMLInputElement} slider 人間が操作するスライダ
     * @param {HTMLInputElement} output 値を表示する要素
     */
    constructor(slider, output){
        this.slider = slider;
        this.output = output;
        this.slider_value = 0;
        slider.addEventListener('change',(event)=>{
            this.slider_value = event.target.value;
            this.output.innerText = this.slider_value;
        })
    }
}

let slider1 = new slider_parameter(
    document.querySelector('#slider1'),
    document.querySelector('#processing_time')//平均処理時間
);

let slider2 = new slider_parameter(
    document.querySelector('#slider2'),
    document.querySelector('#deviation')//処理時間のばらつき
)

let slider3 = new slider_parameter(
    document.querySelector('#slider3'),
    document.querySelector( '#flow' ) //流れ密度
)

/*グラフ領域の作成*/
window.addEventListener("load", function(){
    var element = document.getElementById('graph');
    var context = element.getContext('2d');
    console.log(context);
    context.beginPath();
    context.moveTo(25,0);
    context.lineTo(25,350);
    context.stroke();

    context.beginPath();
    context.moveTo(0,280);
    context.lineTo(500,280);
    context.stroke();
});

/* 窓口平均待ち時間算出　*/
let k = 0; //待ち人数
let M=10;
let ALF=1;
let DEL=4;
let SIG=0.5;
let EPS=0.000001;

function main(){
    let ans = 0.0, time = 0.0;
    let a=new Array(20);
    let b=new Array(200);
    let i;

    console.log("試行回数   平均待ち時間¥n");
    for(i=0; i<20; i++){
        a[i]=0.0;
    }
    for(i=1; i<200; i++){
        b[i]=0.0;
    }

    for(i=1; i<=30000; i++){
        time += poison(time);
        ans = tim(ans, time, a, b);
        cll(time, a);
        sentaku(time, a, b);

                                    //解答打ち出し
        if(i%2000 == 0){
            console.log("%6d¥t%11.6lf¥n", i, ans / i);
        }
    }
    return 0;
}

function gauss(){
    let del = 0.0;
    let p;

    for(p=0; p<12; p++){
        del +=(Math.random()/32768);
    }
    return(DEL + SIG * (del-6.0));
}

                                //空き窓口ルーチン
function cll(){
    let j;

    for(j=0; j<M; j++){        //jは窓口数と比較
        if(a[j]<time){
            a[j]=0.0;
            return;
        }
    }
}

                                //最短空き窓口
function minimum(){
    let min = M,p;
    a[min]=100000.;
    for(p=0; p<M; p++){
        if(a[min]>a[p])
        min = p;
    }
    return min;
}

                                //待ち解除ルーチン
function tim(){
    let j,l;
    let min;

    for(j=0; j<k; j++){
        min = minimum(a);

        if(a[min]<time){
            ans+=a[min]-b[0];
            a[min]+=gauss();
            k--;
            for(l=0; l<k; l++){
                b[l]=b[l+1];
            }
            b[l+1]=0.0;
        }
    }
    return ans;
}

                                        //窓口選択ルーチン
function sentaku(){
    let j;

    for(j=0; j<M; j++){
        if(a[j] == 0.0){
            a[j]=t+gauss();
            return;
        }
    }
    b[k]=t;
    k++;
    return;
}

function poison(){
    let taw;

    taw = -log(Math.random()/32768+EPS)/ALF;
    return taw;
}