var arr=function(){

var arr=[1,2,3,4,5,6,7,8,9];

var i;
var j;
var x=8;
var k=arr.length;

for(i=0;i<9;i++){
//console.log(arr[i]);
if(arr[i]==x) break;

}

for(j=i;j<9;j++){

arr[j]=arr[j+1];

}

for(i=0;i<9;i++){
console.log(arr[i]);
}
}

console.log(arr());
