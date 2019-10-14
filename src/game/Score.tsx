import React from 'react';

export const Score: React.FC<{ score: number }> = ({score}) => {
    return (
        <p style={{position: "absolute", top: "15px", left: "1100px", backgroundColor: "white", fontSize: "25px"}}>{score}</p>
    );
};
