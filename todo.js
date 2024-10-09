// 할 일 목록 폼, 입력 필드, 리스트 선택자 가져오기
const form = document.querySelector('.js-todoForm'),
    todoInput = form.querySelector('input'),
    todoList = document.querySelector('.js-todoList');

// localStorage에 저장할 키 값 정의
const TODOS_LOCALSTORAGE = 'todos'; 

let todosArray = [];

// 할 일 목록을 localStorage에 저장하는 함수
function setTodos(){
    localStorage.setItem(TODOS_LOCALSTORAGE, JSON.stringify(todosArray));
}

// 할 일 삭제 함수
function deleteTodo(event){
    const li = event.target.parentNode; // 삭제할 li 요소 선택
    todoList.removeChild(li); // 화면에서 li 요소 삭제
    const cleanTodos = todosArray.filter(function(todo) {
        return todo.id !== parseInt(li.id); // 배열에서 해당 id의 todo 삭제
    });
    todosArray = cleanTodos; // 새로운 배열로 업데이트
    setTodos(); // 업데이트된 배열을 다시 localStorage에 저장
}

// 새로운 할 일을 화면에 표시하고 배열에 추가하는 함수
function showTodos(value){
    const li = document.createElement('li');
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    const newId = todosArray.length + 1; // 배열 길이를 기준으로 ID 설정
    delBtn.innerText = '❌'; // 삭제 버튼 생성
    delBtn.addEventListener('click', deleteTodo); // 삭제 버튼에 이벤트 리스너 추가
    span.innerText = value; // 입력 받은 할 일 텍스트를 표시
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; // 각 할 일에 고유 ID 부여
    todoList.appendChild(li); // 할 일 항목을 리스트에 추가

    const todoObj = {
        text: value,
        id: newId
    };
    todosArray.push(todoObj); // 할 일을 배열에 추가
    setTodos(); // localStorage에 저장
}

// 할 일 폼 제출 시 처리하는 함수
function handleSubmit(event){
    event.preventDefault(); // 폼 제출 시 새로고침 방지
    const currentValue = todoInput.value;
    if (currentValue !== '') { // 빈 값 입력 방지
        showTodos(currentValue); // 화면에 새로운 할 일 표시
        todoInput.value = ''; // 입력 필드를 비움
    }
}

// localStorage에서 할 일 목록을 불러와 화면에 표시하는 함수
function loadTodos(){
    const loadedTodos = localStorage.getItem(TODOS_LOCALSTORAGE); // 저장된 할 일 가져오기
    if (loadedTodos !== null) {
        const parsedTodos = JSON.parse(loadedTodos); // JSON 문자열을 객체로 변환
        parsedTodos.forEach(function(todo) {
            showTodos(todo.text); // 각 할 일을 화면에 표시
        });
        todosArray = parsedTodos; // 배열에 불러온 할 일 저장
    }
}

// 초기화 함수
function init(){
    loadTodos(); // 페이지 로드 시 기존 할 일 목록 불러오기
    form.addEventListener('submit', handleSubmit); // 폼 제출 시 이벤트 처리
}

init(); // 초기화 함수 실행

