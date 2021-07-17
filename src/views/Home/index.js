import React, { useContext } from "react";
import SuperHeroContext from "../../context/superhero"
import ResultsListItem from "../Results/components/ResultsListItem"
import Spinner from "../../components/Spinner"
import { Card, ListGroup } from "react-bootstrap";

const Home = () => {
    const { myHeroes, isFetching } = useContext(SuperHeroContext)

    const teamPowerstats = [...myHeroes]

    const calculateTeamStats = (attribute) => {
        const teamStats = teamPowerstats.reduce((prev, curHero) => {
            let powerstats = 0;
            if (curHero.powerstats[attribute] !== 'null') {
                powerstats = Number(curHero.powerstats[attribute])
            }
            return prev + powerstats;
        }, 0);
        return teamStats;
    }

    const teamAttributes = {
        'power': 0, 
        'durability': 0, 
        'strength': 0, 
        'intelligence': 0, 
        'speed': 0, 
        'combat': 0
    }
    
    for (const attribute in teamAttributes) {
        const totalValue = calculateTeamStats(attribute)
        teamAttributes[attribute] = totalValue
    }

    const {power, durability, strength, intelligence, speed, combat} = teamAttributes

    return (
        <div>
            <h1 className="fw-bold">Your Team</h1>
            <div>
                {isFetching ?
                    <Spinner />
                    : myHeroes?.map((data, key) => <ResultsListItem {...data} key={key} />)
                }
            </div>
            <div >
                <Card style={{ width: '18rem', margin: 'auto', fontSize: '20px' }}>
                    <Card.Header><h2>Powerstats</h2></Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Total Power: {power}</ListGroup.Item>
                        <ListGroup.Item>Total Durability: {durability}</ListGroup.Item>
                        <ListGroup.Item>Total Strength: {strength}</ListGroup.Item>
                        <ListGroup.Item>Total Intelligence: {intelligence}</ListGroup.Item>
                        <ListGroup.Item>Total Speed: {speed}</ListGroup.Item>
                        <ListGroup.Item>Total Combat: {combat}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>

        </div >
    )
}

export default Home;