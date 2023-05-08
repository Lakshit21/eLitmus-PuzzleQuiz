
const myQuestions = [
    {
      question: "What word is similar to jurisdiction?",
      answers: {
        a: "Authority",
        b: "Similarity"
      },
      correctAnswer: "a",
      is_img : false
    },
    {
      question: "Which word is the opposite of awful?",
      answers: {
        a: "Peaceful",
        b: "Wonderful"
      },
      correctAnswer: "b",
      is_img : false
    },
    {
      question: "Which image is best fits the word Sad?",
      answers: {
        a: "/sad.jpeg",
        b: "/smile.jpeg"
      },
      correctAnswer: "a",
      is_img : true
    },
    {
      question : "Which word is similar to topple",
      answers:{
          a : "Fare",
          b : "Fall"
      },
      correctAnswer: "b",
      is_img : false
    },
    {
      question: "Which word is similar to slow?",
      answers:{
          a: "Illustrate",
          b: "Decelerate"
      },
      correctAnswer: "b",
      is_img : false
    },
    {
      question: "Which word is similar to grab?",
      answers:{
          a: "Settle",
          b: "Seize"
      },
      correctAnswer: "b",
      is_img : false
    },
    {
      question: "Which word is is the opposite of deadly?",
      answers:{
          a: "Harmless",
          b: "Homeless"
      },
      correctAnswer : "a",
      is_img : false
    },
    {
      question: "Which image is best fits the word cycling?",
      answers:{
          a: "/tt.jpeg",
          b: "/cycle.jpeg"
      },
      correctAnswer:"b",
      is_img : true
    },
    {
      question: "Which word is similar to recreation?",
      answers:{
          a: "Pasture",
          b: "Pleasure"
      },
      correctAnswer : "b",
      is_img : false
    },
    {
      question: "Which word is similar to crooked?",
      answers:{
          a: "Bent",
          b: "Indifferent"
      },
      correctAnswer :"a",
      is_img : false
    }
  ];



let haveImage = [0,0,1,0,0,0,0,1,0,0,0,0,0] 


let currentQuestions = []

function getQuestions(){
    currentQuestions = []
    let randomNumber = parseInt(Math.ceil(Math.random() * (9)))
    for(let i = 0 ; i < 5 ; i++){
        let index = (randomNumber + i) % 10;
        currentQuestions.push(myQuestions[index])
    }
    console.log(randomNumber);

    let target = document.getElementById("quiz")

    target.innerHTML = "";



    for(let i = 0 ; i < 5 ; i++){
        let html;
        if(currentQuestions[i].is_img == true){
            // html = `
            // <div class="que">
            //     <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
            //     <p id="${i}a1"><input type="radio" name="${i}opt" id="${i}a" value="a"> A. <img src="${currentQuestions[i].answers['a']}"> </p>
            //     <p id="${i}b1"><input type="radio" name="${i}opt" id="${i}b" value="b"> B. <img src="${currentQuestions[i].answers['b']}"> </p>
            // </div>
            // `

            html=`
            <div class="">
              <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
              <table>
                <tr>
                  <td>
                    <p id="${i}a1">
                      <input type="radio" name="${i}opt" id="${i}a" value="a"> A. <img src="${currentQuestions[i].answers['a']}"> 
                    </p>
                  </td>
                  <td>
                    <p id="${i}a1">
                      <input type="radio" name="${i}opt" id="${i}a" value="a"> B. <img src="${currentQuestions[i].answers['b']}"> 
                    </p>
                  </td>
                </tr>
              </table>
            </div>    
            <div class="cleaner h10"></div>
            `
        }
        else{
            // html = `
            // <div class="que">
            //     <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
            //     <p id="${i}a1"><input type="radio" name="${i}opt" id="${i}a" value="a"> A. ${currentQuestions[i].answers['a']}</p>
            //     <p id="${i}b1"><input type="radio" name="${i}opt" id="${i}b" value="b"> B. ${currentQuestions[i].answers['b']}</p>
            // </div>
            // `

            html = `
            <div class="">
              <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
              <table>
                <tr>
                  <td>
                    <p id="${i}a1">
                    <input type="radio" name="${i}opt" id="${i}a" value="a"> A. ${currentQuestions[i].answers['a']}
                    </p>
                  </td>
                  <td>
                    <p id="${i}a1">
                    <input type="radio" name="${i}opt" id="${i}b" value="b"> B. ${currentQuestions[i].answers['b']}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <div class="cleaner h10"></div>
            `
        }
        target.innerHTML += html
    } 
}



{/* <div class="image_frame">
  <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
  <table>
    <tr>
      <td>
        <p id="${i}a1">
          <input type="radio" name="${i}opta" id="${i}a" value="a"> A. <img src="${currentQuestions[i].answers['a']}"> 
        </p>
      </td>
      <td>
        <p id="${i}a1">
          <input type="radio" name="${i}optb" id="${i}a" value="a"> B. <img src="${currentQuestions[i].answers['b']}"> 
        </p>
      </td>
    </tr>
  </table>
</div> */}


{/* <div class="image_frame">
  <p class="qd" id="qd${i}">${i+1}. ${currentQuestions[i].question}</p>
  <table>
    <tr>
      <td>
        <p id="${i}a1">
        <input type="radio" name="${i}opta" id="${i}a" value="a"> A. ${currentQuestions[i].answers['a']}
        </p>
      </td>
      <td>
        <p id="${i}a1">
        <input type="radio" name="${i}opta" id="${i}a" value="b"> B. ${currentQuestions[i].answers['a']}
        </p>
      </td>
    </tr>
  </table>
</div> */}


let cnt = 0
let correct = 0;
let wrong = 0;
let skip = 0;
getQuestions()
const homeButton = document.getElementById("backToHome");
const saveButton = document.getElementById("submit");
const form = document.getElementById('Secondary');
const correctBag = document.getElementById('correct');
const wrongBag = document.getElementById('wrong');
const skipBag = document.getElementById('skip');

// const selector = `input[name=opt]:checked`
// const next = querySelector(selector)
// console.log(next);

// submitButton.addEventListener("click" , function(){

function calculate(){
    let answers = []
    for(let i = 0 ; i < 5 ; i++){
        if(document.getElementById(i+"a").checked == true) answers.push('a')
        else if(document.getElementById(i+"b").checked == true) answers.push('b')
        else answers.push('none')
        console.log(answers[i]);
        // document.getElementById(i + currentQuestions[i].correctAnswer + "1").innerHTML += `<img class="icon" src="../assets/check.png">`
        if(answers[i] == currentQuestions[i].correctAnswer){
            correct++;
            // document.getElementById("qd" + i).innerHTML += `<span style="color:green"> +1 Correct</span>`
        }
        else{
            if(answers[i] != "none"){
                wrong++;
                // document.getElementById("qd" + i).style.color = "red"
                // document.getElementById(i + answers[i] + "1").innerHTML += `<img class="icon" src="../assets/delete-button.png">`
                // document.getElementById("qd" + i).innerHTML += `<span style="color:red"> +0 Wrong</span>`
            }
            else{
                skip++;
                // document.getElementById("qd" + i).style.color = "purple"
                // document.getElementById("qd" + i).innerHTML += `<span style="color:purple"> +0 Not Attempted</span>`
            }
        }
    }
}
    
saveButton.addEventListener('click', (event) => {
    calculate();
    saveButton.style.display = "none" // remove display butoon
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

