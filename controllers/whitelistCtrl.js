import mongoose from 'mongoose';

import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags,
    MessageComponentTypes,
    ButtonStyleTypes,
} from 'discord-interactions';
import { User } from '../models/userModel.js';
import { getWalletFromPrivateKey, generateRandomHex } from '../utils/makeWallet.js';

export const whitelistAdd = async (req, res) => {
    try {
        const {options, member} = req;
        const ipAddress = options[0].value;
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipAddress || !ipRegex.test(ipAddress)) {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // Fetches a random emoji to send from a helper function
                    content: 'Invalid IP address',
                },
            });
        }
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
                    }
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
                if( item.ip_address[0] == ipAddress || item.ip_address[1] == ipAddress ){
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Already IP "${ipAddress}" is registered.`,
                        },
                    })
                }
                if( item.ip_address[0] != null && item.ip_address[1] != null ){
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `Already two IP addresses are using.`,
                        },
                    })
                }
                let newIPaddress = [];
                if( item.ip_address[0] == null ) newIPaddress = [ ipAddress, item.ip_address[1] ];
                else if( item.ip_address[1] == null ) newIPaddress = [ item.ip_address[0], ipAddress ];
                User.updateOne({_id: item._id}, {ip_address: newIPaddress})
                    .then((rlt) => {
                        return res.send({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                content: `Successfully Added IP address ${ipAddress}.`,
                            },
                        })
                    })
                    .catch((err) => {
                        throw err;
                    })
                
            })
    } catch (error) {
        throw error;
    }
}

export const whitelistRemove = async (req, res) => {
    try {
        const {options, member} = req;
        const ipAddress = options[0].value;
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipAddress || !ipRegex.test(ipAddress)) {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    // Fetches a random emoji to send from a helper function
                    content: 'Invalid IP address',
                },
            });
        }
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
                    }
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
                if( item.ip_address[0] != ipAddress && item.ip_address[1] != ipAddress ){
                    return res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content: `The IP address ${ipAddress} is not added. Please input IP is added.`,
                        },
                    })
                }
                let newIPaddress = [];
                if( item.ip_address[0] == ipAddress ) newIPaddress = [ null, item.ip_address[1] ];
                if( item.ip_address[1] == ipAddress ) newIPaddress = [ item.ip_address[1], null ];
                User.updateOne({_id: item._id}, {ip_address: newIPaddress})
                    .then((rlt) => {
                        return res.send({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                content: `Successfully Removed IP address ${ipAddress}.`,
                            },
                        })
                    })
                    .catch((err) => {
                        throw err;
                    })
                
            })
    } catch (error) {
        throw error;
    }
}

export const whitelistReset = async (req, res) => {
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
                    }
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
                let newIPaddress = [null, null];
                User.updateOne({_id: item._id}, {ip_address: newIPaddress})
                    .then((rlt) => {
                        return res.send({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                content: `Successfully Reseted. So you have no IP addresses.`,
                            },
                        })
                    })
                    .catch((err) => {
                        throw err;
                    })
                
            })
    } catch (error) {
        throw error;
    }
}

export const whitelistShow = async (req, res) => {
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
                    }
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
                let newIPaddress = [];
                if( item.ip_address[0] != null ) newIPaddress.push(item.ip_address[0]);
                if( item.ip_address[1] != null ) newIPaddress.push(item.ip_address[1]);
                User.updateOne({_id: item._id}, {ip_address: newIPaddress})
                    .then((rlt) => {
                        return res.send({
                            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                            data: {
                                content: `Your whitelist: ${JSON.stringify(newIPaddress)}`,
                            },
                        })
                    })
                    .catch((err) => {
                        throw err;
                    })
                
            })
    } catch (error) {
        throw error;
    }
}
