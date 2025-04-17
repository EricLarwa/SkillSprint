import React, { useEffect } from 'react'
import $ from 'jquery'
import Jordan from '../img/jordan.JPEG'
import Ricardo from '../img/Ricardo.jpg'
import Eric from '../img/Eric.jpg'
import 'jquery-ui/ui/widgets/sortable'
import './Dashboard.css'

const Dashboard = () => {
    useEffect(() => {
        $('.intro-boxes ').sortable({
            item: '> div', 
            placeholder: 'sortable-placholder',
            grid: [20, 20]
        })
    }, [])

    return (
        <div className="dashboard-container">
            <h1>Introductions</h1>

            <div className="intro-boxes">
                <div className="box-one">
                    <h2>Eric</h2>
                    <p> Spends too much money on hair products, enjoys coding web applications, hates node_modules cache </p>
                    <img alt="EricPic" className="Eric" src={Eric}></img>
                </div>
                <div className="box-two">
                    <h2>Jordan</h2>
                    <p> Hi, my name is Jordan Welborn. I’m a senior Computer Science student at East Carolina University, originally from Kinston, NC. In my free time, I enjoy 3D printing and playing Dungeons & Dragons.  </p>
                    <img alt="JordanPic" className="Jordan" src={Jordan}></img>
                </div>
                <div className="box-three">
                    <h2>Ricardo</h2>
                    <p> Did not reply to me quick enough, must introduce himself. Hispanic. </p>
                    <img alt="RicardoPic" className="Ricardo" src={Ricardo}></img>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;