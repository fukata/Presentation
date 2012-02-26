page = new WebPage()
address = phantom.args[0]
output = phantom.args[1] || 'out.png'
width = phantom.args[2] || 1440
height = phantom.args[3] || 900
paperwidth = phantom.args[4] || '48.77cm'
paperheight = phantom.args[5] || '17.43cm'

page.viewportSize = { width: width, height: height }
page.paperSize = { width: paperwidth, height: paperheight, border: '0px' }

page.open address, (status) -> 
	console.log status
	if status is not 'success'
		console.log 'Unable to load the address!'
	else
		window.setTimeout (->
			page.render output
			phantom.exit()
		), 200
