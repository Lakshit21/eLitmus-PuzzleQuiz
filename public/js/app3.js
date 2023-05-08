const myQuestions = [
    {
      question: "I can fly but have no wings. I can cry but I have no eyes. Wherever I go, darkness follows me. What am I?",
      answers: {
        a: "CLOUD",
        b: "CLOUDS"
      },
      hint:"Here Cry Means Rain"
    },
    {
      question: "I shave every day, but my beard stays the same. What am I?",
      answers: {
        a: "BARBER",
        b: "BARBERS"
      },
      hint: "I have Scissors"
    },
    {
      question: " A seed with three letters in my name. Take away two and I still sound the same. What am I?",
      answers: {
        a: "PEA",
        b: "PEAS"
      },
      hint: "I found in Green color"
    },
    {
      question : "I have many teeth but I cannot bite. I am often used early but rarely at night. What am I?",
      answers:{
          a : "COMBS",
          b : "COMB"
      },
      hint: "Used in Hair"
    },
    {
      question: "I have lakes with no water, mountains with no stone, and cities with no buildings. What am I? ",
      answers:{
          a: "MAP",
          b: "MAPS"
      },
      hint: "You saw me at the starting of the game"
    }
  ];




let currentQuestions = []

function getQuestions(){
    currentQuestions = []
    // let randomNumber = parseInt(Math.ceil(Math.random() * (9)))
    let randomNumber = 0
    for(let i = 0 ; i < 5 ; i++){
        let index = (randomNumber + i) % 10;
        currentQuestions.push(myQuestions[index])
    }
    console.log(randomNumber);

    let target = document.getElementById("quiz")

    target.innerHTML = "";



    for(let i = 0 ; i < 5 ; i++){
        let html;
        html = `
            <div class="que">
                <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
                <p id="${i}a1"><input type="text" name="Q${i}" id="q${i}" placeholder="Your Answer"> </p>
                <button type="button" onclick="showHint('${currentQuestions[i].hint}',${i+1})">Hint</button><br>
            </div>
            `
        target.innerHTML += html
    }
};


let usedHint = [0,0,0,0,0,0,0,0,0]
function showHint(hint,id) {
    usedHint[id-1]=1;
    alert("Your Hint is : "+ hint);
    // Uncomment the following line if you want to deduct points for using a hint
    // document.getElementById('score').value -= 0.5;
}

let cnt = 0
let correct = 0;
let wrong = 0;
let hint = 0;


getQuestions()


const homeButton = document.getElementById("backToHome");
const saveButton = document.getElementById("submit");
const form = document.getElementById('Secondary');
const correctBag = document.getElementById('correct');
const wrongBag = document.getElementById('wrong');
const hintBag = document.getElementById('hint');

// const selector = `input[name=opt]:checked`
// const next = querySelector(selector)
// console.log(next);

// submitButton.addEventListener("click" , function(){

function calculate(){
    let answers = []
    for(let i = 0 ; i < 5 ; i++){
        if(document.getElementById("q"+i).value.toUpperCase() == currentQuestions[i].answers.a) answers.push(1)
        else if(document.getElementById("q"+i).value.toUpperCase() == currentQuestions[i].answers.b) answers.push(1)
        else answers.push(0)
        console.log(answers[i]);
        // document.getElementById(i + currentQuestions[i].correctAnswer + "1").innerHTML += `<img class="icon" src="../assets/check.png">`
        // if(answers[i] == currentQuestions[i].correctAnswer){
        //     correct++;
        //     // document.getElementById("qd" + i).innerHTML += `<span style="color:green"> +1 Correct</span>`
        // }
        // else{
        //     if(answers[i] != "none"){
        //         wrong++;
        //         // document.getElementById("qd" + i).style.color = "red"
        //         // document.getElementById(i + answers[i] + "1").innerHTML += `<img class="icon" src="../assets/delete-button.png">`
        //         // document.getElementById("qd" + i).innerHTML += `<span style="color:red"> +0 Wrong</span>`
        //     }
        //     else{
        //         skip++;
        //         // document.getElementById("qd" + i).style.color = "purple"
        //         // document.getElementById("qd" + i).innerHTML += `<span style="color:purple"> +0 Not Attempted</span>`
        //     }
        // }
    }

    correct=0;
    wrong=0;
    skip=0;

    for(let i=0;i<5;i++){
        if(answers[i] == 1){
            if(usedHint[i]==1)
                hint++;
            else
                correct++;
        }else{
            wrong++;
        }
    }
}
    
saveButton.addEventListener('click', (event) => {
    calculate();
    document.getElementById("submit").style.display = "none" // remove display butoon
});


form.addEventListener('submit', (event) => {
  // Update the hidden input element's value with the score
    correctBag.value = correct;
    wrongBag.value = wrong;
    skipBag.value = skip;
    return;
});
// form.addEventListener('submit', (event) => {
//     // Update the hidden input element's value with the score
//     console.log('only this ?');
//     correctBag.value = correct;
//     wrongBag.value = wrong;
//     skipBag.value = skip;
//     return
// });


// document.getElementById("retest").addEventListener("click" , function(){
//     cnt = 0;
//     document.getElementById("result").innerHTML = ""
//     getQuestions();
//     document.getElementById("submit").style.display = "inline-block"
// })

