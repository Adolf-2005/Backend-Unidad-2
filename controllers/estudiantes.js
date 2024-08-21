const { v4: uuidv4 } = require('uuid');
const query = require('../config/query'); // se importa la función para realizar consultas a la BD

class Estudiante {

    listar() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `listaestudiantes`';
                const response = await query(sql);

                return resolve({
                    ok: true,
                    estudiantes: response
                })
            } catch (error) {
                console.error('Error al mostrar los estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tuvimos un error al mostrar los estudiantes',
                })
            }
        })
    }

    agregar(estudiante) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad || !estudiante.carrera) {
                    return reject('Debes ingresar las propiedades')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 100 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida')
                }

                const sql = 'SELECT * FROM `listaestudiantes`';
                const estudiantes = await query(sql);

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].edad === estudiante.edad && estudiantes[i].nombre === estudiante.nombre && estudiantes[i].carerra === estudiante.carerra) {
                        return reject('Este estudiante ya esta registrado')
                    }
                }

                const values = [estudiante.nombre, estudiante.edad, estudiante.carrera]

                const sql2 = 'INSERT INTO `listaestudiantes`(`id`, `nombre`, `edad`, `carrera`) VALUES (?, ?, ?, ?)';
                await query(sql2, values);

                return resolve({
                    ok: true,
                    estudiante_agregado: estudiante
                })
            } catch (error) {
                console.error('Error al agregar el estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al agregar el estudiante',
                })
            }
        })
    }

    mostrar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT `id`, `nombre`, `edad`, `carrera` FROM `listaestudiantes` WHERE id=?';
                const estudiante = await query(sql, Number(id));

                if (estudiante.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "no se encontro el estudiante"
                    })
                }

                return resolve({
                    ok: true,
                    estudiante: estudiante
                })
            } catch (error) {
                console.error('Error al mostrar el estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar el estudiante',
                })
            }
        })
    }

    /*Nuevo controlador*/
    mostrarCarrera(carrera) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT `id`, `nombre`, `edad`, `carrera` FROM `listaestudiantes` WHERE carrera=?';
                const estudiantes = await query(sql, carrera);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados de esta carrera"
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    /*Nuevo controlador */
    mostrarRango(rangomin, rangomax) {
        return new Promise(async (resolve, reject) => {
            try {
                if (rangomin > rangomax) {
                    return reject({
                        ok: false,
                        mensaje: 'Es importante ingresar los datos correctamente, ya que el valor mínimo es mayor que el valor máximo.'
                    })
                }

                const sql = 'SELECT `id`, `nombre`, `edad`, `carrera` FROM `listaestudiantes` WHERE edad BETWEEN ? AND ?';
                const values = [rangomin, rangomax]
                const estudiantes = await query(sql, values);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados en este rango de edad."
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    /*Nuevo controlador */
    mostrarUltimos() {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT * FROM `listaestudiantes` ORDER BY id DESC LIMIT 5';
                const estudiantes = await query(sql);

                if (estudiantes.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No hay estudiantes registrados"
                    })
                }

                return resolve({
                    ok: true,
                    estudiantes: estudiantes
                })
            } catch (error) {
                console.error('Error al mostrar los estudiantes:', error)
                return reject({
                    ok: false,
                    mensaje: 'Tenemos un error al mostrar los estudiantes',
                })
            }
        })
    }

    editar(estudiante, id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!estudiante.nombre || !estudiante.edad || !estudiante.carrera) {
                    return reject('Debes ingresar propiedades')
                }

                if (Number.isInteger(estudiante.edad) === false) {
                    return reject('Debes ingresar una edad escrita en numeros')
                }

                if (estudiante.edad > 100 || estudiante.edad < 0) {
                    return reject('Debes ingresar una valida')
                }

                const sql = 'SELECT * FROM `listaestudiantes`';
                const estudiantes = await query(sql);

                for (let i = 0; i < estudiantes.length; i++) {
                    if (estudiantes[i].edad === estudiante.edad && estudiantes[i].nombre === estudiante.nombre && estudiantes[i].carerra === estudiante.carerra) {
                        return reject('Este estudiante ya está registrado con los mismos datos. Debes modificarlos.')
                    }
                }

                const sql2 = 'SELECT `id`, `nombre`, `edad`, `carrera` FROM `listaestudiantes` WHERE id=?';
                const estudiante_buscado = await query(sql2, Number(id));

                if (estudiante_buscado.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "No se ha encontrado al estudiante que deseas editar"
                    })
                }

                const values = [id, estudiante.nombre, estudiante.edad, estudiante.carrera, id]
                const sql3 = 'UPDATE listaestudiantes SET `id`=?,`nombre`=?,`edad`=?,`carrera`=? WHERE id=?';
                const response = await query(sql3, values);

                return resolve({
                    ok: true,
                    estudiante_editado: estudiante
                })
            } catch (error) {
                console.error('Error al editar el estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al editar el estudiante',
                })
            }
        })
    }

    eliminar(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const sql = 'SELECT `id`, `nombre`, `edad`, `carrera` FROM `listaestudiantes` WHERE id=?';
                const estudiante = await query(sql, Number(id));

                if (estudiante.length === 0) {
                    return reject({
                        ok: false,
                        mensaje: "no se encontro el estudiante que estas buscando"
                    })
                }

                const sql2 = 'DELETE FROM `listaestudiantes` WHERE id=?';
                const response = await query(sql2, Number(id));

                return resolve({
                    ok: true,
                    estudiante_eliminado: estudiante
                })
            } catch (error) {
                console.error('Error al eliminar el estudiante:', error)
                return reject({
                    ok: false,
                    mensaje: 'Hubo un error al eliminar el estudiante',
                })
            }
        })
    }
}

const estudiantesC = new Estudiante();
module.exports = estudiantesC;