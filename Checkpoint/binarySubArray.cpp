// Sample code to perform I/O:

#include <iostream>

using namespace std;
int maxCount(int arr[],int num){
    int count=0;
    for(int j=0;j<(1<<num);j++){
       // cout<<"{ ";
        int last=0;
        for(int k=0;k<num;k++){
            if(j&(1<<k))
            {
                last=(last^arr[k]);
            }
           // cout<<arr[k]<<" ";
        }
      //  cout<<" }"<<endl;
        if(last==1){
            count=count+1;
        }
    }
  //  cout<<count<<endl;
    return count;
}

int main() {
	int num;
   
	cin >> num;	
     int arr[num];
    for(int i=0;i<num;i++){
        cin>>arr[i];
    }
    int mainCount=0;
    mainCount=maxCount(arr,num);
    cout<<mainCount<<endl;	
    return 0;	// Writing output to STDOUT
}



// Write your code here
