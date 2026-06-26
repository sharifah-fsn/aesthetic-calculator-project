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