import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';

const Piece = (props) => {
    const [piece, setPiece] = useState(".");
    const boardStatus = () => {
        setPiece(
            props.onBoardChange(
                props.pieceId
            )
        )
    }

    return (
        <button className="piece" onClick={()=> boardStatus()}>{piece}</button>
    );
}

const Board = () => {
    const initBoard = [
        null,null,null,
        null,null,null,
        null,null,null
    ];
    const [player, setPlayer] = useState(".")
    const [board, setBoard] = useState(initBoard);
    const [winner, setWinner] = useState(null);


    const boardChange = (index) => {
        if(board[index] === null ) {
            const nextPlayer = player === "x" ? "o" : "x";
            board[index] = nextPlayer;
            setWinner(checkWinner(board));
            setBoard(board);
            setPlayer(nextPlayer);
            console.log(nextPlayer);
            return nextPlayer;
        }
        return board[index];
    }

    const checkWinner = (board) => {
        const options = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (let i = 0; i < options.length; i++) {
            const [a, b, c] = options[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        return "no winner";
    }

    return(
        <>
            <div className="board">
                {board.map((board, index) =>
                <Piece pieceId={index} key={index} onBoardChange={boardChange}/>
                )}
            </div>
            <div className="winner">The winner is: {winner}</div>
        </>
    );
}

ReactDOM.render(
    <Board />,
    document.getElementById('root')
);
