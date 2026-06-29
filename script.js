const buttons=document.querySelectorAll("button");
const display=document.querySelector("#answer");
let input="";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.innerText==="DEL"){
           deleteValue();
           return
        }
        if (button.innerText==="AC"){
           clearInput();
           return
        }
        if (button.innerText==="="){
           calculate();
           return
        }
        updateDisplay(button.innerText);
    });
});

function updateDisplay (value){
    input+=value;
    display.value=input;
};

function deleteValue(){
    input=input.slice(0,input.length-1);
    display.value=input;
}

function clearInput(){
    input="";
    display.value=input;
}

function calculate(){
    let values=[];
    let number="";

    for (let i=0; i<input.length;i++){
        if(!isNaN(input[i]) || input[i]==="."){
            number+=input[i];
        }else{
            values.push(Number(number));
            values.push(input[i]);
            number="";
        }
    }
    values.push(Number(number));

    for (let i=0; i<values.length;i++){
        if(values[i]==="×"){
            let ans=values[i-1]*values[i+1];
            values.splice(i-1,3,ans);
            i=0;
        }
        if(values[i]==="÷"){
            let ans=values[i-1]/values[i+1];
            values.splice(i-1,3,ans);
            i=0;
        }
        if(values[i]==="%"){
            let ans=values[i-1]%values[i+1];
            values.splice(i-1,3,ans);
            i=0;
        }
    }

    let total=values[0];
        for (let i=1; i<values.length;i+=2){
            if(values[i]==="+"){
                total+=values[i+1];
            }else{
                total-=values[i+1];
            }
        }

    display.value=total;
    input=total.toString();
}

const theme=document.querySelector("#theme");

const themes = {

    blue:{
        "--bgimg":"url('images/blue.png')",
        "--calbg":"#58add5",
        "--calshdws":"0 0 30px #076996",
        "--displaybg":"#d4f1ff",
        "--bttnbg":"rgb(173, 223, 255)",
        "--bttnfnt":"#478baa",
    },

    yellow:{
        "--bgimg":"url('images/yellow.png')",
        "--calbg":"#f1f877",
        "--calshdws":"0 0 30px #cfd604",
        "--displaybg":"#f9ffcf",
        "--bttnbg":"rgb(253, 255, 186)",
        "--bttnfnt":"#9daa47",
    },

    green: {
        "--bgimg":"url('images/green.png')",
        "--calbg":"#3c9d66",
        "--calshdws":"0 0 30px #1c5234",
        "--displaybg":"#c3ffdb",
        "--bttnbg":"rgb(186, 255, 215)",
        "--bttnfnt":"#21632f",
    },

    red:{
        "--bgimg":"url('images/red.png')",
        "--calbg":" #ef476f",
        "--calshdws":"0 0 30px #762135 ",
        "--displaybg":"#ffd4ef",
        "--bttnbg":"rgb(255, 186, 228)",
        "--bttnfnt":"#86273f",
    },
}

theme.addEventListener("change", () => {
        newtheme=theme.value;
        changeTheme(newtheme);
    })

function changeTheme(newtheme){
     const root = document.documentElement;

    const selected = themes[newtheme];

    for (let theme in selected) {
        root.style.setProperty(theme, selected[theme]);
    }

    const stickers = {
    blue: "stickers/shell.svg",
    green: "stickers/clover.svg",
    yellow: "stickers/star.svg",
    red: "stickers/cherry.svg"
    };

    const sticker = document.querySelector(".sticker");

    sticker.src = stickers[newtheme];
}