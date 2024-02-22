import mongoose from 'mongoose';

import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
// const userModel = require('../models/userModel')

export const whitelistAdd = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Whitelist Add Command ${req}`,
        },
    });
}

export const whitelistRemove = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Whitelist Remove Command ${req}`,
        },
    });
}

export const whitelistReset = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Whitelist Reset Command ${req}`,
        },
    });
}

export const whitelistShow = async (req, res) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Whitelist Show Command ${req}`,
        },
    });
}
