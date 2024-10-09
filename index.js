let currentDate = new Date();

// 초기 날짜 및 연도 설정
function updateCalendar(date) {
    const today = {
        year: date.getFullYear(),
        date: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        day: date.toLocaleString('en-US', { weekday: 'short' })
    };

    document.getElementById('day').textContent = today.day;
    document.getElementById('date').textContent = today.date;
    document.getElementById('month').textContent = today.month;
    document.getElementById('year').textContent = today.year;
}

// 연도 리스트 생성
function populateYearList(startYear, endYear) {
    const yearList = document.getElementById('year-list');
    yearList.innerHTML = '';
    for (let year = startYear; year <= endYear; year++) {
        const li = document.createElement('li');
        li.textContent = year;
        li.setAttribute('data-year', year);
        yearList.appendChild(li);
    }
}

// 월 리스트 생성
function populateMonthList() {
    const monthList = document.getElementById('month-list');
    monthList.innerHTML = '';
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    months.forEach((month, index) => {
        const li = document.createElement('li');
        li.textContent = month;
        li.setAttribute('data-month', index); // 월 인덱스 설정
        monthList.appendChild(li);
    });
}

// 초기화 및 연도 및 월 목록 생성
updateCalendar(currentDate);
populateYearList(2000, 2100);
populateMonthList(); // 월 목록 생성 추가

// 초기화 및 연도 목록 생성
updateCalendar(currentDate);
populateYearList(2000, 2100);

// 날짜 변경 버튼 클릭 이벤트
document.getElementById('prev').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 1);
    updateCalendar(currentDate);
});

document.getElementById('next').addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 1);
    updateCalendar(currentDate);
});

// 월 선택 드롭다운 기능
document.getElementById('month').addEventListener('click', () => {
    const monthList = document.getElementById('month-list');
    monthList.classList.toggle('hidden'); // 드롭다운 표시 토글
});

// 드래그 및 클릭하여 월 선택
let isDraggingMonth = false;


const monthItems = document.querySelectorAll('#month-list li');
monthItems.forEach((item) => {
    item.addEventListener('mousedown', () => {
        isDraggingMonth = true; // 드래그 시작
    });

    item.addEventListener('mouseup', () => {
        isDraggingMonth = false; // 드래그 종료
    });

    item.addEventListener('click', () => {
        const selectedMonth = parseInt(item.getAttribute('data-month'), 10);
        currentDate.setMonth(selectedMonth);
        updateCalendar(currentDate);
        document.getElementById('month-list').classList.add('hidden'); // 드롭다운 닫기
    });
});



// 드롭다운 외부 클릭 시 닫기
document.addEventListener('click', (event) => {
    const monthList = document.getElementById('month-list');
    const yearList = document.getElementById('year-list');
    if (!monthList.contains(event.target) && event.target.id !== 'month') {
        monthList.classList.add('hidden'); // 드롭다운 닫기
    }
    if (!yearList.contains(event.target) && event.target.id !== 'year') {
        yearList.classList.add('hidden'); // 드롭다운 닫기
    }
});

// 드래그 중 클릭
document.addEventListener('mousemove', (e) => {
    if (isDraggingMonth) {
        monthItems.forEach((item) => {
            if (item.contains(e.target)) {
                item.click(); // 드래그 중 클릭
            }
        });
    }
});

// 년도 선택 드롭다운 기능
document.getElementById('year').addEventListener('click', () => {
    const yearList = document.getElementById('year-list');
    yearList.classList.toggle('hidden'); // 드롭다운 표시 토글
});

// 년도 목록 클릭 이벤트
const yearItems = document.querySelectorAll('#year-list li');
yearItems.forEach((item) => {
    item.addEventListener('click', () => {
        const selectedYear = parseInt(item.getAttribute('data-year'), 10);
        currentDate.setFullYear(selectedYear);
        updateCalendar(currentDate);
        document.getElementById('year-list').classList.add('hidden'); // 드롭다운 닫기
    });
});


// 년도 드래그 처리
yearItems.forEach((item) => {
    item.addEventListener('mousedown', () => {
        isDraggingYear = true; // 드래그 시작
    });

    item.addEventListener('mouseup', () => {
        isDraggingYear = false; // 드래그 종료
    });
});

// 드래그 중 클릭
document.addEventListener('mousemove', (e) => {
    if (isDraggingYear) {
        yearItems.forEach((item) => {
            if (item.contains(e.target)) {
                item.click(); // 드래그 중 클릭
            }
        });
    }
});

// 드래그 상태 변수
let isDraggingYear = false; // 드래그 상태 초기화
