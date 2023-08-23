const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const listPosts = [
    {
        id: 1,
        img: 'https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png',
        title: 'Tablets to Help Autistic Children',
        date: 'July 21, 2021',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
        id: 2,
        img: 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
        title: 'How to Take Better Photos',
        date: 'July 21, 2021',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    }
];

app.get('/', (req, res) => {
    return res.render('page', {
        data: listPosts,
    })
})

app.get('/add', (req, res) => {
    return res.render('add');
});

app.post('/add', (req, res) => {
    const { img, title, date, description } = req.body;
    const id = Math.floor(Math.random() * 1000);
    
    listPosts.push({
        id,
        img,
        title,
        date,
        description,
    });
    return res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = listPosts.findIndex(post => post.id == id);
    listPosts.splice(index, 1);
    return res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const post = listPosts.find(post => post.id == id);
    return res.render('update', {
        post,
    });
});

app.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const { img, title, date, description } = req.body;
    const index = listPosts.findIndex(post => post.id == id);
    listPosts[index] = {
        id,
        img,
        title,
        date,
        description,
    };
    
    return res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
