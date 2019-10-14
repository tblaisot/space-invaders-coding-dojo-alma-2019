import { Enemy } from './Enemy';
import { MoveableRectangle } from './Rectangle';

export class EnemyWave extends MoveableRectangle {

    horizontalSpeed = 0.08
    verticalSpeed = 0
    delta = 0;

    constructor(protected registerMoveable: (MoveableRectangle) => void, public enemies: Enemy[]) {
        super(registerMoveable, 0, 0, 0, 0)
    }

    get top() {
        return Math.min(...this.enemies.map(e => e.top));
    }

    get left() {
        return Math.min(...this.enemies.map(e => e.left));
    }

    get right() {
        return Math.max(...this.enemies.map(e => e.right));
    }

    get bottom() {
        return Math.max(...this.enemies.map(e => e.bottom));
    }

    get height() {
        return this.bottom - this.top
    }

    get width() {
        return this.right - this.left
    }

    offset(left: number, top: number) {
        this.enemies.forEach(e => e.offset(left, top));
    }

    move(deltaTime: number) {
        if(this.right > 1100 && this.horizontalSpeed >= 0) {
            this.verticalSpeed = 0.08
            this.horizontalSpeed = 0
            this.delta += deltaTime
            if(this.delta >= 1000) {
                this.verticalSpeed = 0
                this.horizontalSpeed = -0.08
            }
            
        }
        this.offset(this.horizontalSpeed * deltaTime, this.verticalSpeed * deltaTime);
    }
}

