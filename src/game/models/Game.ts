import { Hero } from './Hero';
import { Enemy } from './Enemy';
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
        console.log(deltaTime);
        if(Math.random() < .1) {
            const rdnEnemy = Math.floor(Math.random() * this.wave.enemies.length);
            const en = this.wave.enemies[rdnEnemy];
            en.fireMissile();
            console.log('missile');
        }
    }


    collisionDetection() {
        for (var enemy = 0; enemy < this.wave.enemies.length; enemy++) {
            for (var missile = 0; missile < this.hero.missiles.length; missile++) {
                if (
                    detectCollision(this.hero.missiles[missile], this.wave.enemies[enemy])
                ) {
                    // such a bad idea :)
                    this.wave.enemies.splice(enemy, 1);
                    this.hero.missiles.splice(missile, 1);
                }
            }
            if (
                detectCollision(this.hero, this.wave.enemies[enemy])
            )  {
                    (window.location as any).reload();
                }
        }
    }
}
