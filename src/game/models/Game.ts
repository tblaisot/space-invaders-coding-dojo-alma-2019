import { Hero } from './Hero';
import { Enemy } from './Enemy';
import { Missile } from './Missile';
import { detectCollision, MoveableRectangle } from './Rectangle';
import { EnemyWave } from './EnemyWave';

const ENEMY_DEFAULT_POS = [
    {left: 200, top: 100},
    {left: 300, top: 100},
    {left: 400, top: 100},
    {left: 500, top: 100},
    {left: 600, top: 100},
    {left: 700, top: 100},
    {left: 800, top: 100},
    {left: 900, top: 100},
    {left: 200, top: 175},
    {left: 300, top: 175},
    {left: 400, top: 175},
    {left: 500, top: 175},
    {left: 600, top: 175},
    {left: 700, top: 175},
    {left: 800, top: 175},
    {left: 900, top: 175}
];


export class Game {
    hero: Hero;
    wave: EnemyWave;

    private mobiles: MoveableRectangle[] = [];

    constructor() {
        this.hero = new Hero(this.registerMoveable.bind(this), 575, 700);
        this.wave = new EnemyWave(this.registerMoveable.bind(this), ENEMY_DEFAULT_POS.map(pos => new Enemy(this.registerMoveable.bind(this), pos.left, pos.top)));
    }

    registerMoveable(mobile: MoveableRectangle): void {
        this.mobiles.push(mobile);
    }

    loop(deltaTime: number) {
        this.mobiles.forEach(m => m.move(deltaTime));
        this.collisionDetection();
        if(Math.random() < .1) {
            const rdnEnemy = Math.floor(Math.random() * this.wave.enemies.length);
            const en = this.wave.enemies[rdnEnemy];
            en.fireMissile();
        }
    }


    collisionDetection() {
        for (var enemyIndex = 0; enemyIndex < this.wave.enemies.length; enemyIndex++) {
            for (var missileIndex = 0; missileIndex < this.hero.missiles.length; missileIndex++) {
                if (
                    detectCollision(this.hero.missiles[missileIndex], this.wave.enemies[enemyIndex])
                ) {
                    // such a bad idea :)
                    this.wave.enemies.splice(enemyIndex, 1);
                    this.hero.missiles.splice(missileIndex, 1);
                }
            }
            if (
                detectCollision(this.hero, this.wave.enemies[enemyIndex])
            )  {
                    (window.location as any).reload();
                }

            this.wave.enemies[enemyIndex].missiles.forEach(
                (missile: Missile) => {

                    if (detectCollision(this.hero, missile)) {
                        (window.location as any).reload();
                    }
                }
            )
        }
    }
}
