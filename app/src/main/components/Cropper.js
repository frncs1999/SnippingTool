import React from 'react';
import Rnd from 'react-rnd';
const {screen} = require('electron');
const screenSize = screen.getPrimaryDisplay().size;

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 2px black',
    margin: '5px'
};

class Cropper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: '500px',
            height: '500px',
            x: (screenSize.width/2) - 250,
            y: (screenSize.height/2) - 250
        };
    }

    render(){
        return(
            <Rnd
                style={style}
                size={{ width: this.state.width, height: this.state.height }}
                position={{ x: this.state.x, y: this.state.y }}
                onDragStop={(e, d) => {
                    this.setState({ x: d.x, y: d.y })
                }}
                onResize={(e, direction, ref, delta, position) => {
                    this.setState({
                        width: ref.style.width,
                        height: ref.style.height,
                        x : position.x,
                        y : position.y
                    });
                }}
                bounds={'parent'}
            >
                <div className="rnd-controls">
                    <button
                        className="btn btn-primary"
                        onClick={this.props.snip.bind(this, this.state)}
                    >CAPTURE</button>
                    <button
                        onClick={this.props.destroySnipView.bind(this)}
                        className="btn btn-primary"
                    >CANCEL</button>
                </div>
            </Rnd>
        )
    }
}

export default Cropper;
