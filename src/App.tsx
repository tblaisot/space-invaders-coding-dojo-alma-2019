import React from 'react';
import './App.css';
import { Game } from './game/models/Game';
import { Playground } from './game/Playground';


const useAnimationFrame = () => {
    const [count, setCount] = React.useState(0)

    // Use useRef for mutable variables that we want to persist
    // without triggering a re-render on their change
    const requestRef = React.useRef<number>();
    const previousTimeRef = React.useRef<number>();
    const gameRef = React.useRef<Game>();

    const animate = time => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            // Pass on a function to the setter of the state
            // to make sure we always have the latest state
            setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
            if (gameRef.current !== undefined) {
                gameRef.current.loop(deltaTime)
            }
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    React.useEffect(() => {
        gameRef.current = new Game();
    }, []);

    React.useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current as number);
    }, []); // Make sure the effect runs only once

    return [gameRef]
};


export const App: React.FC = () => {
    const [game] = useAnimationFrame();
    let playground;
    if (game && game.current) {
        playground = (<Playground game={game.current as Game}/>)
    }
    return (
        <div className="App">
            <header className="App-header"></header>
            {playground}
        </div>
    );
};

