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

        // Make URL:s clickable, for easier use
        term.loadAddon(new WebLinksAddon.WebLinksAddon());

        term.open(document.getElementById('terminal'));

        term.showLogo = () => {
            term.write(t);

            term.writeln('Empowering the world with high-quality software solutions since 1995.');
            term.writeln("Yeah, we even _believe_ it's _still_ 1995 in fact. ;)");
            term.writeln('');

            term.writeln("For information about available commands, try \x1B[1m'help'\x1B[0m.");
        };

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
                        ' Volume in drive C is XOR-DOS_622',
                        ' Volume Serial Number is C0CA-C01A',
                        ' Directory of C:\\',
                        '',
                        'HELP     COM           413 05-31-94  6:22a',
                        'INFO     TXT           718 06-28-23 10:22p',
                        'LOGO     ANS         2,076 06-27-23 10:52p',
                        '        3 file(s)          3,207 bytes',
                        '                       1,048,576 bytes free',
                    ].join('\r\n'));

                    term.prompt();
                },
                description: 'Lists the files in the current directory'
            },
            type: {
                f: (file) => {
                    if (!Boolean(file)) {
                        term.writeln('Required parameter missing');
                        term.prompt();
                        return;
                    }

                    file = file.toUpperCase();

                    if (file == 'HELP.COM') {
                        // .COM files in MS-DOS are binary files without any
                        // header. If you TYPE them on the screen, you'll get
                        // the binary data displayed as-is, which literally
                        // looks like garbage.
                        //
                        // The data in this case roughly corresponds to
                        // SIERPIE~1.COM, as seen on
                        // https://copy.sh/v86/?profile=msdos. I used copy-paste
                        // to copy it from there, and then converted it to a
                        // hexadecimal representation of UTF-8 data, which works
                        // well with the Uint8Array xterm.js expects for UTF-8
                        // data.
                        term.writeln(new Uint8Array([
                            0xE2, 0x95, 0x95, 0xE2, 0x80, 0xBC, 0x20, 0xE2, 0x95, 0x90, 0xE2, 0x96, 0xBA, 0xE2, 0x95, 0x95, 0x20, 0xC3, 0xA1, 0xC3, 0x84, 0xE2, 0x95,
                            0xAA, 0xE2, 0x95, 0x95, 0xC3, 0x87, 0x20, 0x48, 0xE2, 0x95, 0x91, 0xC3, 0x87, 0x20, 0x4A, 0xE2, 0x96, 0x92, 0x20, 0xC3, 0xa0, 0xE2, 0x95,
                            0xA8, 0x75, 0xE2, 0x98, 0xBB, 0xE2, 0x96, 0x92, 0xE2, 0x98, 0xBC, 0xC3, 0xAB, 0xE2, 0x95, 0x9F, 0xC3, 0xAB, 0xE2, 0x95, 0x93, 0xE2, 0x95,
                            0xA4, 0xCE, 0xB5, 0xE2, 0x98, 0xBA, 0xE2, 0x89, 0x88, 0xE2, 0x95, 0x97, 0xC3, 0x87, 0x20, 0x29, 0xE2, 0x95, 0x99, 0x69, 0xE2, 0x96, 0x88,
                            0x40, 0xE2, 0x98, 0xBA, 0xC3, 0xAA, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0x20, 0xE2,
                            0x95, 0xA5, 0x75, 0xCE, 0xB1, 0x20, 0x20, 0x20, 0x20, 0x20, 0xE2, 0x94, 0x94, 0x75, 0xE2, 0x95, 0xAA, 0xE2, 0x94, 0xA4, 0x20, 0xE2, 0x95,
                            0x90, 0xE2, 0x96, 0xAC, 0xE2, 0x95, 0x95, 0xE2, 0x99, 0xA5, 0x20, 0xE2, 0x95, 0x90, 0xE2, 0x96, 0xBA
                        ]));
                    }
                    else if (file == 'INFO.TXT') {
                        // Note: the reason why the email address is "encoded"
                        // in this silly way is simply to make it harder for
                        // email address harvesting...
                        term.writeln('Well done, you made it! Here is our contact information.');
                        term.writeln('For sales/marketing and other inquries, please contact ' + 'moc.yawrox@sodrox'.split('').reverse().join(''));
                        term.writeln('');
                        term.writeln('The full source to this demo can also be found at');
                        term.writeln('https://github.com/xorway/xorway.com');
                    }
                    else if (file == 'LOGO.ANS') {
                        term.showLogo();
                    }
                    else {
                        term.writeln(`File not found - ${file}`);
                    }

                    term.prompt();
                },
                description: 'Displays a text file on the screen'
            },
            ver: {
                f: () => {
                    term.writeln('XOR-DOS Version 6.22');
                    term.writeln('(c) Copyright Xorway Solutions 1995, 2023');
                    term.prompt();
                },
                description: 'Displays the XOR-DOS version currently running'
            }
        };

        function runCommand(term, text) {
            const commandAndParameters = text.trim().split(' ');
            const command = commandAndParameters[0];
            const firstParameter = commandAndParameters[1];

            if (commandAndParameters.length > 2) {
                // If more than one parameter is provided, only the second
                // parameter is printed even though more parameters may have
                // been provided. This matches the MS-DOS semantics perfectly.
                // ;)
                term.writeln('');
                term.writeln(`Too many parameters - ${commandAndParameters[2]}`);
                term.prompt();
                return;
            }

            if (command.length > 0) {
                term.writeln('');

                if (command in commands) {
                    commands[command].f(firstParameter);
                    return;
                }

                term.writeln('Bad command or file name');
            }

            term.prompt();
        }

        // All initialized: show the logo + prompt and hand over control to xterm.js
        term.showLogo();
        term.prompt();
        term.focus();
    });
