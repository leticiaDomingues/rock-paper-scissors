import "./App.css";
import Logo from "./logo/Logo";
import Game from "./game/Game";
import Scoreboard from "./scoreboard/Scoreboard";
import { useState } from "react";
import { CardModel, CardType } from "./card/CardModel.ts";
import { Page } from "./PageModel.ts";
import Result from "./result/Result";
import { MatchResult, getMatchResult } from "./result/ResultModel.ts";

const App = () => {
    const [score, setScore] = useState({ computer: 0, player: 0});
    const [page, setPage] = useState(Page.GAME);
    const [matchResult, setMatchResult] = useState({ playerCard: null, computerCard: null, result: null});

    const cards = [ 
        new CardModel(CardType.ROCK),
        new CardModel(CardType.PAPER),
        new CardModel(CardType.SCISSORS)
    ];

    const generateComputerCard = () => cards[parseInt(Math.random() * 3)];

    const playCard = playerCard => {
        const computerCard = generateComputerCard();
        const result = getMatchResult(playerCard, computerCard);

        if (result === MatchResult.PLAYER_WINNER) {
            setScore({...score, player: score.player+1});
        } else if (result === MatchResult.COMPUTER_WINNER) {
            setScore({...score, computer: score.computer+1});
        }

        setMatchResult({ playerCard, computerCard, result });
        setPage(Page.RESULT);
    };

    const playAgain = () => setPage(Page.GAME);
    
   return (
    <div className="App">
        <Logo />
        { page === Page.GAME ?
            <Game cards={cards} playCard={playCard} /> :
            <Result playAgain={playAgain} matchResult={matchResult} />}
        <Scoreboard score={score} />
    </div>
   );
};

export default App;