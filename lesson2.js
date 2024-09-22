//function

//old function
let add1 = function (a,b){
    return a+b;
}

console.log(add1(5,7));

//arrow function

let add2 = (a,b) => {
    return a+b;
}

console.log(add2(5,7));

let sayHello = (name) =>{
    console.log("我是",name);
};

sayHello("tony");

//function 特性

let sayHello2 =(name2,age2)=>{
    console.log("hello",name2);
}

let sayHello2_with_output = (name2,age2)=>{
    console.log("hello",name2);
    return "hehe";
}

let msg1 =sayHello2("tony",18);
console.log(msg1);// no return
let msg2 = sayHello2_with_output("tony",18);
console.log(msg2);

//function 全域(Global)vs區域(Local)
let test1 = () =>{
    var num1 = 10;//區域變數
    return num1;
}
let test2 = () =>{
    let num2 = 12;//區域變數
    return num2;
}
let test3 = () =>{
    num3 =14;//全域變數
    return num3;
}

console.log(test1());
console.log(test2());
console.log(test3());

console.log("num3:",num3);
//console.log("num2:",num2);
//console.log("num1",num1);

//var let const

//var :function scope,值可以任意改
// let :block scope,值可以任意改
//const :block scope,值不可以任意改,需要初始值類似final

//運算子operator /== /=== /!= /!==

// === -> 左右兩邊是否相等
// !== -> 左右兩邊是否不相等

// == 弱型別比較
// === 強型別比較

console.log("1==1:",1==1);
console.log('1=="1":',1=="1");
console.log("1==true:",1==true);

console.log("1===1:",1===1);
console.log('1==="1":',1==="1");
console.log("1===true:",1===true);

//practice if-else

let grouping = (number) =>{
    if(number<=0){
        return "甲";
    }else if(number<=50 && number>0){
        return "乙";
    }else if(number>50 && number<=100){
        return "丙";
    }else{
        return "丁";
    };
}
console.log(grouping(-5));
console.log(grouping(10));
console.log(grouping(70));
console.log(grouping(110));

//practice2 if else

let specialOffer = (age,gender) => {
    if(gender === "M" && age >= 30){
        return 1000;
    }else if(gender === "M" && age < 30){
        return 700;
    }else if(gender === "F" && age >=30){
        return 500;
    }else if(gender === "F" && age < 30){
        return 500;
    }else{
        return "error";
    }
}

console.log("您的消費金額為:",specialOffer(32,"M"));
console.log("您的消費金額為:",specialOffer(20,"F"));

//practice for-loop

let sum = 0;
for(let i=1;i<=100;i++){
    //sum = i + sum;
    sum += i ;
}
console.log(sum);

let printstars = (number) =>{
    for(let i = 6 ; i>=1;i--){
        console.log("*".repeat(i));
    }
}
printstars(6);

let printname = (name) =>{
    for(let i = 0 ;i<name.length ;i++){
        console.log(name[i].repeat((name.length)-i))
    }
}
printname("tony");

//for-loop Q1
let printstars1 = (number) =>{
    for(let i = 6 ; i>=1;i--){
        console.log("*".repeat(i));
    }
    for(let i = 2 ; i<=number;i++){
        console.log("*".repeat(i));
    }
}
printstars1(6);

//for-loop Q2

let data = ["a","b","c","c","c","a","d","b","b","a","c"];
let result = {};

for(let i =0;i<data.length;i++){
    let key = data[i];
    if(key in result){  //檢查key值是否在result中
        result[key]+=1;
    }else{
        result[key] = 1;
    };
};
console.log(result);

//九九乘法表

for(let i =1;i<=9;i++){
    for(let j = 1;j<=9;j++){
        console.log(i+"*"+j+"=",i*j);
    }
}

//三元運算子
let a =-50;
let msg = a>0? "正數":"負數";
console.log(msg);

//費式數列

let fib = (num) =>{
    if(num === 0){
        return 0 ;
    }else if(num ===1){
        return 1;
    }else{
        return fib(num-1)+fib(num-2);
    }
}
console.log(fib(6));