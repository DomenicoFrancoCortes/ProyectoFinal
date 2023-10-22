import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Favorito } from '../models/favorito';
import { Actividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  public userFavorito: Favorito = { email: '', favoritos: [] };

  public listaActividades: Actividad[] = [{
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    categoria: ''
  }]

  constructor(public http: HttpClient) {
    this.cargarStorage();
  }

  guardarFavoritos(url: string, body: any) {
    return this.http.post(url, body);
  }

  /**
* @function crearLista
* @param {string, string, string} id, nombre, favorito
* @description instancia un nuevo objeto de tipo Favorito con los
* datos ingresados por parámetro. Inserta este nuevo objeto en el array
* que contiene los objetos que representan los lugares favoritos del usuario
* y lo guarda en el local storage.
* @return un string con el nombre del lugar.
*/
  crearLista(email: string, favoritos: number[]) {
    let ObjetoFavorito: Favorito = { email, favoritos };
    console.log("crearLista: " + ObjetoFavorito);
    //this.userFavorito.push(ObjetoFavorito);
    this.guardarStorage();
  }

  /**
   * @function guardarStorage
   * @description convierte en texto plano (string) el objeto array que
   * representa la lista de favoritos del usuario. Llama a la función setItem
   * para guardar el string creado en el local storage Para esto se deben
   * ingresar dos parámetros, el primero un nombre(key) y el segundo el
   * contenido (value). Se guarda entonces como un par key-value
   */
  guardarStorage() {
    let stringFavoritos: string = JSON.stringify(this.userFavorito);
    localStorage.setItem('favoritosDelUsuario', stringFavoritos);
  }

  /**
  * @function cargarStorage
  * @description refresca los objetos guardados en el local storage.
  * Llama a la función getItem en la cual debe igresarse como parámetro
  * el nombre del objeto que queremos recuperar. Si el Storage está vacío
  * devolverá el objeto listas vacío también. Convierte el texto plano a
  * objeto para poder ingresarlo
  */
  cargarStorage() {
    console.log("Entro Cargar Storage");
    const listaStorage = localStorage.getItem('favoritosDelUsuario');
    if (listaStorage === null) {
      console.log("Lista vacia");
      return this.userFavorito = { email: '', favoritos: [] };
      
    }
    let objLista = JSON.parse(listaStorage);
    console.log("hay Lista");
    return this.userFavorito = objLista;
  }

  /**
   * @function eliminarLista
   * @description guarda todas las listas menos la lista a eliminar.
   * Llama a la función filter que devuelve un arreglo de listas.
   */
  eliminarLista(lista: Favorito) {
    //let nuevoListado = this.userFavorito.filter((listaItem) => listaItem.email !== lista.email);
    //this.userFavorito = nuevoListado;
    this.guardarStorage();
  }

}