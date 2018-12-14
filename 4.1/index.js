const { readFile } = require('../utils');

const EVENTS = {
    BEGIN_SHIFT: 0,
    SLEEP: 1,
    WAKE: 2
}

class Event {
    constructor (year, month, day, hour, minute, name) {
        this.date = new Date(year, month, day, hour, minute);
        this.name = name.trim();
        this.type = this.getEventType(name);
    }

    getEventType (name) {
        if (name.indexOf('#') !== -1) {
            return EVENTS.BEGIN_SHIFT;
        } else if (name === 'falls asleep') {
            return EVENTS.SLEEP;
        } else if (name === 'wakes up') {
            return EVENTS.WAKE;
        }
    }
}

class Guard {
    constructor (id) {
        this.id = id;
        this.events = [];
        this.totalSleep = null;
        this.minutesSlept = null;
    }

    addEvent (event) {
        this.events.push(event);
    }

    getTotalSleep () {
        if (this.totalSleep != null) {
            return this.totalSleep;
        }

        const minutesCount = new Array(60).fill(0);

        let totalSleep = 0;
        let lastSleep = {};

        for (const event of this.events) {
            if (event.type === EVENTS.SLEEP) {
                lastSleep = event;
            } else if (event.type === EVENTS.WAKE) {
                try {
                    const minuteFallsAsleep = lastSleep.date.getMinutes();
                    const minuteWakes = event.date.getMinutes();

                    for (let i = minuteFallsAsleep; i < minuteWakes; i++) {
                        minutesCount[i]++;
                    }

                    const ms = event.date.getTime() - lastSleep.date.getTime();
                    const minutes = ms / 60000;
                    totalSleep += minutes;
                } catch (e) {
                    return 0;
                }
            }
        }

        this.totalSleep = totalSleep;
        this.minutesSlept = minutesCount;

        return totalSleep;
    }
}

function sortLines (lines) {
    const datePattern = /\[\d{4}\-\d{2}\-\d{2}\s\d{2}:\d{2}\]/;
    let sorted =
        lines
            .map(l => datePattern.exec(l))
            .sort((a, b) => { return a[0].localeCompare(b[0]) })
            .map(a => a.input);

    return sorted;
}

function parseLines (lines) {
    const guards = [];
    const pattern = /\[(\d{4})\-(\d{2})\-(\d{2})\s(\d{2}):(\d{2})\]\s(.+)/;
    const guardIdPattern = /#(\d+)\s/;

    let activeGuard = -1;

    const sortedLines = sortLines(lines);

    for (const line of sortedLines) {
        const result = pattern.exec(line);
        const event = new Event(result[1], result[2], result[3], result[4], result[5], result[6]);

        if (event.type === EVENTS.BEGIN_SHIFT) {
            const id = guardIdPattern.exec(event.name)[1];
            activeGuard = parseInt(id);
        }

        let guard = guards.find(g => g.id === activeGuard);

        if (guard === undefined) {
            guard = new Guard(activeGuard);
            guards.push(guard);
        }

        guard.addEvent(event);
    }

    return guards;
}

function init () {
    const lines = readFile('./input.txt');

    let sample = [
        '[1518-11-01 00:00] Guard #10 begins shift',
        '[1518-11-01 00:05] falls asleep',
        '[1518-11-01 00:25] wakes up',
        '[1518-11-01 00:30] falls asleep',
        '[1518-11-01 00:55] wakes up',
        '[1518-11-01 23:58] Guard #99 begins shift',
        '[1518-11-02 00:40] falls asleep',
        '[1518-11-02 00:50] wakes up',
        '[1518-11-03 00:05] Guard #10 begins shift',
        '[1518-11-03 00:24] falls asleep',
        '[1518-11-03 00:29] wakes up',
        '[1518-11-04 00:02] Guard #99 begins shift',
        '[1518-11-04 00:36] falls asleep',
        '[1518-11-04 00:46] wakes up',
        '[1518-11-05 00:03] Guard #99 begins shift',
        '[1518-11-05 00:45] falls asleep',
        '[1518-11-05 00:55] wakes up'
    ];

    const guards = parseLines(lines);
    const mostSleepingGuard = guards.find(g => g.getTotalSleep() === Math.max.apply(null, guards.map(g => g.getTotalSleep())));
    const mostSleptMinute = mostSleepingGuard.minutesSlept.indexOf(Math.max.apply(null, mostSleepingGuard.minutesSlept));

    const answer = mostSleepingGuard.id * mostSleptMinute;
    console.log(answer);
}

init();