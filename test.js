var helpers = require('./server/helpers');

console.log('=============> Test Starts <=============');
data = {
    'url': 'https://api.github.com/users/anistark/repos',
    'totalRepoCount': '164'
}
helpers.getRepoData(data);
console.log('==============> Test Ends <==============');
