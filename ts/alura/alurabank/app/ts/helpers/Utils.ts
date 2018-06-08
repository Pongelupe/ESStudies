import { Imprimivel } from '../models/Imprimivel';
export function imprime(...args: Imprimivel[]) {
    args.forEach(arg => arg.toString())
}