const ctx = document.getElementById('chart');
  const temps = JSON.parse('<%- JSON.stringify(temps) %>');
  let tempArr = [];
  const timeArr = [];
  for (let temp of temps) {
    tempArr.push(temp.temp);
    timeArr.push(temp.time);
  }
  timeArr.map((el) => {
    const tempDate = new Date(el);
    return `${tempDate.getHours()}:${tempDate.getMinutes()}`;
  })

  const convertedTimeArr = timeArr.map(date => {
    date = new Date(date)
    const hours = date.getHours().toString().padStart(2, '0'); // Add leading zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if needed
    return `${hours}:${minutes}`;
  });

  // const data=convertedTimeArr.map((x,index)=>({x:x,y:tempArr[index]}))
  const data = tempArr.map((y, index) => ({
    x: index,
    y: y
  }));



  const totalDuration = 20000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: data[0].y,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

  

  new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        borderColor: 'red',
        borderWidth: 1,
        radius: 0,
        data: data,
      }]
    },
    options: {
      animation,
      interaction: {
        intersect: false
      },
      plugins: {
        legend: false
      },
      scales: {
        x: {
          type: 'linear',
          ticks: {
            callback: function (value, index, values) {
              // Ensure the value is within the range of timeArr indices
              const dataIndex = Math.min(Math.max(value, 0), timeArr.length - 1);
              // Get the corresponding time value from timeArr
              const timeValue = convertedTimeArr[dataIndex];
              // Format and return the time value as desired
              return timeValue;
            }
          }
        },
        y: {
          suggestedMin: 0,
          suggestedMax: 80
        }
      },
      
      plugins:{
        legend:{
        display:false,
        title:{
          text:"\u00B0C",
          color:'red',
          padding:2,
        }
      },
      tooltip: {
        callbacks: {
          backgrooundColor:"white",
          title: function (tooltipItem, data) {
            const dataIndex = tooltipItem[0].dataIndex;
            const xValue = convertedTimeArr[dataIndex];
            // console.log(dataIndex,xValue);
            return xValue;
          }
        }
      }
    }
    }
  });




  function avgTemperature(tempArr) {
    let sum = 0;
    for (let i = 0; i < tempArr.length; i++) {
      sum += tempArr[i];
    }
    sum = sum / tempArr.length;
    ;
    return sum;
  }

  const minMaxTemp=(tempArr)=>{
    tempArr.sort();
    const temp={minTemp:tempArr[0],maxTemp:tempArr[tempArr.length-1]}
    return temp;
  }
  const updateTemperature=(temp)=>{
    const tempPlaceHolder=document.querySelector("#avgTemp");
    const minTemp=document.querySelector("#minTemp");
    const maxTemp=document.querySelector("#maxTemp");
    const tempFeatures=minMaxTemp(temp);
    console.log(tempFeatures)
    minTemp.textContent=`${tempFeatures.minTemp}\u00B0C`;
    maxTemp.textContent=`${tempFeatures.maxTemp}\u00B0C`;
    tempPlaceHolder.textContent=`${avgTemperature(temp).toFixed(2)}\u00B0C`;

  }

  
  const interval=setInterval(updateTemperature(tempArr),1000);