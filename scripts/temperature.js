const ctx = document.getElementById('chart');
              const temps = JSON.parse('<%- JSON.stringify(temps) %>');
              let tempArr = [];
              const timeArr = [];
              for (let temp of temps) {
                tempArr.push(temp.temp);
                timeArr.push(temp.time);
              }
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: timeArr.map((el) => {
                    el = new Date(el);
                    return `${el.getHours()}:${el.getMinutes()}`;
                  }),//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                  datasets: [{
                    label: '\u00B0C',
                    data: tempArr,//[12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                  }]
                },
                options: {
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }
              });

              const datepicker = document.getElementById('datepicker');
              


const dateSubmit=document.querySelector("#dateForm");

dateSubmit.addEventListener('submit',(evt)=>{
    evt.preventDefault();
    const dateVal=dateSubmit.elements.datePicker.value;
    const date=new Date(dateVal);
    console.log(date);
})