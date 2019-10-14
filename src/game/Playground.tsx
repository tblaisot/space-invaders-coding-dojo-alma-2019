import React, { useEffect, useRef } from 'react';
import './Playground.css';
import { Hero } from './Hero';
import { Missiles } from './Missiles';
import { Enemies } from './Enemies';
import { Game } from './models/Game';
import { Score } from './Score';

export const Playground: React.FC<{ game: Game }> = ({game}) => {

    const thisRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (thisRef.current)
            (thisRef.current as any).focus();
    }, []);

    return (
        <div className="Game-background"
             onKeyDown={e => game.hero.handleKeyDown(e.key)}
             onKeyUp={e => game.hero.handleKeyUp(e.key)}
             tabIndex={0}
             ref={thisRef}>
            <Hero hero={game.hero}/>
            <Missiles missiles={game.hero.missiles.concat(game.wave.enemies.flatMap(enemy => enemy.missiles))}/>
            <Enemies enemies={game.wave.enemies}/>
            <Score score={game.score}/>
        </div>
    );
};
