const wrapper = document.querySelector(".wrapper"), //get all the classes and tag
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),

locationBtn = inputPart.querySelector("button"),
Wicons = wrapper.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i")
let api;

inputField.addEventListener("keyup", e =>{
    //if use pressed input button and input value is not empty
    if(e.key =="Enter" && inputField.value !=""){
        requestApi(inputField.value);
    }
})


locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ //if browser support
        navigator.geolocation.getCurrentPosition(onSucess, onError);
        
    } else{
        alert("your browser does not support this function");
    }
});

function onSucess(position){
    const {latitude, longitude} = position.coords;
    api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=d8d02dbf6bc7c44e7f43b672ef4fd985`;
    fetchData();

}
function onError(error){
    infoTxt.innerText =error.message;
    infoTxt.classList.add("error");
}

function requestApi(city){

     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d8d02dbf6bc7c44e7f43b672ef4fd985`;
        fetchData();
}
function fetchData(){
        //getting api response and returning with parsing to obj and in another
    //calling weatherDetails function with passing api result as an argument
    infoTxt.innerText ="Getting Weather Details.....";
    infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    infoTxt.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoTxt.innerText = `${inputField.value} is not found`;
    }
    else{
        //getting required property from api
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        //set icons according to temperature
        if(id==800){
            Wicons.src="icons/clear.svg";
        } else   if(id>=200 && id<=232){
            Wicons.src="icons/storm.svg";
        }else   if(id>=600 && id<=622){
            Wicons.src="icons/snow.svg";
        }else   if(id>=701 && id<=781){
            Wicons.src="icons/haze.svg";
        }else   if(id>=801 && id<=804){
            Wicons.src="icons/cloud.svg";
        }else   if(id>300 && id<=321){
            Wicons.src="icons/rain.svg";
        }
        
        // passing the values to particular html

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(`${feels_like}`);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
        





        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
    
    }
    
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
})