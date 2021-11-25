const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

//set engine 的方法容易忘記
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index', {restaurants: restaurantList.results })
})

app.get('/search', (req, res)=>{
    const keyword = req.query.keyword.trim()
    const results = restaurantList.results.filter((restaurant)=>{
        return keywordSearch(restaurant.name, keyword) || keywordSearch(restaurant.category, keyword)
    })
    function keywordSearch(string, keyword){
        string = string.toLowerCase()
        keyword = keyword.toLowerCase()
        return string.includes(keyword)
    }

    res.render('index', {restaurants: results, keyword })
})

app.get('/restaurants/:id', (req, res)=>{
    const restaurant = restaurantList.results.find((restaurant) => {
        return restaurant.id.toString() === req.params.id
    })
    //the keyword "return" is indeed if ues ()=>{} sytax 
    res.render('show', {restaurant})
})

app.listen(3000, ()=>{
    console.log('The server is listenning on port 3000')
})