import 'dotenv/config';
import express from 'express';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
import { paymentAddress, paymentInfo } from './controllers/paymentCtrl.js';
import { whitelistAdd, whitelistReset, whitelistRemove, whitelistShow } from './controllers/whitelistCtrl.js';
// Create an express app
const app = express();
// Get port, or default to 2024
const PORT = process.env.PORT || 2024;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post('/interactions', async function (req, res) {
  // Interaction type and data
  const { type, id, data } = req.body;
  console.log(req.body)
  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    console.log('route', data);
    // "test" command
    if (name === 'test') {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: 'hello world ' + getRandomEmoji(),
        },
      });
    }
    if (name === 'whitelist') {
      const { name, options } = data.options[0];
      switch (name) {
        case 'add':
          await whitelistAdd(options, res)
          break;
        case 'remove':
          await whitelistRemove(options, res)
          break;
        case 'reset':
          await whitelistReset(options, res)
          break;
        case 'show':
          await whitelistShow(options, res)
          break;
        default:

          break;
      }
    }
    if(name === 'payment'){
      const {name, options} = data.options[0];
      switch (name) {
        case 'info':
          await paymentInfo(options, res);
          break;
        case 'address':
          await paymentAddress(options, res);
          break;
        default:
          break;
      }
    }
  }
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
