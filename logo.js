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
        // Override the theme to provide something suitable for use with a white background
        var theme = {
            background: 'white',
            foreground: 'black',

            // Hack the colors to be able to render the logo.txt on a white background, suitable for
            // print/paper usage
            black: 'white',
            brightWhite: '#729fcf'

            //blue: '#0000ff',
            //brightBlue: 'black',
            //brightWhite: '#3465a4'

            //blue: '#8080ff',
            //brightBlue: '#000066',
            //brightWhite: '#729fcf'
            //brightWhite: '#000066'
        };

        var term = new Terminal({
            theme: theme,
            fontFamily: 'DejaVu Sans Mono',
            fontSize: '30'
        });

        // Make URL:s clickable, for easier use
        term.loadAddon(new WebLinksAddon.WebLinksAddon());

        term.open(document.getElementById('terminal'));

        term.showLogo = () => {
            term.write(t);

            //term.writeln('                                                 Free as in freedom! xorway.com');
            //term.writeln('"If the Son therefore shall make you free, ye shall be free indeed" - xorway.com');
            //term.writeln('                                  Because Software wants to be Free! xorway.com');
            //term.writeln('                                    Because Free Software is better! xorway.com');
            term.writeln('                                 ...because Free Software is better! xorway.com');
        };

        // All initialized: show the logo
        term.showLogo();
    });
