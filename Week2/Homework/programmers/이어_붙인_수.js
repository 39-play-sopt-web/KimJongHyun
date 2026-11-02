// PS

function solution(num_list) {
    let answer = 0;

    let odd = "";
    let even = "";

    for (let i = 0; i < num_list.length; i++) {
        if (num_list[i] % 2 === 0) {
            even += num_list[i];
        } else {
            odd += num_list[i];
        }
    }

    answer = Number(odd) + Number(even);

    return answer;
}

// filter로 풀어보기 홀수, 짝수로 나누어서 더하자
function solution(num_list) {
    let answer = 0;

    let odd = num_list.filter((num) => {
        return num % 2 !== 0;
    });

    let even = num_list.filter((num) => {
        return num % 2 === 0;
    });

    answer = Number(odd.join("")) + Number(even.join(""));

    return answer;
}

// forEach로 풀어보기
// foreach : 배열의 요소를 하나씩 꺼내서 함수를 실행한다
function solution(num_list) {
    let answer = 0;
    let odd = "";
    let even = "";

    num_list.forEach((num) => {
        if (num % 2 === 0) {
            even += num;
        } else {
            odd += num;
        }
    });

    answer = Number(odd) + Number(even);

    return answer;
}