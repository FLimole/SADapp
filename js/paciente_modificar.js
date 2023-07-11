console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        nombres:"", 
        apellidos:"",
        dni:0,
        fechanacimiento:0,
        obrasocial:"",
        direccion:"", 
        imagen:"",
        url:'https://flimole.pythonanywhere.com/pacientes/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.nombres=data.nombres;
                    this.apellidos=data.apellidos
                    this.dni=data.dni
                    this.fechanacimiento=data.fechanacimiento
                    this.obrasocial=data.obrasocial
                    this.direccion=data.direccion
                    this.imagen=data.imagen                    
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let paciente = {
                nombres:this.nombres,
                apellidos:this.apellidos,
                dni:this.dni,
                fechanacimiento:this.fechanacimiento,
                obrasocial: this.obrasocial,
                direccion:this.direccion,
                imagen:this.imagen
            }
            var options = {
                body: JSON.stringify(paciente),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Paciente actualizado")
                    window.location.href = "./pacientes.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
