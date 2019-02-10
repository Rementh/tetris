import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Canvas extends Component {
    constructor(props) {
        super(props);
        this.canvasRef = createRef();
    }

    componentDidUpdate() {
        // Draws a square in the middle of the canvas rotated
        // around the centre by this.props.angle
        const { angle } = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.save();
        ctx.beginPath();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width / 2, height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.fillStyle = '#4397AC';
        ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
        ctx.restore();
    }

    render() {
        return <canvas style={{ margin: 'auto' }} width="300" height="300" ref={this.canvasRef} />;
    }
}

Canvas.propTypes = {
    angle: PropTypes.number
};

export default Canvas;
