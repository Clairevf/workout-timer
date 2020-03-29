import React, { Component } from 'react'; // we need this to make JSX compile

export type TimeBlockProps = {
  duration: number,
  activeClass: string
}

export class TimeBlock extends Component<{duration: number, activeClass: string}, TimeBlockProps> {
    interval: NodeJS.Timer;

    // render will know everything!
    render() {
        return <div className={"time-block " + this.props.activeClass}>
            <h1>{this.props.duration} seconds remaining!</h1>
        </div>;
    }
}