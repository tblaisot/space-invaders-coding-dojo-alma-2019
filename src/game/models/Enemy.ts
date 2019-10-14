import { Rectangle } from './Rectangle';
import { Missile } from './Missile';


export class Enemy extends Rectangle {
    static WIDTH = 50;
    static HEIGHT = 50;

    missiles: Missile[] = [];

    constructor(protected registerMoveable: (MoveableRectangle) => void, left: number, top: number) {
        super(left, top, Enemy.WIDTH, Enemy.HEIGHT)
    }

    fireMissile() {
        this.missiles.push(new Missile(this.registerMoveable, this.left + (this.width / 2 - Missile.WIDTH), this.top - Missile.HEIGHT, 1))
    }
}
