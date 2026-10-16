import { useState } from 'react';

const Ranking = () => {
    const [records, setRecords] = useState(
        () => JSON.parse(localStorage.getItem('gameRecords')) || []
    );
    records.sort((a, b) => a.time - b.time);
    
    // 랭킹 초기화 함수
    const clearRecords = () => {
        localStorage.removeItem('gameRecords');
        setRecords([]);

    };

    // 다시 정리하는 삼항 연산자. 삼항 != 세가지 상황
    // if else 문을 한 문장으로 해놓은 것 (조건, 참, 거짓)
    // 아직 어려워서 밑에는 && 조건부 렌더링으로 작성해봄

    return (
        <div>
            <h2>게임 랭킹</h2>
            <button onClick={clearRecords}>기록 초기화</button>

            {records.length === 0 && <p>아직 등록된 기록이 없습니다.</p>}

            {records.map((record, index) =>(
                <p key={index}>
                    {/* index 0이 1등이기 때문에 index+1로 표시 */}
                    {index + 1}등 - Level {record.level} - {record.time}초 - {record.date}
                </p>
            
            ))}
        </div>
    );
};

export default Ranking