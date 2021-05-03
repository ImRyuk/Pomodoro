import * as React from "react";

import ButtonComponent from './ButtonComponent'
import Time from './Time'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            breakTime: 250,
            workTime: 1500,
            seconds: 1500,
            timerId: false,
            active: 'workTime',
            isDisabled: false,
            todoTitle: "",
        }

        this.stop = this.stop.bind(this);
        this.play = this.play.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.resetTime = this.resetTime.bind(this);
    }

    updateTime() {
        this.setState(function(prevState, props) {
            const currentState = Object.assign(prevState);
            const stillActive = (prevState.seconds - 1) > 0;
            const nextTimer = prevState.active === 'workTime' ? 'breakTime' : 'workTime'

            currentState.seconds = stillActive ? currentState.seconds - 1 : currentState[nextTimer];
            currentState.active = stillActive ? currentState.active : nextTimer;
            if (this.timerID) {
                currentState.timerId = this.timerID;
            }
            return currentState;
        });
    }

    play() {
        this.timerID = setInterval(() => this.updateTime(), 1000)
        this.isDisabled = true;
    }

    stop() {
        if (this.state.timerId) {
            this.isDisabled = false;
            clearInterval(this.state.timerId);
            return this.setState({
                seconds: this.state.seconds,
                timerId: false,
                active: 'workTime',
            });
        }
    }

    resetTime() {
            clearInterval(this.state.timerId);
            this.isDisabled = false;
            return this.setState({
                seconds: this.state.workTime,
                timerId: false,
                active: 'workTime',
                isDisabled : false
            });
    }

    updateLength(timer, e) {
        if (this.state.timerId) {
            return false;
        }

        const state = Object.assign({}, this.state);
        state[timer] = e * 60;
        state.seconds = timer === 'workTime' ? e * 60 : state.seconds
        this.setState(state);
    }

    convertToMinutes (seconds) {
        return Math.floor(seconds / 60);
    }

    render() {
        return (
            <View className="app">
                <TextInput/>
                <Time active={this.state.active} seconds={this.state.seconds} />
                <View>
                    <ButtonComponent action={this.play} disabled={this.isDisabled}>Play</ButtonComponent>
                    <ButtonComponent action={this.stop}>Stop</ButtonComponent>
                    <ButtonComponent action={this.resetTime}>Reset</ButtonComponent>
                </View>
                <View>
                    <Text>Temps de travail:
                        <TextInput
                            type="number"
                            min="1"
                            step="1"
                            autoComplete="off"
                            keyboardType="numeric"
                            name="todoInput"
                            placeholder="Saisir des minutes"
                            value={this.convertToMinutes(this.state.workTime).toString()}
                            onChangeText={(e) => this.updateLength("workTime", e)}
                        />
                    </Text>
                    <Text>Temps de repos:
                        <TextInput
                            type="number"
                            min="1"
                            step="1"
                            autoComplete="off"
                            keyboardType="numeric"
                            name="todoInput"
                            placeholder="Saisir des minutes"
                            value={this.convertToMinutes(this.state.breakTime).toString()}
                            onChangeText={(e) => this.updateLength("breakTime", e)}
                        />
                    </Text>
                </View>
            </View>
        )
    }
}

export default Main
