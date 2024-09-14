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
      var minutes = Math.floor(($time - start) / (1000 * 60));
      var seconds = Math.round(($time - start) / 1000) - minutes * 60;
      if(seconds < 10) {
         seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
   }
);