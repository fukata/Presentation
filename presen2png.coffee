page = new WebPage()
address = phantom.args[0]
output = phantom.args[1] || 'out.png'
width = phantom.args[2] || 1024 
height = phantom.args[3] || 768 
paperwidth = phantom.args[4] || '28.00cm'
paperheight = phantom.args[5] || '21.00cm'

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
