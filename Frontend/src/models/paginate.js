
export class Paginate {
    constructor(
        hasNext,
        hasPrevious,
        next,
        previous) {
        this.hasNext = hasNext
        this.hasPrevious = hasPrevious
        this.nextID = next
        this.previousID = previous
    }
}