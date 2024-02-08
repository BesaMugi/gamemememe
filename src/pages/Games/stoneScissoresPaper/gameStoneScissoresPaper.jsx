import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/header.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserWallet } from "../../../reducer/userSlice.jsx";
import styles from "./index.module.scss"

const StoneScissorsPaper = () => {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [upWallet, setUpWallet] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);

    const choices = ["камень", "ножницы", "бумага"];
    const outcomes = {
        "камень": { "камень": "Ничья", "ножницы": "Победа", "бумага": "Поражение" },
        "ножницы": { "камень": "Поражение", "ножницы": "Ничья", "бумага": "Победа" },
        "бумага": { "камень": "Победа", "ножницы": "Поражение", "бумага": "Ничья" }
    };

    const randomChoice = () => choices[Math.floor(Math.random() * choices.length)];

    const playGame = async (playerChoice) => {
        if (!user || user.wallet <= 0) {
            alert("У вас недостаточно денег для игры или пользователь не найден");
            return;
        }
        const computer = randomChoice();
        setPlayerChoice(playerChoice);
        setComputerChoice(computer);
        const result = outcomes[playerChoice][computer];
        if (!user || !user._id) {
            console.error('Игрока нет');
            return;
        }
        if (result === "Победа") {
            const updateWallet1 = await dispatch(updateUserWallet({ userId: user._id, newWalletValue: +10 }));
            setUpWallet(updateWallet1);
        } else if (result === "Поражение") {
            const updateWallet2 = await dispatch(updateUserWallet({ userId: user._id, newWalletValue: -5 }));
            setUpWallet(updateWallet2);
        }
    };

    useEffect(() => {
        dispatch(getUserInfo()).then(() => {
            if (user && user.wallet !== null) {
                setUpWallet(user.wallet);
            }
        });
    }, [dispatch, user]);
    

    // Проверка наличия объекта user перед доступом к свойствам
    if (!user) {
        // Если user не определен, можно выполнить какие-то действия или вернуть заглушку
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <h3 className={styles.wallet}>
                {user && (
                    <div>
                        Кошелек: {user.wallet} $
                    </div>
                )}
            </h3>
            <div className={styles.button_container}>
                <button onClick={() => playGame("камень")}>Камень</button>
                <button onClick={() => playGame("ножницы")}>Ножницы</button>
                <button onClick={() => playGame("бумага")}>Бумага</button>
            </div>
            <div className={styles.result_container}>
    {playerChoice && (
        <p>
            Ваш выбор:{" "}
            <span className={styles[playerChoice === computerChoice ? "span3" : "span1"]}>
                {playerChoice}
            </span>{" "}
        </p>
    )}
    {computerChoice && (
        <p>
            Выбор компьютера:{" "}
            <span className={styles[playerChoice === computerChoice ? "span3" : "span2"]}>
                {computerChoice}
            </span>{" "}
        </p>
    )}
    {playerChoice && computerChoice && (
        <p>
            Результат:{" "}
            <span className={styles.span3}>
                {outcomes[playerChoice][computerChoice]}
            </span>{" "}
        </p>
    )}
</div>

        </>
    )
}

export default StoneScissorsPaper;
