import { MoveableRectangle } from './Rectangle';
import { Missile } from './Missile';


export class Hero extends MoveableRectangle {
    static WIDTH = 50;
    static HEIGHT = 50;

    static MAX_VERTICAL_SPEED = 0.1;
    static MAX_HORIZONTAL_SPEED = 0.1;

    verticalSpeed = 0;
    horizontalSpeed = 0;

    missiles: Missile[] = [];

    constructor(protected registerMoveable: (MoveableRectangle) => void, left: number, top: number) {
        super(registerMoveable, left, top, Hero.WIDTH, Hero.HEIGHT)
    }


    accelerateLeft() {
        if(this.left > 100) {
            this.verticalSpeed = 0;
            this.horizontalSpeed = -Hero.MAX_HORIZONTAL_SPEED;
        } else {
            this.horizontalSpeed = 0;
        }

    }

    accelerateRight() {
        if(this.right < 1100) {
            this.verticalSpeed = 0;
            this.horizontalSpeed = Hero.MAX_HORIZONTAL_SPEED;
        } else {
            this.horizontalSpeed = 0;
        }
    }

    accelerateDown() {
        if(this.bottom < 800) {
            this.verticalSpeed = Hero.MAX_VERTICAL_SPEED;
            this.horizontalSpeed = 0;
        } else {
            this.verticalSpeed = 0;
        }
    }
    
    accelerateUp() {
        if(this.top > 50) {
            this.verticalSpeed = -Hero.MAX_VERTICAL_SPEED;
            this.horizontalSpeed = 0;
        } else {
            this.verticalSpeed = 0;
        }
    }
    stop() {
        this.verticalSpeed = 0;
        this.horizontalSpeed = 0;
    }

    handleKeyDown(key: string) {
        if (key === 'ArrowLeft') {
            // Left
            this.accelerateLeft();
        }
        if (key === 'ArrowRight') {
            // Right
            this.accelerateRight();
        }
        if (key === 'ArrowUp') {
            // Right
            this.accelerateUp();
        }
        if (key === 'ArrowDown') {
            // Right
            this.accelerateDown();
        }
    }

    handleKeyUp(key: string) {
        if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
            // Left
            this.stop();
        }
        if (key === ' ') {
            this.fireMissile()
        }
    }

    private fireMissile() {
        this.missiles.push(new Missile(this.registerMoveable, this.left + (this.width / 2 - Missile.WIDTH), this.top - Missile.HEIGHT))
    }
}
