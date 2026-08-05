.PHONY: serve dist-checkout dist build

all: css/xterm.css js/xterm.js js/xterm.js.map js/xterm-addon-web-links.js js/xterm-addon-web-links.js.map build

# We download these using https://www.jsdelivr.com/ instead of npm, to avoid all
# the hassle the whole Node.js ecosystem puts upon us.
css/xterm.css:
	curl --fail https://cdn.jsdelivr.net/npm/xterm@5.2.1/css/xterm.css -o css/xterm.css

js/xterm.js:
	curl --fail https://cdn.jsdelivr.net/npm/xterm@5.2.1/lib/xterm.js -o js/xterm.js

js/xterm.js.map:
	curl --fail https://cdn.jsdelivr.net/npm/xterm@5.2.1/lib/xterm.js.map -o js/xterm.js.map

js/xterm-addon-web-links.js:
	curl --fail https://cdn.jsdelivr.net/npm/xterm-addon-web-links@0.8.0/lib/xterm-addon-web-links.js -o js/xterm-addon-web-links.js

js/xterm-addon-web-links.js.map:
	curl --fail https://cdn.jsdelivr.net/npm/xterm-addon-web-links@0.8.0/lib/xterm-addon-web-links.js.map -o js/xterm-addon-web-links.js.map

logo.txt: xorway-whox.ans Makefile
	cp xorway-whox.ans $(@)

# The file  needs CR+LF line endings to be properly rendered by xterm.js
	unix2dos -f $(@)

PAGES = index.html about.html why-free-software-matters.html perlang.html

build: $(PAGES)

%.html: pages/%.php includes/header.php includes/footer.php Makefile
	php $< > $@

autobuild:
	while true; do find css includes pages Makefile -type f | entr -n -d bash -c 'scripts/time_it make build' ; done

serve: build
	live-server

dist: build
	mkdir -p dist
	cp -r css/ js/ logo.txt logo.png demo.js $(PAGES) dist/
	ssh $$XORWAY_WEB_HOST "sudo mkdir -p /var/www/xorway.com && sudo chown $$USER /var/www/xorway.com"
	rsync --delete -av dist/ $$XORWAY_WEB_HOST:/var/www/xorway.com
