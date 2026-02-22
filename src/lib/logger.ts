import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
    level: isProduction ? "info" : "debug",
    transport: isProduction
        ? undefined
        : {
            target: "pino-pretty",
            options: {
                colorize: true,           // Colors in terminal
                translateTime: "HH:MM:ss", // Human readable timestamps
                ignore: "pid,hostname",   // Hide process ID and hostname in dev
            },
        },
});

export default logger;
