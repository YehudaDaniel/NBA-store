  
const ctx1 = document.getElementById('salesPerYear');
const ctx2 = document.getElementById('salesPerMonth');

        const chart1 = new Chart(ctx1,{
            type: 'bar',
            data:{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'],
                datasets: [{
                    label:'2021',
                    data: [50, 60,100,120,200,400,300,350,300,400,500,200]
                },
                {
                    label:'2022',
                    data: [100, 150,200,150,250,450,500,500,550,410,220,250]
                },
            {
                label:'2023',
                    data: [200,300,350,400,500,600,600,620,700,600,300,500]
            }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text:'Sales Per Year',
                    }
                }
            }
        });
        
        const chart2 = new Chart(ctx2,{
            type: 'bar',
            data:{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'],
                datasets: [
            {
                label:'2023',
                    data: [200,300,350,400,500,600,600,620,700,600,300,500]
            }]
            },
            options:{
                plugins:{
                    title:{
                        display:true,
                        text:'Sales Per Month - 2023',
                    }
                }
            }
        });
