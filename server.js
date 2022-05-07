const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});
//regresar todos los explorers
app.get('/explorers', async (req, res) => {
    const explorers = await prisma.explorer.findMany({});
    res.json(explorers);
})
//regrese solo un explorer
app.get('/explorers/:id', async (req, res) => {
    const id=req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});
//Aqui creamos el explorers
app.post('/explorers', async (req, res) => {
    const explorer={
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = "Explorer created";
    await prisma.explorer.create({data: explorer});
    res.json({message});
});
//Aqui actualizamos el explorers la mision se actualizara el explorer
app.put('/explorers/:id', async (req, res) => {
    const id=parseInt(req.params.id);
    await prisma.explorer.update({
        where: {
                id:id
        },
        data:{
                mission: req.body.mission
        }
    })
    return res.json({message: "Explorer updated"});
});
//Aqui eliminamos el explorers
app.delete('/explorers/:id', async (req, res) => {
    const id=parseInt(req.params.id);
    await prisma.explorer.delete({where: {id:id}});
    return res.json({message: "Explorer deleted"});
})

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});