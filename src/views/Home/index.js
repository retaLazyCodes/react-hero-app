import React, { useContext } from "react";
import SuperHeroContext from "../../context/superhero"
import ResultsListItem from "../Results/components/ResultsListItem"
import Spinner from "../../components/Spinner"
import { Card, ListGroup } from "react-bootstrap";

const Home = () => {
    const { myHeroes, isFetching } = useContext(SuperHeroContext)

    const teamPowerstats = [...myHeroes]

    const TeamIntelligence = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.intelligence === 'null') {
            powerstats = curHero.powerstats.intelligence = 0
        }
        powerstats = Number(curHero.powerstats.intelligence)
        return prev + powerstats;
    }, 0);

    const TeamStrength = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.strength === 'null') {
            powerstats = curHero.powerstats.strength = 0
        }
        powerstats = Number(curHero.powerstats.strength)
        return prev + powerstats;
    }, 0);

    const TeamSpeed = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.speed === 'null') {
            powerstats = curHero.powerstats.speed = 0
        }
        powerstats = Number(curHero.powerstats.speed)
        return prev + powerstats;
    }, 0);

    const TeamDurability = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.durability === 'null') {
            powerstats = curHero.powerstats.durability = 0
        }
        powerstats = Number(curHero.powerstats.durability)
        return prev + powerstats;
    }, 0);

    const TeamPower = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.power === 'null') {
            powerstats = curHero.powerstats.power = 0
        }
        powerstats = Number(curHero.powerstats.power)
        return prev + powerstats;
    }, 0);

    const TeamCombat = teamPowerstats.reduce((prev, curHero) => {
        let powerstats;
        if (curHero.powerstats.combat === 'null') {
            powerstats = curHero.powerstats.combat = 0
        }
        powerstats = Number(curHero.powerstats.combat)
        return prev + powerstats;
    }, 0);

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
                        <ListGroup.Item>Total Power: {TeamPower}</ListGroup.Item>
                        <ListGroup.Item>Total Durability: {TeamDurability}</ListGroup.Item>
                        <ListGroup.Item>Total Strength: {TeamStrength}</ListGroup.Item>
                        <ListGroup.Item>Total Intelligence: {TeamIntelligence}</ListGroup.Item>
                        <ListGroup.Item>Total Speed: {TeamSpeed}</ListGroup.Item>
                        <ListGroup.Item>Total Combat: {TeamCombat}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>

        </div >
    )
}

export default Home;