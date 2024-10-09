const clockContainer = document.querySelector('.js-clock'),
    clockTitle = clockContainer.querySelector('h1');

    function getTime() {
        const date = new Date(); // 현재 시간을 가져옴
        const hours = date.getHours(); // 시
        const minutes = date.getMinutes(); // 분
        const seconds = date.getSeconds(); // 초
        clockTitle.innerText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
    


    function init() {
        getTime(); // 페이지 로드 시 바로 현재 시간을 표시
        setInterval(getTime, 1000); // 1초(1000ms)마다 getTime 함수를 호출하여 시간을 업데이트
    }
    

    init(); // 초기화 함수 실행
