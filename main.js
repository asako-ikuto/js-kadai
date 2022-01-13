"use strict";

for (let i = 1; i < 100; i++) {
    //3の倍数かつ5の倍数ならFizzBuzzと表示
    if (i % 3 == 0 && i % 5 == 0) {
        console.log(`FizzBuzz ${i}`);
        //3の倍数ならFizzと表示
    } else if (i % 3 == 0) {
        console.log(`Fizz ${i}`);
        //5の倍数ならBuzzと表示
    } else if (i % 5 == 0) {
        console.log(`Buzz ${i}`);
    }
}