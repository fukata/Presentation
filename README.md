# Presentation
## What's this
HTML Base Presentation Tool

## How to
1. Create directory
2. Write markdown text to main.txt
3. Change directory it
4. Execute presen

	presen [theme]

## Customize Theme 
1. Move themes/default themes/hoge
2. Edit themes/hoge/main.css
3. Edit themes/hoge/main.js
4. Execute `persen hoge` 

## Syntax
main.txt

	TITLE
	>-----
	1 page conents
	>-----
	2 page conents
	>-----
	3 page contents
	...
### Page Delimiter
	>-----

## Tips
### Auto Build
.vimrc add
	" Presentation
	autocmd BufWritePost main.txt silent exec "!presen [theme]"
