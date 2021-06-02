const { assert } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Suite Test metodo Get',()=>{
        it('Valida Codigo 200', (done) => {
        chai.request(url)
        .get('/posts')
        .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(200);
        done();
            });
        });

        it('Valida codigo 404', (done) => {
            chai.request(url)
            .get('/posts/100')
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
            });
        }); 

        it('Compara Respuesta Primer registro', (done) => {
        chai.request(url)
        .get('/posts')
        .end( function(err,res){
        console.log(res.body[0])
        expect(res.body[0]).to.have.property('id').to.be.equal(1);
        expect(res.body[0]).to.have.property('title').to.be.equal("json-server");
        expect(res.body[0]).to.have.property('author').to.be.equal("typicode");  
        done();
            });
        });
});

describe('Suite Test metodo Post ',()=>{
        it('Inserta un registo y Valida codigo 200', (done) => {
            chai.request(url)
            .post('/posts')
            .send( {id: 3, title: 'Caballo de Bronce', author: 'Juan Perez'})
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(201);
            done();
            });
            });

        it('Valida registro insertado correctamente ', (done) => {
            chai.request(url)
            .get('/posts')
            .end( function(err,res){
            console.log(res.body)
            expect(res.body[2]).to.have.property('id').to.be.equal(3);
            expect(res.body[2]).to.have.property('title').to.be.equal("Caballo de Bronce");
            expect(res.body[2]).to.have.property('author').to.be.equal("Juan Perez");
            done();
            });
            });   

        it('Valida codigo 500', (done) => {
            chai.request(url)
            .post('/posts')
            .send( { id: 2, title: "Harry Potter", author: "typicode"})
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(500);
            done();
            });
            });        
});

describe('Suite Test metodo PUT',()=>{
        it('Valida que acualice el titulo y author del registo 3', (done) => {
            chai.request(url)
            .put('/posts/3')
            .send( { id: 2, title: "Papelucho", author: "Maria Paz"})
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
            });
            });

        it('Valido que el cambio de efectuo de forma correcta', (done) => {
            chai.request(url)
            .get('/posts')
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200)
            expect(res.body[2]).to.have.property('id').to.be.equal(3);
            expect(res.body[2]).to.have.property('title').to.be.equal("Papelucho");
            expect(res.body[2]).to.have.property('author').to.be.equal("Maria Paz");
            done();
            });
        });

        it('Valida error 404', (done) => {
            chai.request(url)
            .put('/posts/4')
            .send( { id: 2, title: "Papelucho", author: "Maria Paz"})
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
            });
        });
       
});


describe('Suite Test metodo Eliminar',()=>{
        it('Valida que se elimina el registo 3', (done) => {
        chai.request(url)
        .del('/posts/3')
        .end( function(err,res){
        console.log(res.body)
        expect(res).to.have.status(200);
        done();
        });
        });

        it('Valida que registro se elimino', (done) => {
            chai.request(url)
            .get('/posts')
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(200)
            expect(res.body[2]).to.be.undefined;;
            done();
            });
           });

        it('Valida error 404', (done) => {
            chai.request(url)
            .get('/posts/4')
            .end( function(err,res){
            console.log(res.body)
            expect(res).to.have.status(404);
            done();
            });
           });
           
});

  