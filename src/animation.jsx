import React, { Component } from 'react';
import Canvas from './canvas';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.lastRender = 0;
        this.lastRenderLeft = 0;
        this.lastRenderRight = 0;
        this.lastRenderRotate = 0;

        this.speedup = false;
        this.left = false;
        this.right = false;
        this.up = false;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        cancelAnimationFrame(this.rAF);
    }

    handleKeyUp(e) {
        if (e.key === 'ArrowDown') {
            this.speedup = false;
        }
        if (e.key === 'ArrowLeft') {
            this.left = false;
        }
        if (e.key === 'ArrowRight') {
            this.right = false;
        }
        if (e.key === 'ArrowUp') {
            this.up = false;
        }
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowDown') {
            this.speedup = true;
        }
        if (e.key === 'ArrowLeft') {
            this.left = true;
        }
        if (e.key === 'ArrowRight') {
            this.right = true;
        }
        if (e.key === 'ArrowUp') {
            this.up = true;
        }
    }

    loop(timestamp) {
        if (timestamp - this.lastRender >= (this.speedup ? 50 : 400)) { // update every 400 ms
            this.child.current.moveDown();
            this.lastRender = timestamp;
        }

        if (this.left && timestamp - this.lastRenderLeft >= 100) {
            this.child.current.moveLeft();
            this.lastRenderLeft = timestamp;
        }

        if (this.right && timestamp - this.lastRenderRight >= 100) {
            this.child.current.moveRight();
            this.lastRenderRight = timestamp;
        }

        if (this.up && timestamp - this.lastRenderRotate >= 200) {
            this.child.current.rotate();
            this.lastRenderRotate = timestamp;
        }

        this.updateGraphics();
        this.rAF = requestAnimationFrame(this.loop.bind(this));
    }

    updateGraphics() {
        this.child.current.draw();
    }

    render = () => <Canvas ref={this.child} />;
}

export default Animation;
