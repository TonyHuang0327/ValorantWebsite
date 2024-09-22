//array
let arr1 = [1,2,3,4,5,6,7];
let arr2 = ["damn","omg","haha"];
let arr3 = [37.3535,"keke",false,{"message":"wocao"}];
console.log("定義array1",arr1);
console.log("定義array2",arr2);
console.log("定義array3",arr3);

let arr4 = [10,20,30,40,50];
//取值
let a = arr4[2];
let b = arr4[0];
console.log("a = ",a);
console.log("b = ",b);
//修改值
arr4[1] = 59;
let c = arr4[1];
console.log("c = ",c);
console.log(arr4);
//新增值>>.push
arr4.push(69);
arr4.push(234);
console.log(arr4);
console.log(arr4.length);

//.map
let arr5 = [1,3,5,7,9];
let map1 = arr5.map( n => n*3);
console.log(map1);
let map2 = arr5.map( n => n**4);//4次方
console.log(map2);

//.filter
let filter1 = arr5.filter( n => n>3);//就是filter > 大於3的元素
console.log(filter1);
let filter2 = arr5.filter( n => n%2 === 1);//基數
console.log(filter2); 

let map3 = arr5.map( n => n*2).filter( n => n>5);
console.log(map3);
let map4 = arr5.map( n => n**3).map( n => n-4).map( n => n+72).filter( n => n>90);
console.log(map4);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//object
let obj1 = {"name":"tony","age":22};
let obj2 = {"name2":"lbj",
            "age2":39
}; 
console.log("object1的name",obj1.name);
console.log("object2",obj2);

//取值
let name3 = obj1["name"];
let age3 = obj2["age2"];

console.log("object1的name跟object2的age",name3,age3);

//修改值
obj2["name2"] = "lebron james"
obj1["age"] = 23;

console.log("修改object1的age",obj1);
console.log("修改object2的name",obj2);
//新增值
obj1["weight"] = 95;
console.log("新增weight值",obj1);
//Object.keys() /Object.values()

console.log("Object.keys:",Object.keys(obj1));
console.log("Object.values:",Object.values(obj1));

//practice#1
let stu1 = {"name":"Jeff","height":170,"weight":65,"age":26,"class":"A-","interest":["喝酒","爬山","寫程式"]};
console.log("嗨嗨,我是" + stu1["name"] + ",階級為" + stu1["class"]);
stu1["height"] = 180;
console.log("修改" + stu1["name"] + "的身高為" + stu1["height"]);
stu1["interest"].push("彈吉他");
console.log(stu1["interest"]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//array with object

let data = [
    {"playerNum":0,"playerName":"Tony","score":10},
    {"playerNum":1,"playerName":"Kevin","score":100},
    {"playerNum":2,"playerName":"Hart","score":14},
    {"playerNum":3,"playerName":"Brian","score":56},
    {"playerNum":4,"playerName":"James","score":88}
];

//取出playerName的Array
let data1 = data.map(element => element["playerName"]);
console.log(data1);

//取出score >= 56的playerNum的Array

let result = data.filter(element => element["score"]>=56).map(element => element["playerNum"]);
console.log(result);

//practice#2

let studentsScores = [
    {"name":"Jeff","age":18,"scores":[95,88,100]},
    {"name":"Leo","age":22,"scores":[90,97,98]},
    {"name":"Holy","age":25,"scores":[75,68,90]},
    {"name":"Keven","age":33,"scores":[77,65,32]},
    {"name":"Jenny","age":20,"scores":[63,82,91]},
    {"name":"Elle","age":31,"scores":[100,73,83]}
]

//1.)age>=30人名array

let result1 = studentsScores.filter(element => element["age"]>=30).map(element => element["name"]);
console.log(result1);

//2.)//不能寫element["scores[0]"]
//因為element["scores[0]"]：是試圖查找一個名為 "scores[0]" 的屬性，這通常不是你想要的，因為 scores 是一個陣列。element["scores"][0]：這是正確的寫法，它先查找 scores 屬性，再取數組中的第一個值。

let result2 = studentsScores.filter(element => element["scores"][0]+element["scores"][1]+element["scores"][2]>=250).map(element => element["name"] +"-"+ element["age"]);
console.log(result2)