import {actionsetTokenkey} from '../Type'

export function actionSetToken(value){
            return {
                type:actionsetTokenkey,
                payload:{
                    token: value
                }
            }
}