export function throttle(ms = 500) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {

        const metodoOriginal = descriptor.value;
        let timer = 0;

        descriptor.value = function (...args: any[]) {
            if (event) event.preventDefault()
            clearInterval(timer);
            timer = setTimeout(() => metodoOriginal.apply(this, args), ms);
        }
    }

}