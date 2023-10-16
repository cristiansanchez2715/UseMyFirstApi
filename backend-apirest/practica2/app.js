const express = require("express")
const app = express()
const cors = require("cors")
const API = "http://localhost/api/students"


app.use(cors())
app.use(express.json())

const students = [
    {id: 1, name: "Cristian Medina", edad: 27},
    {id: 2, name: "alberto zambrano", edad: 35},
    {id: 3, name: "laura sandoval", edad: 30}
]

app.get("/", (req, res) => {
    res.send("node JS api");
})

app.get("/api/students", (req, res) => {
res.send(students)
})

app.get(`/api/students/:id`, (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if(!student) return res.status(404).send("estudiante no encontrado");
    else res.send(student)
})

app.post("/api/students", (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        edad: parseInt(req.body.edad),
        enroll: (req.body.enroll === "true")
    }
    students.push(student);
    res.send(student)
})

app.delete(`/api/students/:id`, (req, res) => {
    const student = students.find(c =>  c.id === parseInt(req.params.id))
    if(!student) return res.status(404).send("Estudiante no encontrado")

    const index = students.indexOf(student);
    students.splice(index, 1)
    res.send(student);
})

const port = process.env.port || 80;
app.listen(port, () => {
    console.log(`ecuchando el puerto ${port}`)
})