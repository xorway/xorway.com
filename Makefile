.PHONY: serve dist-checkout dist

all: css/xterm.css js/xterm.js js/xterm.js.map js/xterm-addon-web-links.js js/xterm-addon-web-links.js.map

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

serve:
	python3 -m http.server 8000

dist-checkout:
	git clone -b gh-pages --single-branch git@github.com:xorway/xorway.com.git dist

dist:
	cp -r css/ js/ logo.txt demo.js index.html dist/
	(cd dist && git add -A && git commit -m 'Update gh-pages branch' && git push)
