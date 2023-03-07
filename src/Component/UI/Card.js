import './Card.css'

const Card = (props) => {
    return (
        <div className="input-box">
            {props.children}
        </div>
    )
}

export default Card;