export function throttle(fn,delay){
  let timer = null //借助闭包
  return function(event) {
      if(timer){
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
        console.log('看似')
        fn(event)
      }, delay);
  }
}