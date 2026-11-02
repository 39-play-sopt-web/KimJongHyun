function solution(names) {
    let answer = [];

    answer = names.filter((name, index) => {
        return index % 5 === 0;
    });

    return answer;
}