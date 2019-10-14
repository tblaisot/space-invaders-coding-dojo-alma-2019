export class Rectangle {
    constructor(
        private _left: number,
        private _top: number,
        private _width: number,
        private _height: number
    ) {
    }

    get top() {
        return this._top;
    }

    get left() {
        return this._left;
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get right() {
        return this._left + this._width
    }

    get bottom() {
        return this.top + this._height
    }

    offset(left: number, top: number) {
        this._left += left;
        this._top += top;
    }


}


export const detectCollision = (rect1: Rectangle, rect2: Rectangle) => {
    return rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top;
};

export const isOutside = (rect1: Rectangle, zone: Rectangle) => {
    return rect1.left < zone.left ||
        rect1.right > zone.right ||
        rect1.top < zone.top ||
        rect1.bottom > zone.bottom;
};


export abstract class MoveableRectangle extends Rectangle {
    abstract verticalSpeed: number;
    abstract horizontalSpeed: number;

    protected constructor(
        protected registerMoveable: (MoveableRectangle) => void,
        _left: number,
        _top: number,
        _width: number,
        _height: number
    ) {
        super(_left, _top, _width, _height);
        this.registerMoveable(this);

    }

    move(deltaTime: number) {
        this.offset(this.horizontalSpeed * deltaTime, this.verticalSpeed * deltaTime);
    }
}
