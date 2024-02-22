import mongoose from 'mongoose';

import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
// const userModel = require('../models/userModel')

export const paymentInfo = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Payment Info Command ${req}`,
        },
    });
}

export const paymentAddress = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Payment Address Command ${req}`,
        },
    });
}
