import { Component } from "react";
import "./CountDown.css";
import Cards from "../Cards/Cards";

interface CountDownProps {
  date: string | Date;
}

interface CountDownState {
  days: number;
  hours: number;
  min: number;
  sec: number;
  finished?: boolean;
}

class CountDown extends Component<CountDownProps, CountDownState> {
  interval: NodeJS.Timeout | null = null;

  constructor(props: CountDownProps) {
    super(props);
    this.state = this.calculateCountdown(props.date) || {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      finished: true,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      if (date) {
        this.setState(date);
      } else {
        this.setState({ finished: true });
        clearInterval(this.interval as NodeJS.Timeout);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval as NodeJS.Timeout);
  }

  calculateCountdown(endDate: string | Date): CountDownState | false {
    const endDateTime =
      endDate instanceof Date ? endDate.getTime() : Date.parse(endDate);
    let diff = (endDateTime - new Date().getTime()) / 1000;

    if (diff <= 0) return false;

    return {
      days: Math.floor(diff / 86400),
      hours: Math.floor((diff / 3600) % 24),
      min: Math.floor((diff / 60) % 60),
      sec: Math.floor(diff % 60),
    };
  }

  addLeadingZeros(value: number): string {
    let stringValue = String(value);
    return stringValue.padStart(2, "0");
  }

  render() {
    const countDown = this.state;

    return (
      <div className="container">
        <h1>Countdown Timer</h1>
        <div className="box_countdown">
          <ul>
            <li className="days">
              <Cards
                number={this.addLeadingZeros(countDown.days)}
                duration={countDown.days === 1 ? "Day" : "Days"}
              />
            </li>
            <li className="hours">
              <Cards
                number={this.addLeadingZeros(countDown.hours)}
                duration="Hours"
              />
            </li>
            <li className="minutes">
              <Cards
                number={this.addLeadingZeros(countDown.min)}
                duration="Minutes"
              />
            </li>
            <li className="seconds">
              <Cards
                number={this.addLeadingZeros(countDown.sec)}
                duration="Seconds"
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CountDown;
