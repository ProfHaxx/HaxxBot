import { Client } from 'discord.js';
import {_token, _getGreeting, _day, _getRandomJoke, _getRandomQuote, _getRandomRiddle } from '../HaxxBot/constants.js';

const client = new Client();

const token = _token;
const getGreeting = _getGreeting;
const getRandomJoke = _getRandomJoke;
const getRandomQuote = _getRandomQuote;
const getRandomRiddle = _getRandomRiddle;
const day = _day;

const name = 'Hydrogen';
const version = "1.0";

const prefix = "!";
var servers = {};
var suggestions = [];

/**
 * @param {Date} time Actual Time
 * @param {Date} start Start Time of the interval
 * @param {Date} end End Time of the interval
 */
function inTime(time, start, end) {
    return ((time - start) * (end - time)) >= 0;
}

/**
 * @param {number} hour Hours
 * @param {number} min Minutes
 * @param {number} sec Seconds
 */
function createDate(hour, min, sec) {
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, min, sec, 0);
}

/**
 * @param {Date} dateObj Given Date Object
 */
function whereIsProfHaxx(dateObj) {
    
    if(inTime(dateObj, createDate(0,0,0), createDate(6,30,0))) return "@ProfHaxx is probably still asleep.";
    if(inTime(dateObj, createDate(22,15,0), createDate(23,59,59))) return "@ProfHaxx is probably trying to sleep now.";

    var dayNum = dateObj.getDay();
    if(dayNum == 1) { //Monday
        if(inTime(dateObj, createDate(6,30,0), createDate(7,30,0))) return "@ProfHaxx is probably preparing to get to school.";
        if(inTime(dateObj, createDate(7,30,0), createDate(8,0,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(8,0,0), createDate(13,15,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(13,15,0), createDate(13,45,0))) return "@ProfHaxx is probably on his way back home. (Depending on whether he walks or drives home he'll be back at either ~1.45 PM or ~2.30 PM)";
        if(inTime(dateObj, createDate(13,45,0), createDate(16,0,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(16,0,0), createDate(17,0,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(17,0,0), createDate(20,0,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(20,0,0), createDate(21,0,0))) return "@ProfHaxx is probably on his way back home.";
        if(inTime(dateObj, createDate(21,0,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 2) { //Tuesday
        if(inTime(dateObj, createDate(6,30,0,0), createDate(8,30,0))) return "@ProfHaxx is probably still asleep.";
        if(inTime(dateObj, createDate(8,30,0), createDate(9,15,0))) return "@ProfHaxx is probably eating, programming or doing something else.";
        if(inTime(dateObj, createDate(9,15,0), createDate(9,50,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(9,50,0), createDate(13,15,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(13,15,0), createDate(13,45,0))) return "@ProfHaxx is probably on his way back home. (Depending on whether he walks or drives home he'll be back at either ~1.45 PM or ~2.30 PM)";
        if(inTime(dateObj, createDate(13,45,0), createDate(21,45,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 3) { //Wednesday
        if(inTime(dateObj, createDate(6,30,0,0), createDate(8,30,0))) return "@ProfHaxx is probably still asleep.";
        if(inTime(dateObj, createDate(8,30,0), createDate(11,15,0))) return "@ProfHaxx is probably eating, programming or doing something else.";
        if(inTime(dateObj, createDate(11,15,0), createDate(11,45,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(11,45,0), createDate(14,5,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(14,5,0), createDate(14,50,0))) return "@ProfHaxx is probably on his way back home. (Depending on whether he walks or drives home he'll be back at either ~1.45 PM or ~2.30 PM)";
        if(inTime(dateObj, createDate(14,50,0), createDate(21,45,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 4) { //Thursday
        if(inTime(dateObj, createDate(6,30,0), createDate(7,30,0))) return "@ProfHaxx is probably preparing to get to school.";
        if(inTime(dateObj, createDate(7,30,0), createDate(8,0,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(8,0,0), createDate(14,5,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(14,5,0), createDate(14,50,0))) return "@ProfHaxx is probably on his way back home. (Depending on whether he walks or drives home he'll be back at either ~1.45 PM or ~2.30 PM)";
        if(inTime(dateObj, createDate(14,50,0), createDate(18,45,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(18,45,0), createDate(20,30,0))) return "@ProfHaxx is learning actual math.";
        if(inTime(dateObj, createDate(20,30,0), createDate(21,45,0))) return "@ProfHaxx is probably at home.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 5) { //Friday
        if(inTime(dateObj, createDate(6,30,0), createDate(7,30,0))) return "@ProfHaxx is probably preparing to get to school.";
        if(inTime(dateObj, createDate(7,30,0), createDate(8,0,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(8,0,0), createDate(9,30,0))) return "@ProfHaxx is probably at school.";
        if(inTime(dateObj, createDate(9,30,0), createDate(13,15,0))) return "@ProfHaxx is trying to waste 4 hours in the most efficient way.";
        if(inTime(dateObj, createDate(13,15,0), createDate(14,5,0))) return "@ProfHaxx is wasting his time with his physics teacher.";
        if(inTime(dateObj, createDate(14,5,0), createDate(14,50,0))) return "@ProfHaxx is probably on his way back home. (Depending on whether he walks or drives home he'll be back at either ~1.45 PM or ~2.30 PM)";
        if(inTime(dateObj, createDate(14,50,0), createDate(18,45,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(18,45,0), createDate(20,30,0))) return "@ProfHaxx is probably organizing a lecture.";
        if(inTime(dateObj, createDate(20,30,0), createDate(21,45,0))) return "@ProfHaxx is probably at home.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 6) { //Saturday
        if(inTime(dateObj, createDate(6,30,0,0), createDate(8,30,0))) return "@ProfHaxx is probably still asleep.";
        if(inTime(dateObj, createDate(8,30,0), createDate(11,40,0))) return "@ProfHaxx is doing whatever he wants.";
        if(inTime(dateObj, createDate(11,40,0), createDate(12,30,0))) return "@ProfHaxx is probably on his way to school.";
        if(inTime(dateObj, createDate(12,30,0), createDate(14,0,0))) return "@ProfHaxx is at school.";
        if(inTime(dateObj, createDate(14,0,0), createDate(14,45,0))) return "@ProfHaxx is on his way back home.";
        if(inTime(dateObj, createDate(14,45,0), createDate(21,45,0))) return "@ProfHaxx is most likely at home.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    } else if(dayNum == 0) { //Sunday
        if(inTime(dateObj, createDate(6,30,0,0), createDate(8,30,0))) return "@ProfHaxx is probably still asleep.";
        if(inTime(dateObj, createDate(8,30,0), createDate(21,45,0))) return "@ProfHaxx is doing whatever he wants.";
        if(inTime(dateObj, createDate(21,45,0), createDate(22,15,0))) return "@ProfHaxx is probably eating and preparing to sleep.";
    }
}

client.on('ready', () => {
    console.log('Haxx Bot is online!');
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

client.on('message', msg => {
    if(msg.content.charAt(0) == prefix) {
        let args = msg.content.substring(prefix.length).split(" ");
        switch(args[0]) {
            case 'man':
                if(args.length <= 1) {
                    msg.reply(`Welcome to the manual. You can look up information about a command using: ${prefix}man cmd`);
                } else {
                    switch(args[1]) {
                        case 'whois':
                            msg.reply(`A command dedicated to output certain data about a user or the bot.\n`+
                            `An example would be: "!whois bot" or "!whois ProfHaxx".`);
                            break;
                        case 'profhaxx':
                            msg.reply(`A command dedicated to output certain data, such as the current location of ProfHaxx with the probability of 80%.\n` + 
                            `To find out where @ProfHaxx currently is you can use "${prefix}profhaxx location".`);
                            break;
                        case 'day':
                            msg.reply(`The 'day' Utility can be used to find out things about dates. E.g. you can see what's special about the 21.7 by typing "${prefix}day 21.7"`);
                            break;
                        case 'tellme':
                            msg.reply(`The 'tellme' Utility can be used to get a joke / quote / riddle. E.g. you can get a joke by typing "${prefix}tellme joke"`);
                            break;
                        default:
                            msg.reply(`Command ${args[1]} not found!`);
                            break;
                    }
                }
                break;
			case 'whois':
                if(args.length <= 1) {
                    msg.reply("Requires a name as parameter.");
                } else {
                    switch(args[1]) {
                        case 'bot':
                            msg.reply(`${getGreeting()} ${msg.author.username}, I am ${name} and we're at v${version}.`);
                            break;
                        case 'ProfHaxx':
                            msg.reply(`@ProfHaxx is an mysterious, not yet classified entity. There is not much information about it.`);
                            break;
                        case 'Ryuma':
                            msg.reply(`@Ryuma is a really sporty guy, who likes bouldering. Also he is great at almost all subjects at school and excels in mathematics and IT as well as creating loading screen music.`);
                            break;
                        case 'seoyunah':
                            msg.reply(`@seoyunah is a very talented musician and likes bread.`);
                            break;
                        case 'Frost':
                            msg.reply(`@Frost is a great artist in terms of art as well as music and an aspiring mathematician and programmer.`);
                            break;
                        default:
                            msg.reply(`User ${args[1]} was not found!`);
                            break;
                    }
                }
                break;
            case 'day':
                if(args.length <= 1) {
                    msg.reply("Requires a date as an argument. E.g: 29.05");
                } else {
                    msg.reply(day(args[1].split(".")[0], args[1].split(".")[1]));
                }
            case 'profhaxx':
                if(args.length <= 1) {
                    msg.reply(`${getGreeting()} ${msg.author.username}! @ProfHaxx is my active Developer. What do you want to know?`);
                } else {
                    switch(args[1]) {
                        case 'location':
                            if(args.length == 2) {
                                msg.reply(whereIsProfHaxx(new Date()));
                            }
                            break;
                        case 'name':
                            msg.reply(`Every friend of @ProfHaxx knows what his name is.`);
                            break;
                    }
                }
                break;
            case 'tellme':
                if(args.length <= 1) {
                    msg.reply(`${getGreeting()} ${msg.author.username}! What shall I tell you :)?`);
                } else {
                    switch(args[1]) {
                        case 'joke':
                            msg.reply(`${getRandomJoke()}`);
                            break;
                        case 'quote':
                            msg.reply(`${getRandomQuote()}`);
                            break;
                        case 'riddle':
                            msg.reply(`${getRandomRiddle()}`);
                            break;
                    }
                }
                break;
            case 'help':
                msg.reply(`This is just a list of all available commands. To get further information for a command use: \"${prefix}man command\"\n` + 
                `man - Quick Reference for all Commands\nwhois - Who is $User?\nday - What's at day.month? \nprofhaxx - What's the dev doing?\ntellme - Entertainment and Facts.\n`);
                break;
            default:
                msg.reply('Maybe a typo, maybe not... In either case: I couldn\'t understand you.');
        }
    } else if(msg.content.includes(name)) {
        if(msg.content.includes("Who") && msg.content.includes("smartest")) {
            msg.reply(`Yooouuuu!`);
        } else {
            msg.reply(
                `${getGreeting()} ${msg.author.username}. I don't think that I understood you. You may ask @ProfHaxx if he can translate it to me.\n` + 
                `You can get a list of supported commands by typing ${prefix}help. I am really basic and still ` + 
                `in W.I.P. state. My Current Version is: ${version}.`
                );
        }
    }
});

client.login(token);