import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Time extends React.Component {
    twoDigits(num) {
        return num > 9 ? "" + num : "0" + num;
    }

    convertToHhMmSs(seconds) {
        const h = this.twoDigits(Math.floor(seconds / 3600));
        const m = this.twoDigits(Math.floor((seconds % 3600) / 60));
        const s = this.twoDigits(Math.floor(seconds % 3600 % 60));
        return `${h}:${m}:${s}`;
    };

    render() {
        const remainingTime = this.convertToHhMmSs(this.props.seconds);
        let timerColor = this.props.seconds > 20 ? 'black' : 'red';
        const activeTimer = this.props.active === 'workTime' ? 'Au travail!' : `C'est la pause!`;

        return (
            <View style={styles.baseText} className="timer">
                <Text style={styles.activeTimer} className="timer__description">{activeTimer}</Text>
                <Text style={[styles.timer, {color: timerColor}]} className="timer__time">{remainingTime}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    baseText: {
        textAlign: 'center',
        fontFamily: "Cochin"
    },
    activeTimer: {
        fontSize: 20,
        fontWeight: "bold"
    },
});

export default Time
