import React, { Component } from 'react'; // we need this to make JSX compile

export type TimeBlockProps = {
  duration: number,
  activeClass: string
}

export enum TimeBlockTypes {
    ACTIVE = 0,
    REST = 1,
    BREAK = 2
};

export class TimeBlock extends Component<{duration: number, activeClass: string}, TimeBlockProps> {
    interval: NodeJS.Timer;

    // render will know everything!
    render() {
        return <div className={"time-block " + this.props.activeClass}>
            <div>{this.props.duration} seconds remaining!</div>
        </div>;
    }
}