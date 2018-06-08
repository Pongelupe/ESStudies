export function logarTempoDeExecucao(emSegundos: boolean = false) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {

        const metodoOriginal = descriptor.value;

        descriptor.value = function (...args: any[]) {
            let unidade = 'ms';
            let divisor = 1;
            if (emSegundos) {
                unidade = 's';
                divisor = 1000;
            }

            console.log('*******************');
            console.log(`parâmetros passados para o método ${key}: ${JSON.stringify(args)}`);

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();

            console.log(`o retorno do método ${key}: ${JSON.stringify(retorno)}`);
            console.log(`o método ${key} demorou ${(t2 - t1) / divisor} ${unidade}`);
            console.log('*******************');

            return retorno;
        }
    }
}