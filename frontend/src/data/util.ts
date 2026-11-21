export function debounce(fn: (...args: any[]) => void, ms = 300) {
    let timer:number;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}