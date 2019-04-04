import React, { Component } from 'react';
import PureCanvas from './pure-canvas';
import colors from '../consts/colors';
import { FaCaretLeft, FaUndoAlt, FaCaretDown, FaCaretRight } from 'react-icons/fa';
import makePlayer from '../game/player';
import makeGrid from '../game/grid';
import makeDrawer from '../game/drawer';


class Canvas extends Component {
    onContextUpdate = (ctx, ctxState) => {
        this.ctx = ctx;
        this.grid = makeGrid(20, 10);
        this.drawer = makeDrawer(this.ctx, ctxState, this.grid);
        this.player = makePlayer(this.grid);
    }

    moveDown() {
        this.player.moveDown();
    }

    moveLeft() {
        this.player.moveLeft();
    }

    moveRight() {
        this.player.moveRight();
    }

    rotate() {
        this.player.rotate();
    }

    draw() {
        this.drawer.clearCtx();

        this.drawer.colorCtx(colors.background);
        this.drawer.drawBackground();

        this.drawer.colorCtx(colors.net);
        this.drawer.drawNet();

        this.grid.elements().forEach((square, index) => {
            if (square) {
                const row = Math.floor(index / this.grid.cols());
                const col = index % this.grid.cols();
                this.drawer.drawRect(row, col, square - 1);
            }
        });
    }

    render() {
        const button = {
            border: 'none',
            outline: 'none',
            width: '60px',
            height: '60px',
            borderRadius: '6px',
            color: colors.background,
            fontSize: '40px',
            display: 'flex'
        };

        return (
            <React.Fragment>
                <div style={{ display: 'flex' }}>
                    <PureCanvas contextRef={this.onContextUpdate} onClick={this.onContextClick} />
                    <div style={{ margin: '0 auto', padding: '20px' }}>
                        <p>Score</p>
                        <p>2341</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', margin: 'auto 0', padding: '20px 0' }}>
                    <button onClick={() => this.player.moveLeft()} style={button}>
                        <FaCaretLeft style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.moveDown()} style={button}>
                        <FaCaretDown style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.moveRight()} style={button}>
                        <FaCaretRight style={{ margin: 'auto' }} />
                    </button>
                    <button onClick={() => this.player.rotate()} style={button}>
                        <FaUndoAlt style={{ margin: 'auto' }} />
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Canvas;