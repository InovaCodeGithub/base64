const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const moment = require('moment')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/img/:id', (req,res) => {
    fs.readFile('./img.json', async(err, content) => {
        if(err){
            console.log(err)
            throw new Error('Erro ao ler img.json.')
        }
        let imgJson = JSON.parse(content)
        for(const item of imgJson.imgs){
            if(item.id === req.params.id){
                return res.status(200).json({success: true, message: 'Imagem encontrada.', items: item})
            }
        }
        return res.status(404).json({success: false, message: 'Nenhuma imagem encontrada.'})
    })
})

app.post('/convert', (req,res) => {
//pega a bas64
    const base64Str = req.body.img
    
//LINKAR IMG - ID
    fs.readFile('./img.json',async(err, content) => {
        if(err){
            console.log(err)
            throw new Error('Erro ao ler img.json.')
        }
        console.log(content)
        let imgJson = JSON.parse(content)
        imgJson.lastName++
        let imgThumbName = `img${imgJson.lastName}_thumb.jpeg` 
        imgJson.lastName++
        let imgFullName = `img${imgJson.lastName + 1}_full.jpeg` 

        await sharp(Buffer.from(base64Str,  'base64'))
            .resize(1280, 720)
            .toFile(`./img/${imgThumbName}`)

        await sharp(Buffer.from(base64Str,  'base64'))
            .toFile(`./img/${imgFullName}`)

        imgJson.imgs.push(
            {
                id: `${moment().format('DDMMYYY_HHmm')}`,
                files:
                [
                    {
                        type: 'thumb',
                        path: `${path.join(__dirname, 'img', imgThumbName)}`
                    },
                    {
                        type: 'full',
                        path: `${path.join(__dirname, 'img', imgFullName)}`
                    }
                ]
            }
            )

        fs.writeFile('./img.json',JSON.stringify(imgJson),function(err) {
            if(err){
                console.log(err)
                throw new Error('Erro ao gravar alterações no arquivo img.json.')
            }          
        })    
        })
        
        return res.status(200).json({success: true, message: 'Imagem gravada com sucesso.'})
})


//nome vai ser data e hora
//05091204

app.listen(process.env.PORT_base64/index.js||8080, function (){
    console.log("Inova API");
});