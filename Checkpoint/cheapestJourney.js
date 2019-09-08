// Sample code to perform I/O:

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";

process.stdin.on("data", function(input) {
  stdin_input += input; // Reading input from STDIN
});

process.stdin.on("end", function() {
  main(stdin_input);
});

function main(input) {
  // process.stdout.write("Hi, " + input + ".\n");
  let testcase = parseInt(input.split("\n")[0]);
  let count = 0;
  while (testcase > 0) {
    totalCheckpoint = parseInt(input.split("\n")[1 + count]);
    checkPointPrice = input
      .split("\n")
      [2 + count].split(" ")
      .map(Number);
    fuelRequiredNextCheckpoint = input
      .split("\n")
      [3 + count].split(" ")
      .map(Number);
    //console.log(fuelRequiredNextCheckpoint);
    lastIndex = totalCheckpoint;
    totalPrice = 0;
    totalCost(totalCheckpoint - 1);
    process.stdout.write(totalPrice + "\n");
    testcase--;
    count = count + 3;
  }
}
function totalCost(uptoIndex) {
  let cheapestCheckpointPrice;
  let cheapestCheckpointIndex;
  if (uptoIndex > 0) {
    if (totalPrice === 0) {
      //console.log(checkPointPrice);
      // cheapestCheckpointPrice = Math.min(...checkPointPrice);
      let temp = checkPointPrice.slice();
      mergesort(0,totalCheckpoint-1,temp);
      //console.log(temp);
      cheapestCheckpointPrice = temp[0];
      cheapestCheckpointIndex = checkPointPrice.indexOf(
        cheapestCheckpointPrice
      );
      //console.log(cheapestCheckpointPrice);
     // console.log(checkPointPrice);
      // cheapestCheckpointIndex = binarySearch(
      //   checkPointPrice,
      //   cheapestCheckpointPrice
      // );
      // console.log(cheapestCheckpointIndex);
    } else {
      let temp = checkPointPrice.slice(0, uptoIndex);
      mergesort(0,uptoIndex,temp);
      cheapestCheckpointPrice = temp[0];
      cheapestCheckpointIndex = checkPointPrice.indexOf(
        cheapestCheckpointPrice
      );
    }
    let fuel = totalFuelBetweenRequired(
      fuelRequiredNextCheckpoint,
      cheapestCheckpointIndex,
      lastIndex
    );
    lastIndex = cheapestCheckpointIndex;
    let price = fuel * cheapestCheckpointPrice;
    totalPrice = totalPrice + price;
    totalCost(cheapestCheckpointIndex);
  }
}

function totalFuelBetweenRequired(checkpoint, start, finish) {
  let totalFuel = 0;
  for (let i = start; i < finish; i++) {
    totalFuel = totalFuel + checkpoint[i];
  }
  return totalFuel;
}
function mergesort(left,right,arr){
  let mid=Math.floor((right+left)/2);
  if(left<right){
      mergesort(left,mid,arr);
      mergesort(mid+1,right,arr);
      merge(left,mid,right,arr);
  }
//return arr;
}
function merge(left,mid,right,arr){
  let leftASize=(mid-left+1);
  let rightASize=(right-mid);
  let leftA=[];
  let rightA=[];
  for(let i=0;i<leftASize;i++){
      leftA[i]=arr[left+i];
  }
 // console.log(leftA);
  for(let i=0;i<rightASize;i++){
      rightA[i]=arr[mid+i+1];
  }
// console.log(rightA);
let i=0;
let j=0;
let k=left;
while(i<leftASize && j<rightASize){
    if(rightA[j]<leftA[i]){
        arr[k]=rightA[j];
        k++;
        j++;
    }else{
        arr[k]=leftA[i];
        i++;
        k++;
    }
}
while(i<leftASize){
    arr[k]=leftA[i];
    i++;
    k++;
}
while(j<rightASize){
  arr[k]=rightA[j];
  j++;
  k++;
}
//return arr;
}