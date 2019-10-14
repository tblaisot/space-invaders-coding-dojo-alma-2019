import { MoveableRectangle } from './Rectangle';

export class Missile extends MoveableRectangle {
    static WIDTH = 10;
    static HEIGHT = 28;

    verticalSpeed = -1;
    horizontalSpeed = 0;

    constructor(protected registerMoveable: (MoveableRectangle) => void, left: number, top: number, verticalSpeed: number = -1) {
        super(registerMoveable, left, top, Missile.WIDTH, Missile.HEIGHT);
        this.verticalSpeed = verticalSpeed;
    }
}
