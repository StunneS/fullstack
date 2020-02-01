import React from 'react'

const Course = ({course}) => {
    return (
        <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}
const Header = (props) => {
    return(
        <>
        <h2>{props.course}</h2>
        </>
    )
}
const Content = ({parts}) => {
    return(
        <div>
        {parts.map((part) =>
        <Part key={part.id} part={part} />
        )}
        </div>
    )
}
const Part = (props) => {
    return(
        <>
        <p>
            {props.part.name} {props.part.exercises}
        </p>
        </>
    )
}
const Total = (props) => {
    const total = props.parts.reduce((add, current) => {
        return (
            add + current.exercises
        )
     },0)
    return(
        <>
        <p><b>The total number of exercises in this course is {total} </b></p>
        </>
    )
}
export default Course