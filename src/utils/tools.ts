/**
 *  随机数
 * @param start 
 * @param end 
 */
export function getRandomNumberByRange(start, end) {
    return Math.round(Math.random() * (end - start) + start)
}
