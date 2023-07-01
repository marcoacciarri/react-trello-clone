import { off } from "process";
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board);

    const res = await fetch('/api/generateSummary/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf8",
        },
        body: JSON.stringify({ todos }),
    });

    if (res.ok) {
        const data = await res.json();
        const { content } = data;

        return content;
    } else {
        return res.statusText;
    }
}

export default fetchSuggestion;