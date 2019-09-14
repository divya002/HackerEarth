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
    let N = parseInt(input.split("\n")[1 + count].split(" ")[0]);
    let M = parseInt(input.split("\n")[1 + count].split(" ")[1]);
    let L = input
      .split("\n")
      [2 + count].split(" ")
      .map(Number);
    let W = input
      .split("\n")
      [3 + count].split(" ")
      .map(Number);
    let C = input
      .split("\n")
      [4 + count].split(" ")
      .map(Number);

    let WC = {};
    for (let i = 0; i < N; i++) {
      WC[W[i]] = C[i];
    }
    mergesort(0, M - 1, L);
    //console.log(L);
    //console.log(WC);
    mergesort(0, N - 1, W);

    let minTime = -1;
    if (W[N - 1] <= L[M - 1]) {
      minTime = calculate(N, M, L, W, WC);
      process.stdout.write(minTime + "\n");
    } else {
      process.stdout.write(minTime + "\n");
    }

    //console.log("ans "+answer);
    testcase--;
    count = count + 4;
  }
}
function calculate(N, M, L, W, WC) {
  let high = 1000000000;
  //let high = 10;
  let low = 1;
  let ans;
  while (low <= high) {
    let mid = (high + low) >> 1;
    if (checkCount(mid, N, M, L, W, WC)) {
      ans = mid;
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return ans;
}
function checkCount(num, N, M, L, W, WC) {
  let WC2 = Object.assign({}, WC);
  for (let i = 0; i < M; i++) {
    let temp = binaryNearestSearch(W,N, L[i]);
    WC2[W[temp]] -= num;
  }
  let sum = 0;
  for (let i = N-1; i >= 0; i--) {
    sum = sum + WC2[W[i]];
    if (sum > 0) return false;
  }
  return true;
}
function mergesort(left, right, arr) {
  let mid = (right + left)>>1;
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

function binaryNearestSearch(arr,length, element) {
  let left = 0;
  let right = length - 1;
  return binary(arr, left, right, element);
}
function binary(arr, left, right, element) {
  let mid = null;
  while (left <= right) {
    mid = (left + right) >>1 ;
    if (arr[mid] === element) return mid;
    else if (arr[mid] < element) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return (left<right||left==right)?left:right;
}

//input = "1\n5 5\n1 2 3 4 5\n1 2 3 4 5\n5 4 3 2 1";
//main(input);
//console.log(binaryNearestSearch([1,2,3,4,6,7],5));
