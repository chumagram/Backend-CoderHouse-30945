let emailUser = 'eurongreyjoy%40gmail.com'
let username = emailUser.split('%')[0]
let mailServer = emailUser.split('%')[1].slice(2)
let mailClean = username + '@' + mailServer