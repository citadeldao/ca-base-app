export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class ImplementationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImplementationError';
    }
}
