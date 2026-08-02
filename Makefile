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

# ---- Page build ------------------------------------------------------------
#
# Each page is assembled by concatenating shared partials (header/nav + footer)
# with its own per-page head/body fragment. This keeps the navigation and
# footer in a single place instead of duplicated across every HTML file. No
# Node, no static-site generator -- just `cat` and a touch of `sed`.

PAGES = index.html about.html why-free-software-matters.html perlang.html

title-index = Xorway Solutions
title-about = About — Xorway Solutions
title-why-free-software-matters = Why Free Software Matters — Xorway Solutions
title-perlang = Perlang — Xorway Solutions

build: $(PAGES)

%.html: pages/%.body.html pages/%.head.html partials/head-top.html partials/head-bottom.html partials/foot.html Makefile
	cat partials/head-top.html pages/$*.head.html partials/head-bottom.html pages/$*.body.html partials/foot.html \
	  | sed 's|@@TITLE@@|$(title-$*)|' > $@

autobuild:
	while true; do find -name \*.html -or -name Makefile -or -name \*.css -type f | entr -n -d bash -c 'scripts/time_it make build' ; done

serve: build
	live-server

dist: build
	mkdir -p dist
	cp -r css/ js/ logo.txt logo-wordmark.png demo.js $(HTML) dist/
	ssh $$XORWAY_WEB_HOST "sudo mkdir -p /var/www/xorway.com && sudo chown $$USER /var/www/xorway.com"
	rsync --delete -av dist/ $$XORWAY_WEB_HOST:/var/www/xorway.com
