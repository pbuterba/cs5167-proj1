import { readable, derived } from 'svelte/store';

//Time store code sourced from learn.svelte.dev tutorial: https://learn.svelte.dev/tutorial/readable-stores
export const time = readable(new Date(), function start(set) {
   const interval = setInterval(() => {
      set(new Date());
   }, 1000);

   return function stop() {
      clearInterval(interval);
   }
})

//Elapsed time store code sourced from learn.svelte.dev tutorial: https://learn.svelte.dev/tutorial/derived-stores
const start = new Date();
export const elapsedTime = derived(
   time,
   ($time) => {
      var hours = Math.floor(($time - start) / (1000 * 3600));
      var minutes = Math.floor(($time - start) / (1000 * 60)) - (hours * 60);
      var seconds = Math.round(($time - start) / 1000) - (hours * 3600) - (minutes * 60);
      var returnString = "";
      if(hours > 0) {
         returnString = returnString + hours + ":";
         if(minutes < 10) {
            minutes = "0" + minutes;
         }
      }
      if(seconds < 10) {
         seconds = "0" + seconds;
      }
      return returnString + minutes + ":" + seconds;
   }
);