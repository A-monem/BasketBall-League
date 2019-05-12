import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getPlayers } from '../api'
import slug from 'slug'
import { parse } from 'query-string'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default class Players extends Component {
    state = {
        players: [],
        loading: true
    }

    fetchPlayers(teamId) {
        getPlayers(teamId)
            .then((players) => (this.setState(() => (
                {
                    players: players,
                    loading: false
                }
            ))))
    }

    componentDidMount() {
        const { search } = this.props.location

        search
            ? this.fetchPlayers(parse(search).teamId)
            : this.fetchPlayers()
    }

    render() {
        const { players, loading } = this.state
        const { match, location } = this.props
        return (
            <div className='container two-column'>
                <Sidebar
                    title='Players'
                    list={players.map(player => player.name)}
                    loading={loading}
                    {...this.props}
                />

                {loading === false && location.pathname === '/players'
                    ? <h3 className='sidebar-instruction'>Select a player</h3>
                    : null}

                <Route path={`${match.url}/:playerId`} render={({ match, location }) => {
                    if (loading === true) return null

                    const {
                        name, position, teamId, number, avatar, apg, ppg, rpg, spg
                    } = players.find((player) => slug(player.name) === match.params.playerId)

                    return (
                        <TransitionGroup className='panel'>
                            <CSSTransition key={location.key} classNames='fade' timeout={500}>
                                <div className='panel'>
                                    <img className='avatar' src={`${avatar}`} alt={`${name}'s avatar`} />
                                    <h1 className='medium-header'>{name}</h1>
                                    <h3 className='header'>#{number}</h3>
                                    <div className='row'>
                                        <ul className='info-list' style={{ marginRight: 80 }}>
                                            <li>Team
                                        <div>
                                                    <Link style={{ color: '#68809a' }} to={`/${teamId}`}>
                                                        {teamId[0].toUpperCase() + teamId.slice(1)}
                                                    </Link>
                                                </div>
                                            </li>
                                            <li>Position<div>{position}</div></li>
                                            <li>PPG<div>{ppg}</div></li>
                                        </ul>
                                        <ul className='info-list'>
                                            <li>APG<div>{apg}</div></li>
                                            <li>SPG<div>{spg}</div></li>
                                            <li>RPG<div>{rpg}</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    )
                }} />

            </div>
        )
    }
}