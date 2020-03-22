import React, { Component } from 'react'; // we need this to make JSX compile

type TimerProps = {
  duration: number,
  isActive: boolean,
  isFinished: boolean
}

// export const TimeBlock = ({ duration, isActive }: TimerProps) => <aside>
//   <h2>{ duration } seconds on the clock...</h2>
//   <p> active ? { isActive ? 'GO!' : 'REST' }
//   </p>
// </aside>

// const el = <TimeBlock duration={45} isActive={true} />

export class TimeBlock extends Component<{duration: number, isActive: boolean}, TimerProps> {
    interval: NodeJS.Timer;
    constructor(props : TimerProps) {
        super(props);

        this.state = {
            duration: props.duration,
            isActive: props.isActive || true,
            isFinished: false
        };
    }
    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    tick() {
        if (this.state.duration > 0 ) {
            this.setState({
                duration: this.state.duration - 1
            });
        } else {
            // DING THE BELL
            clearInterval(this.interval);
            this.setState({
                isFinished: true
            });
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    // render will know everything!
    render() {
        return <h1>{this.state.duration} SECONDS REMAINING</h1>
    }
}