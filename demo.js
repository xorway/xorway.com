// Shamelessly inspired by demo.js from the xterm.js project, available under
// the MIT license. Copyright (c) 2016 xterm.js
//
// Original version available here:
// https://github.com/xtermjs/xtermjs.org/blob/master/js/demo.js

// Logo stored outside of main HTML file since it contains escape sequences
const url = "logo.txt";

fetch(url)
    .then(r => r.text())
    .then(t => {
        var command = '';

        // Override the theme to ensure black is really fully black, since our
        // ANSI logo contains black content.
        var theme = {
            black: 'black',
        };

        var term = new Terminal({
            theme: theme
        });

        term.open(document.getElementById('terminal'));
        term.write(t);

        term.writeln('Empowering the world with high-quality software solutions since 1995.');
        term.writeln("Yeah, we even _believe_ it's _still_ 1995 in fact. ;)");
        term.writeln('');

        term.writeln("For information about available commands, try \x1B[1m'help'\x1B[0m.");

        term.onData(e => {
            switch (e) {
                case '\u0003': // Ctrl+C
                    term.write('^C');
                    prompt(term);
                    break;
                case '\u0012': // Ctrl+R - to make "browser reload" behave as expected
                    document.location.reload();
                    break;
                case '\r': // Enter
                    runCommand(term, command);
                    command = '';
                    break;
                case '\u007F': // Backspace (DEL)
                    // Do not delete the prompt
                    if (term._core.buffer.x > 4) {
                        term.write('\b \b');
                        if (command.length > 0) {
                            command = command.substr(0, command.length - 1);
                        }
                    }
                    break;
                default: // Print all other characters for demo
                    if (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7E) || e >= '\u00a0') {
                        command += e;
                        term.write(e);
                    }
            }
        });

        term.prompt = () => {
            command = '';
            term.write('\r\nC:\\>');
        }

        // Special version of the above, to use when the cursor is already at the correct position
        term.promptAtCursorPosition = () => {
            command = '';
            term.write('C:\\>');
        }

        var commands = {
            help: {
                f: () => {
                    term.writeln([
                        'Welcome to XOR-DOS COMMAND.COM! The following commands are available.',
                        '',
                        ...Object.keys(commands).map(e => `  ${e.padEnd(10)} ${commands[e].description}`)
                    ].join('\n\r'));
                    term.prompt();
                },
                description: 'Prints this help message',
            },
            cls: {
                f: () => {
                    // For some odd reason, calling `reset()` doesn't move the
                    // cursor to the top-left position but to 2;1. Unsure if
                    // this is a bug in xterm.js or what; we work around it to
                    // ensure full MS-DOS compatibility. :)
                    term.reset();
                    term.write('\x1B[1;1H');

                    term.promptAtCursorPosition();
                },
                description: 'Clears the screen'
            },
            dir: {
                f: () => {
                    term.writeln([
                        ' Volume in drive C is XOR-DOS_6',
                        ' Volume Serial Number is C0CA-C01A',
                        ' Directory of C:\\',
                        '',
                        'INFO     TXT           718 06-28-23 10:22p',
                        'HELP     COM           413 05-31-94  6:22a',
                        '        1 file(s)        205,718 bytes',
                        '                         909,312 bytes free',
                    ].join('\r\n'));

                    term.prompt();
                },
                description: 'Lists the files in the current directory'
            },
            ver: {
                f: () => {
                    term.writeln('XOR-DOS Version 6.22');
                    term.writeln('(c) Copyright Xorway Solutions 1995, 2023');
                    term.prompt();
                },
                description: 'Displays the XOR-DOS version.'
            }
        };

        function runCommand(term, text) {
            const command = text.trim().split(' ')[0];

            if (command.length > 0) {
                term.writeln('');

                if (command in commands) {
                    commands[command].f();
                    return;
                }

                term.writeln('Bad command or file name');
            }

            term.prompt();
        }

        // All initialized: show the prompt and hand over control to xterm.js
        term.focus();
        term.prompt();
    });
