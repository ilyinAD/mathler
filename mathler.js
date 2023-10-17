const NUMBER_OF_GUESSES = 6;
let guess_remain = 6;
let idx_box = 0;
let attempt = [];
const vec = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "+", "*", "/"];
let GuessNumber = 0;
let RightAnswer = []
import {ARR} from "./expression.js";
const Guessindex = Math.ceil(Math.random() * ARR.length);
RightAnswer = ARR[Guessindex]

//console.log(Guessindex)

function IsItSign(s){
    if (s == '-' || s == '*' || s == '/' || s == '+'){
        return 1;
    }
    return 0;
}

function getNum(s){
    //console.log(s);
    if (IsItSign(s[0])){
        
        return -1;
    }
    for (let i = 1; i < s.length; ++ i){
        if (IsItSign(s[i]) && IsItSign(s[i - 1])){
            //console.log(-1);
            return -1;
        }
    }
    let vec = [];
    let num = "";
    let sign = 1;
    let i = 0;
    //console.log(s.length);
    //return 1;
    while (i < s.length){
        //console.log(num);
        if (!IsItSign(s[i])){
            num += s[i];
        }
        else{
            if (num[0] == '0' && num.length != 1){
                return -1;
            }
            if (s[i] == '+'){
                
                let val = parseInt(num) * sign;
                //console.log(val);
                vec.push(val);
                sign = 1;
                num = "";
            }
            else if (s[i] == '-'){
                let val = parseInt(num) * sign;
                //console.log(val);
                vec.push(val);
                sign = -1;
                num = "";
            }
            else {
                let next_num = "";
                let idx = i;
                ++i;
                while (i < s.length && !IsItSign(s[i])){
                    next_num += s[i];
                    ++i;
                }
                if (next_num[0] == '0'){
                    return -1;
                }
                if (s[idx] == '*'){
                    let val = parseInt(num) * parseInt(next_num);
                    //console.log(val);
                    num = String(val);
                    //console.log(num);
                    //vec.push(num * next_num);
                }
                else{
                    let val1 = parseInt(num);
                    let val2 = parseInt(next_num);
                    if (val2 == 0 || val1 % val2 != 0){
                        //console.log(-1);
                        return -1;
                    }
                    else{
                        let val = parseInt(num) / parseInt(next_num);
                        num = String(val);
                        //vec.push(num / next_num);
                    }
                }
                --i;
            }
            //num = "";
        }
        ++i;
    }
    //console.log(num);
    if (num[0] == '0' && num.length != 1){
        return -1;
    }
    let val = parseInt(num) * sign;
    vec.push(val);
    //console.log(vec);
    let result = 0;
    for (let i = 0; i < vec.length; ++ i){
        result += vec[i];
    }
    //console.log(result);
    return result;
}
GuessNumber = getNum(RightAnswer);
console.log(GuessNumber);
console.log(RightAnswer);

function GenerateGuess(){
    let all_right_ans = [];
    for (let i1 = 0; i1 < 14; ++ i1){
        for (let i2 = 0; i2 < 14; ++ i2){
            for (let i3 = 0; i3 < 14; ++ i3){
                for (let i4 = 0; i4 < 14; ++ i4){
                    for (let i5 = 0; i5 < 14; ++ i5){
                        for (let i6 = 0; i6 < 14; ++ i6){
                            let s = [];
                            s.push(vec[i1]);
                            s.push(vec[i2]);
                            s.push(vec[i3]);
                            s.push(vec[i4]);
                            s.push(vec[i5]);
                            s.push(vec[i6]);
                            //s = ["4", "/", "2", "+", "3", "5"];
                            //console.log(s);
                            //return;

                            let num = getNum(s);
                            //return;
                            if (num == GuessNumber){
                                all_right_ans.push(s);
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(all_right_ans.length);
    //for (let i = 0; i < 10; ++ i){
       // console.log(all_right_ans[i]);
    //}
    RightAnswer = all_right_ans[Math.floor(Math.random() * (all_right_ans.length))];
    console.log(RightAnswer);
    
    //console.log(RightAnswer);
}

function get_index_by_sign(sgn){
    if (sgn == "+"){
        return 0;
    }
    if (sgn == "-"){
        return 1;
    }
    if (sgn == "/"){
        return 2;
    }
    if (sgn == "*"){
        return 3;
    }
}

function get_sign_by_idx(idx){
    if (idx == 0){
        return "+";
    }
    if (idx == 1){
        return "-";
    }
    if (idx == 2){
        return "/";
    }
    if (idx == 3){
        return "*";
    }
}

function InitBoard(){
    let boxans = document.getElementById("my_guess_number");
    boxans.className = "my_guess_number";
    boxans.textContent = "Ваше загаданное число " + GuessNumber;
    
    let board = document.getElementById("game_board");
    for (let i = 0; i < NUMBER_OF_GUESSES; ++ i){
        let row = document.createElement("div");
        row.className = "letter-row";
        for (let i = 0; i < 6; ++ i){            
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
    let panel_number = document.getElementById("panel_of_number");
    for (let i = 0; i <= 9; ++ i){
        //let num = document.getElementById("box_number");
        let num = document.createElement("button");
        num.className = "box_number";
        num.textContent = i;
        panel_number.appendChild(num);
    }
    let panel_sign = document.getElementById("panel_of_sign");
    for (let i = 0; i < 4; ++ i){
        //let num = document.getElementById("box_sign");
        let num = document.createElement("button");
        num.className = "box_sign";
        num.textContent = get_sign_by_idx(i);
        panel_sign.appendChild(num);
    }
    let panel_action = document.getElementById("panel_action");
    panel_action.id = "panel_action";
    let box_delete = document.createElement("button");
    box_delete.className = "box_action";
    box_delete.textContent = "Delete";
    let box_enter = document.createElement("button");
    box_enter.className = "box_action";
    box_enter.textContent = "Enter";
    panel_action.appendChild(box_enter);
    panel_action.appendChild(box_delete);

}

function insert_letter(pressed_char){
    if (idx_box == 6){
        return;
    }
    let row = document.getElementsByClassName("letter-row")[6 - guess_remain];
    let box = row.children[idx_box];
    box.textContent = pressed_char;
    box.classList.add("filled-box");
    ++idx_box;
    attempt.push(pressed_char);
}

function delete_letter(){
    if (idx_box == 0){
        return;
    }
    let row = document.getElementsByClassName("letter-row")[6 - guess_remain];
    let box = row.children[idx_box - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    --idx_box;
    attempt.pop();
}

function check_guess(){
    if (idx_box != 6){
        //let q = document.getElementsByClassName("b-popup-content");
        //q.textContent = "ХУЙ";
        //q.color = "green";
        toastr.error("Введены не все буквы!");
        return;
    }
    
    if (guess_remain == 0){
        return;
    }

    let num = getNum(attempt);
    //console.log(num);
    if (num != GuessNumber){
        if (num == -1){
            toastr.error("Введено некорректное выражение");
            return;
        }
        toastr.error("Даннове выражение неравно загаданому числу");
        return;
    }

    let row = document.getElementsByClassName("letter-row")[6 - guess_remain];
    let cnt = 0;
    for (let i = 0;  i < attempt.length; ++ i){
        let color = "";
        if (attempt[i] == RightAnswer[i]){
            color = "green";
            ++cnt;
        }
        else if (RightAnswer.indexOf(attempt[i]) ==-1){
            color = "grey";
        }
        else{
            color = "orange";
        }
        if (!IsItSign(attempt[i])){
            let panel_number = document.getElementsByClassName("panel_of_number")[0];
            let box_num = panel_number.children[parseInt(attempt[i])];
            box_num.style.backgroundColor = color;
        }
        else{
            let panel_sign = document.getElementsByClassName("panel_of_sign")[0];
            let box_sign = panel_sign.children[get_index_by_sign(attempt[i])];
            box_sign.style.backgroundColor = color;
        }
        let box = row.children[i];
        box.style.backgroundColor = color;
    }
    --guess_remain;
    idx_box = 0;
    attempt = [];
    if (cnt == 6){
        toastr.success("Поздравляем ты победил!");
        guess_remain = 0;
    }
    else if (guess_remain == 0){
        toastr.error("У вас не осталось попыток. Вы проиграли!");
        toastr.info(`Загаданное выражение: "${RightAnswer}"`);
    }
}

document.addEventListener("keydown", function(event){
    if (guess_remain == 0){
        return;
    }
    
    let pressed_char = String(event.key);
    if (vec.indexOf(pressed_char) != -1){
        insert_letter(pressed_char);
    }
    else if (pressed_char == "Backspace"){
        delete_letter();
    }
    else if (pressed_char == "Enter"){
        check_guess();
    }
});



//GenerateGuess();
InitBoard();
let panel_sign = document.getElementsByClassName("panel_of_sign")[0];
for (let i = 0; i < panel_sign.children.length; ++ i){
    let but = panel_sign.children[i];
    but.addEventListener('click', function(){
        let s = get_sign_by_idx(i);
        insert_letter(String(s));
        but.blur();
    });
}

let panel_num = document.getElementsByClassName("panel_of_number")[0];

for (let i = 0; i < 10; ++ i){
    let but = panel_num.children[i];
    but.addEventListener('click', function(){
        insert_letter(String(i));
        but.blur();
    });
}

let panel_action = document.getElementsByClassName("panel_action")[0];
let but_enter = panel_action.children[0];
let but_delete = panel_action.children[1];
but_enter.addEventListener('click', function(){
    check_guess();
    but_enter.blur();
});
but_delete.addEventListener('click', function(){
    delete_letter();
    but_delete.blur();
});