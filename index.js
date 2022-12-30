
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.port || 5000
app.use(cors());

app.use(express.json());

// connect mongodb

const uri = "mongodb+srv://mediaUser:AfMySWjcCmiRZRdO@cluster0.bsvyfrc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const run = async ()=>{
    try{
        const postCollection = client.db('media').collection('posts')
        const aboutCollection = client.db('media').collection('about')

        app.post('/post',async(req,res)=>{
            const post = req.body
            const result =await postCollection.insertOne(post)
            res.send(result)
        
        
           
        })

        app.get('/posts',async(req,res)=>{
            const query = {}
            const posts = await postCollection.find({}).toArray()
            res.send(posts)
        })

        app.get('/about',async(req,res)=>{
            const query = {}
            const about = await aboutCollection.find(query).toArray()
            
            res.send(about)
        })

    }finally{
    
    }
}

run().catch(console.dir())



app.get('/', (req, res) => {
res.send('running server')
})

app.listen(port, () => console.log('listening on port',port))