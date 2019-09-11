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
    cakeNumbers = parseInt(input.split("\n")[1 + count].split(' ')[0]);
    friendNumbers = parseInt(input.split("\n")[1 + count].split(' ')[1]);
    friendLimit = input
      .split("\n")
      [2 + count].split(" ")
      .map(Number);
    cakeWeight = input
      .split("\n")
      [3 + count].split(" ")
      .map(Number);
    cakeEachWeightCount = input
      .split("\n")
      [4 + count].split(" ")
      .map(Number);

    minTime = 0;

    process.stdout.write(minTime + "\n");
    mergesort(0,friendNumbers-1,friendLimit);
    mergesort(0,cakeNumbers-1,cakeWeight);
    mergesort(0,2,cakeEachWeightCount);
    console.log(friendLimit);
    console.log(cakeWeight);
    console.log(cakeEachWeightCount);
    testcase--;
    count = count + 4;
  }
}

function mergesort(left, right, arr) {
  let mid = Math.floor((right + left) / 2);
  if (left < right) {
    mergesort(left, mid, arr);
    mergesort(mid + 1, right, arr);
    merge(left, mid, right, arr);
  }
  //return arr;
}
function merge(left, mid, right, arr) {
  let leftASize = mid - left + 1;
  let rightASize = right - mid;
  let leftA = [];
  let rightA = [];
  for (let i = 0; i < leftASize; i++) {
    leftA[i] = arr[left + i];
  }
  // console.log(leftA);
  for (let i = 0; i < rightASize; i++) {
    rightA[i] = arr[mid + i + 1];
  }
  // console.log(rightA);
  let i = 0;
  let j = 0;
  let k = left;
  while (i < leftASize && j < rightASize) {
    if (rightA[j] < leftA[i]) {
      arr[k] = rightA[j];
      k++;
      j++;
    } else {
      arr[k] = leftA[i];
      i++;
      k++;
    }
  }
  while (i < leftASize) {
    arr[k] = leftA[i];
    i++;
    k++;
  }
  while (j < rightASize) {
    arr[k] = rightA[j];
    j++;
    k++;
  }
  //return arr;
}




let input="1\n5 5\n1 2 3 4 5\n1 2 3 4 5\n5 4 3 2 1";
main(input);