import './style.css';

function Box(props){

    const styles = {
        backgroundColor: props.on ? "#DC362D" : "white"
    }

    return (
        <div 
            onClick={() => props.handleClick(props.id)} 
            className='box' 
            style={styles}>
        </div>
    )
}

export default Box;