const apiKey="7b3bfb316c572b90493c50f51eb086c4";
            const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

            const searchBox=document.querySelector(".search input");
            const searchBtn=document.querySelector(".search button");


            async function checkWeather(city) {
                const response= await fetch(apiUrl + city +`&appid=${apiKey}`)
            var data = await response.json();

            console.log(data);
            
            document.querySelector(".city").innerHTML=data.name;
            document.querySelector(".temp").innerHTML=Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
            document.querySelector(".wind").innerHTML=data.wind.speed + " km/h";
            document.querySelector(".clouds").innerHTML=data.clouds.all + "%";

            const sunrise=data.sys.sunrise;
            const sunset=data.sys.sunset;
            const currentTime=data.dt;
            const isDayTime= currentTime>= sunrise && currentTime<sunset;

            updateBackground(isDayTime);
            }
            
            function updateBackground(isDayTime)
            {
                const body= document.body;
                const detailscol=document.querySelectorAll('.col');

                if(isDayTime){
                    body.style.backgroundImage="url('sunny.jpg')";
                    detailscol.forEach(col=>{
                        col.style.backgroundColor="rgba(0,0,0,0.4)";
                        col.style.color="white";
                    });
                }
                else
                    body.style.backgroundImage="url('night.jpg')";

            }

            searchBtn.addEventListener("click",()=>{
                checkWeather(searchBox.value);
                });

            searchBox.addEventListener("keypress",function(event){
                if(event.key==="Enter"){
                checkWeather(searchBox.value);
            }
            });
            
            window.addEventListener("load",()=>{
                checkWeather("Kolkata");
            });
            