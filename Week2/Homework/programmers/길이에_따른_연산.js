// 그냥 PS

function solution(num_list) {
    let answer = 0;

    if (num_list.length >= 11) {
        for (let i = 0; i < num_list.length; i++) {
            answer += num_list[i];
        }
    } else {
        answer = 1;

        for (let i = 0; i < num_list.length; i++) {
            answer *= num_list[i];
        }
    }

    return answer;
}

// reduce 사용해보기
function solution(num_list) {
    let answer = 0;

    if (num_list.length >= 11) {
        answer = num_list.reduce((total, num) => {
            return total + num;
        }, 0);
    } else {
        answer = num_list.reduce((total, num) => {
            return total * num;
        }, 1);
    }

    return answer;
}