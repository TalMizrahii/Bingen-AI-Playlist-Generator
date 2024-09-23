import './CloseBtn.css'

const CloseBtn = ({closeHandler}) => {

    return (
        <div className="close-container" onClick={closeHandler}>
            <div className="leftright"></div>
            <div className="rightleft"></div>
        </div>
    )
}

export default CloseBtn;
