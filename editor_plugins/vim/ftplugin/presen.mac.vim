" Vim filetype plugin
" Language:             Presentation
" Maintainer:           smeghead <smeghead7@gmail.com>
" Last Change:          2011-11-11

if exists("b:did_ftplugin")
  finish
endif
 
let b:did_ftplugin = 1

" auto update
autocmd BufWritePost <buffer> silent exec "!presen"

" open browser
noremap <buffer> <F5> :!open %:p:h/index.html > /dev/null 2>&1<CR>
