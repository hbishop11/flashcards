import { useEffect } from "react"

const Leaderboard = (scores: any[]) => {
    useEffect(() => {
        console.log('hi harry!', scores)
    }, [scores])

    return (
        <h2>test</h2>
    )
}

export default Leaderboard