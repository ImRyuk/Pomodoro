
const React = require('react')
import { Text, View , Button} from 'react-native';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTime : 25,
            breakTime: 300,
            todo: "Time to Work!"
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    startTimer() {
        this.timer = setInterval(() => this.setState({
            workTime: this.state.workTime -1
        }), 1000)
        console.log("start")
    }
    stopTimer() {
        clearInterval(this.timer)
        console.log("stop")
    }
    resetTimer() {
        this.setState({workTime: 1200})
        console.log("reset")
    }
    render() {
        return (
            <View>
                <Text>timer: {this.state.workTime}</Text>
                <Button
                    title="start"
                    onPress={this.startTimer}
                />
                <Button
                    title="stop"
                    onPress={this.stopTimer}
                />
                <Button
                    title="reset"
                    onPress={this.resetTimer}
                />
            </View>
        );
    }
}
export default Timer
