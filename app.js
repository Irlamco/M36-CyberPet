const restBtn = document.getElementById("restButton")
const eatBtn = document.getElementById("eatButton")
const playBtn = document.getElementById("playButton")
const pet = document.getElementById("pet")
const start = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const petStatus = document.getElementById("status")

// stats

const sleep = document.getElementById("sleep")
const happy = document.getElementById("happy")
const hungry = document.getElementById("hungry")

let newPet = ("")
let defaultRoom = "rgb(167,207,199)"

function update(){
sleep.textContent = newPet._sleep
happy.textContent = newPet._happiness
hungry.textContent = newPet._eatDrink
}
function hideBtns(){
    restBtn.style.display = "none"
    eatBtn.style.display = "none"
    playBtn.style.display = "none"
    stopBtn.style.display = "block"
}

function showBtns(){
    restBtn.style.display = "block"
    eatBtn.style.display = "block"
    playBtn.style.display = "block"
    stopBtn.style.display = "none"
}
//class
class virtualPet{
    constructor(name){
    this._name = name;
    this._eatDrink = 50;
    this._sleep = 50;
    this._happiness = 50;
}

eat(){
        if (this._eatDrink > 40){
            this._eatDrink -= 25;
            this._sleep += 25;
            petStatus.textContent=(`${this._name} eats their food and has something to drink`) 
            hideBtns()
            update()
        }
        else {
            petStatus.textContent=(`${this._name} is not hungry or thirsty yet. Current hunger is ${this._eatDrink}`)
        }
    }
rest(){
        if (this._sleep > 40){
            this._sleep -= 25;
            this._eatDrink += 25;
            this._happiness -= 25;
            petStatus.textContent=(`${this._name} needs to rest now. Time for bed`)
            pet.src="Model/Animations/Pet_Sleep.gltf"
            hideBtns()
            update()
        } else {
            petStatus.textContent=(`${this._name} is not tired yet. Current tiredness is ${this._sleep}`)
        }
    }
play(){ 
        if (this._happiness < 70){
            this._happiness += 25
            this._sleep += 25
            petStatus.textContent=(`${this._name} Wants to play with you.`)
            hideBtns()
            update()
        } else {
            petStatus.textContent=(`${this._name} does not want to play at the moment. Current happiness is ${this._happiness}`)
        }
    } 
check(){
if (this._happiness <= 0 || this._eatDrink >= 100 || this._sleep >= 100){
    petStatus.textContent=(`${this._name} decides to leave.`)
    hideBtns()
    stopBtn.style.display = "none"
}
}
 
}
class shiba extends virtualPet{
    constructor(name){
        super(name)
        this._petType ="shiba"
    }
}     

function begin(){
    let petName = prompt("Enter name of pet", " ");
    document.getElementById("greeting").innerHTML =
    "Hey! I'm "  + petName + ". Your pet. Don't let me die.";
    newPet = new shiba(petName, true);
    start.style.display = "none"; 
    document.getElementById("one").style.display = "none";
    document.getElementById("two").style.display = "flex";
    update()
    }



start.addEventListener("click", () => {
    begin()
})

eatBtn.addEventListener("click", () => {
    newPet.eat()
    newPet.check()
    console.log(newPet)
})

restBtn.addEventListener("click", () => {
    newPet.rest()
    newPet.check()
    console.log(newPet)
})

playBtn.addEventListener("click", () => {
    newPet.play()
    newPet.check()
    console.log(newPet)
})

stopBtn.addEventListener("click", () =>{
    showBtns()
    pet.src="Model/Animations/Pet_Idle.gltf"
    petStatus.textContent=".."

})
