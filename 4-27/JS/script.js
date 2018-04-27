(function(){
//IIFE
var githubUsers = document.querySelector('main ul');
var searchBox = document.querySelector('header input');
var searchSubmit = document.querySelector('header button');
searchSubmit.addEventListener('click', getSearchStr);
// searchBox.addEventListener('keyup', getSearchStr);
//var searchStr = '';

getReq('js/github.json', getKeys);
var github_search = '';
var clientId = '';
var clientSecret = '';

function getSearchStr (){
    githubUsers.innerHTML= '';
    var searchStr = searchBox.value;
    var githubUrl = `${githubSearch}?q=${searchStr}&per_page=5&client_id${clientId}&client_secret=${clientSecret}`;
    getReq(githubUrl, showUsers);
}

function showUsers(users){
    console.log(users);

    for(var i =0; i < users.items.length; i++){
        var user = `
            <li>
                <img src="${users.items[i].avatar_url}" alt="${users.items[i].login}">
                <h3>${users.items[i].login}</h3>
            </li>
        `;
        githubUsers.innerHTML += user;
    }
}

function getReq (url, func){
    var req =  new XMLHttpRequest();
    req.open('GET', url);
        // Nathan's a butt
    req.onload = function(){
        if(req.readyState === 4 && req.status === 200){
            func(JSON.parse(req.responseText));
        }
    }
    req.send(null);
}

function getKeys(keys){
    githubSearch = keys.github_search;
    clientId = keys.client_id
    clientSecret = keys.client_secret;
    // var seearchStr= getSearchStr();
    // var url = `${keys.github_search}`;
    // console.log(keys);
    // console.log(url, getSearchStr);
}

} ());