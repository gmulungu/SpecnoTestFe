const createGame = async (player1Name, player2Name) => {
    const url = "https://game-nshzceqiaq-uc.a.run.app/game";
    const payload = {
        player1Name,
        player2Name,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        // Await the response JSON
        const res = await response.json();
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error creating game:", error);
        throw error;
    }
};

const makeMove = async (params) => {
    const url = "https://gamemove-nshzceqiaq-uc.a.run.app/gameMove";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        // Await the response JSON
        const res = await response.json();
        console.log(res);
        return res;
    } catch (error) {
        console.error("Error creating game:", error);
        throw error;
    }
}

module.exports = {
    createGame,
    makeMove
};