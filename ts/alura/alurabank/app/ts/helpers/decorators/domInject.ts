export function domInject(seletor: string) {

    return (target: any, key: string) => {
        let elemento: JQuery;

        const getter = () => {
            if (!elemento)
                elemento = $(seletor)

            return elemento
        }

        Object.defineProperty(target, key, { get: getter });
    }

}