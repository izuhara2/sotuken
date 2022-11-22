let k=0; //待ち人数
let M=5;  //窓口数
let ALF=1; //流れ密度
let DEL=4; //平均処理時間
let SIG=.5; //処理時間のばらつき
let EPS=.000001; //log計算時のバイアス
let a=new Array(20);
let b=new Array(200);
let ans=0.0;
let time=0.0;

function main(){
    let i;
    
    console.log("試行回数   平均待ち時間");
    for(i=0; i<20; i++){
        a[i]=0.0;
    }
    for(i=0; i<200; i++){
        b[i]=0.0;
    }

    for(i=1; i<=30000; i++){
        time += poison(time);
        //console.log( {time} );
        ans = tim(ans, time, a, b);
        /* でバック用 */
        let a0 = a[0];
        let a1 = a[1];
        let a2 = a[2];
        let a3 = a[3];
        let a4 = a[4];
        let a5 = a[5];
        
        let b0 = b[0];
        let b1 = b[1];
        let b2 = b[2];
        let b3 = b[3];
        let b4 = b[4];
        let b5 = b[5];
        //console.log( {time, ans, a0} );　//デバック用
        console.log({a0,a1,a2,a3,a4,a5,b0,b1,b2,b3,b4,b5}); //でバック用

        cll(time, a);
        sentaku(time, a, b);

                                    //解答打ち出し
        if(i%2000 == 0){
            let answer = ans / i;
            console.log({i, answer});
        }
    }
    return 0;
}

function gauss(){
    let del = 0.0;

    for(let p=0; p<12; p++){
        del +=Math.random();
    }
    return(DEL + SIG * (del-6.0));
}

                                //空き窓口ルーチン
function cll(time, a){
    for(let j=0; j<M; j++){        //jは窓口数と比較
        if(a[j]<time){
            a[j]=0.0;
            return;
        }
    }
}

                                //最短空き窓口
function minimum(a){
    let min = M;
    a[min]=100000.;
    for(let p=0; p<M; p++){
        if(a[min]>a[p])
        min = p;
    }
    return min;
}

                                //待ち解除ルーチン
function tim(ans, time, a, b){   
    for(let j=0; j<k; j++){
        let min = minimum(a);

        let dummy_a2 = a[min];
        //console.log( {a, dummy_a2, time });
        if(a[min]<time){
            ans+=a[min]-b[0];
            let dummy_a = a[min];
            let dummy_b = b[0];
            //console.log( {ans, dummy_a, dummy_b } ); //デバック用
            a[min]+=gauss();
            k--;
            let l;
            for(l=0; l<k; l++){
                b[l]=b[l+1];
            }
            b[l+1]=0.0;
        }
    }
    return ans;
}

                                        //窓口選択ルーチン
function sentaku(t, a, b){
    for(let j=0; j<M; j++){
        if(a[j] == 0.0){
            ///let gg = gauss();
            //console.log( {j, gg, t}); //デバック用
            a[j]=t+gauss();
            return;
        }
    }
    b[k]=t;
    k++;
    return;
}

function poison(t){
    let taw = -Math.log(Math.random()+EPS)/ALF;
    return taw;
}

main();