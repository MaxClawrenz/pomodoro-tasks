import moment from "moment";

export function useWeeksDay(){
   
    const startDate = moment().startOf('isoWeek').add(-14, 'days');
    const lastDate = moment().endOf('isoWeek').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    
    const weekDays =  ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday'];
    let allWeeks = [];
    let i = 0;
   for(let newDate = startDate; newDate.format('YYYY-MM-DD') <= lastDate; newDate = startDate.add(1, 'days')){
       let dayNumber = newDate.weekday();
       
        const day = {name: weekDays[dayNumber], date: newDate.format('YYYY-MM-DD'), today: newDate.format('YYYY-MM-DD') === today, counterStop: 0, counterPause: 0}
        
        let targetWeek;

        if (i < 7) {
          if (!allWeeks[0]) {
            allWeeks[0] = { name: '3rd_week', days: [] };
          }
          targetWeek = allWeeks[0];
        } else if (i < 14 && i >= 7) {
          if (!allWeeks[1]) {
            allWeeks[1] = { name: '2nd_week', days: [] };
          }
          targetWeek = allWeeks[1];
        } else {
          if (!allWeeks[2]) {
            allWeeks[2] = { name: '1st_week', days: [] };
          }
          targetWeek = allWeeks[2];
        }
        targetWeek.days.push(day);
        i++
   }
   
   return allWeeks.sort((a,b) => {
    if(a.name < b.name){
      return -1;
    }
    if(a.name > b.name){
      return 1;
    }
    return 0;
   })

}

