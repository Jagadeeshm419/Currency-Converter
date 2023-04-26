let select = document.querySelectorAll(".currency")
let button = document.getElementById('btn')
let input  = document.getElementById('input')
let result = document.getElementById('result')


fetch('https://api.frankfurter.app/currencies')
.then ((res)=>{
    if(res.ok)
        console.log("success");
    else
        console.log("error");

    return res.json()    
})
.then(res=>displayDropdown(res))                                //Sending .json()=>res to displayDropdown() method


function displayDropdown(res){
    let curr = Object.entries(res)                              //Converting to an array format

    for(i=0; i<curr.length; i++){
        let opt = `<option value="${curr[i][0]}"> ${curr[i][0]} </option>`
        select[0].innerHTML += opt
        select[1].innerHTML += opt
    }
}

button.addEventListener('click', ()=>{

    let curr1  = select[0].value
    let curr2  = select[1].value
    let inpVal = input.value

    if(curr1===curr2)
        alert("Select Different Currency");

    else
        convert(curr1, curr2, inpVal)    
});

function convert(curr1, curr2, inpVal){
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${inpVal}&from=${curr1}&to=${curr2}`)
    .then((resp)=>{
        if(resp.ok)
            console.log("success");
        else
            console.log("error");
    
        return resp.json()    
    })
    .then((data)=> document.getElementById('result').value = Object.values(data.rates)[0])               
    }    