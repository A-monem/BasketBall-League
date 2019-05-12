import React from 'react'
import PropTypes from 'prop-types'
import {Link, Route} from 'react-router-dom'
import slug from 'slug'

function CustomLink ({ to , children}){
    return(
        <Route
            path={to.pathname}
            children = {( {match} ) => {
                return(
                <li style={{fontWeight: match ? 'Bold' : 'normal'}}>
                    <Link to={to}>{children}</Link>
                </li>
            )}}
        />
    )
}

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default function Sidebar({title, list, loading, match, location}){
    return(
        loading === true
        ? <h1>Loading</h1>
        : <div>
            <h3 className='header'>{title}</h3>
            <ul className='sidebar-list'>
                {list.map((item) => (
                    <CustomLink 
                    key={item}
                    to={{
                        pathname: `${match.url}/${slug(item)}`,
                        search: location.search
                    }}>
                    {item.toUpperCase()}
                    </CustomLink>
                ))}
            </ul>
          </div>
    )
}
