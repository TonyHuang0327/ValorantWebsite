console.log("hello world !!!")
// 數字
let i = 1;
i += 1; // i = i+1
console.log("i =",i);
i ++ ;  // i = i+1
console.log("i =",i);
i -- ;
console.log("i =",i);
i -= 2;
console.log("i =",i);

//字串
let a = "node";
let b = ".js";
a = a + b;
console.log(a);
a += b;
console.log(a);

//字符串
let item1 = "Valorant";
let item2 = "trash";
let item3 = "game";
let quote = `I think ${item1} is a ${item2} ${item3}`; // more arrogant
let quote2 = "I think " + item1 + " is a " + item2 +" "+ item3;
console.log(quote);
console.log(quote2);