import mongoose from 'mongoose';

import { getCosmWasmClient, getQueryClient, getSigningClient, getSigningCosmWasmClient } from '@sei-js/core';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
import { User } from '../models/userModel.js';
import { generateRandomHex, getWalletFromPrivateKey } from '../utils/makeWallet.js';

export const paymentAddress = async (req, res) => {
    try {
        const {options, member} = req;
        User.findOne({id: member.user.id})
            .then(async (item) => {
                if( item == null ){
                    const privateKey = generateRandomHex(64);
                    const address = await getWalletFromPrivateKey(privateKey);
                    let now = new Date();
                    let current;
                    if (now.getMonth() == 11) {
                        current = new Date(now.getFullYear() + 1, 0, now.getDate());
                    } else {
                        current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    }
                    const payment = {
                        address,
                        privateKey,
                        endDate: current,
                        balance: 0,
                    };
                    item = new User({
                        username: member.user.username,
                        avatar: member.user.avatar,
                        global_name: member.user.global_name,
                        id: member.user.id,
                        payment
                    });
                    User.create(item)
                        .then((rlt) => {
                            item = rlt;
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Payment Address: "${item.payment?.address}"`,
                    },
                });
            })
    } catch (error) {
        throw error;
    }
}

export const paymentEndDate = async (req, res) => {
    try {
        const {options, member} = req;
        User.findOne({id: member.user.id})
            .then(async (item) => {
                if( item == null ){
                    const privateKey = generateRandomHex(64);
                    const address = await getWalletFromPrivateKey(privateKey);
                    let now = new Date();
                    let current;
                    if (now.getMonth() == 11) {
                        current = new Date(now.getFullYear() + 1, 0, now.getDate());
                    } else {
                        current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    }
                    const payment = {
                        address,
                        privateKey,
                        endDate: current,
                        balance: 0,
                    };
                    item = new User({
                        username: member.user.username,
                        avatar: member.user.avatar,
                        global_name: member.user.global_name,
                        id: member.user.id,
                        payment
                    });
                    User.create(item)
                        .then((rlt) => {
                            item = rlt;
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Deadline: "${item.payment?.endDate.toLocaleDateString()}"`,
                    },
                });
            })
    } catch (error) {
        throw error;
    }
}

export const paymentBalance = async (req, res) => {
    try {
        const {options, member} = req;
        User.findOne({id: member.user.id})
            .then(async (item) => {
                if( item == null ){
                    const privateKey = generateRandomHex(64);
                    const address = await getWalletFromPrivateKey(privateKey);
                    let now = new Date();
                    let current;
                    if (now.getMonth() == 11) {
                        current = new Date(now.getFullYear() + 1, 0, now.getDate());
                    } else {
                        current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    }
                    const payment = {
                        address,
                        privateKey,
                        endDate: current,
                        balance: 0,
                    };
                    item = new User({
                        username: member.user.username,
                        avatar: member.user.avatar,
                        global_name: member.user.global_name,
                        id: member.user.id,
                        payment
                    });
                    User.create(item)
                        .then((rlt) => {
                            item = rlt;
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
                
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `Balance function is not completed."`,
                    },
                });
            })
    } catch (error) {
        throw error;
    }
}

export const paymentSol = async (req, res) => {
    try {
        const {options, member} = req;
        User.findOne({id: member.user.id})
            .then(async (item) => {
                if( item == null ){
                    const privateKey = generateRandomHex(64);
                    const address = await getWalletFromPrivateKey(privateKey);
                    let now = new Date();
                    let current;
                    if (now.getMonth() == 11) {
                        current = new Date(now.getFullYear() + 1, 0, now.getDate());
                    } else {
                        current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    }
                    const payment = {
                        address,
                        privateKey,
                        endDate: current,
                        balance: 0,
                    };
                    item = new User({
                        username: member.user.username,
                        avatar: member.user.avatar,
                        global_name: member.user.global_name,
                        id: member.user.id,
                        payment
                    });
                    User.create(item)
                        .then((rlt) => {
                            item = rlt;
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
                
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `PaymentSol function is not completed."`,
                    },
                });
            })
    } catch (error) {
        throw error;
    }
}

export const paymentSeigma = async (req, res) => {
    try {
        const {options, member} = req;
        User.findOne({id: member.user.id})
            .then(async (item) => {
                if( item == null ){
                    const privateKey = generateRandomHex(64);
                    const address = await getWalletFromPrivateKey(privateKey);
                    let now = new Date();
                    let current;
                    if (now.getMonth() == 11) {
                        current = new Date(now.getFullYear() + 1, 0, now.getDate());
                    } else {
                        current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    }
                    const payment = {
                        address,
                        privateKey,
                        endDate: current,
                        balance: 0,
                    };
                    item = new User({
                        username: member.user.username,
                        avatar: member.user.avatar,
                        global_name: member.user.global_name,
                        id: member.user.id,
                        payment
                    });
                    User.create(item)
                        .then((rlt) => {
                            item = rlt;
                        })
                        .catch((err) => {
                            throw err;
                        })
                }
                
                return res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: `PaymentSeigma function is not completed."`,
                    },
                });
            })
    } catch (error) {
        throw error;
    }
}