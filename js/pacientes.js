const { createApp } = Vue
  createApp({
    data() {
      return {
        pacientes:[],
        //url:'http://localhost:5000/productos', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://flimole.pythonanywhere.com/pacientes',   // si ya lo subieron a pythonanywhere
        searchQuery: "",
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombres:"", 
        apellidos:"",
        dni:0,
        fechanacimiento:0,
        obrasocial:"",
        direccion:"",
        imagen:"",
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.pacientes = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id,nombre,apellido) {
            if (confirm(`¿Seguro de que deseas eliminar al paciente ${nombre} ${apellido}?`)) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			        alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al eliminar el registro');
                });
            }
        },
        grabar(){
            let paciente = {
                nombres:this.nombres,
                apellidos: this.apellidos,
                dni: this.dni,
                fechanacimiento:this.fechanacimiento,
                obrasocial: this.obrasocial,
                direccion:this.direccion,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(paciente),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Paciente guardado")
                    window.location.href = "./index.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Guardar")  // puedo mostrar el error tambien
                });
        },
        buscarPaciente() {
            console.log("Buscando..")
            this.error = false;
            this.cargando = true;
            const url = this.url + '?query=' + this.searchQuery;
            fetch(url)
              .then(response => response.json())
              .then(data => {
                // Filtrar los pacientes que coinciden con la búsqueda
                this.pacientes = data.filter(paciente => {
                  const nombres = paciente.nombres.toLowerCase();
                  const apellidos = paciente.apellidos.toLowerCase();
                  const query = this.searchQuery.toLowerCase();
                  return nombres.includes(query) || apellidos.includes(query);
                });
          
                this.cargando = false;
              })
              .catch(err => {
                console.error(err);
                this.error = true;
              });
          }
                       
        },
          created() {
            this.fetchData(this.url)
        },
        }).mount('#app')
        
        
