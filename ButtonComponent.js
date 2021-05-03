import {Button} from 'react-native';
import React from 'react'

const ButtonComponent = (props) => <Button disabled={props.disabled} className="btn" title={props.children} onPress={props.action}/>

export default ButtonComponent
